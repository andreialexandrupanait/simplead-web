// Populează „Pe scurt" (takeaways) + FAQ pe un articol demo, ca să vedem cum
// arată caseta + acordeonul + schema FAQPage. Idempotent (UPDATE pe slug).
//
// Rulare (env din .env, bash):
//   DATABASE_URL="$(grep -E '^DATABASE_URL=' .env | sed 's/^DATABASE_URL=//' | tr -d '\r')" node scripts/seed-article-extras.mjs
import postgres from 'postgres';

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error('[extras] DATABASE_URL lipsește.');
  process.exit(1);
}

const SLUG = 'ce-este-neuromarketingul';

const takeaways = [
  'Neuromarketingul studiază cum reacționează creierul la mesaje, design și produse — nu ce spun oamenii că le place, ci ce fac de fapt.',
  'Deciziile de cumpărare sunt în mare parte automate și emoționale; rațiunea vine după, ca să le justifice.',
  'Instrumente ca eye-tracking și hărțile termice arată unde se uită oamenii și ce ignoră — date, nu presupuneri.',
  'Nu e manipulare: e să elimini frecarea și să pui mesajul potrivit acolo unde se uită oamenii.',
  'Aplicat la site și branding: mai puțin buget irosit pe ce nu vede nimeni, mai multă atenție pe ce aduce clienți.',
];

const faq = [
  {
    q: 'Neuromarketingul e manipulare?',
    a: 'Nu. Manipularea înseamnă să faci pe cineva să acționeze împotriva interesului lui. Neuromarketingul înseamnă să înțelegi cum decide creierul ca să-i ușurezi alegerea — să pui mesajul clar, să scoți frecarea, să nu-l obosești.\n\nDacă produsul tău e bun, neuromarketingul doar îl face mai ușor de ales.',
  },
  {
    q: 'Am nevoie de echipamente scumpe de laborator?',
    a: 'Pentru o afacere mică, nu. Eye-tracking-ul și EEG-ul sunt pentru cercetare. În practică folosim principiile deja validate (cum se mișcă privirea, cum funcționează contrastul, memoria, emoția) plus instrumente accesibile: hărți termice pe site, teste A/B și analiză de comportament real.\n\nDatele vin din cum se poartă vizitatorii tăi, nu dintr-un laborator.',
  },
  {
    q: 'Cum mă ajută concret la site sau branding?',
    a: 'Te ajută să iei decizii pe date, nu pe gust: unde pui butonul important, ce mesaj vede omul în primele secunde, ce contrast ghidează privirea, ce scoți ca să nu distragi. Rezultatul e mai puțin buget pe elemente decorative pe care nimeni nu le observă și mai multă atenție pe ce te aduce clienți.',
  },
  {
    q: 'Funcționează și pentru afaceri mici?',
    a: 'Mai ales pentru afaceri mici — tu n-ai bugetul să-l irosești pe presupuneri. Neuromarketingul îți spune unde să pui efortul ca fiecare leu investit în site, grafică sau reclamă să lucreze mai tare. Așa concurezi de la egal la egal cu firme mult mai mari.',
  },
  {
    q: 'De unde încep, fără să investesc nimic acum?',
    a: 'Cu testul celor 5 secunde: arată homepage-ul cuiva care nu-ți cunoaște afacerea, timp de 5 secunde, apoi întreabă-l ce vinzi și ce ar trebui să facă pe pagină. Dacă ezită, ai o problemă de claritate, nu de estetică. E gratis și îți arată exact unde pierzi oameni.',
  },
];

const sql = postgres(url, { max: 1 });
try {
  const rows = await sql`
    UPDATE posts
    SET takeaways = ${sql.json(takeaways)}, faq = ${sql.json(faq)}, updated_at = now()
    WHERE slug = ${SLUG}
    RETURNING slug`;
  console.log(
    rows.length
      ? `✓ ${SLUG} (${takeaways.length} takeaways, ${faq.length} FAQ)`
      : `– ${SLUG} negăsit`,
  );
  await sql.end();
} catch (err) {
  console.error('[extras] Eșec:', err);
  process.exit(1);
}
