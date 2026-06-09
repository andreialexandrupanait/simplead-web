# Roadmap & strategie de dezvoltare Simplead

> Document viu, ca `brand-voice.md`. Aici trăiește planul prin care site-ul trece de la
> site de prezentare la mașină de generat venituri: vânzare de pachete și abonamente,
> funnel-uri OTO, dashboard de administrare, blog care rankează, versiune EN.
> Regulile de copy din `docs/brand-voice.md` rămân lege pentru orice text nou.

**Decizii luate (iunie 2026):**

| Subiect | Decizie |
|---|---|
| Plăți | Stripe (one-time + abonamente) |
| Facturare | **SmartBill (cont existent)**; e-Factura e gestionată tot de SmartBill, nu avem nevoie de integrare separată cu ANAF |
| Email | Postmark pentru tot (înlocuiește Resend); newsletter prin Postmark Broadcast Streams |
| Dashboard | Admin pentru Andrei (comenzi, lead-uri, conținut). NU portal de clienți |
| Monetizare | Toate cele 4 fluxuri: abonamente mentenanță, pachete one-time, produse digitale, lead-uri pentru proiecte mari |
| Blog | AI-asistat + review și semnătură Andrei; obiectiv: rankare organică națională |
| Achiziție | SEO + organic întâi; ads abia după validarea funnel-ului |
| Lansare | Totul împreună (site complet RO+EN + comerț + admin), orizont realist 6-10 săptămâni |
| Hosting | Nedecis; recomandare mai jos (secțiunea 3) |

---

## 1. Stadiul actual (audit, iunie 2026)

**Gata și funcțional:**
- Structură completă: homepage (10 secțiuni), 6 pagini de servicii, blog (4 articole), portofoliu (6 proiecte), despre, contact, mentenanță cu calculator, 404
- Formular de contact cu validare Zod, honeypot și fallback fără API key (`src/pages/api/contact.ts`)
- SEO de bază: meta, JSON-LD, sitemap, robots, redirecturi 301; analytics pregătit (`Analytics.astro`)
- CI pe GitHub Actions (type-check + build), mediu de dev pe Docker, design system propriu

**Lipsește sau e placeholder:**
- [ ] `src/data/site.ts`: entitate legală, adresă, program, social links (datele reale există în `brand-voice.md` §3: office@simplead.ro, 0755 215 135, CIF 41501661, Reg. Com. RO J17/1488/2019)
- [ ] `src/data/content.ts`: statistici marcate TODO, logo-uri clienți (doar text)
- [ ] `src/data/services.ts:625-703`: markere `[COPY]` la serviciul AI
- [ ] Foto reală Andrei (FounderSection, AboutSection, ContactSection), imagine OG reală, imagini proprii pe cardurile de servicii (acum Unsplash)
- [ ] `termeni.astro` / `confidentialitate.astro`: placeholder; devin critice când vindem online
- [ ] `src/i18n/en.ts`: doar string-uri UI; conținutul paginilor e hardcodat RO
- [ ] Newsletter în footer: nelegat de niciun serviciu
- [ ] Zero infrastructură de comerț: fără bază de date, fără auth, fără plăți
- [ ] Corecturi din `brand-voice.md`: titlul „doctor în marketing, cu cercetare în neuromarketing" (nu „doctor în neuromarketing"), anul hardcodat în footer

---

## 2. Obiective de business & KPI

Site-ul servește 4 fluxuri de venit, în ordinea priorității:

1. **Abonamente mentenanță (MRR)**: venit recurent, predictibil. Pagina `/mentenanta` + calculatorul devin funnel de vânzare cu checkout direct.
2. **Pachete de servicii one-time**: pachete cu preț fix (identitate vizuală, site de prezentare, pachet grafică, pachet social media) cumpărabile online, fără call obligatoriu.
3. **Produse digitale**: audituri plătite (în frunte cu auditul neuromarketing, vezi §8), ghiduri, template-uri. Preț mic, volum alimentat de blog.
4. **Lead-uri pentru proiecte mari**: consultanță, eCommerce, AI. Site-ul califică și programează call-uri (Cal.com).

