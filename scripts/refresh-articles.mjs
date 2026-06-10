// One-off: sincronizează articolele din content-seed/blog cu DB-ul.
//   - fișierele cu draft:false  → UPDATE pe slug (suprascrie conținutul!)
//   - fișierele cu draft:true   → INSERT dacă nu există (nu atinge existentele)
// NU rulează la pornirea containerului (ar călca peste editările din admin);
// se rulează manual, o dată: docker exec simplead_web node scripts/refresh-articles.mjs
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import postgres from 'postgres';

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error('[refresh-articles] DATABASE_URL lipsește.');
  process.exit(1);
}

const dir = path.resolve(process.cwd(), 'content-seed/blog');
const sql = postgres(url, { max: 1 });

try {
  const files = (await readdir(dir)).filter((f) => /\.(md|mdx)$/.test(f));
  let updated = 0;
  let inserted = 0;

  for (const file of files) {
    const raw = await readFile(path.join(dir, file), 'utf8');
    const { data, content } = matter(raw);
    const slug = file.replace(/\.(md|mdx)$/, '');
    const body = content.trim();
    const tags = JSON.stringify(data.tags ?? []);

    if (data.draft) {
      const rows = await sql`
        INSERT INTO posts (slug, title, description, body, author, tags, cover, status, published_at)
        VALUES (${slug}, ${data.title ?? slug}, ${data.description ?? ''}, ${body},
                ${data.author ?? 'Andrei Panait'}, ${tags}::jsonb, ${data.cover ?? null},
                'draft', NULL)
        ON CONFLICT (slug) DO NOTHING
        RETURNING id`;
      inserted += rows.length;
    } else {
      const rows = await sql`
        UPDATE posts
        SET title = ${data.title ?? slug},
            description = ${data.description ?? ''},
            body = ${body},
            tags = ${tags}::jsonb,
            updated_at = now()
        WHERE slug = ${slug}
        RETURNING id`;
      updated += rows.length;
    }
  }

  console.info(`[refresh-articles] Gata: ${updated} actualizate, ${inserted} inserate ca draft.`);
} finally {
  await sql.end();
}
