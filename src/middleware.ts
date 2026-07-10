import { defineMiddleware } from 'astro:middleware';
import type { APIContext, MiddlewareNext } from 'astro';
import { getAuth } from './lib/auth';
import { isStaffUser, type SessionUser } from './lib/server/authz';
import { getPublicSettings } from './lib/server/public-settings';
import { PAGE_PATHS, normalizePath } from './data/sections';

/**
 * Protejează /admin/* și /api/admin/* cu sesiunea Better Auth (în DB, revocabilă).
 * Toate paginile admin sunt `prerender = false`, deci middleware-ul rulează doar
 * la cerere pentru ele; pentru restul site-ului (static) trece direct mai departe.
 *
 * `locals.user` + `locals.isAdmin` (staff) se calculează pentru ORICE rută
 * on-demand, ca paginile publice din DB (blog/portofoliu) să poată arăta
 * draft-uri adminului logat la `?preview=1`. Sesiunea e ieftină (cookieCache).
 */
/**
 * Headere de securitate pe toate răspunsurile. CSP-ul e intenționat permisiv la
 * SURSE (https:) ca să nu blocheze GTM (care încarcă tag-uri arbitrare), pixelii
 * Meta/TikTok, Stripe, Unsplash sau fonturile — dar blochează framing-ul
 * (clickjacking), injectarea de <base>/<object> și forțează HTTPS.
 */
const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  'X-Frame-Options': 'SAMEORIGIN',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "connect-src 'self' https:",
  "frame-src 'self' https:",
  "media-src 'self' https:",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

function harden(response: Response): Response {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    if (!response.headers.has(k)) response.headers.set(k, v);
  }
  response.headers.set('Content-Security-Policy', CSP);
  return response;
}

export const onRequest = defineMiddleware(async (context, next) => {
  return harden(await route(context, next));
});

async function route(context: APIContext, next: MiddlewareNext): Promise<Response> {
  const { pathname } = context.url;

  // Paginile prerandate nu au un request real la build; nu există admin logat.
  if (context.isPrerendered) {
    context.locals.user = null;
    context.locals.isAdmin = false;
    return next();
  }

  let user: SessionUser | null = null;
  try {
    const session = await getAuth().api.getSession({ headers: context.request.headers });
    user = (session?.user as SessionUser | undefined) ?? null;
  } catch (err) {
    console.warn('[middleware] getSession a eșuat:', err);
  }
  context.locals.user = user;
  context.locals.isAdmin = isStaffUser(user);

  const isAdminPath = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');

  // Gate-uri publice: mentenanță pe tot site-ul + „în construcție" per pagină.
  // Vizitatorii văd un ecran dedicat (rewrite, URL-ul rămâne); adminul logat
  // vede conținutul real (cu banner). Nu se aplică pe /admin, /api, ecranele de
  // gate sau fișiere (.xml, .png, robots…). Cache de 60s în getPublicSettings.
  const norm = normalizePath(pathname);
  const isGateScreen = norm === '/in-mentenanta' || norm === '/in-constructie';
  const isAsset = /\.[^/]+$/.test(pathname);
  if (!isAdminPath && !pathname.startsWith('/api') && !isGateScreen && !isAsset) {
    const pub = await getPublicSettings();
    if (pub.maintenanceMode) {
      context.locals.siteMaintenance = true;
      if (!context.locals.isAdmin) {
        return context.rewrite('/in-mentenanta');
      }
    }
    if (PAGE_PATHS.includes(norm) && pub.constructionPages.includes(norm)) {
      context.locals.pageUnderConstruction = true;
      if (!context.locals.isAdmin) {
        return context.rewrite('/in-constructie');
      }
    }
  }

  if (!isAdminPath) return next();

  // Pagini admin accesibile fără sesiune (login + recuperare parolă).
  const isLoginPage = pathname === '/admin/login';
  const isPublicAdmin =
    isLoginPage || pathname === '/admin/recuperare-parola' || pathname === '/admin/reset-parola';

  if (!context.locals.isAdmin && !isPublicAdmin) {
    return context.redirect(`/admin/login?next=${encodeURIComponent(pathname)}`, 302);
  }
  if (context.locals.isAdmin && isLoginPage) {
    return context.redirect('/admin', 302);
  }

  const response = await next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}
