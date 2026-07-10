Status: draft

# Servicii rapide (/servicii-rapide)

Sursă: `src/pages/servicii-rapide.astro` citit integral (structură, header, CTA-uri, footer, stare goală) + `docs/brand-voice.md` și `docs/audit-text-v1.md` ca referință de reguli; conținutul celor 5 pachete `fix-service` citit din DB cu `SELECT slug,name,description,note,features FROM packages WHERE active=true AND kind='fix-service' ORDER BY sort;` (optimizare-viteza, configurare-email-pro, securizare-malware, migrare-site, setup-cloudflare).

### [src/pages/servicii-rapide.astro > PageHeader eyebrow]
**Original:** Lucrări punctuale
**Propus:** Lucrări punctuale (fără modificări, deja conform brand-voice)

### [src/pages/servicii-rapide.astro > PageHeader title + accent]
**Original:** Servicii rapide, la preț fix
**Propus:** Servicii rapide, la preț fix (fără modificări, deja conform brand-voice)

### [src/pages/servicii-rapide.astro > PageHeader subtitle]
**Original:** Ai o problemă concretă pe site? O rezolvăm punctual, cu preț clar de la început, fără abonament.
**Propus:** Ai o problemă concretă pe site? O rezolvăm punctual, cu preț clar de la început, fără abonament. (fără modificări, deja conform brand-voice: persoana "noi" corectă, concret, fără antiteză, fără em-dash)

### [db:packages.name WHERE slug='optimizare-viteza']
**Original:** Optimizare viteză site
**Propus:** Optimizare viteză site (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='optimizare-viteza']
**Original:** Site mai rapid: cache, imagini, scripturi și scor mai bun pe mobil.
**Propus:** Site mai rapid: cache, imagini, scripturi și scor mai bun pe mobil. (fără modificări, deja conform brand-voice: folosește ":" nu "—", concret, fără cuvinte din kill-list)

### [db:packages.features WHERE slug='optimizare-viteza']
**Original:**
- Audit de viteză (PageSpeed/Core Web Vitals) || Măsurăm încărcarea pe mobil și desktop
- Cache + compresie + lazy-load imagini
- Curățare scripturi și plugin-uri grele
- Raport înainte/după

**Propus:** (fără modificări, deja conform brand-voice; lista rămâne identică, inclusiv formatul "etichetă || detaliu" pentru tooltip-ul de hover)
- Audit de viteză (PageSpeed/Core Web Vitals) || Măsurăm încărcarea pe mobil și desktop
- Cache + compresie + lazy-load imagini
- Curățare scripturi și plugin-uri grele
- Raport înainte/după

### [db:packages.name WHERE slug='configurare-email-pro']
**Original:** Configurare email profesional
**Propus:** Configurare email profesional (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='configurare-email-pro']
**Original:** Email pe domeniul tău, cu livrabilitate corectă (nu mai ajunge în spam).
**Propus:** Email pe domeniul tău, cu livrabilitate corectă (nu mai ajunge în spam). (fără modificări, deja conform brand-voice)

### [db:packages.features WHERE slug='configurare-email-pro']
**Original:**
- Setup Google Workspace sau Microsoft 365
- Înregistrări SPF, DKIM, DMARC || Autentificarea care ține emailul departe de spam
- Migrarea emailurilor existente (opțional)
- Test de livrabilitate

**Propus:** (fără modificări, deja conform brand-voice)
- Setup Google Workspace sau Microsoft 365
- Înregistrări SPF, DKIM, DMARC || Autentificarea care ține emailul departe de spam
- Migrarea emailurilor existente (opțional)
- Test de livrabilitate

### [db:packages.name WHERE slug='securizare-malware']
**Original:** Securizare & scanare malware
**Propus:** Securizare & scanare malware (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='securizare-malware']
**Original:** Curățăm site-ul infectat și îl securizăm ca să nu se repete.
**Propus:** Curățăm site-ul infectat și îl securizăm ca să nu se repete. (fără modificări, deja conform brand-voice: persoana "noi" corectă, concret)

