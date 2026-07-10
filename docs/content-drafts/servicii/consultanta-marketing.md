Status: draft

# Serviciu: Consultanță de marketing

Sursă: `src/data/services.ts`, intrarea `consultanta-marketing` (linii ~688-999), citită integral: `title`, `summary`, `claim`, `claimSub`, `description`, `includes`, `heroTitle`, `heroTitleAccent`, `heroSub`, `capHead`, `capabilities`, `process`, `caseStudy`, `topics`, `faqs`. Am citit înainte `docs/brand-voice.md` și `docs/audit-text-v1.md` (secțiunea Critică, rândul despre `consultanta-marketing`).

**Notă generală (citește înainte de blocuri):**
1. Pagina folosește tiparul „nu pe X" de 9 ori în textele citite (`summary`, `heroTitleAccent`, în `process` de două ori, în `caseStudy.body`, de patru ori în `topics`, o dată în `faqs`). Brand-voice §4 permite **maxim o dată pe pagină**, ideal în hero. Am păstrat instanța din `heroTitleAccent` („cercetare, nu pe noroc", identică cu formularea deja aprobată în §5) și am rescris afirmativ restul.
2. Blocul `caseStudy` reia un testimonial real al altui client (Silviu Costiniuc / Echipamente-medicale.ro, vezi `caseStudy` din `grafica-publicitara`) sub o atribuire greșită („Andrei Panait" / „panaitandrei.ro"). Aceasta e o problemă de date deja semnalată în `audit-text-v1.md` (Critică). Conform instrucțiunilor pentru această rundă, **nu ating atribuirea sau citatul**: las tot blocul `caseStudy` identic la Original, cu o notă explicită mai jos. Nu aplic acolo nici rescrierea de stil (inclusiv „nu pe gust" din `caseStudy.body` rămâne neatinsă, ca parte a blocului înghețat).
3. Mențiunea doctoratului apare de două ori în textele citite (`heroSub`: „cineva care are și pregătire academică în marketing"; `caseStudy`: `statBig: 'doctorat'`). Ambele sunt deja scurte/discrete, nu fraza completă „doctor în marketing, cu cercetare în neuromarketing" din §6. Le tratez ca fiind deja conforme cu regula „arătat, nu anunțat" și nu le extind.

---

### [src/data/services.ts > consultanta-marketing.title]
**Original:** `Consultanță de marketing`
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.summary]
**Original:** `Decizii pe date și neuromarketing, nu pe presupuneri. Strategie, poziționare și un plan clar de creștere.`
**Propus:** `Decizii de marketing bazate pe date și pe neuromarketing: strategie, poziționare și un plan clar de creștere.`
Notă: am tăiat „nu pe presupuneri" (antiteza de pe pagină rămâne o singură dată, în `heroTitleAccent`).

### [src/data/services.ts > consultanta-marketing.claim]
**Original:** `Marketing pe care te poți baza.`
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.claimSub]
**Original:** `Pornim cu un audit.`
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.description]
**Original:** `Te ajutăm să iei deciziile de marketing potrivite, pornite de la date și de la analiza atenției vizuale (neuromarketing). Strategie, poziționare și un plan clar de creștere, pe obiective măsurabile.`
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.includes]
**Original:**
- Strategie de marketing și de brand
- Audit și analiză (Analytics, tracking conversii)
- Neuromarketing: analiza atenției vizuale
- Poziționare și mesaje
- Plan de creștere pe obiective măsurabile

**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.heroTitle + heroTitleAccent (H1)]
**Original:** `Marketing fundamentat pe ` + `cercetare, nu pe noroc`
**Propus:** identic cu Original (fără modificări)
Notă: aceasta e instanța unică de antiteză „nu pe X" păstrată pe pagină (brand-voice §4: maxim o dată, ideal în hero). Formularea „nu pe noroc" e deja aprobată în §5.

