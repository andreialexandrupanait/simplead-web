import type { APIRoute } from 'astro';
import { staticRoutes } from '@data/static-routes';
import { getPublishedPosts, getPublishedProjects, getActiveCategories } from '@lib/server/content';
import { slugify } from '@lib/slug';

export const prerender = false;

/**
 * Sitemap compus la cerere: rutele statice (static-routes.ts) + slug-urile
 * publicate din DB, cu <lastmod>. Înlocuiește @astrojs/sitemap, care nu vedea
 * rutele on-demand (blog/portofoliu).
 */
export const GET: APIRoute = async ({ site, url }) => {
  const origin = (site ?? new URL(url.origin)).toString().replace(/\/$/, '');

  const [posts, projects, categories] = await Promise.all([
    getPublishedPosts(),
    getPublishedProjects(),
    getActiveCategories(),
  ]);

  // Slug-uri unice de tag + categorii cu articole → pagini de listare.
  const tagSlugs = [...new Set(posts.flatMap((p) => (p.tags ?? []).map(slugify)))];

  const entries: { loc: string; lastmod?: string }[] = [
    ...staticRoutes.map((path) => ({ loc: `${origin}${path}` })),
    ...posts.map((p) => ({
      loc: `${origin}/blog/${p.slug}`,
      lastmod: p.updatedAt.toISOString(),
    })),
    ...categories.map((c) => ({ loc: `${origin}/blog/category/${slugify(c)}` })),
    ...tagSlugs.map((slug) => ({ loc: `${origin}/blog/tag/${slug}` })),
    ...projects.map((p) => ({
      loc: `${origin}/portofoliu/${p.slug}`,
      lastmod: p.updatedAt.toISOString(),
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
