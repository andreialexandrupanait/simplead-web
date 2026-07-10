Status: draft

# Serviciu: AI pentru business (`src/data/services.ts`, slug `ai-pentru-business`)

Sursă: am citit integral intrarea `ai-pentru-business` din array-ul `services` din `src/data/services.ts` (linii ~1003-1153): `title`, `summary`, `claim`, `claimSub`, `description`, `includes`, `heroTitle`/`heroTitleAccent`, `heroSub`, `capHead`, `capabilities`, `process`, `caseStudy`, `faqs`. Am citit înainte `docs/brand-voice.md` (regulile) și `docs/audit-text-v1.md` (findingurile deja raportate pentru acest fișier, care nu semnalează probleme specifice pe intrarea `ai-pentru-business`). Am verificat și șablonul de randare `src/pages/servicii/[slug].astro` ca să știu ce e efectiv vizibil pe pagină.

**Notă generală:** această intrare e, per ansamblu, deja bine aliniată cu regula dură din brand-voice §3 („AI doar în tracking/monitorizare", niciodată „AI rezolvă singur"): peste tot unde apare AI-ul, textul spune explicit că deciziile, verificarea finală și relația cu clienții rămân la oameni („omul confirmă", „verificare și voce umană înainte de publicare", „Deciziile și relația cu clienții rămân la oameni"). Nu am găsit nicio formulare de tipul „AI-ul rezolvă/repară singur" de reformulat. Antiteza „nu doar X / nu pe Y" apare o singură dată pe toată pagina (în `summary`), exact la limita permisă din §4, așa că am lăsat-o neatinsă și nu am introdus alta.

**Notă tehnică (nu de voce):** câmpurile `description` și `includes` nu par randate momentan pe pagina publică `/servicii/ai-pentru-business` (verificat în `src/pages/servicii/[slug].astro` și în componentele care consumă `service.*` — niciuna nu afișează `service.description` sau `service.includes` pentru acest template). Conținutul e oricum deja conform, l-am revizuit ca atare, dar semnalez ca Andrei să știe că sunt „moarte" în UI-ul curent, la fel ca la `mentenanta-website` (semnalat separat în audit).

### [src/data/services.ts > title]
**Original:** AI pentru business
**Propus:** AI pentru business (fără modificări, deja conform brand-voice)

### [src/data/services.ts > summary]
**Original:** Automatizări, monitorizare și conținut asistate de AI: acolo unde îți cumpără timp, nu unde dă bine pe hârtie.
**Propus:** Automatizări, monitorizare și conținut asistate de AI: acolo unde îți cumpără timp, nu unde dă bine pe hârtie. (fără modificări, deja conform brand-voice; aceasta e singura antiteză „nu X" de pe pagină, în limita de una permisă de §4)

### [src/data/services.ts > claim]
**Original:** Timp câștigat în fiecare săptămână.
**Propus:** Timp câștigat în fiecare săptămână. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > claimSub]
**Original:** Hai să vedem ce automatizăm la tine.
**Propus:** Hai să vedem ce automatizăm la tine. (fără modificări, deja conform brand-voice; CTA colocvial, coerent cu „Hai să vorbim" aprobat în §4, nu clișeul „Discută cu un expert")

### [src/data/services.ts > description]
**Original:** Nu vindem „AI" ca slogan. Ne uităm la procesele tale, găsim munca repetitivă care îți mănâncă timpul și o automatizăm: lead-uri, rapoarte, monitorizare, prime versiuni de conținut. Deciziile și relația cu clienții rămân la oameni.
**Propus:** Nu vindem „AI" ca slogan. Ne uităm la procesele tale, găsim munca repetitivă care îți mănâncă timpul și o automatizăm: lead-uri, rapoarte, monitorizare, prime versiuni de conținut. Deciziile și relația cu clienții rămân la oameni. (fără modificări, deja conform brand-voice; voce „noi", fără cuvinte din kill-list, cadrare corectă AI = automatizare + monitorizare, decizia rămâne la oameni)