### [db:packages.note WHERE slug='securizare-malware']
**Original:** Prețul final depinde de gravitatea infecției și de mărimea site-ului.
**Propus:** Prețul final depinde de gravitatea infecției și de mărimea site-ului. (fără modificări, deja conform brand-voice: e o precizare factuală, nu o promisiune)

### [db:packages.features WHERE slug='securizare-malware']
**Original:**
- Scanare și curățare malware
- Hardening (parole, permisiuni, plugin-uri)
- Firewall și reguli de protecție
- Backup și monitorizare după curățare

**Propus:** (fără modificări, deja conform brand-voice)
- Scanare și curățare malware
- Hardening (parole, permisiuni, plugin-uri)
- Firewall și reguli de protecție
- Backup și monitorizare după curățare

### [db:packages.name WHERE slug='migrare-site']
**Original:** Migrare site
**Propus:** Migrare site (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='migrare-site']
**Original:** Mutăm site-ul pe alt hosting sau domeniu, fără downtime și fără pierderi.
**Propus:** Mutăm site-ul pe alt hosting sau domeniu, fără downtime și fără pierderi. (fără modificări; "fără X și fără Y" e o enumerare de doi termeni concreți, nu antiteza "nu doar X, ci Y" și nici triadă goală, deci nu intră sub restricția din §4)

### [db:packages.features WHERE slug='migrare-site']
**Original:**
- Migrare fișiere + bază de date
- Configurare DNS și domeniu
- Redirecturi 301, fără pierderi SEO || Păstrăm pozițiile în Google după mutare
- Verificare SSL și funcționare

**Propus:** (fără modificări, deja conform brand-voice)
- Migrare fișiere + bază de date
- Configurare DNS și domeniu
- Redirecturi 301, fără pierderi SEO || Păstrăm pozițiile în Google după mutare
- Verificare SSL și funcționare

### [db:packages.name WHERE slug='setup-cloudflare']
**Original:** Setup & optimizare Cloudflare
**Propus:** Setup & optimizare Cloudflare (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='setup-cloudflare']
**Original:** CDN, cache și protecție prin Cloudflare, configurate corect.
**Propus:** CDN, cache și protecție prin Cloudflare, configurate corect. (fără modificări; enumerarea "CDN, cache și protecție" e concretă/tehnică, nu triadă goală de tip "rapid, sigur și actualizat")

### [db:packages.features WHERE slug='setup-cloudflare']
**Original:**
- Conectare domeniu la Cloudflare
- Cache și reguli de performanță
- WAF și protecție de bază
- SSL și redirecturi corecte

**Propus:** (fără modificări, deja conform brand-voice)
- Conectare domeniu la Cloudflare
- Cache și reguli de performanță
- WAF și protecție de bază
- SSL și redirecturi corecte

### [src/pages/servicii-rapide.astro > buton CTA "Cumpără acum" (afișat pe fiecare card, dacă pachetul poate fi cumpărat direct)]
**Original:** Cumpără acum
**Propus:** Cumpără acum (fără modificări, deja conform brand-voice)

### [src/pages/servicii-rapide.astro > buton CTA "Cere ofertă →" (afișat pe fiecare card)]
**Original:** Cere ofertă →
**Propus:** Cere o ofertă → (aliniere la formularea canonică din brand-voice.md §3, "CTA principal = «Cere o ofertă»"; nu-i lipsește nimic de conținut, doar unificăm cu restul site-ului)

### [src/pages/servicii-rapide.astro > paragraf footer sub grilă (`sr-foot`)]
**Original:** Nu găsești ce-ți trebuie? Spune-ne ce ai nevoie și îți dăm un preț.
**Propus:** Nu găsești ce-ți trebuie? Spune-ne ce ai nevoie și îți dăm un preț. (fără modificări, deja conform brand-voice: "noi" corect, fără clișee)

### [src/pages/servicii-rapide.astro > paragraf stare goală (`sr-empty`, afișat doar dacă nu există pachete active)]
**Original:** Pregătim lista de lucrări punctuale. Între timp, scrie-ne ce ai nevoie.
**Propus:** Pregătim lista de lucrări punctuale. Între timp, scrie-ne ce ai nevoie. (fără modificări, deja conform brand-voice)