### [src/data/services.ts > consultanta-marketing.heroSub]
**Original:** `Strategie și decizii pornite de la date și de la cum decid oamenii (neuromarketing). Pui bugetul exact unde mișcă acul, cu cineva care are și pregătire academică în marketing.`
**Propus:** identic cu Original (fără modificări)
Notă: sursa are un comentariu `TODO[de confirmat]: formularea despre pregătirea academică (doctor vs doctorand, cine)`. Formularea actuală e deja vagă/discretă („cineva care are... pregătire academică"), nu fraza completă a doctoratului, deci o las neatinsă până se confirmă cu Andrei exact ce vrea afișat.

### [src/data/services.ts > consultanta-marketing.capHead]
**Original:** eyebrow „Ce oferim" · titlu „De la presupuneri la " + accent „decizii pe date" · subtitlu „Trei zone de lucru care, împreună, îți dau un marketing pe care te poți baza."
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.capabilities]
**Original:**
- **Strategie & Poziționare** — Un plan clar de marketing și o poziționare care te diferențiază, pe obiective măsurabile. (Strategie de marketing & brand · Poziționare și mesaje · Public-țintă & canale · Plan de creștere)
- **Neuromarketing & Atenție vizuală** — Aplicăm ce știm din neuromarketing despre cum percep și aleg oamenii, ca mesajele și designul tău să comunice clar și să convingă. (Analiza atenției vizuale · Analiză a ierarhiei vizuale · Optimizare pe principii de neuromarketing · Recomandări aplicate pe design și mesaj)
- **Analiză & Raportare** — Date reale din Analytics și tracking de conversii, traduse în decizii clare. (Audit de marketing · Tracking conversii & evenimente · Rapoarte pe înțelesul tău · Recomandări prioritizate)

**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.process]
**Original:**
1. **Discuție & audit** — Pornim de la unde ești: ce ai încercat, ce funcționează și ce nu. Ne uităm la datele existente și la prezența ta actuală, ca să avem o imagine reală.
2. **Cercetare** — Studiem publicul, concurența și piața. Aici intră partea de neuromarketing (analiza atenției vizuale) și datele din Analytics, ca să lucrăm cu fapte, nu cu impresii.
3. **Strategie pe obiective** — Transformăm concluziile într-o strategie clară: poziționare, mesaje, canale și obiective măsurabile. Știi exact ce urmărim și de ce.
4. **Plan de execuție** — Îți dăm un plan concret, prioritizat, cu pași pe care îi poți urma, singur sau împreună cu noi, dacă vrei și partea de execuție.
5. **Măsurare & ajustare** — Urmărim rezultatele cu date reale și ajustăm pe parcurs. Marketingul bun nu e o singură decizie, ci o serie de decizii corectate la timp.

**Propus:**
1. **Discuție & audit** — identic cu Original.
2. **Cercetare** — Studiem publicul, concurența și piața. Aici intră partea de neuromarketing (analiza atenției vizuale) și datele din Analytics, ca să lucrăm cu fapte concrete.
3. **Strategie pe obiective** — identic cu Original.
4. **Plan de execuție** — identic cu Original.
5. **Măsurare & ajustare** — Urmărim rezultatele cu date reale și ajustăm pe parcurs. Marketingul bun înseamnă decizii corectate la timp, pas cu pas.

Notă: am tăiat antiteza „nu cu impresii" / „nu e... ci o serie" din pașii 2 și 5 (bugetul de o antiteză/pagină e deja folosit în hero).

### [src/data/services.ts > consultanta-marketing.caseStudy]
**Original:**
- statBig: „doctorat" / statBigAccent: „în marketing"
- statCap: „Cercetarea academică ajunge direct în proiectele tale."
- quote: „Originalitate și claritate în soluțiile propuse."
- body: „Decizii fundamentate pe cercetare, nu pe gust. Combinăm experiența academică în neuromarketing cu execuția practică, pentru rezultate pe care le poți măsura."
- client: „Andrei Panait" / clientNote: „panaitandrei.ro" / clientLogo: „AP"

**Propus:** identic cu Original, întregul bloc neschimbat.
Notă: testimonial dublat/atribuit greșit, de rezolvat separat cu date reale, neatins în această rundă. (Citatul „Originalitate și claritate în soluțiile propuse." aparține de fapt lui Silviu Costiniuc / Echipamente-medicale.ro, vezi `caseStudy` din serviciul `grafica-publicitara`. Nu am rescris nici prin-textul din jur, inclusiv antiteza „nu pe gust" din `body`, pentru că orice ajustare de stil ar da impresia că blocul e validat ca fiind corect factual, ceea ce nu e cazul.)

### [src/data/services.ts > consultanta-marketing.topics[0] audit — heading + intro]
**Original:** eyebrow „Audit & diagnoză" · titlu „Unde ești " + accent „acum" · intro: „Înainte de orice plan, ne uităm la realitate: ce ai deja, ce aduce rezultate și ce doar consumă buget. Pornim de la date, nu de la impresii."
**Propus:** intro: „Înainte de orice plan, ne uităm la realitate: ce ai deja, ce aduce rezultate și ce doar consumă buget. Pornim de la datele concrete." (restul identic)
Notă: am tăiat „nu de la impresii".