### [src/data/services.ts > includes]
**Original:**
- Automatizarea proceselor repetitive
- Monitorizare continuă, cu alerte înainte să observe clienții
- Conținut asistat: draft-uri rapide, rafinate de oameni
- Integrări cu uneltele pe care le folosești deja
- Consultanță onestă: unde merită AI-ul și unde nu

**Propus:**
- Automatizarea proceselor repetitive
- Monitorizare continuă, cu alerte înainte să observe clienții
- Conținut asistat: draft-uri rapide, rafinate de oameni
- Integrări cu uneltele pe care le folosești deja
- Consultanță onestă: unde merită AI-ul și unde nu

(fără modificări, deja conform brand-voice)

### [src/data/services.ts > heroTitle + heroTitleAccent]
**Original:** AI pentru business, **folosit cu cap**
**Propus:** AI pentru business, **folosit cu cap** (fără modificări, deja conform brand-voice)

### [src/data/services.ts > heroSub]
**Original:** Îl folosim acolo unde e categoric mai bun decât omul: muncă repetitivă, supraveghere non-stop și prime versiuni de conținut. Restul rămâne la oameni.
**Propus:** Îl folosim acolo unde e categoric mai bun decât omul: muncă repetitivă, supraveghere non-stop și prime versiuni de conținut. Restul rămâne la oameni. (fără modificări; enumerarea de trei descrie lucruri concrete și distincte (nu e triada goală de tip „rapid, sigur și actualizat"), iar granița AI/om e explicită)

### [src/data/services.ts > capHead (eyebrow + title + titleAccent)]
**Original:** Ce oferim / AI integrat în **fluxurile tale**
**Propus:** Ce oferim / AI integrat în **fluxurile tale** (fără modificări, deja conform brand-voice)

### [src/data/services.ts > capHead.sub]
**Original:** Trei direcții în care AI-ul îți economisește ore în fiecare săptămână și prinde problemele înainte să le simtă clienții.
**Propus:** Trei direcții în care AI-ul îți economisește ore în fiecare săptămână și prinde problemele înainte să le simtă clienții. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > capabilities[0] „Automatizări"]
**Original:** Descriere: „Munca pe care o faci la fel în fiecare săptămână, făcută de sistem: fără uitări, fără «n-am apucat»." Listă: Lead-uri din formulare: evidență + notificare + confirmare automată către client · Rapoarte periodice generate și trimise singure · Programări cu confirmare și reamintire automată · Integrări între uneltele pe care le folosești deja.
**Propus:** (fără modificări, deja conform brand-voice) Descriere: „Munca pe care o faci la fel în fiecare săptămână, făcută de sistem: fără uitări, fără «n-am apucat»." Listă: Lead-uri din formulare: evidență + notificare + confirmare automată către client · Rapoarte periodice generate și trimise singure · Programări cu confirmare și reamintire automată · Integrări între uneltele pe care le folosești deja. AI-ul e cadrat aici strict ca automatizare de sarcini repetitive, nu ca „rezolvare" autonomă de probleme, conform §3.

### [src/data/services.ts > capabilities[1] „Monitorizare cu AI"]
**Original:** Descriere: „Un ochi care nu obosește pe site-ul și sistemele tale: tu afli primul, nu clienții." Listă: Site-ul urmărit non-stop: disponibilitate, viteză, certificat SSL · Alerte imediate când ceva iese din parametri · Probleme prinse devreme, înainte să devină urgențe · Rapoarte clare despre ce s-a întâmplat și ce s-a făcut.
**Propus:** (fără modificări, deja conform brand-voice) Descriere: „Un ochi care nu obosește pe site-ul și sistemele tale: tu afli primul, nu clienții." Listă: Site-ul urmărit non-stop: disponibilitate, viteză, certificat SSL · Alerte imediate când ceva iese din parametri · Probleme prinse devreme, înainte să devină urgențe · Rapoarte clare despre ce s-a întâmplat și ce s-a făcut. Acesta e exact modelul corect din §3: AI-ul monitorizează și alertează, nu „rezolvă singur"; contrastul „tu afli primul, nu clienții" e o construcție diferită de tiparul „nu doar X, ci Y" vizat de §4, nu l-am numărat la limita de o antiteză pe pagină.

### [src/data/services.ts > capabilities[2] „Conținut asistat"]
**Original:** Descriere: „AI-ul propune, omul rafinează și semnează: drumul de la pagina goală la publicat, scurtat serios." Listă: Prime versiuni pentru postări, descrieri și articole · Variante de mesaj pentru testare · Adaptarea aceluiași conținut pe canale diferite · Verificare și voce umană înainte de publicare, de fiecare dată.
**Propus:** (fără modificări, deja conform brand-voice) Descriere: „AI-ul propune, omul rafinează și semnează: drumul de la pagina goală la publicat, scurtat serios." Listă: Prime versiuni pentru postări, descrieri și articole · Variante de mesaj pentru testare · Adaptarea aceluiași conținut pe canale diferite · Verificare și voce umană înainte de publicare, de fiecare dată. Controlul uman final e explicit în ultimul punct al listei.

### [src/data/services.ts > process[0] „01 Discuție despre procese"]
**Original:** Pornim de la cum lucrezi azi: ce sarcini se repetă, ce îți mănâncă timp și unde apar erorile. Fără asta, „AI" rămâne doar un cuvânt.
**Propus:** Pornim de la cum lucrezi azi: ce sarcini se repetă, ce îți mănâncă timp și unde apar erorile. Fără asta, „AI" rămâne doar un cuvânt. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > process[1] „02 Identificăm ce se automatizează"]
**Original:** Separăm munca repetitivă de cea care cere context uman și îți spunem onest unde merită AI și unde nu. Uneori răspunsul corect e „aici nu ai nevoie".
**Propus:** Separăm munca repetitivă de cea care cere context uman și îți spunem onest unde merită AI și unde nu. Uneori răspunsul corect e „aici nu ai nevoie". (fără modificări; „unde merită AI și unde nu" e un hedge simetric firesc, nu tiparul antiteză „nu doar X, ci Y" interzis de §4, așa că nu l-am numărat la limita de pe pagină. Notă de stil, nu de regulă: aceeași formulă apare aproape identic și în `faqs[1]` mai jos, „unde ajută și unde nu merită" — repetiție ușoară, opțional de variat dacă Andrei vrea, dar nu obligatoriu)

