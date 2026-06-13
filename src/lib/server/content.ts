import { and, asc, desc, eq } from 'drizzle-orm';
import { getDb } from './db';
import { posts, projects } from './schema';

/**
 * Acces la conținutul editorial din DB (articole + proiecte de portofoliu),
 * cu cache in-memory scurt (același model ca settings.ts): paginile publice
 * sunt on-demand, dar nu lovesc Postgres la fiecare request. Orice scriere din
 * admin cheamă `bustContentCache()` ca publicarea să fie instant.
 *
 * Fără DATABASE_URL (sau cu DB căzut) funcțiile nu aruncă niciodată: listele
 * sunt goale, slug-urile întorc null (pagina publică face 404 / empty state).
 */

export type Post = typeof posts.$inferSelect;
export type Project = typeof projects.$inferSelect;

const TTL_MS = 60_000;
const cache = new Map<string, { value: unknown; expires: number }>();

async function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.value as T;
  const value = await load();
  cache.set(key, { value, expires: Date.now() + TTL_MS });
  return value;
}

export function bustContentCache(): void {
  cache.clear();
}

async function safeQuery<T>(label: string, fallback: T, run: () => Promise<T>): Promise<T> {
  const db = getDb();
  if (!db) return fallback;
  try {
    return await run();
  } catch (err) {
    console.error(`[content] ${label} a eșuat:`, err);
    return fallback;
  }
}

export function getPublishedPosts(): Promise<Post[]> {
  return cached('posts:published', () =>
    safeQuery('listarea articolelor', [] as Post[], async () => {
      const db = getDb()!;
      return db
        .select()
        .from(posts)
        .where(eq(posts.status, 'published'))
        .orderBy(desc(posts.publishedAt));
    }),
  );
}

/** Categoriile (din lista fixă) care au cel puțin un articol publicat. */
export async function getActiveCategories(): Promise<string[]> {
  const { postCategories } = await import('@data/categories');
  const all = await getPublishedPosts();
  const used = new Set(all.map((p) => p.category).filter(Boolean));
  return postCategories.filter((c) => used.has(c));
}

/** Tag-uri distincte din articolele publicate, ordonate după frecvență. */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const all = await getPublishedPosts();
  const counts = new Map<string, number>();
  for (const p of all) for (const t of p.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'ro'));
}

export function getPostBySlug(slug: string, { includeDrafts = false } = {}): Promise<Post | null> {
  return cached(`post:${slug}:${includeDrafts}`, () =>
    safeQuery('citirea articolului', null as Post | null, async () => {
      const db = getDb()!;
      const where = includeDrafts
        ? eq(posts.slug, slug)
        : and(eq(posts.slug, slug), eq(posts.status, 'published'));
      const rows = await db.select().from(posts).where(where).limit(1);
      return rows[0] ?? null;
    }),
  );
}

export function getPublishedProjects(): Promise<Project[]> {
  return cached('projects:published', () =>
    safeQuery('listarea proiectelor', [] as Project[], async () => {
      const db = getDb()!;
      return db
        .select()
        .from(projects)
        .where(eq(projects.status, 'published'))
        .orderBy(asc(projects.sort), desc(projects.createdAt));
    }),
  );
}

export function getProjectBySlug(
  slug: string,
  { includeDrafts = false } = {},
): Promise<Project | null> {
  return cached(`project:${slug}:${includeDrafts}`, () =>
    safeQuery('citirea proiectului', null as Project | null, async () => {
      const db = getDb()!;
      const where = includeDrafts
        ? eq(projects.slug, slug)
        : and(eq(projects.slug, slug), eq(projects.status, 'published'));
      const rows = await db.select().from(projects).where(where).limit(1);
      return rows[0] ?? null;
    }),
  );
}