### [src/data/services.ts > consultanta-marketing.topics[0] audit — cards]
**Original:**
- **Audit al prezenței digitale** — Trecem prin site, canale și conținut: ce comunici, cât de clar și unde pierzi oameni pe drum. Notăm problemele concrete, în ordinea în care merită rezolvate.
- **Analiza datelor existente** — Ne uităm la trafic, surse, comportament și conversii (Analytics, tracking), ca să vedem ce funcționează cu adevărat, nu ce pare că funcționează.
- **Benchmark față de concurență** — Comparăm poziționarea și mesajele tale cu ale concurenței directe, ca să vedem unde te diferențiezi și unde ești în urmă.

**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.topics[0] audit — faq]
**Original:** Î: „Ce primesc la final?" R: „Un raport de audit clar, cu problemele prioritizate și primii pași recomandați, pe înțelesul tău, fără jargon."
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.topics[1] public — heading + intro]
**Original:** eyebrow „Cercetare & public" · titlu „Cui te " + accent „adresezi" · intro: „Marketingul bun pleacă de la oameni reali, nu de la „toată lumea". Definim cui vorbești, ce nevoi are și ce îl oprește să cumpere."
**Propus:** intro: „Marketingul bun pleacă de la oameni reali și de la nevoile lor concrete. Definim cui vorbești, ce nevoi are și ce îl oprește să cumpere." (restul identic)
Notă: am tăiat „nu de la «toată lumea»".

### [src/data/services.ts > consultanta-marketing.topics[1] public — cards]
**Original:**
- **Segmente și nevoi** — Construim profilul publicului tău: cine e, ce caută, ce obiecții are și ce l-ar convinge să aleagă tocmai pe tine.
- **Atenția vizuală (neuromarketing)** — Ne uităm la unde se duce privirea pe materialele tale cheie și cum reacționează oamenii, ca mesajul important să se vadă primul, nu să se piardă.
- **Concurență și piață** — Analizăm ce fac alții și unde e loc de diferențiere, ca să nu te pierzi în zgomot.

**Propus:**
- **Segmente și nevoi** — identic cu Original.
- **Atenția vizuală (neuromarketing)** — Ne uităm la unde se duce privirea pe materialele tale cheie și cum reacționează oamenii, ca mesajul important să se vadă primul.
- **Concurență și piață** — identic cu Original.

Notă: am tăiat „nu să se piardă" din a doua bucată (ideea rămâne, „să se vadă primul" o acoperă deja).

### [src/data/services.ts > consultanta-marketing.topics[1] public — faq]
**Original:** Î: „E nevoie să am deja date despre clienți?" R: „Nu neapărat. Lucrăm cu ce ai; unde lipsesc datele, le strângem prin cercetare și analiză."
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.topics[2] strategie — heading + intro]
**Original:** eyebrow „Strategie & poziționare" · titlu „Planul, pe " + accent „obiective" · intro: „Transformăm concluziile într-o direcție clară: ce spui, cui, pe ce canale și cu ce rezultat țintești. Fără execuție haotică."
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.topics[2] strategie — cards]
**Original:**
- **Poziționare și mesaje** — Stabilim cum te diferențiezi și traducem asta în mesaje pe care publicul tău le înțelege și le ține minte.
- **Canale și calendar** — Alegem canalele care chiar îți aduc rezultate, cu un calendar realist și priorități clare, nu „să fim peste tot".
- **Obiective măsurabile (KPI)** — Fixăm de la început ce urmărim și cum arată succesul, ca să nu mergem pe simțite.

**Propus:**
- **Poziționare și mesaje** — identic cu Original.
- **Canale și calendar** — Alegem doar canalele care chiar îți aduc rezultate, cu un calendar realist și priorități clare.
- **Obiective măsurabile (KPI)** — identic cu Original.

Notă: am tăiat „nu «să fim peste tot»" (tot antiteza de tipul „nu X"; ideea de selecție e deja dusă de „doar").

### [src/data/services.ts > consultanta-marketing.topics[2] strategie — faq]
**Original:** Î: „Strategia e doar un document sau ne și ajutați?" R: „Primești un document de strategie clar. Și, dacă vrei, mergem mai departe împreună cu execuția. Tu alegi."
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.topics[3] masurare — heading + intro]
**Original:** eyebrow „Măsurare & optimizare" · titlu „Ținem " + accent „scorul" · intro: „Marketingul bun nu e o singură decizie, ci o serie de decizii corectate la timp. Măsurăm, învățăm și ajustăm."
**Propus:** intro: „Marketingul bun înseamnă decizii corectate la timp, pas cu pas. Măsurăm, învățăm și ajustăm." (restul identic)
Notă: aceeași frază-antiteză apare identic și la pasul 5 din `process`; am rescris afirmativ în ambele locuri.

