import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { site } from '@data/site';
import { getPublishedPosts } from '@lib/server/content';

export const prerender = false;

export const GET: APIRoute = async ({ site: configSite, url }) => {
  const origin = (configSite ?? new URL(url.origin)).toString().replace(/\/$/, '');
  const posts = await getPublishedPosts();

  return rss({
    title: `${site.name} — Blog`,
    description:
      'Idei și ghiduri din lumea marketingului: branding, neuromarketing și web design.',
    site: origin,
    items: posts.map((p) => ({
      title: p.title,
      description: p.description,
      link: `/blog/${p.slug}`,
      pubDate: p.publishedAt ?? p.createdAt,
    })),
    customData: '<language>ro-ro</language>',
  });
};
