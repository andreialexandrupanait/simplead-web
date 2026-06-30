-- Rescrieri copy pentru conținutul LIVE din Postgres (/pachete + /portofoliu).
-- Fișierele packages-fallback.ts și content-seed/portfolio/*.md sunt doar fallback/seed;
-- textul afișat pe site vine din DB, deci rulează aceste UPDATE-uri pe baza de date.
--
-- Rulează (în Docker, pe prod sau dev):
--   docker compose -f docker-compose.prod.yml exec db \
--     psql -U simplead -d simplead -f /path/in/container/copy-db-updates.sql
-- sau, mai simplu, pipe direct:
--   cat app/scripts/copy-db-updates.sql | docker compose -f app/docker-compose.prod.yml exec -T db psql -U simplead -d simplead
--
-- Toate UPDATE-urile sunt idempotente (se potrivesc pe textul vechi / slug), deci
-- pot fi rulate de mai multe ori fără efecte secundare.

BEGIN;

-- ─────────────────────────── /pachete (tabel: packages) ───────────────────────────

-- Site de prezentare: em-dash „—" interzis (§4) → „:".
UPDATE packages
   SET description = 'Site nou, croit pe afacerea ta: fie o pagină, fie cincizeci.'
 WHERE slug = 'site-prezentare';

-- Magazin online: em-dash → punct + scoatem antiteza scurtă.
UPDATE packages
   SET description = 'Magazin online care chiar vinde, nu doar arată bine. De la câteva produse la mii.'
 WHERE slug = 'magazin-online';

-- Redesign UX/UI: nota cu em-dash „cârpim — îți recomandăm" → punct.
UPDATE packages
   SET note = 'După un audit al site-ului actual îți spunem prețul exact. Dacă infrastructura e încărcată (zeci de plugin-uri, cod vechi), uneori e mai rapid și mai ieftin să reconstruim decât să cârpim. Îți recomandăm varianta corectă, nu cea mai scumpă.'
 WHERE slug = 'ux-ui-redesign';

-- NOTĂ: „Munca repetitivă preluată de sistem…" și „Validat cu heatmaps" sunt în
-- pricing.ts (static, deja corectate în cod), NU în DB. „Grafică inițială generată
-- cu AI" rămâne (decizie deschisă; e producție, nu mentenanță). Prețurile NU se ating.

-- ─────────────────────────── /portofoliu (tabel: projects) ───────────────────────────

-- Blitzstudio: „memorabilă" + „construită pentru a fi remarcată" = cuvinte goale.
UPDATE projects
   SET summary = 'Identitate vizuală coerentă și ușor de recunoscut.'
 WHERE summary LIKE 'Identitate vizuală completă, coerentă și memorabilă%';

-- Echipamente-medicale.ro: clișeu „transformă vizitatorii în clienți".
UPDATE projects
   SET summary = 'Magazin online clar și rapid, unde oamenii găsesc produsul și cumpără.'
 WHERE summary LIKE 'Magazin online clar și rapid, gândit să transforme%';

-- Materiale de promovare: scos „coerent" repetat.
UPDATE projects
   SET result = 'Materiale de promovare coerente cu brandul, ușor de dus mai departe de client.'
 WHERE result LIKE 'Comunicare vizuală coerentă și recognoscibilă%';

-- FEAA admitere: „Creștere semnificativă" e vag, fără cifră reală. Text neutru,
-- concret, fără număr inventat. [confirmă: cifră reală, ex. „+X% cereri de informații
-- în perioada de admitere" — înlocuiește rândul de mai jos când o ai.]
UPDATE projects
   SET result = 'O prezență de admitere unitară pe print și online, cu mesaje clare pentru candidați.'
 WHERE result LIKE 'Creștere semnificativă a interacțiunilor%';

-- Câmpurile `solution` (afișate pe paginile de detaliu portofoliu): neuromarketing
-- prezentat ca pas de „validare/QA" → reformulat ca fundament (§2 / §A4).
UPDATE projects
   SET solution = 'Logo, sistem vizual și brand guide, plus materialele de promovare, totul gândit simplu, dar fundamentat pe cum se uită oamenii.'
 WHERE solution LIKE 'Logo, sistem vizual și brand guide%validat vizual%';

UPDATE projects
   SET solution = 'Am proiectat un set de materiale (broșuri, flyere, social media) pornind de la sistemul vizual al brandului și de la ierarhia vizuală (unde se uită oamenii).'
 WHERE solution LIKE 'Am proiectat un set de materiale%validat cu principii de ierarhie%';

UPDATE projects
   SET solution = 'Am construit o strategie pe obiective clare, am produs creații pornite de la cum decid oamenii (neuromarketing) și am rulat campanii Meta & Google Ads, optimizate săptămânal pe baza datelor.'
 WHERE solution LIKE 'Am construit o strategie pe obiective clare, am produs creații validate%';

-- ── Repoziționare „doar grafică, nu rulăm campanii" (proiectul FEAA rămâne neatins) ──
-- Producție video: scoatem „campanii plătite" din rezultat.
UPDATE projects
   SET result = 'Material video profesionist, potrivit pentru promovare și social media.'
 WHERE result LIKE 'Material video profesionist, potrivit pentru campanii plătite%';

-- Materiale de promovare: bullet din body „pentru campanie" → „pentru promovare".
UPDATE projects
   SET body = REPLACE(body, 'Concept vizual pentru campanie', 'Concept vizual unitar pentru promovare')
 WHERE body LIKE '%Concept vizual pentru campanie%';

COMMIT;

-- Verificare rapidă după rulare:
--   SELECT slug, description, note FROM packages WHERE slug IN ('site-prezentare','magazin-online','ux-ui-redesign');
--   SELECT slug, summary, result, solution FROM projects ORDER BY sort;
