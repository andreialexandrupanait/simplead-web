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

## FAZA 2 — Fiabilitate & securitate ✅ (implementată 11 iul)

- [x] **Webhook Stripe**: eșec ÎNAINTE de marcarea plății (DB căzut, comandă negăsită) → **500 = Stripe retrimite** (backoff ~72h; idempotența face retry-ul sigur — înainte se răspundea 200 și comanda plătită se pierdea); pașii post-plată au try/catch propriu + **alertă email** („comandă plătită fără factură SmartBill", „procesare parțială").
- [x] **Observabilitate FĂRĂ Sentry** (decizia ta): `lib/server/alert.ts` — `alertAdmin()` trimite email prin Postmark (funcțional în prod) la incidente; fail-safe (dacă emailul pică, doar loghează).
- [x] **Rate-limit**: `api/contact.ts` (6/10min/IP) + `api/checkout.ts` (10/10min/IP → redirect `/pachete?limit=1`). Testat funcțional: al 7-lea POST → 429.
- [x] **Authz per-capabilitate**: `uploads` GET/POST → `content: edit-own`; `uploads/[name]` DELETE → `content: delete` (biblioteca e partajată); `preview` → `content: edit-own`. **Decizie: `theme` rămâne doar pe gate-ul staff** — setează exclusiv cookie-ul propriu de temă, inofensiv.
- [x] **Consimțământ vs CAPI**: CookieBanner oglindește consimțământul de marketing în cookie-ul `sa_consent_mkt` (citibil server-side; sincronizat și pentru deciziile vechi din localStorage); `generate_lead`/`sign_up` se trimit doar cu consimțământ (`hasMarketingConsent()`); `purchase` rămâne (tranzacțional).
- [x] Hardening parțial: `.env` → `600` (Faza 0); **Permissions-Policy pe static** (nginx vhost, era lipsă); HSTS deduplicat (nginx-proxy emite deja unul — `proxy_hide_header` pe upstream, un singur header pe static+dinamic).
- [ ] 🟢 Rămas (amânat deliberat): **nonce CSP** pe scripturile proprii — invaziv (fiecare script inline + GTM cu nonce), de făcut coordonat; până atunci CSP rămâne cu `unsafe-inline` (necesar oricum pt GTM). Sursa CSP e încă în 3 locuri (middleware + 2 conf nginx) — ține-le sincron la orice schimbare.

**Verificare făcută:** rate-limit 429 confirmat; teste 71/71; un singur HSTS + Permissions-Policy pe static (curl live).

---

## FAZA 3 — Finalizare v2 & activare A/B ✅ tehnic (implementată 11 iul)

- [x] **Chrome consecvent**: create `src/pages/v2/portofoliu/{index,[slug]}.astro` + `src/pages/v2/suport.astro` (chrome v2 complet, conținut 1:1 cu varianta A, SEO parity — breadcrumb/ItemList/CreativeWork/OG identice); rutare adăugată în `ab-pages.ts` (`/portofoliu`, prefix `/portofoliu/`, `/suport`).
- [x] **Semnificație statistică**: `src/lib/server/ab-stats.ts` (test z pe două proporții, p-value via erf, verificat matematic) + card „Semnificație statistică" în `/admin/experiment` cu verdict RO per metrică (rată lead / rată comandă), prag minim 100 expuneri/variantă.
- [x] **Expunere corectă**: `recordExposure` la PRIMA pagină care chiar are v2 (cookie `sa_ab_exp`), nu la orice aterizare — eșantion nediluat. `Vary: Cookie` era deja pe rutele din test.
- [x] Bonus: `BOT_RE` extins (curl/wget/python-requests/UA gol → fixați pe A, nu diluează eșantionul); `/portofoliu` + `/suport` adăugate la preview-ul QA din `/admin/experiment`.
- [ ] 👤 **Activarea propriu-zisă e a ta**: QA manual `?v=b` pe funnel (home → servicii → pachete → portofoliu → contact → suport), apoi toggle „Test A/B" în `/admin/setari`. Tehnic totul e deblocat (migrarea 0015 ✓, rute ✓, chrome consecvent ✓).

---

## FAZA 4 — Curățare & testare ✅ (implementată 11 iul)

- [x] Șterse cele **13 componente moarte** (re-verificat zero importuri înainte; recuperabile din git).
- [x] **Teste noi** (29): `ab.ts` (isBot/assignVariant/readVariant), `ab-pages.ts` (hasV2/v2Path/stripV2 — rutarea A/B = SEO critic), `seo-schema.ts` (breadcrumb/FAQ/ItemList/Product). Total suită: **100 de teste verzi**.
- [x] Documentate scripturile în `scripts/README.md` (recurente vs provisioning GTM vs one-shot istorice WP — NU se rulează din nou).
- [ ] 🟢 Amânat (valoare/efort): teste route-level pe `checkout`/`webhook`/`middleware` — cer mock-uri grele (Stripe/drizzle/context Astro); logica pură din jur e acoperită, iar webhook-ul are acum retry+alerte (Faza 2). De revizitat dacă apar regresii.
- [ ] 🟢 Opțional: arhivează `design/` (mockup-uri, în afara build-ului) în afara repo-ului.

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
