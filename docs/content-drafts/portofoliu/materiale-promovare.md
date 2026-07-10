Status: draft

# Proiect: Materiale de promovare

Sursă: `SELECT title,client,service,summary,challenge,solution,result,body,seo_title,seo_description FROM projects WHERE slug='materiale-promovare'` (Postgres, read-only), randare verificată în `src/pages/portofoliu/[slug].astro` (pagina de detaliu) și `src/components/sections/PortfolioPageGrid.astro` (cardul din listă), reguli din `docs/brand-voice.md` și găsirile deja consemnate în `docs/audit-text-v1.md`.

### [db:projects.service WHERE slug='materiale-promovare' — eyebrow deasupra titlului + etichetă "Serviciu" din sidebar, aceeași valoare afișată de 2 ori pe pagină]
**Original:** Grafică
**Propus:** Grafică (fără modificări, deja conform brand-voice)

### [db:projects.title WHERE slug='materiale-promovare' — titlul (H1) paginii de detaliu + titlul cardului din grila /portofoliu]
**Original:** Materiale de promovare
**Propus:** Materiale de promovare (fără modificări, deja conform brand-voice)

### [db:projects.summary WHERE slug='materiale-promovare' — subtitlul din header-ul paginii + textul cardului din grila /portofoliu, aceeași valoare afișată în 2 locuri]
**Original:** Set complet de materiale de promovare (print și digital), coerente cu identitatea de brand.
**Propus:** Set complet de materiale de promovare (print și digital), coerente cu identitatea de brand. (fără modificări, deja conform brand-voice)

### [db:projects.body WHERE slug='materiale-promovare' → secțiunea "## Provocarea" din articolul randat ca markdown; conține și un comentariu HTML `<!-- TODO: detalii reale ale proiectului. -->`, invizibil pe pagină, sărit din citat]
**Original:** Brandul avea nevoie de materiale de promovare care să transmită profesionalism și să fie consecvente pe print și online.
**Propus:** Brandul avea nevoie de materiale de promovare care să transmită profesionalism și să fie consecvente pe print și online. (fără modificări, deja conform brand-voice)

(Notă: comentariul `<!-- TODO: detalii reale ale proiectului. -->` de dinaintea paragrafului arată că e text generic de completat cu detalii reale ale cazului, nu doar stilistic; neatins aici, textul existent e deja curat, fără cuvinte din kill-list.)

### [db:projects.body WHERE slug='materiale-promovare' → secțiunea "## Ce am făcut" din articol, listă cu puncte]
**Original:**
- Concept vizual pentru campanie
- Materiale print (broșuri, flyere, roll-up)
- Adaptări pentru social media
- Ghid scurt de utilizare
**Propus:** (fără modificări, deja conform brand-voice — concret, fără cuvinte din kill-list, fără triadă goală)

### [db:projects.body WHERE slug='materiale-promovare' → secțiunea "## Rezultatul" din articol; precedată de comentariul HTML `<!-- TODO: completează cu rezultate concrete. -->`, invizibil pe pagină, sărit din citat]
**Original:** Un set de materiale unitar, gata de folosit pe toate canalele.
**Propus:** Un set de materiale unitar, gata de folosit pe toate canalele. (fără modificări, deja conform brand-voice)

(Notă: comentariul `<!-- TODO: completează cu rezultate concrete. -->` confirmă că rezultatul e încă vag și fără cifre, exact problema deja semnalată în `audit-text-v1.md` (secțiunea Majoră, "4 din 6 proiecte au body cu TODO și rezultat fără cifre"). Textul rămas nu conține cuvinte din kill-list și nu am inventat o cifră ca să-l "umplem"; rămâne de completat de Andrei cu un rezultat concret.)

### [db:projects.client WHERE slug='materiale-promovare' — eticheta "Client" din sidebar-ul paginii de detaliu]
**Original:** Client Simplead
**Propus:** Client Simplead (fără modificări)

Notă: pare dată placeholder / de verificat cu Andrei, neatins în această rundă. Confirmă în `docs/audit-text-v1.md` (Critică) — 3 din 6 proiecte publicate au același placeholder „Client Simplead"; nu am inventat un nume real.

### [db:projects.result WHERE slug='materiale-promovare' — eticheta "Rezultat" din sidebar-ul paginii de detaliu, randată ca markdown]
**Original:** Comunicare vizuală coerentă și recognoscibilă, ușor de extins de către client.
**Propus:** Comunicare vizuală coerentă și recognoscibilă, ușor de extins de către client. (fără modificări, deja conform brand-voice)

(Notă: nu e o triadă goală de tip „rapid, sigur și actualizat" — sunt două calități legate de un fapt concret, „ușor de extins de către client" — și nu conține cuvinte din kill-list; am lăsat-o neschimbată.)

### [db:projects.challenge WHERE slug='materiale-promovare' — câmp populat în DB, editabil din `/admin/portofoliu`, dar NEAFIȘAT în acest moment pe pagina publică `/portofoliu/materiale-promovare` (nu există în template-ul `[slug].astro`)]
**Original:** Materiale care arată profesionist și unitar, pe toate punctele de contact cu publicul.
**Propus:** Materiale care arată profesionist și unitar, pe toate punctele de contact cu publicul. (fără modificări, deja conform brand-voice)

(Notă: text curat, fără cuvinte din kill-list. Momentan câmpul nu se randează public; semnalăm doar pentru completitudine, nu e nevoie de acțiune urgentă.)

### [db:projects.solution WHERE slug='materiale-promovare' — câmp populat în DB, editabil din `/admin/portofoliu`, dar NEAFIȘAT în acest moment pe pagina publică `/portofoliu/materiale-promovare`]
**Original:** Am proiectat un set de materiale (broșuri, flyere, social media) pornind de la sistemul vizual al brandului, validat cu principii de ierarhie vizuală.
**Propus:** Am proiectat un set de materiale (broșuri, flyere, social media) pornind de la sistemul vizual al brandului, validat cu principii de ierarhie vizuală.

(Notă: singura observație e persoana gramaticală: „Am proiectat" e persoana I singular, în timp ce brand-voice.md §1 cere implicit „noi" pe secțiunile de serviciu/portofoliu, cu „eu" rezervat pentru /despre. Nu am schimbat textul de fond, pentru că, la fel ca `challenge`, câmpul nu e randat public azi; dacă va deveni vizibil, ar trebui trecut la „Am proiectat" → „Noi am proiectat" / reformulat la plural, ca restul cazurilor de portofoliu. Semnalăm aici ca să nu se piardă observația, fără să atingem baza de date în această rundă.)

### [db:projects.seo_title și db:projects.seo_description WHERE slug='materiale-promovare']
**Original:** (ambele NULL în DB)
**Propus:** (ambele NULL — fără modificări aici; codul din `[slug].astro` cade automat pe `project.title` / `project.summary` ca titlu și descriere SEO, deci pagina tot are un `<title>`/meta description, doar nu unul dedicat SEO)

(Notă: e găsirea Minoră deja consemnată în `audit-text-v1.md` — toate cele 10 înregistrări publicate din DB au `seo_title`/`seo_description` goale. Nu am completat cu text nou aici ca să nu inventăm un unghi SEO fără acordul lui Andrei; dacă se dorește, poate fi o rundă separată, dedicată SEO, pe toate proiectele/postările deodată.)
