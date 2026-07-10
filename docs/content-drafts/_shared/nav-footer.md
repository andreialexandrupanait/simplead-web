Status: draft

# Navigare, footer și date site (comune pe toate paginile)

Sursă: `src/data/nav.ts` (integral) și `src/data/site.ts` (integral); consultat suplimentar `docs/brand-voice.md` și `docs/audit-text-v1.md` pentru regulile de voce, plus grep-uri în `src/` doar ca să verific unde e efectiv randat fiecare câmp din `site.ts` (nu am citit alte fișiere de conținut).

### [src/data/nav.ts > mainNav]
**Original:** Acasă · Servicii · Pachete · Portofoliu · Despre · Blog · Contact
**Propus:** Acasă · Servicii · Pachete · Portofoliu · Despre · Blog · Contact (fără modificări, deja conform brand-voice)

### [src/data/nav.ts > footerNav]
**Original:** Acasă · Servicii · Pachete · Portofoliu · Despre · Resurse · Contact
**Propus:** Acasă · Servicii · Pachete · Portofoliu · Despre · Resurse · Contact (fără modificări, deja conform brand-voice)

### [src/data/nav.ts > servicesNav[0] "Mentenanță website"]
**Original:** Mentenanță website — „Actualizări, securitate, backup și monitorizare continuă: site mereu rapid și sigur."
**Propus:** Mentenanță website — „Actualizări, securitate, backup și monitorizare continuă: prindem problemele înainte să ajungă la tine."
Notă: „mereu rapid și sigur" e o pereche de adjective vagi, în oglindă cu triada interzisă „rapid, sigur și actualizat" din kill-list. Am înlocuit cu o consecință concretă (cine prinde problema), consistent cu vocea aprobată de mentenanță din §5.

### [src/data/nav.ts > servicesNav[1] "UX/UI & web design"]
**Original:** UX/UI & web design — „Site-uri și magazine gândite pe conversii, pornind de la cum aleg oamenii."
**Propus:** UX/UI & web design — „Site-uri și magazine gândite pe conversii, pornind de la cum aleg oamenii." (fără modificări, deja conform brand-voice)

### [src/data/nav.ts > servicesNav[2] "Grafică publicitară"]
**Original:** Grafică publicitară — „Identitate vizuală și materiale care te fac ușor de recunoscut, la fel peste tot."
**Propus:** Grafică publicitară — „Identitate vizuală și materiale care te fac ușor de recunoscut, la fel peste tot." (fără modificări, deja conform brand-voice)

### [src/data/nav.ts > servicesNav[3] "Social media"]
**Original:** Social media — „Conținut și prezență care aduc clienți, nu doar aprecieri."
**Propus:** Social media — „Conținut și campanii gândite să aducă clienți reali pe contul tău."
Notă: antiteza „nu doar aprecieri" e permisă maxim o dată pe pagină (brand-voice §4), dar acest text de nav apare pe *toate* paginile, deci se ciocnește cu antiteza din hero-ul fiecărei pagini (ex. „nu pe noroc" pe Acasă). Am rescris afirmativ ca să nu consume bugetul de antiteză global. (Aceeași frază mai apare, dublată, în `services.ts` pe pagina Social media, semnalat deja în audit ca găsire majoră; de aliniat cu acea rescriere.)

### [src/data/nav.ts > servicesNav[4] "Consultanță de marketing"]
**Original:** Consultanță de marketing — „Decizii pe date și neuromarketing, nu pe presupuneri. Doctorat în marketing."
**Propus:** Consultanță de marketing — „Decizii de marketing bazate pe date și neuromarketing, cu un doctorat în spate."
Notă: aceeași logică ca mai sus, antiteza „nu pe presupuneri" e recurentă pe fiecare pagină prin nav, am păstrat-o afirmativă. Mențiunea doctoratului rămâne, dar scurtă și lejeră (nu fraza completă „doctor în marketing, cu cercetare în neuromarketing"), conform regulii „arătat, nu anunțat" și pentru că nu e cardul de bio de pe /despre.

### [src/data/nav.ts > servicesNav[5] "AI pentru business"]
**Original:** AI pentru business — „Automatizări și monitorizare care îți economisesc timp și prind problemele din timp."
**Propus:** AI pentru business — „Automatizări și monitorizare care îți economisesc timp și prind problemele din timp." (fără modificări, deja conform brand-voice: AI e descris strict ca monitorizare/alertă, nu ca „AI rezolvă singur")

### [src/data/nav.ts > supportNavItem "Suport tehnic"]
**Original:** Suport tehnic — „WordPress, SSL, DNS, securitate, email și quick fix, fără să deschizi un proiect întreg."
**Propus:** Suport tehnic — „WordPress, SSL, DNS, securitate, email și quick fix, fără să deschizi un proiect întreg." (fără modificări, deja conform brand-voice)

### [src/data/nav.ts > footerLegal]
**Original:** Întrebări frecvente · Termeni și condiții · Politica de confidențialitate · Politica de cookies
**Propus:** Întrebări frecvente · Termeni și condiții · Politica de confidențialitate · Politica de cookies (fără modificări, etichete legale standard)

### [src/data/nav.ts > megaSupportLinks]
**Original:** Suport WordPress · Migrare site · Suport Cloudflare
**Propus:** Suport WordPress · Migrare site · Suport Cloudflare (fără modificări, deja conform brand-voice)

