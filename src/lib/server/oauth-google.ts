import { serverEnv } from './env';

/**
 * Helper minimal pentru „Sign in with Google" (OAuth 2.0 + userinfo), fără
 * dependențe: construim URL-ul de autorizare, schimbăm codul pe token și citim
 * profilul de la endpoint-ul userinfo (nu verificăm JWT manual — userinfo e
 * sursa de adevăr pt. email/email_verified/hd). Accesul e limitat la domeniul
 * `GOOGLE_ALLOWED_DOMAIN` (implicit `simplead.ro`).
 */

const AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const USERINFO_ENDPOINT = 'https://openidconnect.googleapis.com/v1/userinfo';

export const OAUTH_STATE_COOKIE = 'sa_oauth_state';

export function getAllowedDomain(): string {
  return (serverEnv('GOOGLE_ALLOWED_DOMAIN') || 'simplead.ro').trim().toLowerCase();
}

/** URL-ul de callback înregistrat în Google Cloud Console. */
export function getRedirectUri(requestUrl: string): string {
  const base = (serverEnv('SITE_URL') || new URL(requestUrl).origin).replace(/\/$/, '');
  return `${base}/api/auth/google/callback`;
}

export function buildAuthUrl(state: string, redirectUri: string): string {
  const clientId = serverEnv('GOOGLE_CLIENT_ID');
  const params = new URLSearchParams({
    client_id: clientId ?? '',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    // Sugestie de domeniu Workspace (UX); validarea reală se face în callback.
    hd: getAllowedDomain(),
    prompt: 'select_account',
    access_type: 'online',
  });
  return `${AUTH_ENDPOINT}?${params.toString()}`;
}

type TokenResponse = { access_token?: string; error?: string; error_description?: string };

export async function exchangeCode(code: string, redirectUri: string): Promise<string | null> {
  const clientId = serverEnv('GOOGLE_CLIENT_ID');
  const clientSecret = serverEnv('GOOGLE_CLIENT_SECRET');
  if (!clientId || !clientSecret) return null;
  try {
    const res = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json()) as TokenResponse;
    if (!res.ok || !data.access_token) {
      console.error('[oauth-google] token error:', data.error, data.error_description);
      return null;
    }
    return data.access_token;
  } catch (err) {
    console.error('[oauth-google] exchangeCode a eșuat:', err);
    return null;
  }
}

export type GoogleProfile = {
  sub: string;
  email: string;
  emailVerified: boolean;
  hd?: string;
  name?: string;
};

export async function fetchUserinfo(accessToken: string): Promise<GoogleProfile | null> {
  try {
    const res = await fetch(USERINFO_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error('[oauth-google] userinfo a răspuns', res.status);
      return null;
    }
    const data = (await res.json()) as {
      sub?: string;
      email?: string;
      email_verified?: boolean | string;
      hd?: string;
      name?: string;
    };
    if (!data.sub || !data.email) return null;
    return {
      sub: data.sub,
      email: data.email.trim().toLowerCase(),
      emailVerified: data.email_verified === true || data.email_verified === 'true',
      hd: data.hd,
      name: data.name,
    };
  } catch (err) {
    console.error('[oauth-google] fetchUserinfo a eșuat:', err);
    return null;
  }
}

/** Profilul are voie să intre? Email verificat + domeniu permis (hd sau sufix). */
export function isAllowedProfile(profile: GoogleProfile): boolean {
  if (!profile.emailVerified) return false;
  const domain = getAllowedDomain();
  const emailDomain = profile.email.split('@')[1]?.toLowerCase();
  const hd = profile.hd?.toLowerCase();
  return hd === domain || emailDomain === domain;
}
