import { defineMiddleware } from 'astro:middleware';
import { SESSION_COOKIE, verifySessionToken } from './lib/server/auth';

/**
 * Protejează /admin/* și /api/admin/*. Toate paginile admin sunt
 * `prerender = false`, deci middleware-ul rulează doar la cerere pentru ele;
 * pentru restul site-ului (static) trece direct mai departe.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isAdminPath = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  context.locals.isAdmin = false;

  if (!isAdminPath) return next();

  const token = context.cookies.get(SESSION_COOKIE)?.value;
  context.locals.isAdmin = verifySessionToken(token);

  const isLoginPage = pathname === '/admin/login';
  if (!context.locals.isAdmin && !isLoginPage) {
    return context.redirect(`/admin/login?next=${encodeURIComponent(pathname)}`, 302);
  }
  if (context.locals.isAdmin && isLoginPage) {
    return context.redirect('/admin', 302);
  }

  const response = await next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
});
