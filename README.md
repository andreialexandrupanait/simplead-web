# Simplead — Website de prezentare

Studio de grafică și marketing digital din Galați, condus de Andrei Panait (doctor în marketing).
Poziționare: **„Facem lucrurile simple. Și le bazăm pe date."**

Site static în **română** (pregătit pentru engleză), construit cu **Astro + TypeScript + Tailwind**
și câteva **React islands** (grafic orbital — CSS, formular contact, meniu mobil).

---

## ⚡ Flux de lucru zilnic (citește asta)

**Regula de aur: se editează DOAR local, niciodată direct pe server.** Codul circulă într-o
singură direcție — `editezi local → push pe GitHub → deploy pe server` — așa local-ul nu mai
rămâne în urma versiunii de pe live.

Dev-ul rulează **nativ pe Windows** (Node, fără Docker Desktop), cu DB-ul de dev de pe server.

```powershell
# Începutul zilei — un singur buton:
.\dev.ps1          # git pull + sync continut prod->dev + porneste dev pe http://localhost:4321

# Publicare pe live — un singur buton:
.\deploy.ps1 "mesaj de commit"     # commit + push + deploy pe server (rebuild + restart)

# Doar re-sincronizare continut prod->dev (fara restart dev):
.\sync-db.ps1
```

> `dev.ps1` te ține mereu pe ultima versiune și cu conținut real. Dacă vrei doar codul fără
> sync DB, vezi comentariile din script. Detalii infra (server, baze de date): mai jos.

---

## 🚀 Pornire rapidă (Windows + Docker)

Ai nevoie doar de **Docker Desktop**. Nu trebuie să instalezi Node sau pnpm pe Windows.

```powershell
# 1. Copiază fișierul de mediu (opțional — merge și fără el)
Copy-Item .env.example .env

# 2. Pornește mediul de dezvoltare
docker compose up --build
```

Deschide **http://localhost:4321** în browser.

### ⚠️ Hot reload pe Windows

Proiectul rulează din `E:\…` (drive Windows) montat în container. Docker Desktop **nu propagă
evenimentele de fișier** (inotify) de pe drive-urile Windows către container, iar polling-ul
(`usePolling`) saturează un core și **blochează pornirea** dev server-ului în acest setup. Deci, cu
proiectul pe `E:\`, modificările din `src/` **nu se reîncarcă automat** — repornește serverul ca să
le vezi: `docker compose restart web`.

**Recomandat pentru dezvoltare activă cu hot reload** — mută proiectul în FS-ul **WSL2** (unde
inotify merge nativ, fără polling):

```bash
# într-un terminal WSL2 (ex. Ubuntu)
cp -r /mnt/e/Docker/simplead ~/simplead   # sau git clone
cd ~/simplead
docker compose up --build
```

Acolo HMR funcționează instant. Din Windows, folderul e accesibil la `\\wsl.localhost\Ubuntu\home\<user>\simplead`.

```powershell
# Oprire
docker compose down