### [src/data/services.ts > process[2] „03 Construim & integrăm"]
**Original:** Punem automatizările la treabă și le conectăm cu uneltele pe care le folosești deja, ca să se potrivească în fluxul tău, nu invers.
**Propus:** Punem automatizările la treabă și le conectăm cu uneltele pe care le folosești deja, ca să se potrivească în fluxul tău, nu invers. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > process[3] „04 Testare & control uman"]
**Original:** Verificăm că totul merge cum trebuie și păstrăm omul în buclă pentru deciziile importante și verificarea finală. AI-ul propune, omul confirmă.
**Propus:** Verificăm că totul merge cum trebuie și păstrăm omul în buclă pentru deciziile importante și verificarea finală. AI-ul propune, omul confirmă. (fără modificări, deja conform brand-voice; acesta e chiar pasul care demonstrează cel mai clar regula din §3)

### [src/data/services.ts > process[4] „05 Monitorizare & optimizare"]
**Original:** Urmărim cum se comportă în timp, prindem din vreme ce nu merge și îmbunătățim pe parcurs. Tu primești un rezumat clar, nu un sistem de care trebuie să ai grijă.
**Propus:** Urmărim cum se comportă în timp, prindem din vreme ce nu merge și îmbunătățim pe parcurs. Tu primești un rezumat clar, nu un sistem de care trebuie să ai grijă. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > caseStudy]
**Original:** Stat mare: „12h” / „/săptămână”. Text sub stat: „recuperate din munca repetitivă după automatizare.” Citat: „«Rapoartele și confirmările se trimit singure, nu mai scapă niciun lead.»” Text: „Am automatizat preluarea lead-urilor și raportarea săptămânală, cu monitorizare non-stop a site-ului. Oamenii iau deciziile; sistemul duce munca repetitivă, fără uitări.” Client: „Client demo”. Notă client (în sursă): „de înlocuit cu o recomandare reală”. Logo client: „AI”.
**Propus:** identic cu Originalul, neatins.

