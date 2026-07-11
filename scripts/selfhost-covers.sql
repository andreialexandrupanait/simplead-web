-- One-off: mută coperele de blog de pe Unsplash (hotlink extern) pe fișiere
-- self-hostate în public/blog-covers/{slug}.webp (1600×800, generate cu imagemagick).
-- Elimină dependența externă + flag-urile Screaming Frog (>100kB / fără dimensiuni).
-- Path-ul derivă din slug, deci un singur UPDATE. Idempotent pentru cele deja mutate.
--
-- Rulare: cat scripts/selfhost-covers.sql | docker exec -i <db> psql -U simplead -d simplead

UPDATE posts
SET cover = '/blog-covers/' || slug || '.webp',
    updated_at = now()
WHERE cover ~ 'images\.unsplash\.com';

-- Verificare: nicio copertă Unsplash rămasă.
SELECT count(*) AS remaining_unsplash FROM posts WHERE cover ~ 'unsplash';
