import { defineMiddleware } from 'astro:middleware';
import type { APIContext, MiddlewareNext } from 'astro';
import { getAuth } from './lib/auth';
import { isStaffUser, type SessionUser } from './lib/server/authz';
import { getPublicSettings } from './lib/server/public-settings';
import { getPublishedPosts } from './lib/server/content';
import { resolveLegacyRedirect } from './data/legacy-redirects';
import { PAGE_PATHS, normalizePath } from './data/sections';
import { hasV2, v2Path, stripV2 } from './data/ab-pages';
import {
  AB_COOKIE,
  AB_FORCE_COOKIE,
  readVariant,
  setVariantCookie,
  assignVariant,
  isBot,
  recordExposure,
  type Variant,
} from './lib/server/ab';

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

function harden(context: APIContext, response: Response): Response {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    if (!response.headers.has(k)) response.headers.set(k, v);
  }
  response.headers.set('Content-Security-Policy', CSP);
  // Pe rutele din testul A/B, aceeași adresă poate servi două HTML-uri (după cookie).
  // Marcăm răspunsul „privat, necache-uibil" ca niciun intermediar să nu servească
  // o variantă B din cache sub URL-ul comun.
  if (context.locals.abVariant) {
    const vary = response.headers.get('Vary');
    response.headers.set('Vary', vary ? `${vary}, Cookie` : 'Cookie');
    response.headers.set('Cache-Control', 'private, no-cache');
  }
  return response;
}

export const onRequest = defineMiddleware(async (context, next) => {
  return harden(context, await route(context, next));
});

async function route(context: APIContext, next: MiddlewareNext): Promise<Response> {
  const { pathname } = context.url;

  // Arborele v2 (redesign) e INTERN: se ajunge la el doar prin rewrite-ul de mai
  // jos, care setează `locals.__abRewrite` (locals persistă peste rewrite). Un hit
  // extern direct pe /v2/* → 301 la calea curată, ca /v2 să nu fie niciodată indexabil.
  if (pathname.startsWith('/v2')) {
    if (context.locals.__abRewrite) return next();
    return context.redirect(stripV2(pathname) + context.url.search, 301);
  }

  // Canonicalizare de host + URL vechi, într-un singur 301 (evită lanțuri):
  //   1. www.simplead.ro → simplead.ro  (site-ul răspunde pe ambele hosturi prin
  //      nginx-proxy; fără asta fiecare pagină www e „Canonicalised"/duplicat în
  //      ochii Google — 134 de pagini în auditul Screaming Frog).
  //   2. URL-uri WordPress vechi (articole la rădăcină, categorii, arhive, feed)
  //      → noua structură (altfel 404).
  //   3. Trailing slash `/x/` → `/x` (o singură variantă indexabilă).
  // Doar pe GET public non-asset: sunt linkuri indexate/backlink-uri.
  const isAssetPath = /\.[^/]+$/.test(pathname);
  if (
    context.request.method === 'GET' &&
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/api') &&
    !isAssetPath
  ) {
    const host = context.url.hostname;
    const wwwRedirect = host.startsWith('www.');

    const slugSet = new Set((await getPublishedPosts()).map((p) => p.slug));
    let finalPath = resolveLegacyRedirect(pathname, slugSet);
    if (!finalPath && pathname.length > 1 && pathname.endsWith('/')) {
      finalPath = pathname.replace(/\/+$/, '');
    }

    // Host swap (www) → URL absolut către non-www (păstrează path-ul rezolvat).
    if (wwwRedirect) {
      const url = new URL(context.url);
      url.hostname = host.slice(4);
      if (finalPath) url.pathname = finalPath;
      return context.redirect(url.toString(), 301);
    }
    // Doar schimbare de path → redirect relativ (păstrează query-ul).
    if (finalPath && finalPath !== pathname) {
      return context.redirect(finalPath + context.url.search, 301);
    }
  }

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
  if (!isAdminPath && !pathname.startsWith('/api') && !isGateScreen && !isAssetPath) {
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

    // ---- Test A/B redesign: atribuire variantă + rewrite intern către /v2 ----
    // Varianta A = site-ul actual (neatins). Varianta B = redesign din src/pages/v2.
    // Cât timp testul e OPRIT (și nimeni nu forțează manual), NU atingem nimic:
    // fără cookie, fără headere, fără expunere — live-ul rămâne identic.
    // Boții și adminii sunt EXCLUȘI din eșantion (control A); adminii pot forța
    // manual varianta cu `?v=a` / `?v=b` (persistă peste kill-switch).
    const forceParam = context.url.searchParams.get('v');
    const forceCookie = readVariant(context.cookies, AB_FORCE_COOKIE);
    const abActive =
      pub.abTestEnabled || forceParam === 'a' || forceParam === 'b' || forceCookie != null;

    if (abActive) {
      const bot = isBot(context.request.headers.get('user-agent') ?? '');
      let variant: Variant;

      if (!bot && (forceParam === 'a' || forceParam === 'b')) {
        // Override QA `?v=` — setează ambele cookie-uri (sticky + forțare).
        variant = forceParam;
        setVariantCookie(context.cookies, AB_COOKIE, variant);
        setVariantCookie(context.cookies, AB_FORCE_COOKIE, variant);
      } else if (!bot && forceCookie) {
        variant = forceCookie; // preview forțat persistă peste kill-switch
      } else if (bot || context.locals.isAdmin) {
        variant = 'a'; // control: boți + admin fără forțare (excluși din eșantion)
      } else {
        const existing = readVariant(context.cookies);
        if (existing) {
          variant = existing;
        } else if (pub.abTestEnabled) {
          variant = assignVariant();
          setVariantCookie(context.cookies, AB_COOKIE, variant); // sticky
        } else {
          variant = 'a';
        }
        // Expunere: o dată per vizitator, la PRIMA pagină care CHIAR are v2 —
        // cine aterizează pe o pagină fără v2 nu „vede" testul și nu intră în
        // eșantion până nu ajunge pe o pagină din test (altfel diluează statistica).
        if (pub.abTestEnabled && hasV2(norm) && context.cookies.get('sa_ab_exp')?.value !== '1') {
          recordExposure(variant, norm);
          context.cookies.set('sa_ab_exp', '1', {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: import.meta.env.PROD,
            maxAge: 60 * 60 * 24 * 90,
          });
        }
      }
      context.locals.abVariant = variant;

      const forceB = forceParam === 'b' || forceCookie === 'b';
      if (variant === 'b' && (pub.abTestEnabled || forceB) && hasV2(norm)) {
        context.locals.__abRewrite = true;
        return context.rewrite(v2Path(norm));
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
