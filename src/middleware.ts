import { defineMiddleware } from 'astro:middleware';
import { SESSION_COOKIE, verifySessionToken } from './lib/server/auth';
import { getPublicSettings } from './lib/server/public-settings';
import { PAGE_PATHS, normalizePath } from './data/sections';

/**
 * Protejează /admin/* și /api/admin/*. Toate paginile admin sunt
 * `prerender = false`, deci middleware-ul rulează doar la cerere pentru ele;
 * pentru restul site-ului (static) trece direct mai departe.
 *
 * `locals.isAdmin` se calculează pentru ORICE rută on-demand (un HMAC ieftin),
 * ca paginile publice din DB (blog/portofoliu) să poată arăta draft-uri
 * adminului logat la `?preview=1`.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Paginile prerandate nu au un request real la build: a le citi cookie-urile
  // (`context.cookies` → `request.headers`) declanșează avertismentul Astro
  // „Astro.request.headers was used” și n-ar avea sens. Nu există admin logat
  // într-o pagină statică, deci isAdmin = false și trecem mai departe.
  if (context.isPrerendered) {
    context.locals.isAdmin = false;
    return next();
  }

  const isAdminPath = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');

  const token = context.cookies.get(SESSION_COOKIE)?.value;
  context.locals.isAdmin = verifySessionToken(token);

  // „În construcție": pe paginile marcate din /admin/setari, vizitatorii văd un
  // ecran dedicat (rewrite, URL-ul rămâne), iar adminul logat vede pagina reală.
  // Citim setările doar când calea e una togglabilă (evităm un read DB inutil).
  if (!isAdminPath && PAGE_PATHS.includes(normalizePath(pathname))) {
    const { constructionPages } = await getPublicSettings();
    if (constructionPages.includes(normalizePath(pathname))) {
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
});
