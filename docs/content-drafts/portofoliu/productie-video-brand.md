Status: draft

# Proiect: Producție video brand

Sursă: `SELECT title,client,service,summary,challenge,solution,result,body,seo_title,seo_description FROM projects WHERE slug='productie-video-brand'` (Postgres, read-only), randare verificată în `src/pages/portofoliu/[slug].astro` (pagina de detaliu) și `src/components/sections/PortfolioPageGrid.astro` (cardul din listă), reguli din `docs/brand-voice.md` și găsirile deja consemnate în `docs/audit-text-v1.md`.

### [db:projects.service WHERE slug='productie-video-brand' — eyebrow deasupra titlului + eticheta "Serviciu" din sidebar, aceeași valoare afișată de 2 ori pe pagină]
**Original:** Foto-Video
**Propus:** Foto-Video (fără modificări, deja conform brand-voice)

### [db:projects.title WHERE slug='productie-video-brand' — titlul (H1) paginii de detaliu + titlul cardului din grila /portofoliu]
**Original:** Producție video brand
**Propus:** Producție video brand (fără modificări, deja conform brand-voice)

### [db:projects.summary WHERE slug='productie-video-brand' — subtitlul din header-ul paginii + textul cardului din grila /portofoliu, aceeași valoare afișată în 2 locuri]
**Original:** Producție video pentru brand: de la concept la livrare, gândită să rețină atenția.
**Propus:** Producție video pentru brand: de la concept la livrare, gândită să rețină atenția. (fără modificări, deja conform brand-voice)

(Notă: „de la concept la livrare" descrie etape reale ale procesului, nu e clișeul de umplutură „de la X până la Y" folosit repetat; apare o singură dată pe pagină.)

### [db:projects.body WHERE slug='productie-video-brand' → secțiunea "## Provocarea" din articolul randat ca markdown; conține și un comentariu HTML `<!-- TODO: detalii reale. -->`, invizibil pe pagină, sărit din citat]
**Original:** Brandul avea nevoie de conținut video care să funcționeze în feed: scurt, clar și cu impact din prima secundă.
**Propus:** Brandul avea nevoie de conținut video care să transmită mesajul clar, din primele secunde de vizionare.

(Notă: originalul înșira trei calificative la rând ("scurt, clar și cu impact din prima secundă"), tiparul de triadă de dragul ritmului semnalat în brand-voice.md §4; am strâns la o singură cerință concretă, fără să adaug fapte noi. Comentariul `<!-- TODO: detalii reale. -->` de dinaintea paragrafului arată că e text generic, de completat cu detalii reale ale cazului; neatins aici, doar am șlefuit fraza existentă.)

### [db:projects.body WHERE slug='productie-video-brand' → secțiunea "## Ce am făcut" din articol, listă cu puncte]
**Original:**
- Concept și scenariu
- Filmare și producție
- Montaj și adaptări pentru formate (feed, story, reels)
**Propus:** (fără modificări, deja conform brand-voice — concret, fără cuvinte din kill-list, fără triadă goală)

### [db:projects.body WHERE slug='productie-video-brand' → secțiunea "## Rezultatul" din articol; precedată de comentariul HTML `<!-- TODO: completează cu rezultate concrete. -->`, invizibil pe pagină, sărit din citat]
**Original:** Conținut video gata de distribuit pe canalele potrivite.
**Propus:** Conținut video gata de distribuit pe canalele potrivite. (fără modificări, deja conform brand-voice)

(Notă: fraza nu conține niciun cuvânt din kill-list și nicio triadă, dar e un rezultat fără nicio cifră sau fapt verificabil, iar comentariul `<!-- TODO: completează cu rezultate concrete. -->` confirmă că e text de completat. Găsire deja semnalată în `audit-text-v1.md` (secțiunea Majoră, „rezultat vag, fără cifre"); nu am inventat un număr sau un fapt nou, doar am lăsat textul neschimbat până se confirmă un rezultat real.)

### [db:projects.client WHERE slug='productie-video-brand' — eticheta "Client" din sidebar-ul paginii de detaliu]
**Original:** Client Simplead
**Propus:** Client Simplead (fără modificări)

Notă: pare dată placeholder / de verificat cu Andrei, neatins în această rundă. Confirmă în `docs/audit-text-v1.md` (Critică) — 3 din 6 proiecte publicate au același placeholder „Client Simplead"; nu am inventat un nume real.

### [db:projects.result WHERE slug='productie-video-brand' — eticheta "Rezultat" din sidebar-ul paginii de detaliu, randată ca markdown]
**Original:** Material video profesionist, potrivit pentru campanii plătite și social media.
**Propus:** Video gata pentru campanii plătite și social media.

(Notă: am scos "profesionist" — o etichetă de auto-laudă fără dovadă alăturată, în același spirit ca `remarcabil`/`memorabil` din kill-list, deși nu e cuvântul exact listat — și am scurtat "Material video" la "Video". Nu am adăugat niciun fapt sau cifră nouă; claim-ul rămas ("potrivit pentru campanii plătite și social media") e identic cu originalul.)

### [db:projects.challenge WHERE slug='productie-video-brand' — câmp populat în DB, editabil din `/admin/portofoliu`, dar NEAFIȘAT în acest moment pe pagina publică `/portofoliu/productie-video-brand` (nu există în template-ul `[slug].astro`)]
**Original:** Conținut video care prinde în primele secunde și transmite clar mesajul brandului.
**Propus:** Conținut video care prinde în primele secunde și transmite clar mesajul brandului. (fără modificări, deja conform brand-voice)

(Notă: text concret, fără cuvinte din kill-list. Câmpul nu se randează public azi; semnalăm doar pentru completitudine, nu e nevoie de acțiune urgentă.)

### [db:projects.solution WHERE slug='productie-video-brand' — câmp populat în DB, editabil din `/admin/portofoliu`, dar NEAFIȘAT în acest moment pe pagina publică `/portofoliu/productie-video-brand`]
**Original:** Concept, filmare și montaj realizate intern (fotograf cu peste 10 ani experiență), cu accent pe ierarhia atenției și ritm.
**Propus:** Concept, filmare și montaj realizate intern (fotograf cu peste 10 ani experiență), cu accent pe ierarhia atenției și ritm. (fără modificări, deja conform brand-voice)

(Notă: câmp admin-only azi, nu apare pe pagina live. Cifra „peste 10 ani experiență" se referă la fotograful colaborator, nu la Simplead ca firmă — n-am găsit-o semnalată ca neconfirmată în `audit-text-v1.md`, așa că am lăsat-o neschimbată, fără să o transform în `[confirmă: ...]`; dacă Andrei nu poate susține exact cifra, merită verificată separat.)

### [db:projects.seo_title și db:projects.seo_description WHERE slug='productie-video-brand']
**Original:** (ambele goale/NULL în DB)
**Propus:** (ambele goale, fără modificări aici; codul din `[slug].astro` cade automat pe `project.title` / `project.summary` ca titlu și descriere SEO, deci pagina tot are un `<title>`/meta description, doar nu unul dedicat SEO)

(Notă: e găsirea Minoră deja consemnată în `audit-text-v1.md` — toate cele 10 înregistrări publicate din DB au `seo_title`/`seo_description` goale. Nu am completat cu text nou aici ca să nu inventăm un unghi SEO fără acordul lui Andrei; dacă se dorește, poate fi o rundă separată, dedicată SEO, pe toate proiectele/postările deodată.)