Notă: acest bloc e deja auto-semnalat ca placeholder chiar în sursă (`client: 'Client demo'`, `clientNote: 'de înlocuit cu o recomandare reală'`), deci nu mai adaug un `[confirmă: ...]` suplimentar, doar confirm că am văzut și am lăsat neschimbat. Nu am inventat și nu am „înfrumusețat" cifra „12h/săptămână”, e legată direct de acest caz demo și rămâne exact ca în sursă până apare un client real. De reținut și tehnic: un comentariu din `services.ts` chiar deasupra acestui câmp spune că secțiunea de dovadă socială a paginii nu se mai randează momentan cu aceste date (se folosește un conținut comun din `src/data/testimonials.ts` în loc), deci acest bloc e în plus și dead code în UI-ul curent, nu doar placeholder de conținut. Pare dată placeholder / de verificat cu Andrei, neatins în această rundă.

### [src/data/services.ts > faqs[0] „AI-ul înlocuiește oamenii din echipă?"]
**Original:** Nu, și nici nu îl folosim așa. Preia munca repetitivă: sortat, copiat, supravegheat, prime versiuni. Deciziile, relația cu clienții și verificarea finală rămân la oameni, fiindcă acolo contează contextul pe care doar ei îl au.
**Propus:** Nu, și nici nu îl folosim așa. Preia munca repetitivă: sortat, copiat, supravegheat, prime versiuni. Deciziile, relația cu clienții și verificarea finală rămân la oameni, fiindcă acolo contează contextul pe care doar ei îl au. (fără modificări, deja conform brand-voice; răspunde direct la exact grija pe care o vizează regula din §3)

### [src/data/services.ts > faqs[1] „Cum știu dacă afacerea mea are nevoie de AI?"]
**Original:** Regula simplă: dacă faci sarcini la fel, măcar săptămânal, e loc de automatizare. Pornim de la o discuție despre procesele tale și îți spunem cinstit unde ajută și unde nu merită.
**Propus:** Regula simplă: dacă faci sarcini la fel, măcar săptămânal, e loc de automatizare. Pornim de la o discuție despre procesele tale și îți spunem cinstit unde ajută și unde nu merită. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > faqs[2] „Cât costă un proiect de AI pentru business?"]
**Original:** Depinde de procesele pe care le automatizăm și de integrările necesare. După ce le mapăm împreună, îți dăm un preț exact. Vezi pachetele pe pagina Pachete.
**Propus:** Depinde de procesele pe care le automatizăm și de integrările necesare. După ce le mapăm împreună, îți dăm un preț exact. Vezi pachetele pe pagina Pachete. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > faqs[3] „Cât timp economisesc, de fapt?"]
**Original:** Depinde de cât de repetitive sunt sarcinile, dar clienții recuperează de obicei câteva ore bune pe săptămână din munca de rutină. La audit îți spunem realist ce se poate automatiza la tine.
**Propus:** Depinde de cât de repetitive sunt sarcinile, dar clienții recuperează de obicei câteva ore bune pe săptămână din munca de rutină. La audit îți spunem realist ce se poate automatiza la tine. (fără modificări; „câteva ore bune" e o formulare calitativă, nu o cifră exactă de umplutură, deci nu are nevoie de `[confirmă: ...]`)
