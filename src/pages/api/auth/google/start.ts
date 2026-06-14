import type { APIRoute } from 'astro';
import { randomBytes } from 'node:crypto';
import { isGoogleConfigured } from '../../../../lib/server/auth';
import {
  OAUTH_STATE_COOKIE,
  buildAuthUrl,
  getRedirectUri,
} from '../../../../lib/server/oauth-google';

export const prerender = false;

/** Pornește fluxul Google: setează `state` (CSRF) și redirecționează la Google. */
export const GET: APIRoute = ({ cookies, request, redirect }) => {
  if (!isGoogleConfigured()) return redirect('/admin/login?error=google-disabled', 302);

  const state = randomBytes(16).toString('hex');
  cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    path: '/',
    maxAge: 600,
  });

  return redirect(buildAuthUrl(state, getRedirectUri(request.url)), 302);
};
