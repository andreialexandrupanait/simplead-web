import type { APIRoute } from 'astro';
import { randomBytes } from 'node:crypto';
import {
  OAUTH_STATE_COOKIE,
  buildAuthUrl,
  getGoogleConfig,
  getRedirectUri,
} from '../../../../lib/server/oauth-google';

export const prerender = false;

/** Pornește fluxul Google: setează `state` (CSRF) și redirecționează la Google. */
export const GET: APIRoute = async ({ cookies, request, redirect }) => {
  const cfg = await getGoogleConfig();
  if (!cfg.clientId || !cfg.clientSecret) {
    return redirect('/admin/login?error=google-disabled', 302);
  }

  const state = randomBytes(16).toString('hex');
  cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    path: '/',
    maxAge: 600,
  });

  const url = buildAuthUrl(state, getRedirectUri(request.url), {
    clientId: cfg.clientId,
    allowedDomain: cfg.allowedDomain,
  });
  return redirect(url, 302);
};
