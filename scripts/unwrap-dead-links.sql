-- One-off: dezleagă linkurile externe MOARTE din corpul articolelor (Markdown).
-- „Dezleagă" = `[text](url-mort)` → `text` (păstrează textul, scoate doar linkul).
-- Doar URL-uri confirmate moarte live (404 sau DNS-FAIL, 11 iul 2026); cele
-- blocate la boți (403) sau ambigue (000 cu DNS ok) au fost lăsate intacte.
-- Idempotent.
--
-- Rulare: cat scripts/unwrap-dead-links.sql | docker exec -i <db> psql -U simplead -d simplead

BEGIN;

-- Un pattern per host mort. theschooloflife: doar PDF-ul specific (restul domeniului poate fi viu).
UPDATE posts SET body = regexp_replace(body, '\[([^\]]*)\]\(https?://[^)]*gardenestudio\.com\.br[^)]*\)', '\1', 'g'), updated_at = now() WHERE body ~ 'gardenestudio\.com\.br';
UPDATE posts SET body = regexp_replace(body, '\[([^\]]*)\]\(https?://[^)]*davideperozzi\.com[^)]*\)', '\1', 'g'), updated_at = now() WHERE body ~ 'davideperozzi\.com';
UPDATE posts SET body = regexp_replace(body, '\[([^\]]*)\]\(https?://[^)]*designsbytrey\.com[^)]*\)', '\1', 'g'), updated_at = now() WHERE body ~ 'designsbytrey\.com';
UPDATE posts SET body = regexp_replace(body, '\[([^\]]*)\]\(https?://[^)]*secondlifepod\.com[^)]*\)', '\1', 'g'), updated_at = now() WHERE body ~ 'secondlifepod\.com';
UPDATE posts SET body = regexp_replace(body, '\[([^\]]*)\]\(https?://[^)]*theschooloflife\.com/thebookoflife[^)]*\)', '\1', 'g'), updated_at = now() WHERE body ~ 'theschooloflife\.com/thebookoflife';
UPDATE posts SET body = regexp_replace(body, '\[([^\]]*)\]\(https?://[^)]*create\.adobe\.com[^)]*\)', '\1', 'g'), updated_at = now() WHERE body ~ 'create\.adobe\.com';
UPDATE posts SET body = regexp_replace(body, '\[([^\]]*)\]\(https?://[^)]*madwellnyc\.com[^)]*\)', '\1', 'g'), updated_at = now() WHERE body ~ 'madwellnyc\.com';
UPDATE posts SET body = regexp_replace(body, '\[([^\]]*)\]\(https?://[^)]*marcinkaniewski\.com[^)]*\)', '\1', 'g'), updated_at = now() WHERE body ~ 'marcinkaniewski\.com';

COMMIT;

-- Verificare: niciun URL mort nu trebuie să mai rămână în vreun body.
SELECT count(*) AS remaining_dead
FROM posts
WHERE body ~ 'gardenestudio\.com\.br|davideperozzi\.com|designsbytrey\.com|secondlifepod\.com|theschooloflife\.com/thebookoflife|create\.adobe\.com|madwellnyc\.com|marcinkaniewski\.com';
