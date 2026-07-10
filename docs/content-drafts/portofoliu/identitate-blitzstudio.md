Status: draft

# Portofoliu — Identitate vizuală completă (Blitzstudio)

Sursă: `db:projects` WHERE `slug='identitate-blitzstudio'` (coloane `title, client, service, summary, challenge, solution, result, body, seo_title, seo_description`), citite prin `docker exec simplead_db psql`; verificat și randarea publică în `src/pages/portofoliu/[slug].astro` ca să știu ce câmpuri sunt afișate efectiv pe pagină și în ce ordine (eyebrow=service, H1=title, subtitlu=summary, articol=body, sidebar=client/service/result). Câmpurile `challenge` și `solution` **nu sunt randate public azi** (doar folosite în `/admin`), dar le-am revizuit oricum mai jos, conform cerinței. `seo_title`/`seo_description` sunt goale (`NULL`) în DB, deci nu există text de revizuit acolo (pagina cade automat pe `title`/`summary` ca fallback).

### [db:projects.service WHERE slug='identitate-blitzstudio' — eyebrow deasupra titlului]
**Original:** Branding
**Propus:** Branding (fără modificări, deja conform brand-voice)

### [db:projects.title WHERE slug='identitate-blitzstudio' — H1]
**Original:** Identitate vizuală completă
**Propus:** Identitate vizuală completă (fără modificări, deja conform brand-voice)

### [db:projects.summary WHERE slug='identitate-blitzstudio' — subtitlu sub H1]
**Original:** Identitate vizuală completă și coerentă, aplicată unitar pe toate materialele.
**Propus:** Identitate vizuală completă și coerentă, aplicată unitar pe toate materialele. (fără modificări, deja conform brand-voice)

Notă: acest câmp a fost deja editat în această sesiune pentru a scoate „memorabilă" / „remarcată" (kill-list). Confirmăm că varianta curentă e curată: fără cuvinte din kill-list, fără antiteză, fără em-dash.

### [db:projects.body WHERE slug='identitate-blitzstudio' — secțiunea "## Provocarea" din articol]
**Original:** Brandul avea nevoie de o identitate vizuală clară și consecventă, ușor de aplicat pe toate punctele de contact.
**Propus:** Brandul avea nevoie de o identitate vizuală clară și consecventă, ușor de aplicat pe toate punctele de contact.

Notă: nicio încălcare de kill-list aici (fără em-dash, fără antiteză, fără cuvinte interzise), deci nu am schimbat sensul sau formularea. În sursă, paragraful e precedat de comentariul `<!-- TODO: detalii reale. -->` (comentariu HTML, invizibil pe pagină, l-am omis ca bloc separat conform regulii „skip code comments"), care arată însă că paragraful e încă un placeholder generic, nu provocarea reală a proiectului. Recomand să ceri lui Andrei detaliile concrete (ce anume nu funcționa la identitatea veche a Blitzstudio) înainte de publicare finală; nu am inventat nimic în loc.

### [db:projects.body WHERE slug='identitate-blitzstudio' — secțiunea "## Ce am făcut" din articol (listă)]
**Original:**
- Concept și identitate vizuală (logo + sistem)
- Brand guide
- Materiale de promovare
- Aplicare coerentă pe toate canalele

**Propus:** (fără modificări, deja conform brand-voice)
- Concept și identitate vizuală (logo + sistem)
- Brand guide
- Materiale de promovare
- Aplicare coerentă pe toate canalele

### [db:projects.body WHERE slug='identitate-blitzstudio' — secțiunea "## Rezultatul" din articol (citat + atribuire)]
**Original:**
> Profesionalism, fairplay, pricepere, asumare: cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună.
>
> **Ștefan Chelmu, Blitzstudio**

**Propus:** (fără modificări, deja conform brand-voice)
> Profesionalism, fairplay, pricepere, asumare: cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună.
>
> **Ștefan Chelmu, Blitzstudio**

Notă: e un citat direct, atribuit unei persoane reale (Ștefan Chelmu, Blitzstudio) — nu e vocea Simplead, deci regulile de persoană („noi"/„eu") nu se aplică aici. Nu e placeholder-ul generic „Client Simplead" semnalat în audit la alte proiecte; numele e real și specific, nu l-am atins.

### [db:projects.client WHERE slug='identitate-blitzstudio' — sidebar "Client"]
**Original:** Blitzstudio
**Propus:** Blitzstudio (fără modificări, deja conform brand-voice)

### [db:projects.service WHERE slug='identitate-blitzstudio' — sidebar "Serviciu" (a doua afișare a aceleiași valori din câmp, după eyebrow)]
**Original:** Branding
**Propus:** Branding (fără modificări, deja conform brand-voice)

### [db:projects.result WHERE slug='identitate-blitzstudio' — sidebar "Rezultat"]
**Original:** Un brand coerent și recognoscibil. Suntem deja la al doilea proiect împreună.
**Propus:** Un brand coerent, aplicat unitar pe toate materialele. Suntem deja la al doilea proiect împreună.

Notă: „recognoscibil" nu e literalmente pe kill-list, dar e din aceeași familie ca „remarcabil"/„memorabil": o etichetă de impresie, fără nimic concret în spate. L-am înlocuit cu „aplicat unitar pe toate materialele", care reia un fapt deja confirmat din `summary` (nu am inventat nimic nou), nu o apreciere subiectivă. „Suntem deja la al doilea proiect împreună" e păstrat identic, e faptul concret real din text.

### [db:projects.challenge WHERE slug='identitate-blitzstudio' — câmp neafișat public azi, folosit doar în formularul din /admin]
**Original:** O imagine de brand unitară, care să reflecte profesionalismul studioului și să funcționeze pe toate materialele.
**Propus:** O imagine de brand unitară, care să reflecte profesionalismul studioului și să funcționeze pe toate materialele. (fără modificări, deja conform brand-voice)

Notă: câmp inclus aici doar pentru completitudinea revizuirii cerute; azi nu apare nicăieri pe `/portofoliu/identitate-blitzstudio` (verificat în `src/pages/portofoliu/[slug].astro`), doar în ecranul de editare din `/admin`. Nicio încălcare de kill-list.

### [db:projects.solution WHERE slug='identitate-blitzstudio' — câmp neafișat public azi, folosit doar în formularul din /admin]
**Original:** Logo, sistem vizual și brand guide, plus materialele de promovare, totul gândit simplu, dar cu impact, și validat vizual.
**Propus:** Logo, sistem vizual și brand guide, plus materialele de promovare, toate gândite simplu, dar cu impact, și validate vizual înainte de livrare.

Notă: la fel ca la `challenge`, câmp folosit doar în `/admin`, nu e vizibil public azi. „simplu, dar cu impact" e un tipar aprobat explicit în brand-voice.md §4 (nu e triadă goală, e concret). Am ajustat doar acordul gramatical („toate gândite" / „validate", ca să se lege corect de "materialele de promovare" în loc de "totul") și am precizat "înainte de livrare" ca să nu sune ca o etichetă vagă de tip "validat" fără context; nu am adăugat niciun fapt nou, doar am ancorat afirmația existentă în procesul de lucru descris deja în restul site-ului (validare vizuală ca parte din livrare, nu cifră sau statistică nouă).
