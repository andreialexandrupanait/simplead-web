// Setează coperți (cover) pe articolele de blog din DB, cu imagini Unsplash
// (hotlink la CDN-ul images.unsplash.com — permis de Unsplash). Idempotent:
// completează doar articolele fără copertă, ca să nu suprascrie alegeri din /admin.
//
// Rulare (env din .env):
//   $env:DATABASE_URL = (Get-Content .env | Where-Object {$_ -match '^DATABASE_URL='}) -replace '^DATABASE_URL=',''
//   node scripts/set-blog-covers.mjs
import postgres from 'postgres';

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error('[covers] DATABASE_URL lipsește.');
  process.exit(1);
}

// slug -> URL Unsplash (ID foto verificat vizual). Param: lățime 1600, calitate 80.
const q = '?w=1600&q=80&auto=format&fit=crop';
const COVERS = {
  'brand-pe-care-clientii-il-tin-minte': `https://images.unsplash.com/photo-1548094990-c16ca90f1f0d${q}`,
  'ce-este-neuromarketingul': `https://images.unsplash.com/photo-1617791160536-598cf32026fb${q}`,
  'greseli-marketing-afaceri-mici': `https://images.unsplash.com/photo-1557838923-2985c318be48${q}`,
  'site-care-vinde': `https://images.unsplash.com/photo-1467232004584-a241de8bcf5d${q}`,
};

const sql = postgres(url, { max: 1 });
try {
  for (const [slug, cover] of Object.entries(COVERS)) {
    const rows = await sql`
      UPDATE posts SET cover = ${cover}, updated_at = now()
      WHERE slug = ${slug} AND (cover IS NULL OR cover = '')
      RETURNING slug`;
    console.log(rows.length ? `✓ ${slug}` : `– ${slug} (negăsit sau are deja copertă)`);
  }
  await sql.end();
  console.log('[covers] Gata.');
} catch (err) {
  console.error('[covers] Eșec:', err);
  process.exit(1);
}
