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
- [ ] 🔴 **Confirmă integrările în `/admin/integrari`**: Stripe `sk_live_` + `whsec_` (+ endpoint `checkout.session.completed` în Stripe Dashboard); **Postmark token** (altfel emailurile tac); SmartBill (token/serie/CIF/tax). Dacă vrei, verific eu read-only și îți spun exact ce lipsește.
- [ ] 🔴 **Confirmă migrarea `0015`** aplicată pe prod (`ab_exposure` + `leads.variant`/`orders.variant`) — necesară înainte de A/B.
- [ ] 🟢 Poză reală Gabriel (`src/pages/despre.astro`) + confirmă cifrele „TODO" din `src/data/content.ts`.

### 🤖 Tehnic
- [ ] 🔴 **Backup DB automat**: cron `pg_dump` (orders/customers/leads/subscribers/settings/posts/projects) + retenție (ex. 7 zilnice / 4 săptămânale) + copie off-site; restore testat o dată; documentat în `README.md`.
- [ ] 🟠 **Teste verzi**: fix `rate-limit.test.ts` (`vi.useFakeTimers({ toFake: ['Date'] })`); aliniază `contact-schema.test.ts` cu codul (decide: mesaj opțional → actualizez testul; sau reintrodu `.min(10)`).
- [ ] 🟠 Curăță `RESEND_API_KEY` mort din `.env` + cod; șterge config deploy legacy `app/docker-compose.prod.yml` + `app/Dockerfile.prod`.

---

## FAZA 1 — SEO complet funcțional (prioritate)

- [ ] 🔴 `public/robots.txt`: adaugă `Allow: /api/og/` (deblochează imaginea Twitter card pe blog) + `Disallow: /v2` (defensiv).
- [ ] 🟠 `src/pages/pachete.astro`: JSON-LD `Product`/`Offer` per pachet (`price`, `priceCurrency: RON`, `availability`, `url`) + `BreadcrumbList`. Opțional `AggregateOffer` pe listă.
- [ ] 🟠 `BreadcrumbList` pe: `servicii/[slug]`, `portofoliu/[slug]`, `servicii/index`, `portofoliu/index`, listările blog/tag/categorie (multe au deja breadcrumb vizual).
- [ ] 🟠 `FAQPage` pe `servicii/[slug]` și `pachete` (refolosesc datele din `FaqSection`).
- [ ] 🟠 OG dinamic non-blog: parametrizez `src/pages/api/og/[slug].png.ts` (titlu/subtitlu generic) și pun `ogImage` pe servicii/pachete/despre — sau accept `/og-default.png` unde nu merită.
- [ ] 🟢 `BaseLayout.astro`: `WebSite.potentialAction` SearchAction (`/blog?q={q}`); îmbogățesc `Organization`/`LocalBusiness` cu `identifier`/`vatID` (CIF/RegCom), `streetAddress`, `geo`, `sameAs` (după ce ai social), `openingHours`; `og:image:width/height` 1200×630.
- [ ] 🟢 `Review`/`AggregateRating` din `src/data/testimonials.ts`; `ItemList` pe listări servicii/portofoliu.
- [ ] 🟢 `src/pages/rss.xml.ts`: `content:encoded` full-text.

**Verificare:** Google Rich Results Test + Schema validator pe `/pachete`, `/servicii/[slug]`, `/blog/[slug]`; card Twitter cu imagine; `sitemap.xml` + `robots.txt` corecte.

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
