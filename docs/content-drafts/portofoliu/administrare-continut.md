Status: draft

# Proiect: Administrare & conținut

Sursă: `SELECT title,client,service,summary,challenge,solution,result,body,seo_title,seo_description FROM projects WHERE slug='administrare-continut'` (Postgres, read-only), randare verificată în `src/pages/portofoliu/[slug].astro` (pagina de detaliu) și `src/components/sections/PortfolioPageGrid.astro` (cardul din listă), reguli din `docs/brand-voice.md` și găsirile deja consemnate în `docs/audit-text-v1.md`.

### [db:projects.service WHERE slug='administrare-continut' — eyebrow deasupra titlului + etichetă "Serviciu" din sidebar, aceeași valoare afișată de 2 ori pe pagină]
**Original:** Social Media
**Propus:** Social Media (fără modificări, deja conform brand-voice)

### [db:projects.title WHERE slug='administrare-continut' — titlul (H1) paginii de detaliu + titlul cardului din grila /portofoliu]
**Original:** Administrare & conținut
**Propus:** Administrare & conținut (fără modificări, deja conform brand-voice)

### [db:projects.summary WHERE slug='administrare-continut' — subtitlul din header-ul paginii + textul cardului din grila /portofoliu, aceeași valoare afișată în 2 locuri]
**Original:** Administrare social media și producție de conținut, pe o strategie clară, pe obiective.
**Propus:** Administrare social media și producție de conținut, cu strategie clară și obiective de business.

(Notă: doar strângere de ritm, repetiția „pe o strategie... pe obiective" suna împiedicat citită cu voce tare; sensul rămâne identic.)

### [db:projects.body WHERE slug='administrare-continut' → secțiunea "## Provocarea" din articolul randat ca markdown; conține și un comentariu HTML `<!-- TODO: detalii reale. -->`, invizibil pe pagină, sărit din citat]
**Original:** Clientul avea nevoie de o prezență constantă pe social media, fără să-și consume timpul propriu pe asta.
**Propus:** Clientul avea nevoie de o prezență constantă pe social media, fără să își consume propriul timp cu asta.

(Notă: comentariul `<!-- TODO: detalii reale. -->` de dinaintea paragrafului arată că e text generic de completat cu detalii reale ale cazului, nu doar stilistic; neatins aici, doar am șlefuit fraza existentă.)

### [db:projects.body WHERE slug='administrare-continut' → secțiunea "## Ce am făcut" din articol, listă cu puncte]
**Original:**
- Strategie și calendar editorial
- Producție de conținut (grafică + copywriting)
- Administrare pagini și comunitate
- Raportare lunară pe obiective
**Propus:** (fără modificări, deja conform brand-voice — concret, fără cuvinte din kill-list, fără triadă goală)

### [db:projects.body WHERE slug='administrare-continut' → secțiunea "## Rezultatul" din articol; precedată de comentariul HTML `<!-- TODO: completează cu rezultate concrete. -->`, invizibil pe pagină, sărit din citat]
**Original:** O prezență coerentă, constantă și măsurabilă pe canalele potrivite.
**Propus:** O prezență constantă pe canalele potrivite, cu raportare lunară pe obiective.

(Notă: originalul e o triadă de adjective de umplutură — "coerentă, constantă și măsurabilă" — genul exact interzis în brand-voice.md §4 ("rapid, sigur și actualizat"). Am înlocuit-o cu un fapt deja confirmat în alt câmp al aceluiași proiect ("raportare lunară pe obiective", din "Ce am făcut"), nu cu o cifră nouă. Comentariul `<!-- TODO: completează cu rezultate concrete. -->` confirmă că rezultatul e încă vag și fără cifre — problemă deja semnalată în `audit-text-v1.md` (secțiunea Majoră), neschimbată de fond aici, doar am scos triada.)

### [db:projects.client WHERE slug='administrare-continut' — eticheta "Client" din sidebar-ul paginii de detaliu]
**Original:** Client Simplead
**Propus:** Client Simplead (fără modificări)

Notă: pare dată placeholder / de verificat cu Andrei, neatins în această rundă. Confirmă în `docs/audit-text-v1.md` (Critică) — 3 din 6 proiecte publicate au același placeholder „Client Simplead"; nu am inventat un nume real.

### [db:projects.result WHERE slug='administrare-continut' — eticheta "Rezultat" din sidebar-ul paginii de detaliu, randată ca markdown]
**Original:** Comunicare constantă și măsurabilă, aliniată la obiectivele de business.
**Propus:** Comunicare constantă, aliniată la obiectivele de business, cu raportare lunară.

(Notă: la fel ca la "## Rezultatul" de mai sus, e un rezultat fără nicio cifră; am păstrat asta neschimbat de fond (nu am inventat un procent sau un număr) și am înlocuit "măsurabilă" — o promisiune fără dovadă alăturată — cu faptul concret deja menționat în proiect, raportarea lunară.)

### [db:projects.challenge WHERE slug='administrare-continut' — câmp populat în DB, editabil din `/admin/portofoliu`, dar NEAFIȘAT în acest moment pe pagina publică `/portofoliu/administrare-continut` (nu există în template-ul `[slug].astro`)]
**Original:** O prezență constantă și coerentă pe social media, care aduce clienți, nu doar aprecieri.
**Propus:** O prezență constantă și coerentă pe social media, care aduce clienți, nu doar aprecieri. (fără modificări, deja conform brand-voice)

(Notă: text bun, foloseste antiteza „nu doar X" o singură dată — bugetul de o antiteză per pagină permis de brand-voice.md §4 e respectat de acest proiect dacă textul ar deveni vreodată vizibil. Momentan câmpul nu se randează public; semnalăm doar pentru completitudine, nu e nevoie de acțiune urgentă.)

### [db:projects.solution WHERE slug='administrare-continut' — câmp populat în DB, editabil din `/admin/portofoliu`, dar NEAFIȘAT în acest moment pe pagina publică `/portofoliu/administrare-continut`]
**Original:** Calendar editorial, producție de conținut (grafică + copywriting) și administrare, cu raportare pe obiective.
**Propus:** Calendar editorial, producție de conținut (grafică + copywriting) și administrare, cu raportare pe obiective. (fără modificări, deja conform brand-voice)

(Notă: la fel ca mai sus, câmp admin-only azi, nu apare pe pagina live; textul e deja curat, fără nimic din kill-list.)

### [db:projects.seo_title și db:projects.seo_description WHERE slug='administrare-continut']
**Original:** (ambele NULL în DB)
**Propus:** (ambele NULL — fără modificări aici; codul din `[slug].astro` cade automat pe `project.title` / `project.summary` ca titlu și descriere SEO, deci pagina tot are un `<title>`/meta description, doar nu unul dedicat SEO)

(Notă: e găsirea Minoră deja consemnată în `audit-text-v1.md` — toate cele 10 înregistrări publicate din DB au `seo_title`/`seo_description` goale. Nu am completat cu text nou aici ca să nu inventăm un unghi SEO fără acordul lui Andrei; dacă se dorește, poate fi o rundă separată, dedicată SEO, pe toate proiectele/postările deodată.)
