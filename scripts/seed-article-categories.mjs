// Atribuie o categorie celor 4 articole existente, ca filtrul de pe /blog să
// aibă conținut. Idempotent. Rulează DUPĂ db:migrate (coloana `category`).
//
//   DATABASE_URL="$(grep -E '^DATABASE_URL=' .env | sed 's/^DATABASE_URL=//' | tr -d '\r')" node scripts/seed-article-categories.mjs
import postgres from 'postgres';

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error('[cat] DATABASE_URL lipsește.');
  process.exit(1);
}

const CATEGORIES = {
  'ce-este-neuromarketingul': 'Neuromarketing',
  'brand-pe-care-clientii-il-tin-minte': 'Branding',
  'greseli-marketing-afaceri-mici': 'Marketing digital',
  'site-care-vinde': 'Web & UX',
};

const sql = postgres(url, { max: 1 });
try {
  for (const [slug, category] of Object.entries(CATEGORIES)) {
    const rows = await sql`
      UPDATE posts SET category = ${category}, updated_at = now()
      WHERE slug = ${slug}
      RETURNING slug`;
    console.log(rows.length ? `✓ ${slug} → ${category}` : `– ${slug} negăsit`);
  }
  await sql.end();
  console.log('[cat] Gata.');
} catch (err) {
  console.error('[cat] Eșec:', err);
  process.exit(1);
}
