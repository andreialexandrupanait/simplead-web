/** Paginare de blog stil WordPress: pagina 1 la basePath, restul la basePath/page/N.
 *  Un singur loc pentru matematica de paginare + schema listă (AEO/GEO). */
import type { Post } from '@lib/server/content';
import { breadcrumbLd, type Crumb } from '@/lib/seo-schema';

export const BLOG_PAGE_SIZE = 9;

/** Împarte articolele în pagini. `featured=true` scoate primul articol din grilă
 *  (e afișat ca „featured" doar pe pagina 1, ca pe /blog). */
export function paginatePosts(items: Post[], page: number, featured = false) {
  const rest = featured ? items.slice(1) : items;
  const totalPages = Math.max(1, Math.ceil(rest.length / BLOG_PAGE_SIZE));
  const safePage = Math.min(Math.max(1, Math.trunc(page) || 1), totalPages);
  const pageItems = rest.slice((safePage - 1) * BLOG_PAGE_SIZE, safePage * BLOG_PAGE_SIZE);
  return { rest, totalPages, safePage, pageItems };
}

/** Link paginare: pagina 1 = basePath, restul = basePath/page/N. */
export function blogPageHref(basePath: string, n: number) {
  return n <= 1 ? basePath : `${basePath}/page/${n}`;
}

/** JSON-LD CollectionPage + ItemList cu articolele vizibile (AEO/GEO).
 *  Cu `crumbs`, întoarce și BreadcrumbList (BaseLayout acceptă array la `schema`). */
export function blogListSchema(opts: {
  name: string;
  description?: string;
  url: string;
  origin: string;
  posts: { slug: string; title: string }[];
  startPosition?: number;
  crumbs?: Crumb[];
}) {
  const start = opts.startPosition ?? 1;
  const collection = {
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: { '@type': 'WebSite', url: opts.origin },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: opts.posts.map((p, i) => ({
        '@type': 'ListItem',
        position: start + i,
        url: `${opts.origin}/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };
  return opts.crumbs ? [collection, breadcrumbLd(opts.origin, opts.crumbs)] : collection;
}
