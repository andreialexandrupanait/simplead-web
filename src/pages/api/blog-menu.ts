import type { APIRoute } from 'astro';
import { getPublishedPosts, getActiveCategories } from '@lib/server/content';
import { slugify } from '@lib/slug';

// Conținutul mega-meniului Blog din navbar. Luat client-side (site predominant
// static → randarea în Navbar ar îngheța la build). Cache scurt + on-demand.
export const prerender = false;

export const GET: APIRoute = async () => {
  const [posts, categories] = await Promise.all([getPublishedPosts(), getActiveCategories()]);

  const body = {
    categories: categories.map((label) => ({ label, slug: slugify(label) })),
    posts: posts.slice(0, 4).map((p) => ({
      title: p.title,
      slug: p.slug,
      cover: p.cover ?? '',
      category: p.category || '',
      date: (p.publishedAt ?? p.createdAt).toLocaleDateString('ro-RO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    })),
  };

  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60',
    },
  });
};