# Pornire ulterioară (fără rebuild)
docker compose up
```

> **Notă despre prima pornire:** instalarea dependențelor (`pnpm install`) și prima generare a
> tipurilor pot dura 1–2 minute. Pornirile ulterioare sunt rapide (lockfile + volum `node_modules`).

### Comenzi utile în container

```powershell
docker exec simplead-web pnpm build      # build de producție (rulează și astro check)
docker exec simplead-web pnpm lint       # eslint + prettier --check
docker exec simplead-web pnpm format     # prettier --write
docker exec simplead-web pnpm test       # teste Vitest (utilitare server + validări)
```

---

## ✅ Calitate — reguli aplicate automat

Standardul de cod nu mai depinde de disciplină; e impus de unelte:

- **Pre-commit** (husky + lint-staged): la fiecare commit rulează `eslint --fix` +
  `prettier` pe fișierele din stage. Se instalează singur la `pnpm install`
  (scriptul `prepare`). Sări peste doar excepțional, cu `git commit --no-verify`.
- **CI** (`.github/workflows/ci.yml`): pe fiecare push/PR rulează, în ordine,
  `pnpm lint` → `pnpm test` → `pnpm build` (astro check + build). Oricare pică,
  PR-ul pică.
- **Type-check strict**: `tsconfig` extinde `astro/tsconfigs/strict`; `pnpm build`
  rulează `astro check` și oprește build-ul la prima eroare de tip.

---

## ⚙️ Variabile de mediu (`.env`)

Toate sunt **opționale** în dev. Lipsa unei chei dezactivează elegant funcția aferentă.

| Variabilă            | Rol                                                            |
| -------------------- | ------------------------------------------------------------- |
| `SITE_URL`           | URL canonic (sitemap, OG, JSON-LD)                            |
| `GA4_ID`             | Google Analytics 4 — gol = scriptul nu se injectează; pornește doar după acceptul din bannerul de cookies |
| `GTM_ID`             | Google Tag Manager — idem                                     |
| `CLARITY_ID`         | Microsoft Clarity — idem                                      |
| `CONTACT_TO_EMAIL`   | Adresa care primește mesajele din formular                    |
| `CONTACT_FROM_EMAIL` | Adresa „from" verificată în Postmark                          |
| `CALCOM_LINK`        | Link Cal.com pentru programări — gol = butonul e dezactivat   |
| `DATABASE_URL`       | Postgres. **Gol = site-ul rulează fără DB** (pachete fallback, lead-urile rămân doar pe email) |
| `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` | Autentificare `/admin` (generate cu `pnpm gen:key --password "..."`) |
| `APP_ENCRYPTION_KEY` | Criptarea cheilor API salvate din `/admin/integrari` (64 hex, din `pnpm gen:key`) |
| `POSTMARK_SERVER_TOKEN`, `STRIPE_SECRET_KEY`, `SMARTBILL_*`, `SLACK_WEBHOOK_URL` | Fallback-uri env pentru integrări; valorile principale se introduc din **/admin/integrari** (criptate în DB) |

Fără token Postmark, formularul de contact **simulează + loghează** (comportamentul istoric).

---

## 📁 Structură

```
src/
  components/
    ui/         Button, Card, Section, SectionHeading, Logo, ServiceIcon, PortfolioCard, BlogCard
    sections/   Hero, OrbitGraphic, Services, Differentiator, Process, Portfolio, About, ...
    react/      OrbitGraphic e CSS; React islands: MobileMenu, ContactForm
    Navbar.astro, Footer.astro, Analytics.astro
  layouts/      BaseLayout.astro (SEO, OG, JSON-LD, tracking)
  pages/        index, servicii/*, portofoliu/*, blog/*, despre, contact, termeni, 404
                api/contact.ts (endpoint Resend, on-demand)
  content/      blog/ + portfolio/ (Markdown) · content.config.ts (zod)
  data/         site, nav, services, content (single source of truth)
  i18n/         ro.ts (+ en.ts schelet) — locale implicit `ro`
  styles/       global.css (tokens design + Tailwind @theme)
  assets/logo/  SVG-uri logo (din kitul de brand)
public/         favicon.svg, og-default.png, robots.txt
design/         material de referință (NU se livrează — gitignored): handoff Claude Design, brand kit
docs/           Copy_site_Simplead.md
```

## 🎨 Design

**Tokens** (culori, spațiere, raze, umbre, glow, easing) sunt în `src/styles/global.css`
(`@theme` pentru utilitare Tailwind + `:root` pentru variabile brute folosite de `sections.css`).
Modulele de secțiune: stiluri scoped în componente (`src/components/home/*`, `sections/*`) +
`src/styles/sections.css` pentru paginile interioare.

- **Fonturi:** **Space Grotesk** (titluri, 700) + **Hanken Grotesk** (text), via Google Fonts.
- **Paletă:** navy `--ink #030D4A` (bază), albastru `--electric #0077FC` (butoane + linkuri
  principale — *acțiune*), turquoise `--cyan #00E0C6` (**accentul-semnătură**: grafice, hover,
  highlight-uri, kickere & accente pe secțiunile dark, focus ring), galben `--signal #F5D93F` (rar).
  Regulă: `--cyan`/`--signal` nu se folosesc ca text pe alb (contrast). Zero gradienți decorativi
  (excepție: glow-urile radiale subtile de pe hero-urile dark).
- **Ritm:** homepage = hero light + mesh; paginile interioare = hero **dark gradient** (prop
  `navOverDark` pe `BaseLayout` face navbar-ul alb peste ele). Butoane oblice (`ui/Button.astro`).
- **Servicii:** 6 pagini (`src/data/services.ts`) + nav (`src/data/nav.ts`); homepage afișează doar
  4 featured — vezi lista `FEATURED` din `src/components/sections/ServicesSection.astro`.
- **SEO:** JSON-LD (Organization + LocalBusiness + WebSite) în `BaseLayout.astro`; paginile de
  serviciu/blog injectează `Service` / `BlogPosting` prin prop-ul `schema`.

---

## 🌐 Producție (Docker, NAS sau Hetzner)

Site predominant static + rute on-demand (`/api/contact`, `/pachete`, `/admin/*`) servite de
adaptorul `@astrojs/node` standalone. Deploy self-hosted cu Docker:

```bash
# 1. Generează secretele și completează .env (pornind de la .env.example)
pnpm gen:key --password "parola-ta-de-admin"

# 2a. Pe NAS (ai deja reverse proxy): aplicația ascultă pe :4321
# Notă: SITE_URL + ID-urile de analytics din .env intră în build (paginile
# statice le inline-uiesc); după schimbarea lor e nevoie de rebuild (--build).
docker compose -f docker-compose.prod.yml up -d --build

# 2b. Pe Hetzner (fără proxy propriu): Caddy face HTTPS automat pentru $DOMAIN
docker compose -f docker-compose.prod.yml --profile caddy up -d --build

# 3. Migrațiile rulează automat la pornirea containerului. Seed inițial (pachete draft):
docker compose -f docker-compose.prod.yml exec app node scripts/seed.mjs
```

După pornire: intră pe `/admin` (credențialele din `.env`) și introdu cheile de integrare
(Stripe, SmartBill, Postmark, Slack) din pagina **Integrări**: se salvează criptat în DB și
fiecare are buton de test. Pachetele și prețurile se editează din **Pachete** (apar pe `/pachete`
fără rebuild).

### Activarea plăților (Stripe + SmartBill)

1. În `/admin/integrari` completează cheia secretă Stripe; butoanele „Cumpără/Abonează-te"
   apar automat pe `/pachete` pentru pachetele cu preț setat.
2. În Stripe Dashboard (Developers, Webhooks) adaugă endpoint-ul
   `https://domeniul-tau/api/stripe/webhook` cu evenimentul `checkout.session.completed`,
   apoi salvează secretul `whsec_...` în câmpul „Webhook secret" din admin.
3. Completează SmartBill (email, token, CIF, serie, TVA): factura se emite automat la fiecare
   plată și pleacă pe emailul clientului.
4. Opțional, per pachet: setează oferta OTO (pachet țintă + discount) din **Pachete**; apare pe
   pagina de mulțumire timp de 30 de minute după cumpărare.
5. Comenzile apar în **Comenzi** (admin); pentru rambursări și detalii de plată folosește
   Stripe Dashboard.

---

## ✅ De completat (TODO)

- Cifre reale (statistici hero), date de contact confirmate (email, CIF, Reg. Com., program)
- Conținut real pentru portofoliu + blog (acum sunt 3 + 3 intrări placeholder)
- Fotografia lui Andrei (secțiunea Despre) și logo-urile clienților
- Texte legale (Termeni, Confidențialitate)
- Imagine OG dedicată 1200×630 (acum: `public/og-default.png`, placeholder din screenshot)
- Activarea EN: completează `src/i18n/en.ts` și paginile pentru locale-ul `en`
```

---

## Operare pe serverul de producție (Hetzner)

Stack-ul live stă în `/var/www/simplead` (repo-ul e clonat în `./app`):

- **Deploy**: `./deploy.sh` — git pull, rebuild, restart, health check. Migrațiile DB și
  importul inițial de conținut rulează automat la pornirea containerului.
- **Mod „în lucru"**: `./maintenance.sh on|off|status` — vizitatorii văd pagina de
  mentenanță (503); `/admin` și `/api` rămân funcționale.
- **Conținut**: blogul și portofoliul trăiesc în Postgres și se editează din `/admin`
  (publicare instant, fără rebuild). Fișierele din `content-seed/` sunt doar seed-ul
  inițial (import idempotent la pornire).
- **Imagini**: upload din `/admin/media`; fișierele stau în volumul `./uploads`
  (persistă peste rebuild-uri) și se servesc la `/uploads/...`.
- **Sitemap/RSS**: generate dinamic la `/sitemap.xml` și `/rss.xml` (includ articolele
  din DB). Lista rutelor statice: `src/data/static-routes.ts`.
