import type { APIRoute } from 'astro';
import {
  REMEMBER_TTL_S,
  createSessionToken,
  isGoogleConfigured,
  setSessionCookie,
} from '../../../../lib/server/auth';
import {
  OAUTH_STATE_COOKIE,
  exchangeCode,
  fetchUserinfo,
  getRedirectUri,
  isAllowedProfile,
} from '../../../../lib/server/oauth-google';
import { touchLastLogin, upsertGoogleAdmin } from '../../../../lib/server/admin-users';

export const prerender = false;

/** Callback Google: verifică `state`, schimbă codul, validează domeniul, loghează. */
export const GET: APIRoute = async ({ url, cookies, request, redirect }) => {
  if (!isGoogleConfigured()) return redirect('/admin/login?error=google-disabled', 302);

  const stateCookie = cookies.get(OAUTH_STATE_COOKIE)?.value;
  cookies.delete(OAUTH_STATE_COOKIE, { path: '/' });

  if (url.searchParams.get('error')) return redirect('/admin/login?error=google', 302);

  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');
  if (!state || !code || !stateCookie || state !== stateCookie) {
    return redirect('/admin/login?error=google-state', 302);
  }

  const redirectUri = getRedirectUri(request.url);
  const accessToken = await exchangeCode(code, redirectUri);
  if (!accessToken) return redirect('/admin/login?error=google', 302);

  const profile = await fetchUserinfo(accessToken);
  if (!profile) return redirect('/admin/login?error=google', 302);
  if (!isAllowedProfile(profile)) return redirect('/admin/login?error=google-domain', 302);

  const user = await upsertGoogleAdmin({
    email: profile.email,
    googleSub: profile.sub,
    name: profile.name,
  });
  if (!user) return redirect('/admin/login?error=google-account', 302);

  await touchLastLogin(user.id);
  const token = createSessionToken({ sub: user.id, email: user.email, ttlS: REMEMBER_TTL_S });
  if (!token) return redirect('/admin/login?error=session', 302);

  setSessionCookie(cookies, token, { maxAge: REMEMBER_TTL_S });
  return redirect('/admin', 302);
};
