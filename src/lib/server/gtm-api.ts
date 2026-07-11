import { getGoogleAccessToken, hasGoogleServiceAccount } from './google-auth';

/**
 * Wrapper `fetch` peste Tag Manager API v2 pentru statusul + publicarea containerului
 * din admin. Fără googleapis (vezi google-auth.ts). Config din env:
 * GTM_ACCOUNT_ID, GTM_CONTAINER_ID (+ GOOGLE_SA_KEY pentru auth).
 */

const SCOPES = [
  'https://www.googleapis.com/auth/tagmanager.edit.containers',
  'https://www.googleapis.com/auth/tagmanager.edit.containerversions',
  'https://www.googleapis.com/auth/tagmanager.publish',
];
const BASE = 'https://tagmanager.googleapis.com/tagmanager/v2';

function ids() {
  return { account: process.env.GTM_ACCOUNT_ID?.trim(), container: process.env.GTM_CONTAINER_ID?.trim() };
}

export function isGtmConfigured(): boolean {
  const { account, container } = ids();
  return Boolean(account && container && hasGoogleServiceAccount());
}

async function gtmFetch(path: string, init?: RequestInit): Promise<any> {
  const token = await getGoogleAccessToken(SCOPES);
  if (!token) throw new Error('GTM neconfigurat (GOOGLE_SA_KEY lipsă sau invalid).');
  const res = await fetch(`${BASE}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`GTM API ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.status === 204 ? {} : res.json();
}

export interface ContainerStatus {
  configured: boolean;
  publicId?: string;
  versionId?: string;
  versionName?: string;
  tagsTotal?: number;
  tagsActive?: number;
  tagsPaused?: number;
  containerUrl?: string;
  error?: string;
}

/** Versiunea live + numărul de tag-uri (active/pauză). */
export async function getContainerStatus(): Promise<ContainerStatus> {
  const { account, container } = ids();
  if (!account || !container || !hasGoogleServiceAccount()) return { configured: false };
  const cp = `accounts/${account}/containers/${container}`;
  try {
    const live = await gtmFetch(`${cp}/versions:live`);
    const tags = (live.tag ?? []) as { paused?: boolean }[];
    return {
      configured: true,
      publicId: live.container?.publicId,
      versionId: live.containerVersionId,
      versionName: live.name,
      tagsTotal: tags.length,
      tagsActive: tags.filter((t) => !t.paused).length,
      tagsPaused: tags.filter((t) => t.paused).length,
      containerUrl: `https://tagmanager.google.com/#/container/accounts/${account}/containers/${container}/workspaces`,
    };
  } catch (err) {
    return { configured: true, error: err instanceof Error ? err.message : String(err) };
  }
}

export type PublishResult = { ok: true; versionId?: string } | { ok: false; error: string };

/**
 * Publică modificările din „Default Workspace": creează o versiune și o publică.
 * Dacă nu sunt modificări, GTM întoarce eroare — o raportăm prietenos.
 */
export async function publishDefaultWorkspace(): Promise<PublishResult> {
  const { account, container } = ids();
  if (!account || !container || !hasGoogleServiceAccount())
    return { ok: false, error: 'GTM neconfigurat.' };
  const cp = `accounts/${account}/containers/${container}`;
  try {
    const wsList = await gtmFetch(`${cp}/workspaces`);
    const workspaces = (wsList.workspace ?? []) as { name: string; workspaceId: string; path: string }[];
    const ws = workspaces.find((w) => w.name === 'Default Workspace') ?? workspaces[0];
    if (!ws) return { ok: false, error: 'Niciun workspace disponibil.' };

    const ver = await gtmFetch(`${ws.path}:create_version`, {
      method: 'POST',
      body: JSON.stringify({ name: 'Publicat din admin' }),
    });
    const versionId = ver.containerVersion?.containerVersionId;
    if (!versionId) {
      // Fără modificări → GTM nu creează versiune.
      return { ok: false, error: 'Nu există modificări de publicat în workspace.' };
    }
    await gtmFetch(`${cp}/versions/${versionId}:publish`, { method: 'POST' });
    return { ok: true, versionId };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
