// Importă conținutul inițial (content-seed/) în Postgres: articolele de blog
// și proiectele de portofoliu trăiesc în DB și se editează din /admin.
// Idempotent (ON CONFLICT DO NOTHING) — rulează la fiecare pornire de container,
// după migrate.mjs. Fără DATABASE_URL iese curat, ca site-ul să poată porni.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import postgres from 'postgres';

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.info('[import-content] DATABASE_URL lipsește: sărim importul.');
  process.exit(0);
}

const SEED_DIR = path.resolve(process.cwd(), 'content-seed');
const sql = postgres(url, { max: 1 });

async function readSeed(kind) {
  const dir = path.join(SEED_DIR, kind);
  let files = [];
  try {
    files = (await readdir(dir)).filter((f) => /\.(md|mdx)$/.test(f));
  } catch {
    return [];
  }
  return Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.(md|mdx)$/, ''), data, body: content.trim() };
    }),
  );
}

try {
  let inserted = 0;

  for (const { slug, data, body } of await readSeed('blog')) {
    const status = data.draft ? 'draft' : 'published';
    const publishedAt = data.draft ? null : new Date(data.pubDate ?? Date.now());
    const rows = await sql`
      INSERT INTO posts (slug, title, description, body, author, tags, cover, status, published_at)
      VALUES (${slug}, ${data.title ?? slug}, ${data.description ?? ''}, ${body},
              ${data.author ?? 'Andrei Panait'}, ${JSON.stringify(data.tags ?? [])}::jsonb,
              ${data.cover ?? null}, ${status}, ${publishedAt})
      ON CONFLICT (slug) DO NOTHING
      RETURNING id`;
    inserted += rows.length;
  }

  for (const { slug, data, body } of await readSeed('portfolio')) {
    const status = data.draft ? 'draft' : 'published';
    const rows = await sql`
      INSERT INTO projects (slug, title, client, service, summary, challenge, solution, result,
                            body, cover, sort, status)
      VALUES (${slug}, ${data.title ?? slug}, ${data.client ?? ''}, ${data.service ?? 'Marketing'},
              ${data.summary ?? ''}, ${data.challenge ?? null}, ${data.solution ?? null},
              ${data.result ?? null}, ${body}, ${data.cover ?? null}, ${data.order ?? 99}, ${status})
      ON CONFLICT (slug) DO NOTHING
      RETURNING id`;
    inserted += rows.length;
  }

  console.info(`[import-content] Gata: ${inserted} intrări noi (restul existau deja).`);
} catch (err) {
  // Best-effort: un import eșuat nu ține site-ul jos; admin-ul poate crea manual.
  console.error('[import-content] Importul a eșuat:', err);
} finally {
  await sql.end();
}
