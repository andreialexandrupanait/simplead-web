import { createSign } from 'node:crypto';

/**
 * Access token pentru Google APIs dintr-un service account, FĂRĂ librării grele
 * (googleapis are type-defs uriașe → OOM la build; vezi scripts/gtm-provision.mjs).
 * Semnăm un JWT RS256 cu `node:crypto` și-l schimbăm pe token la endpoint-ul OAuth.
 * Cheia SA (JSON) vine din `process.env.GOOGLE_SA_KEY`.
 */

interface SaKey {
  client_email: string;
  private_key: string;
}

function getSaKey(): SaKey | null {
  const raw = process.env.GOOGLE_SA_KEY?.trim();
  if (!raw) return null;
  try {
    const j = JSON.parse(raw);
    if (j.client_email && j.private_key) return { client_email: j.client_email, private_key: j.private_key };
  } catch {
    /* JSON invalid */
  }
  return null;
}

export function hasGoogleServiceAccount(): boolean {
  return getSaKey() !== null;
}

const b64url = (input: Buffer | string): string => Buffer.from(input).toString('base64url');

// Cache pe combinația de scope-uri (token-ul e valid 1h).
const cache = new Map<string, { token: string; exp: number }>();

/** Access token pentru scope-urile date; null dacă SA nu e configurat / eroare. */
export async function getGoogleAccessToken(scopes: string[]): Promise<string | null> {
  const scopeKey = [...scopes].sort().join(' ');
  const now = Math.floor(Date.now() / 1000);
  const hit = cache.get(scopeKey);
  if (hit && hit.exp - 60 > now) return hit.token;

  const key = getSaKey();
  if (!key) return null;

  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(
    JSON.stringify({
      iss: key.client_email,
      scope: scopeKey,
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  );
  const signingInput = `${header}.${claim}`;
  let signature: string;
  try {
    signature = createSign('RSA-SHA256').update(signingInput).sign(key.private_key, 'base64url');
  } catch (err) {
    console.warn('[google-auth] semnarea JWT a eșuat:', err);
    return null;
  }
  const assertion = `${signingInput}.${signature}`;

  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion,
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.warn(`[google-auth] token ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return null;
    }
    const data = (await res.json()) as { access_token: string; expires_in?: number };
    cache.set(scopeKey, { token: data.access_token, exp: now + (data.expires_in ?? 3600) });
    return data.access_token;
  } catch (err) {
    console.warn('[google-auth] cererea de token a eșuat:', err);
    return null;
  }
}
