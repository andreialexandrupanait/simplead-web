# Audit tehnic — simplead.ro

> Audit READ-ONLY pe cod real, 11 iul 2026 (3 domenii: funcționalitate/structură, SEO, production-readiness).
> Severități: **BLOCANT** (oprește „definitiv în producție") · **IMPORTANT** · **MINOR**.
> Planul de rezolvare, pe faze, e în [`ROADMAP.md`](./ROADMAP.md).

## Rezumat executiv

Aplicația e matură și, în mare, funcțională: fluxuri complete de checkout/webhook/factură, admin redesign-uit, RBAC granular, tracking server-side, gate-uri de mentenanță/construcție, feature A/B v2 bine izolat. **Nu există** stub-uri reale, `throw new Error('not implemented')` sau handlere goale pe căile de producție; `console.warn/error` apar doar pe ramuri de eroare. Problemele reale sunt **legale/ops** (placeholdere publice, lipsă backup DB, confirmare integrări), **SEO incomplet pe schema per-pagină**, câteva găuri de **fiabilitate/securitate** (webhook fără retry, fără rate-limit pe contact/checkout, fără observabilitate), suita de **teste roșie** (config, nu bug) și **cod mort**.

---

## 1. Legal & conținut

| Sev | Finding | Locație |
|---|---|---|
| **BLOCANT** | Placeholdere legale vizibile public: „…{legalName} **[confirmă: forma juridică exactă]**…" | `src/pages/confidentialitate.astro:26` |
| **BLOCANT** | „…**[confirmă: adresa completă a sediului]**, CIF…" | `src/pages/termeni.astro:31` |
| **BLOCANT** | `site.ts` incomplet: `legalName` fără SRL/PFA, `address` doar „Galați", `schedule` TODO, `social` toate goale. CIF `41501661` + RegCom `J17/1488/2019` sunt reale. | `src/data/site.ts:7,26,27,32-34,37-40` |
| IMPORTANT | Statistici „TODO confirmă" afișate public (3 săpt./100%/99.9%/„zeci proiecte"/„10+ ani") | `src/data/content.ts:542,558,571,572,648,649` |
| MINOR | Gabriel Tulearca cu monogram placeholder, nu poză reală (Andrei are poză) | `src/pages/despre.astro:134` |

---

## 2. Fiabilitate

| Sev | Finding | Locație |
|---|---|---|
| IMPORTANT | Webhook Stripe răspunde **200 pe orice eroare** de procesare → Stripe nu retrimite; comandă rămasă `pending`, fără factură/email, fără reconciliere automată. Idempotența (`status==='paid'`) e corectă. | `src/pages/api/stripe/webhook.ts:42-50,77` |
| IMPORTANT | **Fără logging structurat / Sentry / alerting** — doar `console.*` (32 apariții în `lib/server`). Nu afli când Postmark/SmartBill/ERP pică decât din `docker logs`. | global |
| IMPORTANT | Factura care nu se emite doar dă `console.warn`, fără retry/coadă → rămâne neemisă până la reconciliere manuală. | `webhook.ts:157` |
| MINOR | Degradare tăcută fără `DATABASE_URL`: newsletter „reușește" fără să salveze; webhook fără DB pierde comanda (răspunde 200). Improbabil în prod (DB există), dar fără alertă. | `api/newsletter.ts:76`, `webhook.ts:52,61` |
| OK | Timeout-uri pe fetch extern (Postmark 10s, CAPI 4s); `api/health`; healthcheck Docker. | — |

---

## 3. Securitate

| Sev | Finding | Locație |
|---|---|---|
| IMPORTANT | CSP `script-src 'self' 'unsafe-inline' 'unsafe-eval' https:` → nu oprește XSS injectat. Alegere pt. GTM, dar slăbiciune reală. | `src/middleware.ts:46` |
| IMPORTANT | CSP/headere duplicate în 3 locuri, sincronizate manual (drift silențios). | `middleware.ts:44-58`, `maintenance/vhost-include.conf`, `maintenance/sec-headers.conf` |
| IMPORTANT | **Fără rate-limit pe `/api/contact` și `/api/checkout`** (doar honeypot pe contact). Spam email / comenzi `pending` la nesfârșit. (`ticket`/`newsletter`/`tools` au limiter.) | `api/contact.ts:47`, `api/checkout.ts` |
| IMPORTANT | Authz doar „staff" (admin/editor/author) pe `api/admin/{theme,preview,uploads}` — un `author` poate face upload/preview. `users.ts` verifică corect per-acțiune. | `lib/server/authz.ts:46` |
| IMPORTANT | CAPI trimite conversii server-side (email/telefon hash) **indiferent de consimțământ**. Pt. `purchase` apărabil; pt. `generate_lead`/`sign_up` = risc GDPR. | `capi.ts` din `contact.ts:84`, `newsletter.ts:94`, `webhook.ts:123` |
| MINOR | `.env` părinte `664` (grup poate citi `APP_ENCRYPTION_KEY`/`POSTGRES_PASSWORD`/`GOOGLE_SA_KEY`) → `600`. | `/var/www/simplead/.env` |
| MINOR | HSTS/Permissions-Policy lipsesc pe fișiere statice (doar middleware le pune); HSTS fără `preload`. | `maintenance/sec-headers.conf` |
| MINOR | Rate-limiter in-memory per-proces (resetat la restart, nepartajat) — OK cu 1 container. | `lib/server/rate-limit.ts` |
| MINOR | TOCTOU DNS-rebinding în SSRF guard (rezolvă DNS separat de fetch). Guard altfel foarte bun. | `lib/server/tools/ssrf-guard.ts:72` |
| MINOR | User banat/rol schimbat valid ≤5 min (cookieCache). | `lib/auth.ts:66` |
| OK | Secrete: AES-256-GCM (IV random+authTag), scrypt parole, mascare UI. RBAC solid, rute admin protejate. | `crypto.ts`, `permissions.ts`, `middleware.ts:145,221` |

---

## 4. Date & backup

| Sev | Finding | Locație |
|---|---|---|
| **BLOCANT** | **Niciun backup DB automat.** Doar dump-uri manuale de `posts`. Pierdere volum `simplead_pg` = pierzi comenzi/facturi/leads/settings (chei criptate). | `/var/www/simplead/backups/` |
| IMPORTANT | Migrarea `0015_strange_the_anarchist.sql` (ab_exposure + `leads.variant`/`orders.variant`) — de confirmat aplicată pe prod, altfel A/B dă erori la insert. | `drizzle/0015*`, `schema.ts:262` |
| OK | Migrări automat la start container; `seed.mjs` automat în `deploy.sh` post-health; FK/enums/unique corecte; DB neexpus (rețea internal). | `Dockerfile`, `deploy.sh` |

---

## 5. Integrări (de confirmat în `/admin/integrari`)

| Sev | Finding |
|---|---|
| **BLOCANT (de verificat)** | Secretele se rezolvă DB→env; `.env` prod NU are Stripe/Postmark/SmartBill → trebuie în DB. De confirmat: **Stripe** `sk_live_`+`whsec_` + endpoint `checkout.session.completed`; **Postmark** token; **SmartBill** token/serie/CIF/tax. |
| **BLOCANT** | Fără token Postmark, **toate** emailurile sunt „simulate" (log), fără eroare vizibilă — confirmări/auto-reply/reset parolă tac. `RESEND_API_KEY` din `.env` = **cod mort** (codul folosește doar Postmark). | `lib/server/email.ts:27-31` |
| OK | GTM/GA4 provisioning configurat (`GTM_*`, `GA4_*`, `GOOGLE_SA_KEY`). Checkout folosește `price_data` inline (nu depinde de Stripe Price IDs). |

---

## 6. SEO

Fundație solidă și centralizată (`BaseLayout.astro`: title/desc dinamice, canonical self, OG/Twitter, `@graph` Organization+LocalBusiness+WebSite+Person, hreflang gated de `EN_LIVE`). Redirects 301 complete (`legacy-redirects.ts` + middleware www/trailingSlash). Sitemap dinamic (`sitemap.xml.ts`), RSS (`rss.xml.ts`), 404 custom, fonturi self-hosted. **Golurile sunt în schema per-tip și 1 blocaj robots:**

| Sev | Finding | Locație |
|---|---|---|
| **BLOCANT** | `robots.txt` `Disallow: /api/` blochează și `/api/og/*` → Twitterbot nu preia imaginea cardului de blog. Fix: `Allow: /api/og/`. | `public/robots.txt:4` |
| IMPORTANT | **`Product`/`Offer` lipsă pe `/pachete`** (prețuri reale + checkout, dar zero schema de preț). | `src/pages/pachete.astro` |
| IMPORTANT | `BreadcrumbList` **doar pe articolul de blog**; lipsă pe servicii/[slug], portofoliu/[slug], pachete, listări servicii/portofoliu/blog/tag/categorie. | `blog/[slug].astro:90` (singurul) |
| IMPORTANT | `FAQPage` lipsă pe `servicii/[slug]` și `pachete`, deși randează `FaqSection`. | `servicii/[slug].astro:115`, `pachete.astro:279` |
| IMPORTANT | OG dinamic (`api/og/[slug].png.ts`) folosit **doar pe blog**; pagini comerciale (home/servicii/pachete/despre) cad pe `/og-default.png` static. | `blog/[slug].astro:124` |
| MINOR | `WebSite` fără `SearchAction`; `LocalBusiness` fără `streetAddress`/`geo`/`sameAs`/`identifier`(CIF/vatID); `Review`/`AggregateRating` inexistente (deși ai `testimonials.ts`). | `BaseLayout.astro:79-147` |
| MINOR | `robots.txt` fără `Disallow: /v2` (defensiv; oricum 301 la calea curată); RSS fără `content:encoded`; fără validare lungime title/desc; `og:image:width/height` lipsă. | — |
| OK | FAQPage auto din `faq` jsonb pe articole ✓; BlogPosting complet; tag/categorie cu paginare + rel prev/next; imagini self-hosted cu width/height. | `blog/[slug].astro`, `blog-page.ts` |

---

## 7. Teste

`npx vitest run` → **4 failed | 66 passed (70)**.

| Sev | Finding | Locație |
|---|---|---|
| IMPORTANT | `rate-limit.test.ts` (3 teste) — `Hook timed out` din **incompatibilitate vitest 4 cu fake timers** (nu bug de rate-limiting). Fix: `vi.useFakeTimers({toFake:['Date']})`. | `tests/rate-limit.test.ts` |
| IMPORTANT | `contact-schema.test.ts` — testul cere `message` min 10, dar codul l-a făcut `optional().default('')`. Test vs cod desincronizate. | `tests/contact-schema.test.ts:26` vs `lib/contact-schema.ts:14` |
| IMPORTANT | **Zero teste** pe fluxurile cu bani/SEO: checkout (OTO/discount), webhook Stripe (idempotență/factură), `ab.ts` (isBot/assign), middleware (rutare A/B, gate, redirect), newsletter/ticket. | — |
| OK | Acoperit: crypto, csv, i18n, legacy-redirects, maintenance-plans, packages, permissions, series, slug, ssrf-guard, ticket-schema. | `tests/*` |

---

## 8. Feature v2 / A-B (redesign public dormant)

Arhitectură **solidă și dormant-safe**: variantă A = site actual neatins; B = rewrite intern la `src/pages/v2/*` (URL curat, `/v2` 301 → neindexabil); cookie sticky 90z, boți pe A, admini excluși, override `?v=a|b`; `Vary: Cookie`+`Cache-Control: private`; kill-switch `abTestEnabled=false` implicit. 9 pagini au v2 (home/despre/servicii/[slug]/pachete/blog-index/contact/mentenanta/intrebari).

| Sev | Finding | Locație |
|---|---|---|
| IMPORTANT | **Chrome inconsistent cross-variant**: v2 linkează spre `/portofoliu`, `/suport` care NU au v2 → vizitatorul B vede chrome v1 în aceeași sesiune. | `v2/index.astro:370`, `v2/despre.astro:52,267`, `v2/servicii/index.astro:110` |
| MINOR | Fără prag de semnificație statistică (doar uplift brut); expunere per-vizitator nu per-pagină-cu-v2 (diluează). | `admin/experiment.astro:62`, `middleware.ts:199` |
| OK (de confirmat) | Migrarea 0015 pe prod (vezi §4). | — |

---

## 9. Structură & cod mort

| Sev | Finding |
|---|---|
| IMPORTANT | **13 componente neimportate** (cod mort): `components/sections/{ClientsSection,DifferentiatorSection,PriceAnchor,ProcessStepper,RelatedServices,ServiceCatalog,StartSteps,TestimonialsSection,ToolsTabs,ValuesSection}.astro`, `components/home/ClientsStrip.astro`, `components/admin/charts/BarMini.astro`, `components/admin/DataTable.astro`. (Ștergere doar după `grep` final + build verde; `DataTable` poate fi păstrat pt. adopție viitoare.) |
| IMPORTANT | Config deploy **legacy divergent**: `app/docker-compose.prod.yml` + `app/Dockerfile.prod` (Caddy) NU sunt cele live și `Dockerfile.prod` nu copiază `seed.mjs`/`import-content.mjs` → deploy accidental = fără seed/conținut. De șters. |
| MINOR | Duplicare intenționată v1/v2 (BaseLayoutV2 + v2/* reconstruiesc layout-ul) — cost de mentenanță până la „merge or delete" post-experiment. |
| MINOR | Scripturi one-shot în `scripts/` (`import-wp-articles`, `set-blog-covers`, `.sql` ad-hoc) nedocumentate ca proces. |
| MINOR | `design/` (17 mockup `.dc.html`) în afara build-ului — candidat de arhivare. |

---

## 10. Build & dependențe

- `pnpm build` = **`astro check && astro build`** → erorile de tip **opresc deploy-ul** (dev/Vite NU verifică tipurile — sursă de surprize la deploy; rulează `astro check` într-un container Node 22 înainte).
- Fără dependențe evident nefolosite. `googleapis` scos intenționat (OOM) — GA4/GTM via fetch+JWT self-semnat.
- `vitest ^4.1.8` — cauza eșecului fake-timers (§7). Stack recent și coerent (astro 6, react 19, better-auth 1.6, drizzle 0.45, stripe 22).