### [src/data/nav.ts > megaPromo.eyebrow + megaPromo.title]
**Original:** „Mentenanță website" / „Site-ul tău, monitorizat non-stop"
**Propus:** „Mentenanță website" / „Site-ul tău, monitorizat non-stop" (fără modificări, deja conform brand-voice: AI/monitorizare framing corect)

### [src/data/nav.ts > megaPromo.bullets]
**Original:** Backup & update-uri regulate · Monitorizare permanentă · Intervenții lunare incluse
**Propus:** Backup & update-uri regulate · Monitorizare permanentă · Intervenții lunare incluse (fără modificări: sunt 3 livrabile concrete, nu o triadă de adjective goale gen „rapid, sigur și actualizat")

### [src/data/nav.ts > megaPromo.ctaLabel]
**Original:** „Vezi planurile"
**Propus:** „Vezi planurile" (fără modificări, deja conform brand-voice)

### [src/data/site.ts > tagline]
**Original:** „Facem lucrurile simple. Și le bazăm pe neuroștiință."
**Propus:** „Facem lucrurile simple. Și le bazăm pe neuroștiință." (fără modificări, deja conform brand-voice: voce „noi", fără cuvinte din kill-list, fără antiteză, fără em-dash)
Notă: am verificat în cod (grep) și acest câmp nu pare randat momentan nicăieri în UI (doar `site.name` e folosit în titluri/meta, nu `site.tagline`) — posibil copy orfan, de confirmat cu Andrei dacă e folosit undeva sau păstrat pentru o viitoare secțiune.

### [src/data/site.ts > description]
**Original:** „Studio de grafică și marketing digital din România. Branding, web și marketing fundamentate pe neuroștiință, nu pe noroc. Condus de Andrei Alexandru Panait, doctor în marketing, cu cercetare în neuromarketing."
**Propus:** „Studio de grafică și marketing digital din România. Branding, web și marketing fundamentate pe neuroștiință, nu pe noroc. Condus de Andrei Alexandru Panait, doctor în marketing, cu cercetare în neuromarketing." (fără modificări, deja conform brand-voice)
Notă: acest text e folosit ca `<meta name="description">` implicit (nu text vizibil în pagină), inclusiv pe Acasă (`index.astro` nu suprascrie descrierea). Formularea doctoratului e deja cea corectă din §6 („doctor în marketing, cu cercetare în neuromarketing", nu „doctor în neuromarketing"). Antiteza „nu pe noroc" e identică cu cea aprobată din hero (§5) și apare o singură dată aici, ca meta, nu ca text de pagină, deci nu intră în conflict cu bugetul „o antiteză pe pagină".

### [src/data/site.ts > founder + founderTitle]
**Original:** founder: „Andrei Alexandru Panait" · founderTitle: „doctor în marketing"
**Propus:** founder: „Andrei Alexandru Panait" · founderTitle: „doctor în marketing" (fără modificări, deja conform brand-voice)
Notă: randate împreună, scurt, în `ContactSection.astro` („fondator Simplead · doctor în marketing") — exact tratamentul „arătat, nu anunțat" cerut de §3/§6, formularea deja corectă (nu „doctor în neuromarketing").

### [src/data/site.ts > founderCredential]
**Original:** „Doctorat în Marketing (cercetare în neuromarketing), FEAA, Universitatea „Dunărea de Jos" din Galați, 2024"
**Propus:** „Doctorat în Marketing (cercetare în neuromarketing), FEAA, Universitatea „Dunărea de Jos" din Galați, 2024" (fără modificări)
Notă: câmp folosit doar în schema.org Person (JSON-LD, invizibil pe pagină, pentru E-E-A-T/motoare de căutare), nu în textul afișat. Aici forma completă e potrivită (e date structurate pentru mașini, nu copy de marketing), deci nu contează ca o repetare „trâmbițată" a doctoratului conform §3/§6.

### [src/data/site.ts > contact (phone, email, city, country, schedule)]
**Original:** phone: „0755 215 135" · email: „contact@simplead.ro" · city: „Galați" · country: „România" · schedule: „Luni-Vineri, 09:00-18:00"
**Propus:** phone: „0755 215 135" · email: „contact@simplead.ro" · city: „Galați" · country: „România" · schedule: „Luni-Vineri, 09:00-18:00" (fără modificări, sunt date de contact, nu copy de rescris)
Notă: `brand-voice.md` §3 listează adresa oficială de contact ca **office@simplead.ro**, dar `site.ts` (și tot ce se randează din el: footer, navbar, pagina de contact, pagini legale) folosește **contact@simplead.ro**. Nu am schimbat nimic, doar semnalez discrepanța, pare o dată de verificat cu Andrei (care e adresa corectă/curentă), neatins în această rundă. `address` (câmp separat, marcat TODO în cod) nu e randat nicăieri momentan, deci nu l-am tratat ca bloc de copy.

### [src/data/site.ts > legal (cif, regCom)]
**Original:** cif: „41501661" · regCom: „RO J17/1488/2019"
**Propus:** cif: „41501661" · regCom: „RO J17/1488/2019" (fără modificări, date legale fixe, fără elemente de voce)
