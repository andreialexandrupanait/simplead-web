# Scripturi

## Rulare recurentă (parte din ciclul de viață al aplicației)

| Script | Când rulează | Ce face |
|---|---|---|
| `migrate.mjs` | automat, la pornirea containerului (CMD în Dockerfile) | aplică migrațiile drizzle din `drizzle/` |
| `import-content.mjs` | automat, după migrate | importă idempotent seed-ul markdown din `content-seed/` (blog + portofoliu) — doar rândurile lipsă |
| `seed.mjs` | automat, în `deploy.sh` după health check | sincronizează catalogul de pachete din cod (UPSERT pe slug — suprascrie editările din /admin pe pachete!) |
| `gen-secrets.mjs` | manual (`pnpm gen:key`) | generează secrete (APP_ENCRYPTION_KEY etc.) |

## Provisioning GTM (rulare la nevoie)

| Script | Ce face |
|---|---|
| `gtm-provision.mjs` | creează/actualizează tag-urile din containerul GTM (motorul unic de tracking) pe baza definițiilor din cod; cere `GTM_*` + `GOOGLE_SA_KEY` în `.env` |
| `gtm-rebuild.mjs` | reconstruiește workspace-ul GTM de la zero (distructiv pe workspace-ul Default) |

## One-shot ISTORICE (migrarea din WordPress, iul 2026 — NU rulați din nou)

Păstrate ca referință a procesului; rularea repetată poate strica conținutul actual.

| Script | Ce a făcut (o singură dată) |
|---|---|
| `import-wp-articles.mjs` | importul inițial al articolelor din WordPress |
| `refresh-articles.mjs`, `seed-article-categories.mjs`, `seed-article-extras.mjs`, `set-blog-covers.mjs` | normalizări post-import (categorii, extras, coperți) |
| `fix-article-links.sql`, `unwrap-dead-links.sql`, `selfhost-covers.sql`, `copy-db-updates.sql` | corecții SQL ad-hoc pe conținut (linkuri interne, coperți self-hosted, sync dev↔prod) |
