import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * robots.txt ca rută on-demand, nu ca fișier în `public/`.
 *
 * Motivul: aplicația răspunde pe două hosturi cu politici opuse — `simplead.ro`
 * vrea să fie indexat, `client.simplead.ro` nu. Un fișier static din `public/`
 * e servit de adaptorul Node ÎNAINTE de middleware, deci ar livra robots-ul
 * site-ului pe ambele hosturi. Ca rută, trece prin middleware, iar hostul de
 * preview e interceptat acolo (vezi src/lib/server/preview-host.ts) și primește
 * propriul `Disallow: /`.
 */
const SITE_ROBOTS = `User-agent: *
Allow: /
Allow: /api/og/
Disallow: /admin
Disallow: /api/
Disallow: /v2

Sitemap: https://simplead.ro/sitemap.xml
`;

export const GET: APIRoute = () =>
  new Response(SITE_ROBOTS, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