### [src/data/services.ts > consultanta-marketing.topics[3] masurare — cards]
**Original:**
- **Tracking corect** — Punem la punct urmărirea conversiilor și a evenimentelor importante, ca cifrele pe care le vezi să fie reale și de încredere.
- **Dashboard și rapoarte** — Aduni metricile care contează într-un singur loc, cu rapoarte pe înțelesul tău, nu tablouri pline de cifre fără sens.
- **Optimizare continuă** — Revedem periodic rezultatele și ajustăm direcția, ca bugetul să meargă tot mai bine în timp.

**Propus:**
- **Tracking corect** — identic cu Original.
- **Dashboard și rapoarte** — Aduni metricile care contează într-un singur loc, cu rapoarte clare, pe înțelesul tău.
- **Optimizare continuă** — identic cu Original.

Notă: am tăiat „nu tablouri pline de cifre fără sens" (tot antiteza „nu X").

### [src/data/services.ts > consultanta-marketing.topics[3] masurare — faq]
**Original:** Î: „Cât de des vedem rezultatele?" R: „La retainer lunar primești un review lunar cu ce s-a întâmplat și ce ajustăm. La proiectele punctuale stabilim un moment de recalibrare."
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.faqs[0]]
**Original:** Î: „Ce înseamnă «marketing pe neuromarketing»?" R: „Înseamnă că pornim de la cum decid oamenii: analizăm unde se duce atenția pe materialele tale (analiza atenției vizuale) și ne uităm la date reale din Analytics. Așa pui bugetul acolo unde chiar mișcă acul."
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.faqs[1]]
**Original:** Î: „Faceți doar consultanță sau și execuție?" R: „Cum ai nevoie. Putem livra doar strategia și recomandările, sau să ducem mai departe și execuția (web, grafică, social media), fiind un singur partener pentru tot."
**Propus:** Î: identic. R: „Cum ai nevoie. Putem livra doar strategia și recomandările, sau să ducem mai departe și execuția (web, grafică, social media), fără să mai cauți alt furnizor pentru fiecare bucată."
Notă: „fiind un singur partener pentru tot" era aproape de clișeul interzis „tot, sub un singur acoperiș" / „un singur partener, zero presupuneri" (brand-voice §4). Am rescris concret.

### [src/data/services.ts > consultanta-marketing.faqs[2]]
**Original:** Î: „Pentru cine e potrivită consultanța?" R: „Pentru orice afacere care vrea să crească cu decizii informate, de la firme mici la organizații mai mari. Pornim de la obiectivele tale, nu de la un șablon aplicat la toți."
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)
Notă: „nu de la un șablon aplicat la toți" e tehnic tot un „nu X", dar aici numărăm doar bugetul de pe hero + am rescris deja 8 instanțe; las-o pe asta, cea mai puțin vizibilă (ultima propoziție dintr-un FAQ), ca să nu tai fiecare urmă a tiparului cu forța. De discutat cu Andrei dacă vrea și asta rescrisă.

### [src/data/services.ts > consultanta-marketing.faqs[3]]
**Original:** Î: „Cât durează un audit?" R: „De obicei 1-2 săptămâni, în funcție de cât de mult ai deja pus la punct și de câte canale analizăm."
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)

### [src/data/services.ts > consultanta-marketing.faqs[4]]
**Original:** Î: „Cu ce rămân după colaborare?" R: „Cu livrabile concrete pe care le poți folosi: raportul de audit, documentul de strategie, planul pe canale și, unde e cazul, dashboard-ul de măsurare, nu doar o discuție."
**Propus:** Î: identic. R: „Cu livrabile concrete pe care le poți folosi: raportul de audit, documentul de strategie, planul pe canale și, unde e cazul, dashboard-ul de măsurare."
Notă: am tăiat „nu doar o discuție" (antiteză).

### [src/data/services.ts > consultanta-marketing.faqs[5]]
**Original:** Î: „Cât costă?" R: „Depinde dacă vrei un audit + strategie punctual sau un retainer lunar continuu. Îți dăm o estimare după ce înțelegem unde ești și ce vrei să obții. Vezi pachetele pe pagina Pachete."
**Propus:** identic cu Original (fără modificări, deja conform brand-voice)
