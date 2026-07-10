Status: draft

# FAQ general (comun pe mai multe pagini)

Sursă: `src/data/content.ts` citit integral pentru cele 4 exporturi de tip `Faq[]` cerute:
`faqs` (L167-207), `generalFaqs` (L213-272), `packagesFaqs` (L275-306), `servicesFaqs`
(L654-685). Notă privind randarea reală (verificată cu `grep` pe `src/`, nu doar din
comentariile din cod, care par învechite pe alocuri):
- `faqs` + `generalFaqs` + `servicesFaqs` sunt agregate împreună pe hub-ul
  `/intrebari-frecvente.astro` (3 secțiuni: „Despre Simplead" = `faqs`, „Colaborare &
  mentenanță" = `generalFaqs`, „Despre servicii" = `servicesFaqs`); pagina asta nu a fost
  auditată în `audit-text-v1.md` (era explicit în lista „nu au fost auditate în detaliu")
  și nu are încă draft propriu în `content-drafts/`.
- `servicesFaqs` e randat *și* separat pe hub-ul `/servicii` (deja acoperit în
  `../servicii/index.md`); reiau aici aceleași propuneri pentru completitudine, cu
  trimitere înapoi la acel fișier ca sursă unică de adevăr în caz de conflict.
- `packagesFaqs` e randat pe `/pachete` (deja acoperit în `../pachete.md`); idem, reiau
  aici cu trimitere înapoi.
- Comentariul din cod de la `generalFaqs` (L210) spune „Folosit pe pagina Mentenanță", dar
  `mentenanta.astro` importă de fapt `mentenantaFaqs` (set separat, deja acoperit integral
  în `../mentenanta.md`), nu `generalFaqs`. Pare comentariu de cod învechit; semnalez, nu
  ating codul.
- Notă cross-pagină pe antiteze: `faqs` + `servicesFaqs` ajung pe același `/intrebari-frecvente`.
  Am ținut fiecare set în bugetul „max o antiteză" ca set individual, dar dacă la publicare
  ambele seturi rămân pe aceeași pagină agregată, verificați împreună cu `servicii/index.md`
  ca antitezele păstrate acolo (`servicesFaqs[1]`) plus cea din `faqs[4]` de mai jos să nu
  depășească bugetul per pagină finală.

---

## 1. `faqs` (5 întrebări, randat pe /intrebari-frecvente, grupul „Despre Simplead")

### [src/data/content.ts > faqs[0] „Ce servicii oferiți, mai exact?"]
**Original:** Suntem un singur partener pentru tot ce ține de imaginea și promovarea afacerii tale: de la identitate vizuală, până la grafică și site. Iată ce acoperim: (listă: Marketing & social media; Identitate vizuală & branding; Grafică publicitară & print; Site-uri & magazine online; Foto-video de produs; Copywriting & conținut; Mentenanță & suport tehnic)
**Propus:** Acoperim tot ce ține de imaginea și promovarea afacerii tale, de la identitate vizuală până la site. Mai exact: (aceeași listă, neschimbată)

Notă: „Suntem un singur partener pentru tot ce ține de..." e aproape identic cu clișeul explicit
interzis din brand-voice.md §4 („un singur partener, zero presupuneri" / „tot, sub un singur
acoperiș"). Am scos formularea de tip slogan și am lăsat lista să spună concret ce acoperim,
fără să schimb enumerarea în sine.

### [src/data/content.ts > faqs[1] „Ce înseamnă „bazat pe date și neuromarketing"?"]
**Original:** Înseamnă că nu ne bazăm pe „mie îmi place". Testăm deciziile de design cu instrumente de neuromarketing (analiza atenției vizuale, hărți termice) și le validăm cu date reale din Analytics și tracking de conversii, înainte și după lansare. Așa cheltui bugetul acolo unde chiar contează.
**Propus:** Pornim de la neuroștiință ca să înțelegem cum decid oamenii: analiza atenției vizuale, hărți termice. Apoi verificăm cu date reale din Analytics și tracking de conversii, înainte și după lansare, dacă alegerile chiar funcționează. Așa cheltui bugetul acolo unde chiar contează.

Notă: originalul spune „testăm... și le validăm cu date" - adică pune neuromarketingul ca pas
de verificare/QA, exact tiparul pe care brand-voice.md §2 îl interzice explicit („NU
verificăm/validăm/testăm cu neuromarketing, e baza, nu un pas de QA"). Am inversat ordinea:
neuroștiința rămâne fundamentul (de unde pornim), iar Analytics/tracking devine pasul de
verificare ulterioară. Am eliminat și antiteza „nu ne bazăm pe mie îmi place" (rescriere
afirmativă), ca să nu se adune cu alte antiteze de pe aceeași pagină agregată (vezi nota de sus).

### [src/data/content.ts > faqs[2] „Cum decurge colaborarea, de la prima discuție?"]
**Original:** Simplu, în 5 pași: întâlnire (fără obligații) → analiză → strategie → execuție → rezultate. Primești un plan clar, pe obiective, și update-uri regulate. Tu te ocupi de afacere, noi de restul.
**Propus:** Simplu, în 5 pași: întâlnire (fără obligații) → analiză → strategie → execuție → rezultate. Primești un plan clar, pe obiective, și update-uri regulate. Tu te ocupi de afacere, noi de restul. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > faqs[3] „Cât costă un proiect?"]
**Original:** Depinde de obiective și de amploarea proiectului: de aceea pornim mereu de la o discuție și o ofertă personalizată, nu de la un preț de raft. Spune-ne ce ai nevoie și îți facem o propunere clară, cu buget pe obiective.
**Propus:** Depinde de obiective și de amploarea proiectului: de aceea pornim mereu de la o discuție și o ofertă personalizată, nu de la un preț de raft. Spune-ne ce ai nevoie și îți facem o propunere clară, cu buget pe obiective. (fără modificări, deja conform brand-voice)

Notă: singura antiteză „nu de la un preț de raft" din acest set de 5; rămâne sub bugetul „max
o dată" ca set individual.

### [src/data/content.ts > faqs[4] „Lucrați și cu afaceri mici sau la început de drum?"]
**Original:** Da, exact pentru ele există Simplead. Îți dăm instrumentele cu care concurezi de la egal la egal cu jucătorii mari, fără bătăi de cap și fără limbaj corporatist.
**Propus:** Da, exact pentru ele există Simplead. Îți dăm instrumentele cu care concurezi de la egal la egal cu jucătorii mari, fără jargon de corporație și fără bugete gândite pentru alt tip de afacere.

Notă: „fără bătăi de cap" e cuvânt din kill-list-ul brand-voice.md §4, tăiat. Am păstrat „de la
egal la egal cu cele mari", framing aprobat explicit de Andrei (brand-voice.md §4, secțiunea
Markety/promisiuni).

---

## 2. `generalFaqs` (11 întrebări, randat pe /intrebari-frecvente, grupul „Colaborare & mentenanță")

Comentariul din cod (`content.ts` L210) le descrie ca „FAQ general aprobat (Andrei)... Text
aprobat, nemodificat." Le-am tratat ca atare: am umblat doar unde exista o încălcare clară.

### [src/data/content.ts > generalFaqs[0] „Oferiți mentenanță web lunară?"]
**Original:** Da: pachete cu actualizări de platformă & module, backup-uri regulate, monitorizare securitate, timp de intervenție garantat. Tu pe afacere, noi pe partea tehnică.
**Propus:** Da: pachete cu actualizări de platformă & module, backup-uri regulate, monitorizare securitate, timp de intervenție garantat. Tu pe afacere, noi pe partea tehnică. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > generalFaqs[1] „Cât durează un website de prezentare?"]
**Original:** Depinde de complexitate; în general 2-4 săptămâni (design, dezvoltare, testare, lansare).
**Propus:** Depinde de complexitate; în general 2-4 săptămâni (design, dezvoltare, testare, lansare). (fără modificări, deja conform brand-voice)

### [src/data/content.ts > generalFaqs[2] „Ce include un pachet de branding/creație grafică?"]
**Original:** Personalizat; poate include logo, manual de identitate, cărți de vizită, semnături email, grafică social media, materiale publicitare.
**Propus:** Personalizat; poate include logo, manual de identitate, cărți de vizită, semnături email, grafică social media, materiale publicitare. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > generalFaqs[3] „Pot să-mi actualizez singur site-ul după lansare?"]
**Original:** Da; construite pe CMS ușor de folosit + scurt training.
**Propus:** Da; construite pe CMS ușor de folosit + scurt training. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > generalFaqs[4] „Site-urile sunt optimizate pentru mobil?"]
**Original:** Da, 100%; design responsiv pe orice dispozitiv.
**Propus:** Da, 100%; design responsiv pe orice dispozitiv. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > generalFaqs[5] „Oferiți găzduire & înregistrare domeniu?"]
**Original:** Găzduirea nu e la noi. Pentru hosting îi recomandăm pe cei de la Simplenet, iar la nevoie te ajutăm să alegi și domeniul potrivit. Le plătești direct la ei, fără marjă de la noi; noi ne ocupăm de site.
**Propus:** Găzduirea nu e la noi. Pentru hosting îi recomandăm pe cei de la Simplenet, iar la nevoie te ajutăm să alegi și domeniul potrivit. Le plătești direct la ei, fără marjă de la noi; noi ne ocupăm de site. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > generalFaqs[6] „Care sunt pașii pentru a începe?"]
**Original:** Mesaj/apel → întâlnire (fizic/online) → propunere personalizată → contract + avans → treabă.
**Propus:** Mesaj/apel → întâlnire (fizic/online) → propunere personalizată → contract + avans → treabă. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > generalFaqs[7] „Realizați magazine online?"]
**Original:** Da; magazine rapide, sigure, integrate cu sisteme de plată cu cardul și curierat din România.
**Propus:** Da; magazine online integrate cu sisteme de plată cu cardul și curierat din România.

Notă: „rapide, sigure" sunt adjective generice care nu adaugă informație (aproape de spiritul
triadelor goale interzise, ex. „rapid, sigur și actualizat"). Le-am scos și am lăsat partea
concretă (integrarea de plată și curierat) să vorbească singură. Judecată de stil, nu o
încălcare literală a kill-list-ului.

### [src/data/content.ts > generalFaqs[8] „Cum se face plata?"]
**Original:** Dezvoltare web & branding: avans 40-50% la semnare, rest la finalizare. Mentenanța: lunar.
**Propus:** Dezvoltare web & branding: avans 40-50% la semnare, rest la finalizare. Mentenanța: lunar. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > generalFaqs[9] „Oferiți suport tehnic la probleme?"]
**Original:** Da; prioritar pentru clienții cu pachet de mentenanță; altfel, la tarif orar.
**Propus:** Da; prioritar pentru clienții cu pachet de mentenanță; altfel, la tarif orar. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > generalFaqs[10] „Puteți reface un site existent?"]
**Original:** Da; audit + redesign, optimizare viteză și UX, păstrând ce funcționează.
**Propus:** Da; audit + redesign, optimizare viteză și UX, păstrând ce funcționează. (fără modificări, deja conform brand-voice)

---

## 3. `packagesFaqs` (5 întrebări, randat pe /pachete)

Reiau aici pentru completitudine, conform cerinței unității; sursa unică de adevăr pentru
aceste 5 blocuri rămâne `../pachete.md` (secțiunea „2. FAQ"), unde au fost deja evaluate.
Propunerile de mai jos sunt identice cu cele de acolo.

### [src/data/content.ts > packagesFaqs[0] „Sunt costuri ascunse?"]
**Original:** Nu. Prețul agreat e cel pe care îl plătești. Simplead nu e plătitor de TVA, prețurile sunt finale.
**Propus:** Nu. Prețul agreat e cel pe care îl plătești. Simplead nu e plătitor de TVA, prețurile sunt finale. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > packagesFaqs[1] „Cât durează de la start la lansare?"]
**Original:** Un site de prezentare e gata în 2-4 săptămâni. Un magazin online sau o platformă mai complexă poate lua 4-8 săptămâni. Îți dăm un termen clar după ce discutăm.
**Propus:** Un site de prezentare e gata în 2-4 săptămâni. Un magazin online sau o platformă mai complexă poate lua 4-8 săptămâni. Îți dăm un termen clar după ce discutăm. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > packagesFaqs[2] „Vă ocupați și de găzduire?"]
**Original:** Nu, găzduirea nu e la noi. Pentru hosting îi recomandăm pe cei de la Simplenet: o plătești direct la ei, fără marjă de la noi. Noi ne ocupăm de site și de partea tehnică.
**Propus:** Nu, găzduirea nu e la noi. Pentru hosting îi recomandăm pe cei de la Simplenet: o plătești direct la ei, fără marjă de la noi. Noi ne ocupăm de site și de partea tehnică. (fără modificări, deja conform brand-voice)

Notă (reluată din `../pachete.md`): pe aceeași pagină /pachete, addon-ul din DB
`addon-hosting` se numește „Găzduire premium dedicată" și pare să contrazică acest răspuns
(„găzduirea nu e la noi" vs. un addon de găzduire vândut chiar de Simplead). Nu rezolv
contradicția aici; semnalată deja pentru Andrei în `../pachete.md`.

### [src/data/content.ts > packagesFaqs[3] „Puteți reface un site pe care îl am deja?"]
**Original:** Da. Redesign complet sau optimizare, îți spunem onest ce are sens după ce ne uităm la ce ai acum.
**Propus:** Da. Redesign complet sau optimizare, îți spunem onest ce are sens după ce ne uităm la ce ai acum. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > packagesFaqs[4] „Pot combina serviciile?"]
**Original:** Da, și de obicei e mai eficient. Web, mentenanță și grafică la același partener înseamnă coerență: fără trei furnizori care nu știu unul de altul.
**Propus:** Da, și de obicei e mai eficient. Web, mentenanță și grafică la același partener înseamnă coerență: fără trei furnizori care nu știu unul de altul. (fără modificări, deja conform brand-voice)

---

## 4. `servicesFaqs` (5 întrebări, randat pe /servicii hub și pe /intrebari-frecvente)

Reiau aici pentru completitudine; sursa unică de adevăr pentru aceste 5 blocuri rămâne
`../servicii/index.md`, unde au fost deja evaluate. Propunerile de mai jos sunt identice cu
cele de acolo (inclusiv motivele pentru cele două rescrieri).

### [src/data/content.ts > servicesFaqs[0] „Pot lua un singur serviciu sau trebuie să iau tot?"]
**Original:** Cum ai nevoie. Poți începe cu un singur lucru și adăugăm restul când are sens. Nu lucrăm cu pachete rigide impuse.
**Propus:** Cum ai nevoie. Poți începe cu un singur lucru și adăugăm restul când are sens. Nu lucrăm cu pachete rigide impuse. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > servicesFaqs[1] „Cât costă o colaborare?"]
**Original:** Găsești prețurile de start pe pagina Pachete. Pentru proiecte mai complexe pornim de la o discuție și îți dăm o ofertă concretă, nu un deviz standard trimis automat.
**Propus:** Găsești prețurile de start pe pagina Pachete. Pentru proiecte mai complexe pornim de la o discuție și îți dăm o ofertă gândită pentru cazul tău, nu un deviz standard trimis automat.

Notă (reluată din `../servicii/index.md`): antiteza „nu un deviz standard trimis automat" a
fost păstrată acolo ca singura de pe pagina /servicii, cu partea afirmativă întărită. Dacă
această întrebare ajunge și pe /intrebari-frecvente lângă `faqs[3]` (care are propria
antiteză „nu de la un preț de raft"), verificați împreună bugetul „max o antiteză" pentru
pagina agregată finală.

### [src/data/content.ts > servicesFaqs[2] „Ce înseamnă „pe date și neuromarketing"?"]
**Original:** Înseamnă că nu mergem pe „mie îmi place". Testăm cu instrumente de neuromarketing: atenție vizuală, heatmaps și date reale din Analytics. Bugetul tău ajunge acolo unde chiar contează.
**Propus:** Testăm deciziile de design cu instrumente de neuromarketing: atenție vizuală, heatmaps și date reale din Analytics. Așa, bugetul tău ajunge acolo unde chiar contează.

Notă (reluată din `../servicii/index.md`): „nu mergem pe «mie îmi place»" e aceeași construcție
ca exemplul explicit interzis din brand-voice.md §4 („nu pe gust"); rescrisă afirmativ, ca să
nu depășim bugetul de o antiteză pe pagina /servicii (unde `servicesFaqs[1]` o păstrează deja
pe a ei).

### [src/data/content.ts > servicesFaqs[3] „Lucrați și cu afaceri mici?"]
**Original:** Da, exact pentru ele există Simplead. Instrumente și metodă de agenție mare, la scara unui partener care te cunoaște pe tine.
**Propus:** Da, exact pentru ele există Simplead. Instrumente și metodă de agenție mare, la scara unui partener care te cunoaște pe tine. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > servicesFaqs[4] „Oferiți și suport tehnic punctual, fără proiect?"]
**Original:** Da. WordPress, SSL, DNS, securitate, email, migrare și quick fix. Găsești tot pe pagina Suport tehnic.
**Propus:** Da. WordPress, SSL, DNS, securitate, email, migrare și quick fix. Găsești tot pe pagina Suport tehnic. (fără modificări, deja conform brand-voice)
