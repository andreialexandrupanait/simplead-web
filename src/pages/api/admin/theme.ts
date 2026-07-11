import type { APIRoute } from 'astro';
import { readTheme, setTheme, type Theme } from '../../../lib/server/theme';

export const prerender = false;

/**
 * Comută tema admin (baseline fără JS): flip cookie + redirect 303 la referer.
 * Forma opțională `theme=light|dark` din body setează explicit o temă anume.
 */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  let next: Theme;
  try {
    const form = await request.formData();
    const wanted = form.get('theme');
    next = wanted === 'light' || wanted === 'dark' ? wanted : readTheme(cookies) === 'dark' ? 'light' : 'dark';
  } catch {
    next = readTheme(cookies) === 'dark' ? 'light' : 'dark';
  }
  setTheme(cookies, next);

  const referer = request.headers.get('referer');
  const back = referer && referer.includes('/admin') ? referer : '/admin';
  return redirect(back, 303);
};
