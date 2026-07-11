import type { AstroCookies } from 'astro';

/**
 * Tema admin (light/dark). Persistată într-un cookie citit server-side de
 * AdminLayout ca să ștanțeze `data-theme` pe <html> încă din primul byte
 * (zero flash). NU e httpOnly: toggle-ul enhanced îl scrie și din client.
 */

const THEME_COOKIE = 'sa_theme';

export type Theme = 'light' | 'dark';

export function readTheme(cookies: AstroCookies): Theme {
  return cookies.get(THEME_COOKIE)?.value === 'dark' ? 'dark' : 'light';
}

export function setTheme(cookies: AstroCookies, theme: Theme): void {
  cookies.set(THEME_COOKIE, theme, {
    path: '/admin',
    httpOnly: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });
}
