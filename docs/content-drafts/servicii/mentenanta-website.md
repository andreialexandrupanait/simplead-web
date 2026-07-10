Status: draft

# Serviciu: Mentenanță website (`src/data/services.ts`, slug `mentenanta-website`)

Sursă: am citit integral prima intrare din array-ul `services` din `src/data/services.ts` (linii ~121-222): `title`, `summary`, `claim`, `claimSub`, `description`, `includes`, `heroTitle`/`heroTitleAccent`, `heroSub`, `capHead`, `capabilities`, `caseStudy`, `faqs`. Am citit înainte `docs/brand-voice.md` (regulile) și `docs/audit-text-v1.md` (findingurile deja raportate pentru acest fișier).

**Notă importantă, din prompt:** această intrare e **dată moartă**. Pagina live `/mentenanta` redirecționează aici din navigare, dar componenta reală (`src/pages/mentenanta.astro`) citește doar câmpul `.image` din această intrare; tot restul (`heroTitle`, `heroTitleAccent`, `heroSub`, `description`, `capHead`, `capabilities`, `caseStudy`, `faqs`) nu se randează nicăieri live azi. Rămâne totuși cod activ în repo, deci merită curățat, dar nicio schimbare de aici nu are efect vizibil pe site până nu se decide fie ștergerea intrării, fie legarea ei efectivă la `/mentenanta`.

**A doua notă:** `docs/audit-text-v1.md` semnalează pentru exact această intrare (ca „Minoră"): persoană „eu" în loc de „noi", clișeul „fără bătăi de cap" și triada goală „rapid, sigur și actualizat", plus un titlu de FAQ care asocia AI direct cu mentenanța. Am verificat cu grep în fișierul actual: **niciuna din frazele astea nu mai există în textul de azi** (nici em-dash „—", nici „eu", nici cuvintele din kill-list). Se pare că intrarea a fost deja curățată între momentul auditului și acum. Am revizuit oricum bloc cu bloc mai jos, cu observații unde mai era ceva de rafinat.

### [src/data/services.ts > title]
**Original:** Mentenanță website
**Propus:** Mentenanță website (fără modificări, deja conform brand-voice)

### [src/data/services.ts > summary]
**Original:** Tu te ocupi de afacere, noi de partea tehnică: actualizări, securitate, backup și monitorizare continuă.
**Propus:** Tu te ocupi de afacere, noi de partea tehnică: actualizări, securitate, backup și monitorizare continuă. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > claim]
**Original:** Tu te ocupi de afacere.
**Propus:** Tu te ocupi de afacere. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > claimSub]
**Original:** Noi ne ocupăm de site.
**Propus:** Noi ne ocupăm de site. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > description]
**Original:** Îți monitorizăm site-ul continuu: actualizări, securitate, backup și optimizare de viteză, ca tu să te ocupi doar de afacere.
**Propus:** Îți monitorizăm site-ul continuu: actualizări, securitate, backup și optimizare de viteză, ca tu să te ocupi doar de afacere. (fără modificări, deja conform brand-voice; voce „noi", fără cuvinte din kill-list)

### [src/data/services.ts > includes]
**Original:**
- Actualizări și backup-uri regulate
- Securitate și monitorizare uptime
- Mici modificări și suport prioritar
- Monitorizare continuă a site-ului
- Rapoarte de performanță

**Propus:**
- Actualizări și backup-uri regulate
- Securitate și monitorizare uptime
- Mici modificări și suport prioritar
- Monitorizare continuă a site-ului
- Rapoarte de performanță

(fără modificări de conținut; notă de stil, nu de aprobare automată: „monitorizare" apare în 2 din 5 puncte (uptime + continuă a site-ului) și se suprapune parțial cu „monitorizare continuă" din `capabilities` de mai jos. Nu am comprimat lista, pentru că fiecare punct descrie un lucru diferit (uptime vs. site în general) și task-ul e stilistic, nu de restructurare a ofertei; semnalez doar pentru cazul în care Andrei vrea să diferențieze mai clar cele două.)

### [src/data/services.ts > heroTitle + heroTitleAccent]
**Original:** Tu te ocupi de afacere, noi de partea tehnică
**Propus:** Tu te ocupi de afacere, noi de partea tehnică (fără modificări, deja conform brand-voice; identic cu claim + claimSub, consistent pe pagină)

### [src/data/services.ts > heroSub]
**Original:** Ne ocupăm de actualizări, securitate, backup-uri, suport și de monitorizarea continuă a site-ului tău.
**Propus:** Ne ocupăm de actualizări, securitate, backup-uri, suport și de monitorizarea continuă a site-ului tău. (fără modificări, deja conform brand-voice; e o listă concretă de servicii, nu o triadă goală de tipul „rapid, sigur și actualizat")

### [src/data/services.ts > capHead (eyebrow + title + titleAccent + sub)]
**Original:** Ce oferim / Liniște tehnică, pe umerii noștri / Trei zone de lucru care, împreună, țin site-ul la zi și te anunță înainte să apară o problemă.
**Propus:** Ce oferim / Liniște tehnică, pe umerii noștri / Trei zone de lucru care, împreună, țin site-ul la zi și te anunță înainte să apară o problemă. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > capabilities[0] „Actualizări & Backup"]
**Original:** Titlu: Actualizări & Backup. Descriere: „Site-ul tău rămâne mereu la zi, cu copii de siguranță regulate, fără surprize." Listă: Actualizări platformă & pluginuri · Backup-uri regulate · Restaurare rapidă la nevoie · Verificări periodice.
**Propus:** Titlu: Actualizări & Backup. Descriere: „Site-ul tău rămâne mereu la zi, cu copii de siguranță regulate, fără surprize." Listă: Actualizări platformă & pluginuri · Backup-uri regulate · Restaurare rapidă la nevoie · Verificări periodice. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > capabilities[1] „Securitate & Monitorizare"]
**Original:** Titlu: Securitate & Monitorizare. Descriere: „Monitorizăm site-ul și îl protejăm, ca să rămână sigur și disponibil." Listă: Monitorizare uptime · Protecție & întărire securitate · Scanare amenințări · Optimizare viteză continuă.
**Propus:** Titlu: Securitate & Monitorizare. Descriere: „Monitorizăm site-ul și îl protejăm, ca să rămână sigur și disponibil." Listă: Monitorizare uptime · Protecție & întărire securitate · Scanare amenințări · Optimizare viteză continuă. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > capabilities[2] „Suport & Monitorizare"]
**Original:** Titlu: Suport & Monitorizare. Descriere: „Mici modificări, suport prioritar și monitorizare continuă a site-ului, plus rapoarte clare." Listă: Mici modificări de conținut · Suport prioritar · Monitorizare continuă a site-ului · Rapoarte de performanță.
**Propus:** Titlu: Suport & Monitorizare. Descriere: „Mici modificări, suport prioritar și monitorizare continuă a site-ului, plus rapoarte clare." Listă: Mici modificări de conținut · Suport prioritar · Monitorizare continuă a site-ului · Rapoarte de performanță. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > caseStudy]
**Original:** Stat mare: „Simply professional". Text sub stat: „Clienți care ne încredințează partea tehnică, pe termen lung." Citat: „«Simply professional. Trustworthy, honest and creative.»" Text: „O colaborare bazată pe încredere, în care partea tehnică nu mai e o grijă. Ne ocupăm de tot ce ține de funcționarea site-ului, ca afacerea să meargă mai departe fără opriri." Client: Bogdan Drăgan, FEAA Galați.
**Propus:** Stat mare: „Simply professional". Text sub stat: „Clienți care ne încredințează partea tehnică, pe termen lung." Citat: „«Simply professional. Trustworthy, honest and creative.»" Text: „O colaborare bazată pe încredere, în care partea tehnică nu mai e o grijă. Ne ocupăm de tot ce ține de funcționarea site-ului, ca afacerea să meargă mai departe fără opriri." Client: Bogdan Drăgan, FEAA Galați. (fără modificări de conținut; testimonial real, verificat: același citat + client apar identic în `src/data/testimonials.ts` și `src/data/content.ts`, deci nu e placeholder ca la alte cazuri semnalate în audit. Notă separată: „FEAA Galați" apare aici ca nume/locație de client, nu ca poziționare proprie Simplead; brand-voice §3 vizează „Galați" folosit de Simplead ca poziționare geografică, nu numele real al clientului, deci nu l-am atins.)