**KPI urmăriți lunar (dashboard în GA4 + admin):**
- MRR mentenanță, churn, LTV per abonat
- Pachete vândute / lună, valoare medie comandă, rată de attach OTO
- Vânzări produse digitale, conversia blog → produs
- Lead-uri calificate / lună, rată formular → call → contract
- Trafic organic, poziții pe cuvintele cheie din nișa națională (`brand-voice.md` §3), abonați newsletter

---

## 3. Arhitectura țintă

Principiu: rămânem pe Astro și adăugăm strict ce e necesar. Nu construim backend mare de la zero.

- **Hosting: Vercel (recomandat).** Adapterul `@astrojs/vercel` înlocuiește `@astrojs/node` în `astro.config.mjs`; rutele API și webhook-urile Stripe devin serverless automat, deploy la fiecare push, preview pe PR-uri. Alternative: Netlify (echivalent funcțional) sau VPS cu Docker (configurația actuală merge direct, dar adaugă întreținere de server, SSL, deploy: nerecomandat acum).
- **Bază de date: Postgres gestionat (Neon sau Supabase) + Drizzle ORM.** Tabele minime: comenzi, clienți, lead-uri, OTO consumate, abonați newsletter. Stripe rămâne sursa de adevăr pentru plăți.
- **Plăți: Stripe Checkout (sesiuni găzduite) + Stripe Billing** pentru abonamentele de mentenanță, plus customer portal Stripe (self-service upgrade/anulare). Webhook-uri pentru sincronizarea comenzilor în DB.
- **OTO (one-time offer):** pagina de mulțumire de după checkout prezintă o ofertă unică, limitată în timp (add-on cu discount relevant pentru ce tocmai a cumpărat). Implementare inițială: o nouă sesiune Checkout cu prețul OTO; ulterior one-click cu payment method salvat.
- **Admin `/admin` (protejat, Auth.js sau echivalent):** două zone:
  - *Comenzi & lead-uri*: listă sincronizată prin webhook-uri, link direct spre Stripe Dashboard pentru detalii fine (nu reconstruim Stripe)
  - *Conținut*: **Keystatic** (CMS git-based, gratuit) peste colecțiile existente `src/content/blog` și `src/content/portfolio`: editare din browser, commit automat în repo
- **Livrare produse digitale:** link-uri semnate, cu expirare, trimise prin Postmark după confirmarea plății.
- **Emailuri:** Postmark pentru tot ce e tranzacțional + Broadcast Streams pentru newsletter. Migrarea de pe Resend se face în `src/pages/api/contact.ts` (păstrăm fallback-ul pe consolă fără API key).

---

## 4. Integrări

