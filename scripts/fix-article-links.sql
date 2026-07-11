-- One-off: rescrie linkurile interne din corpul articolelor (Markdown) la noua
-- structură, ca să dispară cele 12 „Internal 4xx" din Screaming Frog și hop-urile
-- de redirect. Idempotent: rulat de două ori nu strică nimic.
--
--   1. [text](https?://(www.)?simplead.ro/{slug}/)  -> [text](/blog/{slug})
--   2. typo FEAA (portfoliu + slug vechi)           -> /portofoliu/branding-feaa-galati
--   3. restul linkurilor interne absolute valide    -> relative, fără trailing slash
--      (elimină și singurul link http:// semnalat de SF)
--
-- Rulare:  cat scripts/fix-article-links.sql | docker exec -i <db> psql -U simplead -d simplead

BEGIN;

-- 1. Articole: link absolut către un slug publicat -> /blog/{slug}
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT slug FROM posts WHERE status = 'published' LOOP
    UPDATE posts
    SET body = regexp_replace(
                 body,
                 '\]\(https?://(?:www\.)?simplead\.ro/' || r.slug || '/?\)',
                 '](/blog/' || r.slug || ')',
                 'g'),
        updated_at = now()
    WHERE body ~ ('\]\(https?://(?:www\.)?simplead\.ro/' || r.slug || '/?\)');
  END LOOP;
END $$;

-- 2. Typo FEAA: /portfoliu/identitate-vizuala-feaa-galati/ -> /portofoliu/branding-feaa-galati
UPDATE posts
SET body = regexp_replace(
             body,
             '\]\(https?://(?:www\.)?simplead\.ro/portfoliu/identitate-vizuala-feaa-galati/?\)',
             '](/portofoliu/branding-feaa-galati)',
             'g'),
    updated_at = now()
WHERE body ~ 'portfoliu/identitate-vizuala-feaa-galati';

-- 3. Restul linkurilor interne absolute (pagini valide) -> relative fără trailing slash
UPDATE posts
SET body = regexp_replace(
             body,
             '\]\(https?://(?:www\.)?simplead\.ro(/[^)\s]*?)/?\)',
             '](\1)',
             'g'),
    updated_at = now()
WHERE body ~ '\]\(https?://(?:www\.)?simplead\.ro';

COMMIT;

-- Verificare: nu trebuie să mai rămână niciun link absolut simplead.ro în body.
SELECT count(*) AS remaining_absolute
FROM posts
WHERE body ~ '\]\(https?://(?:www\.)?simplead\.ro';