### [src/data/services.ts > faqs[0] „Ce intră într-un abonament de mentenanță?"]
**Original:** Actualizări de platformă și module, backup-uri regulate, monitorizare de securitate și uptime, plus mici modificări și suport prioritar. La final primești un raport clar, fără jargon.
**Propus:** Actualizări de platformă și module, backup-uri regulate, monitorizare de securitate și uptime, plus mici modificări și suport prioritar. La final primești un raport clar, fără jargon. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > faqs[1] „Ce rol are supravegherea automată?"]
**Original:** Îl folosim pentru supraveghere non-stop, prinderea din vreme a problemelor și sarcinile repetitive: ca să intervenim mai repede și să prevenim, nu doar să reparăm. Deciziile importante rămân la oameni.
**Propus:** Îl folosim pentru supraveghere non-stop, prinderea din vreme a problemelor și sarcinile repetitive: ca să intervenim mai repede și să prevenim, nu doar să reparăm. Deciziile importante rămân la oameni. (fără modificări, deja conform brand-voice. Notă: acesta e singurul „nu doar X" de pe pagină, deci se încadrează în limita de maxim o dată. AI/supravegherea automată e deja corect încadrată ca monitorizare + intervenție umană, nu ca „AI rezolvă singur", conform regulii dure din brand-voice §3.)

### [src/data/services.ts > faqs[2] „Preluați și site-uri făcute de altcineva?"]
**Original:** Da. Ne uităm întâi la site-ul actual, identificăm riscurile și abia apoi îți propunem un plan de mentenanță potrivit pentru el.
**Propus:** Da. Ne uităm întâi la site-ul actual, identificăm riscurile și abia apoi îți propunem un plan de mentenanță potrivit pentru el. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > faqs[3] „Ce se întâmplă dacă pică site-ul?"]
**Original:** Urmărim disponibilitatea și intervenim imediat. Cu backup-urile regulate putem readuce rapid site-ul la o versiune funcțională.
**Propus:** Urmărim disponibilitatea și intervenim imediat. Cu backup-urile regulate putem readuce rapid site-ul la o versiune funcțională. (fără modificări, deja conform brand-voice)