| Integrare | Rol | Prioritate |
|---|---|---|
| **Stripe** | Plăți, abonamente, cupoane, customer portal, webhooks | Critică |
| **Postmark** | Tranzacțional (formular, confirmări, livrare produse) + newsletter (Broadcast) | Critică |
| **SmartBill** (cont existent) | Facturare automată la fiecare plată Stripe, prin SmartBill Cloud API (REST, autentificare email + token API, documentație la api.smartbill.ro). **e-Factura e acoperită de SmartBill**, zero integrare suplimentară cu ANAF | Critică |
| **Neon / Supabase** | Postgres gestionat | Critică |
| **Slack** | Webhook-uri de notificare: lead nou, comandă nouă, abonament anulat, plată eșuată (canale #vanzari, #site) | Mare |
| **Keystatic** | Editare blog/portofoliu din browser | Mare |
| **GA4 + GTM + Clarity** | Deja pregătite în `Analytics.astro`; de adăugat evenimente ecommerce (view_item, begin_checkout, purchase) și goals pe lead-uri | Mare |
| **Google Search Console + Bing Webmaster** | Indexare, monitorizare poziții | Mare |
| **Cal.com** | Booking call-uri pentru proiecte mari (`CALCOM_LINK` există deja) | Mare |
| **Cloudflare Turnstile** | Anti-spam pe formulare, peste honeypot-ul existent | Medie |
| **Sentry** | Monitorizare erori în producție, mai ales pe fluxul de plată | Medie |
| **Uptime monitoring** (BetterStack / UptimeRobot) | Dogfooding: e chiar serviciul vândut la mentenanță | Medie |
| **Crisp sau Tawk.to + WhatsApp Business** | Chat / canal de conversie preferat de IMM-uri | Medie |
| **Documenso** | Semnătură electronică pe oferte/contracte (open source) | Post-lansare |

---

## 5. Pagini

**Necesare la lansare:**
- [ ] `/pachete` (sau `/preturi`): pagina de pricing cu pachetele cumpărabile, per serviciu + bundle-uri
- [ ] Pagini checkout: succes (cu OTO) și anulare
- [ ] `/resurse`: hub produse digitale + lead magnets (ghiduri gratuite contra email)
- [ ] Pagină per produs digital (audit plătit, ghid, template)
- [ ] `/admin`: comenzi, lead-uri, conținut (protejat)
- [ ] Politica cookies + **banner de consimțământ GDPR** (obligatoriu cu GA4/Clarity/pixeli)
- [ ] Pagini legale extinse: termeni comerciali, drept de retragere/retur, link ANPC + SOL (obligatorii la vânzare online în RO)
- [ ] Echivalentele EN ale paginilor core (vezi Faza 4)
- [ ] Pagină FAQ generală cu schema FAQPage (există FAQ per serviciu, lipsește hub-ul)

**Nice-to-have (post-lansare):**
- [ ] Mini-tool gratuit „audit rapid de site" cu scor automat: lead magnet + demo pentru serviciul AI
- [ ] Quiz „ce serviciu ți se potrivește" cu recomandare + ofertă
- [ ] Pagină testimoniale/recenzii agregate (+ schema Review)
- [ ] Pagini de comparație SEO („agenție vs freelancer", „mentenanță internă vs externalizată")
- [ ] Glosar de termeni marketing/web (long-tail, SEO programatic)
- [ ] Pagină publică „rezultate/cifre" (transparență ca diferențiator)
- [ ] Sitemap HTML, pagină status servicii, presă

---

## 6. Catalog de funcționalități

**Conversie & lead-gen:**
- Lead magnets cu email gate (ghid gratuit → abonat newsletter → secvență nurture)
- Multi-step quote form pentru proiecte mari (înlocuiește formularul simplu acolo unde miza e mare)
- Cal.com embed pe contact și pe paginile de servicii premium
- Exit-intent popup (cu măsură, A/B testat), sticky CTA pe mobil
- Live chat sau buton WhatsApp
- Social proof: logo-uri clienți, testimoniale, cifre `[confirmă: cifrele reale, vezi brand-voice §7]`
- Countdown real pe OTO (fără urgență falsă: oferta chiar expiră)
- Follow-up automat pe lead-uri: secvență de 3 emailuri Postmark

**Ecommerce:**
- Stripe Checkout în RON (+ EUR pentru clienții EN)
- Abonamente mentenanță cu upgrade/downgrade între planuri, planuri anuale cu discount
- Cupoane și prețuri promoționale, bundle-uri de pachete
- OTO post-checkout + upsell în emailul de confirmare
- Facturare automată + e-Factura la fiecare plată
- Customer portal Stripe (self-service)
- Recuperare coș abandonat: email la sesiune Checkout expirată

**Tehnic & calitate:**
- Optimizare imagini cu `astro:assets` peste tot, buget Core Web Vitals
- Breadcrumbs + schema, hreflang RO/EN, RSS feed
- Căutare pe site cu Pagefind (static, gratuit)
- Imagini OG generate automat per articol
- 404 inteligent cu căutare și linkuri utile
- Sentry + uptime monitoring
- Smoke tests Playwright în CI: rutele principale + fluxul de plată în test mode
- A/B testing pe heroes/CTA post-lansare (testăm, nu ghicim: exact poziționarea noastră)

**Automatizări (dogfooding pentru serviciul AI):**
- Notificări Slack instant pe lead/comandă
- Scoring simplu de lead-uri (buget + serviciu + urgență din formular)
- Raport săptămânal automat (trafic + conversii) pe Slack/email
- Draft-uri de postări social generate din articolele noi

---

## 7. Strategia de blog (rankare organică)

Obiectiv: blogul devine principalul canal de achiziție organică. SEO **național**, pe nișa
definită în `brand-voice.md` §3: neuromarketing, design bazat pe cercetare, eye-tracking
website, mentenanță website, consultanță marketing, branding, magazin online.
(Galați rămâne doar în footer + schema LocalBusiness.)

**Arhitectură: pillar + cluster, 3 clustere aliniate cu ce vindem:**
1. *Mentenanță & securitate website* → vinde abonamentele (MRR)
2. *Neuromarketing, design bazat pe cercetare & conversie* → vinde consultanța, auditurile și pachetele de design
3. *AI pentru afaceri mici (monitorizare & automatizare)* → vinde serviciul AI

Fiecare cluster: o pagină pillar (ghid definitiv) + 6-10 articole satelit interconectate,
cu internal linking sistematic spre paginile de servicii și pachete.

**Proces editorial (AI-asistat + Andrei):**
1. Cercetare de cuvinte cheie RO per cluster → calendar editorial lunar
2. Brief per articol (cuvânt cheie, intenție, CTA țintă) → draft AI
3. Review Andrei: voce personală, exemple reale, respectarea `brand-voice.md` (kill-list, fără em-dash, fără cifre inventate)
4. Publicare prin Keystatic
- Cadență țintă: 4-6 articole/lună în primele 3 luni, apoi 2-4/lună
- Primul task editorial: **rescrierea celor 4 articole existente** la noul standard

**E-E-A-T (avantajul nostru real):**
- Pagină de autor cu credențialele exacte din `brand-voice.md` §6 (doctor în marketing, cercetare în neuromarketing, ORCID, Google Scholar), schema Person + Article
- Bio scurt sub fiecare articol, citări și surse în articolele științifice

**Checklist on-page per articol:**
- [ ] Titlu + meta description optimizate, un singur H1
- [ ] Cuprins (TOC) la articolele lungi, reading time
- [ ] Imagini cu alt text, OG dedicat
- [ ] Secțiune FAQ cu schema acolo unde are sens
- [ ] CTA contextual: lead magnet sau pachetul relevant clusterului
- [ ] 2-3 linkuri interne spre servicii/articole, articole similare la final

**Distribuție & măsurare:** newsletter lunar (Postmark Broadcast), repurposing pe
LinkedIn-ul personal al lui Andrei, monitorizare în GSC (poziții, CTR) + conversii
asistate de blog în GA4, raport lunar în admin.

---

## 8. Idei strategice (croite pe profilul Simplead)

**Neuromarketingul ca armă comercială (unic pe piața RO):**
- **Audit neuromarketing productizat**: produs digital plătit, analiză predictivă eye-tracking pe site-ul/creativele clientului + raport PDF cu heatmaps. Preț fix, livrare rapidă, poartă de intrare spre proiecte mari. (Atenție la `brand-voice.md` §2: uneltele sunt mijloace, nu vedete; vindem interpretarea, nu aplicația.)
- **„Laboratorul"**: secțiune publică cu studii before/after cu heatmaps reale din proiecte: cea mai credibilă formă de portofoliu pentru poziționarea noastră.
- Demo interactiv pe propriul site: heatmap pe homepage, „testăm, nu ghicim" arătat live.

**Retenție MRR pe mentenanță:**
- **Raport lunar automat per client** (uptime, viteză, update-uri, backup-uri) trimis prin Postmark: valoarea devine vizibilă lunar, churn-ul scade. Diferențiator față de mentenanța „invizibilă".
- Planuri anuale cu discount (cash flow), win-back email la anulare.

**Eficiență de operator solo:**
- Onboarding automat post-plată: secvență email + formular de brief + link Cal.com
- Oferte/contracte cu semnătură electronică (Documenso)
- Colectare automată de testimoniale la final de proiect + cerere de recenzie Google

**Vizibilitate & autoritate:**
- Google Business Profile complet (recenzii, postări); SEO-ul de conținut rămâne național, conform deciziei din brand-voice
- Motor de personal branding: fiecare articol → postări LinkedIn pe profilul lui Andrei
- WhatsApp Business ca și canal de contact

**Dogfooding AI:**
- Chatbot pe site antrenat pe conținutul propriu: răspunde la întrebări, califică lead-uri și e demo viu pentru serviciul „AI pentru business". (Copy-ul respectă regula: AI prezentat pe monitorizare/automatizare, fără hype.)

---

## 9. Etapizare (6-10 săptămâni, workstream-uri parțial paralele)

### Faza 0 (săpt. 1): fundație
- [ ] Decizie finală hosting + migrare adapter (`@astrojs/vercel`)
- [ ] Cont Stripe: produse, prețuri, taxe; definirea pachetelor, a OTO-urilor și a produselor digitale (lucru de business, pornit din ziua 1; blochează Faza 2)
- [ ] Provisioning Postgres (Neon/Supabase) + schema inițială
- [ ] Migrare Resend → Postmark în `/api/contact`
- [ ] Kickoff juridic: termeni comerciali, retur, GDPR, ANPC
- [ ] SmartBill: generare token API + alegerea seriei de facturi pentru vânzările online (e-Factura merge prin SmartBill, nu necesită nimic în plus)

### Faza 1 (săpt. 1-2): conținut & blocante de site
- [ ] `site.ts` complet cu datele reale din `brand-voice.md` §3
- [ ] Statistici reale sau eliminarea lor (`brand-voice.md` §7), logo-uri clienți, foto Andrei
- [ ] Copy-ul `[COPY]` la serviciul AI confirmat; corectura „doctor în marketing"
- [ ] Banner cookies + politica de cookies
- [ ] Pagini legale finalizate
- [ ] Fix-uri mici: an dinamic în footer, OG real

### Faza 2 (săpt. 2-4): ecommerce
- [ ] Pagina `/pachete` cu prețuri și CTA de cumpărare
- [ ] Stripe Checkout (one-time) + Billing (abonamente mentenanță, legat de calculatorul existent)
- [ ] Webhook-uri + tabele comenzi/clienți în DB
- [ ] Pagina de mulțumire cu OTO + pagina de anulare
- [ ] Facturare automată prin SmartBill API la fiecare plată (factura pleacă pe emailul clientului)
- [ ] Emailuri tranzacționale Postmark + notificări Slack

### Faza 3 (săpt. 3-5): admin + blog
- [ ] `/admin` cu autentificare: comenzi, lead-uri
- [ ] Keystatic peste colecțiile blog/portofoliu
- [ ] Cercetare cuvinte cheie + calendar editorial pe cele 3 clustere
- [ ] Rescrierea celor 4 articole existente + primele 4-6 articole noi
- [ ] Pagina `/resurse` + primul lead magnet (email gate pe Postmark)

### Faza 4 (săpt. 4-6): versiunea EN
- [ ] Restructurare `site.ts` / `services.ts` / `content.ts` per-locale
- [ ] Pagini `src/pages/en/*`: core (homepage, servicii, despre, contact, mentenanță) + `/en/pachete` și checkout
- [ ] hreflang + language switcher în navbar
- [ ] Blog/portofoliu EN rămân post-lansare

### Faza 5 (săpt. 6-8): QA & lansare
- [ ] Test end-to-end flux de cumpărare (test mode → live): checkout, OTO, factură, emailuri, Slack
- [ ] Lighthouse (performanță, SEO, a11y), test pe mobil
- [ ] GSC + Bing: sitemap trimis; evenimente GA4 ecommerce verificate
- [ ] Turnstile pe formulare, Sentry + uptime active
- [ ] Verificare redirecturi 301, banner GDPR, linkuri ANPC/SOL

### Post-lansare (continuu)
- Cadență blog susținută, blog/portofoliu EN incremental
- Produse digitale noi (primul: auditul neuromarketing), secțiunea „Laborator"
- Raport lunar automat pentru clienții de mentenanță
- Chatbot AI, mini-tool de audit gratuit, quiz de servicii
- A/B testing pe heroes/CTA; ads de validare (Google + Meta) când funnel-ul e dovedit organic
- Google Business Profile întreținut, colectare recenzii

---

## 10. Riscuri & dependențe

- **Scope mare „totul la lansare"** → 6-10 săptămâni. Opțiune de rezervă: soft-launch cu site-ul de prezentare finalizat (Fazele 0-1) și comerțul activat când Fazele 2-3 sunt gata. Decizia îi aparține lui Andrei.
- **Blocante legale pentru vânzare**: termeni comerciali, drept de retragere, GDPR. Pornite din săptămâna 1, cu input juridic. (e-Factura nu mai e risc: o gestionează SmartBill.)
- **Definirea pachetelor, prețurilor și OTO-urilor**: primul livrabil cerut de la Andrei; blochează Faza 2.
- **Conținut de furnizat de Andrei** (listat și în `brand-voice.md` §7): foto, logo-uri clienți, cifre reale, confirmări de copy, traduceri EN de revizuit.
- **Cadența de blog**: fără cele 4-6 articole/lună în primele luni, rankarea întârzie; procesul AI-asistat există tocmai ca să o susțină.

---

## 11. Ce avem nevoie de la Andrei (checklist)

Lista completă de decizii, accese și materiale, organizată pe momentul în care blochează lucrul.
Se completează aici, ca registrul din `brand-voice.md` §7.

### Decizii de business (blochează Faza 2, cele mai urgente)
- [ ] **Lista pachetelor vândabile + prețuri**: ce pachete punem pe `/pachete`, per serviciu și bundle-uri (nume, ce include, preț, termen de livrare)
- [ ] **Planurile de mentenanță + prețuri**: lunar și anual (cu ce discount la anual), ce include fiecare plan; legăm de calculatorul existent de pe `/mentenanta`
- [ ] **Ofertele OTO**: ce ofertă apare după fiecare tip de achiziție, la ce discount, cât timp e valabilă
- [ ] **Primele produse digitale + prețuri**: recomandare de început: auditul neuromarketing + un ghid gratuit ca lead magnet

### Conturi & accese (Faza 0)
- [ ] **Stripe**: cont creat (sau acces la cel existent) + activare plăți live pe entitatea Simplead
- [ ] **SmartBill**: token API (din cont: Contul meu → Integrări/API) + seria de facturi pe care o folosim pentru vânzările online
- [ ] **Postmark**: cont creat + **acces DNS pe simplead.ro** pentru verificarea domeniului de trimitere (SPF, DKIM, return-path)
- [ ] **Slack**: workspace-ul + canalul în care vrei notificările (propunere: #vanzari și #site); webhook-ul îl generez eu cu acces
- [ ] **Hosting**: confirmare Vercel (cont creat, gratuit la început) + acces DNS pentru mutarea domeniului pe producție
- [ ] **Bază de date**: acord să creez cont Neon/Supabase pe emailul firmei

### Conținut (Faza 1, se suprapune cu `brand-voice.md` §7)
- [ ] Foto reală Andrei (pentru „Omul din spate", `/despre`, contact)
- [ ] Logo-uri clienți pentru trust strip (SVG/PNG)
- [ ] Cifre reale (ani, proiecte, clienți) sau decizia de a renunța la cifre
- [ ] Confirmarea copy-ului `[COPY]` la serviciul AI (`services.ts`)
- [ ] Titlul de afișaj preferat pentru doctorat (vezi `brand-voice.md` §6)
- [ ] Adresă completă + program de lucru pentru `site.ts` și schema LocalBusiness
- [ ] Linkurile social media reale (Facebook, Instagram, LinkedIn, YouTube)

### Juridic (Faza 0-1)
- [ ] Termeni comerciali + politică de retragere/retur: eu pregătesc draftul, tu îl treci printr-un jurist
- [ ] Confirmarea entității de pe care vindem online (datele din `brand-voice.md` §3: CIF 41501661)

### Marketing (Faza 3+)
- [ ] Acces GA4, Google Search Console, Google Business Profile (sau le creăm împreună)
- [ ] Link Cal.com pentru booking (`CALCOM_LINK`)
- [ ] 2-3 referințe de ton pentru blog (site-uri/texte care îți plac)
- [ ] Validarea calendarului editorial pe cele 3 clustere (îl propun eu, tu îl aprobi)
