# Roadmap — „definitiv în producție" · simplead.ro

> Roadmap-ul final până la finalizarea completă în producție. Evidența (findings + `fișier:linie`) e în [`AUDIT.md`](./AUDIT.md).
> Site-ul e deja LIVE; fazele de mai jos aduc totul la stadiul „complet, corect, sigur".
> Legendă: 🔴 blocant · 🟠 important · 🟢 minor · 👤 necesită inputul tău (Andrei) · 🤖 tehnic (Claude).
>
> Context/decizii de bază (deja implementate): Plăți Stripe · Facturare SmartBill (+ e-Factura) · Email Postmark · Admin pentru Andrei (fără portal clienți) · Hosting self-hosted Docker + nginx-proxy · Chei integrări din `/admin/integrari` (AES-256-GCM). Regulile de copy: `docs/brand-voice.md` (lege).

---

## FAZA 0 — Blocante „go-live definitiv"

### 👤 De la tine (fără astea nu putem închide)
- [ ] 🔴 **Date firmă** în `src/data/site.ts`: formă juridică + denumire legală completă (ex. „Simplead SRL"/„… PFA"), adresa completă a sediului, program, linkuri social (sau confirmă „fără social").
- [ ] 🔴 **Pagini legale** — dă-mi datele ca să elimin `[confirmă:…]` din `src/pages/confidentialitate.astro:26` și `src/pages/termeni.astro:31`.
- [x] ~~Confirmă integrările~~ **Verificat pe prod (11 iul)**: Stripe ✓ (`secret_key`+`webhook_secret` în DB), Postmark ✓ (`server_token`+`from_email` — emailurile pleacă), Google login ✓.
- [ ] 🔴 **SmartBill incomplet**: are `cif`/`email`/`token`, dar **lipsește `series` (seria de facturi)** + `taxName`/`taxPercent` → facturarea automată nu poate emite. Completează în `/admin/integrari`.
- [x] ~~Confirmă migrarea `0015`~~ **Verificat pe prod (11 iul)**: `ab_exposure` + `leads.variant`/`orders.variant` există — A/B deblocat tehnic.
- [ ] 🟢 Poză reală Gabriel (`src/pages/despre.astro`) + confirmă cifrele „TODO" din `src/data/content.ts`.

### 🤖 Tehnic
- [x] **Backup DB automat** (11 iul): `backup-db.sh` + cron 03:17 (`/etc/cron.d/simplead-db-backup`), retenție 7 zilnice/5 săptămânale, **restore testat**; documentat în README. Rămâne: copie off-site (S3/NAS/rclone) — necesită destinație de la tine.
- [x] **Teste verzi 71/71** (11 iul): fix fake-timers vitest 4 pe rate-limit; test contact aliniat la decizia „mesaj opțional".
- [x] **Curățenie** (11 iul): `RESEND_API_KEY` scos din `.env`; configs legacy `docker-compose.prod.yml`/`Dockerfile.prod` șterse; `.env` → `600`.

---

## FAZA 1 — SEO complet funcțional ✅ (implementată 11 iul)

- [x] `robots.txt`: `Allow: /api/og/` + `Disallow: /v2`.
- [x] `/pachete`: `Product`/`Offer` per pachet cu preț fix (moneda reală din DB) + `BreadcrumbList` + `FAQPage`.
- [x] `BreadcrumbList` pe: `servicii/[slug]`, `portofoliu/[slug]` (+ `datePublished`/`dateModified`), `servicii/index`, `portofoliu/index` (+ `ItemList` pe ambele), toate listările blog/tag/categorie.
- [x] `FAQPage` pe `servicii/[slug]` (unde există FAQ) și `pachete`.
- [x] OG dinamic non-blog: endpoint extins (registru pagini + servicii + suport + proiecte); `ogImage` pe pachete/servicii/portofoliu/despre/contact/mentenanta/FAQ; **imaginea implicită a site-ului e acum generată** (`/api/og/_default.png`, 1200×630 — vechiul `og-default.png` era JPEG 909×540 cu extensie greșită).
- [x] `BaseLayout`: `SearchAction` (→ `/blog?q=`), `taxID`+`identifier` (CIF/RegCom), `legalName`, `og:image:width/height`.
- [x] `rss.xml`: `content:encoded` full-text (HTML sanitizat).
- Constructori reutilizabili: `src/lib/seo-schema.ts` (breadcrumb/FAQ/ItemList/Product).
- **Decizie: `Review`/`AggregateRating` NU se emit** — testimonialele găzduite pe propriul site sunt „self-serving reviews" (împotriva politicii Google pentru rich results; risc de ignorare/penalizare). Se poate revizita cu recenzii dintr-o sursă terță (Google Business Profile).
- Rămâne (depinde de datele tale din Faza 0): `streetAddress`/`geo`/`sameAs`/`openingHours` reale în LocalBusiness.

**Verificare rămasă (după deploy):** Google Rich Results Test pe `/pachete`, `/servicii/[slug]`, `/blog/[slug]`; card Twitter cu imagine.

---

## FAZA 2 — Fiabilitate & securitate

- [ ] 🟠 **Webhook Stripe**: la eroare în pași critici (post-plată) → răspunde non-200 ca Stripe să reia, SAU tabel `processed_events`/dead-letter + job de reconciliere din admin; alertă pe „comandă plătită fără factură". (`api/stripe/webhook.ts`)
- [ ] 🟠 **Observabilitate**: logging structurat + Sentry (sau echivalent) pe API-uri publice și webhook; înlocuiește `console.*` de pe căile critice.
- [ ] 🟠 **Rate-limit** pe `api/contact.ts` și `api/checkout.ts` (refolosesc `lib/server/rate-limit.ts`, ca la `ticket`/`newsletter`).
- [ ] 🟠 **Authz per-capabilitate** pe `api/admin/{theme,preview,uploads}` (`can(...)`, nu doar gate „staff").
- [ ] 🟠 **Consimțământ vs CAPI**: nu trimite `generate_lead`/`sign_up` la Meta/GA4 MP fără categoria marketing acceptată (aliniere cu bannerul de cookies). `purchase` rămâne.
- [ ] 🟢 Hardening: nonce CSP pe scripturile proprii (păstrez `https:` pt GTM); unific sursa CSP (middleware ↔ `maintenance/*.conf`); `.env` → `600`; HSTS+Permissions-Policy și pe static; HSTS `preload`.

**Verificare:** test de rate-limit pe contact/checkout; simulare eroare webhook → comanda intră în reprocesare; headere securitate pe HTML + static (securityheaders.com).

---

## FAZA 3 — Finalizare v2 & activare A/B (decizia ta: DA)

- [ ] 🟠 **Chrome consecvent**: creez v2 pentru destinațiile linkate din v2 fără echivalent — minim `/portofoliu` (+ `/portofoliu/[slug]`) și `/suport` (NavbarV2/FooterV2/`global-v2.css`/Figtree). Alternativ: restrâng `V2_EXACT` (`src/data/ab-pages.ts`) la un subset care nu trimite spre pagini fără v2.
- [ ] 🟢 **Semnificație statistică** în `src/pages/admin/experiment.astro`: interval de încredere / prag de decizie (nu doar uplift brut).
- [ ] 🟢 `recordExposure` per-pagină-cu-v2 (nu per-vizitator) ca să nu dilueze eșantionul; confirm `Vary: Cookie` pe rutele din test.
- [ ] ✅ **Checklist de activare** (din `/admin/setari` → Test A/B):
  - migrarea `0015` pe prod ✓
  - toate căile din `ab-pages.ts` rezolvă `hasV2` ✓
  - QA `?v=a` / `?v=b` pe fiecare pagină publică, zero discontinuitate de chrome
  - apoi toggle `abTestEnabled=true`

**Verificare:** parcurgere manuală variantă B pe tot funnel-ul public (home → servicii → pachete → portofoliu → contact) fără salt vizual v1/v2.

---

## FAZA 4 — Curățare & testare

- [ ] 🟠 Șterge cele **13 componente moarte** (după `grep -rn` final de import + `pnpm build` verde) — vezi lista în `AUDIT.md §9`. (`admin/DataTable.astro` — păstrează dacă adoptăm DataTable pe liste.)
- [ ] 🟠 **Teste noi** pe fluxurile cu bani/SEO: `checkout` (OTO/discount/degradare), `webhook` (idempotență/upsert client/factură), `ab.ts` (isBot/assignVariant/readVariant), `middleware` (rutare A/B, gate mentenanță/construcție, redirect www/legacy).
- [ ] 🟢 Documentează scripturile one-shot din `scripts/` (proces repetabil) sau arhivează-le.
- [ ] 🟢 Arhivează `design/` (mockup-uri) în afara repo-ului de producție.

---

## Definiție „DEFINITIV în producție" (acceptanță)

- [ ] Zero placeholdere legale/firmă vizibile public; `src/data/site.ts` complet.
- [ ] Backup DB automat rulează + un restore testat.
- [ ] Emailuri confirmate că pleacă (Postmark activ); Stripe LIVE + webhook + SmartBill confirmate.
- [ ] `pnpm test` verde; `pnpm build` verde (`astro check` e gate de deploy).
- [ ] SEO: Rich Results valide pe pachete/servicii/blog; `sitemap.xml` + `robots.txt` corecte; OG cu imagine pe paginile-cheie.
- [ ] Rate-limit + observabilitate + webhook-retry în loc.
- [ ] (dacă activezi A/B) v2 coerent pe toate paginile variantei B; experiment cu prag statistic.

---

## Note de proces

- **Deploy**: `/var/www/simplead/deploy.sh` (git pull → `docker compose build` → up → health → `seed.mjs`). `astro check` e parte din `pnpm build` — **rulează type-check într-un container Node 22 înainte de deploy** ca să nu pici build-ul pe erori de tip (dev/Vite nu le prinde).
- **Documente**: `AUDIT.md` (findings) + acest `ROADMAP.md` sunt sursele unice de audit/plan; `README.md` (ops) și `docs/brand-voice.md` (copy) rămân sursele vii. Documentele vechi de audit/roadmap/copy au fost consolidate aici (recuperabile din istoricul git dacă e nevoie).
