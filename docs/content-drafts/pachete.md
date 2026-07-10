Status: draft

# Pachete și prețuri

Sursă: `src/pages/pachete.astro` și `src/data/pricing.ts` citite integral, plus interogare read-only
`SELECT slug,name,description,note,features,feature_groups FROM packages WHERE active=true ORDER BY kind,sort;`
pe `simplead_db` (17 pachete active). Context citit înainte: `docs/brand-voice.md`, `docs/audit-text-v1.md`.
Am verificat și `src/data/packages-fallback.ts` (fallback afișat doar dacă DB e jos): oglindește DB-ul
1:1 pe cele 17 pachete, nu conține copy separat de editat, deci nu am extras blocuri din el. Am sărit
peste `PageHeader` crumb (breadcrumb de navigare, nu copy de pagină) și peste toate valorile de preț
(`price_cents`/`formatPrice`), care sunt date, nu voce.

Blocurile sunt în ordinea de randare a paginii: 1) copy propriu din `pachete.astro`, 2) FAQ
(`packagesFaqs`), 3) cele 4 secțiuni statice de preț din `pricing.ts` (grafică, social, consultanță,
AI), 4) câmpurile pachetelor din DB, în ordinea cerută explicit pentru acest pas (`ORDER BY kind,sort`).

**Antiteza „nu X" pe pagină:** am găsit șase apariții ale tiparului „nu doar X" / „X, nu Y" pe
această unitate (subtitlul din `PageHeader`, nota pachetului `ux-ui-redesign`, descrierea pachetului
`magazin-online`, descrierea pachetului `strategie-marketing`, nota AI din secțiunea web, subtitlul
secțiunii „consultanță" și subtitlul din `CtaSection` final). Brand-voice.md §4 permite maximum una pe
pagină. Am păstrat-o pe cea din `PageHeader` (echivalentul „hero" al acestei pagini) și am rescris
afirmativ restul; fiecare bloc afectat are o notă explicită mai jos.

---

## 1. Copy propriu din `src/pages/pachete.astro`

### [src/pages/pachete.astro > BaseLayout title prop]
**Original:** Pachete și prețuri
**Propus:** Pachete și prețuri (fără modificări, deja conform brand-voice)

### [src/pages/pachete.astro > metaDescription (meta description)]
**Original:** Pachete clare pentru site-uri, identitate vizuală și grafică, plus abonamente lunare de mentenanță. Știi de la început ce primești și de unde pornește prețul.
**Propus:** Pachete clare pentru site-uri, identitate vizuală și grafică, plus abonamente lunare de mentenanță. Știi de la început ce primești și de unde pornește prețul. (fără modificări, deja conform brand-voice)

### [src/pages/pachete.astro > PageHeader eyebrow prop]
**Original:** Pachete și prețuri
**Propus:** Pachete și prețuri (fără modificări, deja conform brand-voice)

### [src/pages/pachete.astro > PageHeader title + accent props]
**Original:** Prețuri clare, fără surprize
**Propus:** Prețuri clare, fără surprize (fără modificări, deja conform brand-voice)

### [src/pages/pachete.astro > PageHeader subtitle prop]
**Original:** Știi de la început ce primești și cât plătești. Pentru proiecte mai complexe pornim de la o discuție, nu de la un deviz standard.
**Propus:** Știi de la început ce primești și cât plătești. Pentru proiecte mai complexe pornim de la o discuție, nu de la un deviz standard. (fără modificări; ăsta e singurul loc unde păstrăm antiteza „nu X" pe toată pagina, ca echivalent de hero)

### [src/pages/pachete.astro > `pk-canceled` (mesaj condiționat, după plată anulată)]
**Original:** Plata a fost anulată. Nicio problemă: pachetele te așteaptă mai jos, iar dacă ai întrebări scrie-ne.
**Propus:** Plata a fost anulată. Nicio problemă: pachetele te așteaptă mai jos, iar dacă ai întrebări scrie-ne. (fără modificări, deja conform brand-voice)

### [src/pages/pachete.astro > secțiunea web, h2 + em „magazine online"]
**Original:** Site-uri și magazine online
**Propus:** Site-uri și magazine online (fără modificări, deja conform brand-voice)

### [src/pages/pachete.astro > secțiunea web, `pk-lead`]
**Original:** Site de prezentare, magazin online sau redesign, construite în WordPress, rapide, sigure și ușor de administrat de tine.
**Propus:** Site de prezentare, magazin online sau redesign, construite în WordPress, ca să le poți administra singur după lansare.

Notă: „rapide, sigure și ușor de administrat" e o triadă de adjective, exact tiparul interzis din
brand-voice.md §4 (ex. „rapid, sigur și actualizat"). Am păstrat un singur lucru concret (administrare
proprie, temă reluată și în secțiunile de conținut/predare din pachetele web) și am tăiat restul.

### [src/pages/pachete.astro > `pk-w-badge` (etichetă card dominant)]
**Original:** Cel mai cerut
**Propus:** Cel mai cerut (fără modificări, deja conform brand-voice)

### [src/pages/pachete.astro > pachete web, butoane CTA per card]
**Original:** Cumpără / Cere ofertă →
**Propus:** Cumpără / Cere o ofertă →

Notă: am adăugat articolul „o" ca să se alinieze exact cu CTA-ul principal aprobat din brand-voice.md
§3 („Cere o ofertă"). Modificare minoră de formă, nu de sens.

### [src/pages/pachete.astro > `pk-ai-note` (aside „Ai nevoie de ceva simplu?")]
**Original:** Ai nevoie de ceva simplu? Uneori cea mai bună variantă e un site static, construit rapid cu ajutorul AI, fără să plătești pentru complexitate de care nu ai nevoie. Folosim AI acolo unde chiar ajută și recomandăm mereu soluția potrivită, nu cea mai scumpă.
**Propus:** Ai nevoie de ceva simplu? Uneori cea mai bună variantă e un site static, construit rapid cu ajutorul AI, fără să plătești pentru complexitate de care nu ai nevoie. Folosim AI acolo unde chiar ajută și îți recomandăm mereu varianta potrivită pentru tine.

Notă: am tăiat antiteza „nu cea mai scumpă" (bugetul de o antiteză pe pagină e deja folosit în
`PageHeader`) și am înlocuit „soluția" cu „varianta", ca să nu ne apropiem de cuvântul de pe kill-list
„soluții". AI-ul e descris aici ca unealtă de construcție rapidă, nu ca „AI care rezolvă mentenanța",
deci nu intră în conflict cu regula din §3 (care vizează strict AI-ul de monitorizare/mentenanță).

### [src/pages/pachete.astro > secțiunea mentenanță, h2 + em „lună de lună"]
**Original:** Întreținem site-ul, lună de lună
**Propus:** Întreținem site-ul, lună de lună (fără modificări, deja conform brand-voice)

### [src/pages/pachete.astro > secțiunea mentenanță, `pk-lead` + link „Calculează-ți abonamentul →"]
**Original:** Ținem site-ul actualizat, salvat și supravegheat, ca să meargă bine fără să-ți faci griji. Calculează-ți abonamentul →
**Propus:** Ținem site-ul actualizat, salvat și sub supraveghere. Când apare o problemă, o prindem noi, nu tu. Calculează-ți abonamentul →

Notă: am aliniat la fraza deja aprobată explicit în brand-voice.md §5 („Îți țin site-ul actualizat,
salvat și sub supraveghere. Când apare o problemă, o prind eu, nu clientul tău."), adaptată la persoana
„noi" (voce de studio, nu „Omul din spate"). Contrastul „noi, nu tu" e cel din exemplul aprobat, nu se
pune pe bugetul de antiteze de mai sus (acela vizează tiparul de umplutură „nu doar X / nu pe Y",
nu acest exemplu de referință).

### [src/pages/pachete.astro > pachete mentenanță, butoane CTA per card]
**Original:** Abonează-te / Vezi detalii →
**Propus:** Abonează-te / Vezi detalii → (fără modificări, deja conform brand-voice)

### [src/pages/pachete.astro > `pk-addons`, h3 „Adaugi oricând"]
**Original:** Adaugi oricând
**Propus:** Adaugi oricând (fără modificări, deja conform brand-voice)

### [src/pages/pachete.astro > secțiunea tarife orare, h2 + em „punctuale"]
**Original:** Și pentru lucrări punctuale
**Propus:** Și pentru lucrări punctuale (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > `hourlyRatesIntro`]
**Original:** Pentru lucrări mici sau în afara pachetelor lucrăm la oră, transparent: știi exact cât plătești, fără surprize la final.
**Propus:** Pentru lucrări mici sau în afara pachetelor lucrăm la oră, transparent: știi exact cât plătești, fără surprize la final. (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > `hourlyRates[]` (etichete, listă)]
**Original:**
- Web development și design
- Grafică publicitară
- Tracking și analytics
**Propus:** (fără modificări, deja conform brand-voice; sunt etichete de serviciu, nu voce de marketing)
- Web development și design
- Grafică publicitară
- Tracking și analytics

### [src/pages/pachete.astro > secțiunea tarife orare, buton CTA]
**Original:** Cere o estimare →
**Propus:** Cere o estimare → (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > `freeMonthBanner`]
**Original:** Prima lună de mentenanță gratuită la orice site nou construit de noi.
**Propus:** Prima lună de mentenanță gratuită la orice site nou construit de noi. (fără modificări de voce)

Notă: `freeMonthBanner` e exportat din `pricing.ts`, dar nu e importat/randat nicăieri în cod (verificat
cu grep pe tot `src/`) — nu apare pe `/pachete` sau altă pagină azi. Conținut mort sau bit
neimplementat încă (de clarificat cu Andrei dacă vrea bannerul live, și unde).

### [src/pages/pachete.astro > `<FaqSection>` — vezi secțiunea 2 mai jos pentru fiecare Q&A]

### [src/pages/pachete.astro > `<CtaSection>` final, title]
**Original:** Nu știi ce ți se potrivește?
**Propus:** Nu știi ce ți se potrivește? (fără modificări, deja conform brand-voice)

### [src/pages/pachete.astro > `<CtaSection>` final, subtitle]
**Original:** Scrie-ne și îți răspundem cu o recomandare concretă, nu cu un call de vânzări.
**Propus:** Scrie-ne și îți răspundem cu o recomandare concretă, fără presiune de vânzare.

Notă: altă apariție a antitezei „nu X" (bugetul de o antiteză/pagină e deja consumat la `PageHeader`).
Am păstrat ideea (răspunsul e o recomandare reală, nu un pitch), rescrisă afirmativ.

### [src/pages/pachete.astro > `<CtaSection>` final, cta label]
**Original:** Hai să vorbim
**Propus:** Hai să vorbim (fără modificări; e exact alternativa aprobată în brand-voice.md §4 pentru „Discută cu un expert")

---

## 2. FAQ (`packagesFaqs`, `src/data/content.ts`)

### [src/data/content.ts > packagesFaqs[0]]
**Original:** Î: Sunt costuri ascunse? R: Nu. Prețul agreat e cel pe care îl plătești. Simplead nu e plătitor de TVA, prețurile sunt finale.
**Propus:** Î: Sunt costuri ascunse? R: Nu. Prețul agreat e cel pe care îl plătești. Simplead nu e plătitor de TVA, prețurile sunt finale. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > packagesFaqs[1]]
**Original:** Î: Cât durează de la start la lansare? R: Un site de prezentare e gata în 2-4 săptămâni. Un magazin online sau o platformă mai complexă poate lua 4-8 săptămâni. Îți dăm un termen clar după ce discutăm.
**Propus:** Î: Cât durează de la start la lansare? R: Un site de prezentare e gata în 2-4 săptămâni. Un magazin online sau o platformă mai complexă poate lua 4-8 săptămâni. Îți dăm un termen clar după ce discutăm. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > packagesFaqs[2]]
**Original:** Î: Vă ocupați și de găzduire? R: Nu, găzduirea nu e la noi. Pentru hosting îi recomandăm pe cei de la Simplenet: o plătești direct la ei, fără marjă de la noi. Noi ne ocupăm de site și de partea tehnică.
**Propus:** Î: Vă ocupați și de găzduire? R: Nu, găzduirea nu e la noi. Pentru hosting îi recomandăm pe cei de la Simplenet: o plătești direct la ei, fără marjă de la noi. Noi ne ocupăm de site și de partea tehnică. (fără modificări, deja conform brand-voice)

Notă: pe aceeași pagină, addon-ul din DB `addon-hosting` se numește „Găzduire premium dedicată" și
apare în lista „Adaugi oricând" de sub abonamentele de mentenanță (vezi secțiunea 4). Cele două
mesaje par contradictorii („găzduirea nu e la noi" vs. un pachet plătit de găzduire vândut de noi).
Nu rezolv contradicția aici (poate fi doar un addon vechi, netras din activ); semnalez pentru Andrei,
neatins în această rundă.

### [src/data/content.ts > packagesFaqs[3]]
**Original:** Î: Puteți reface un site pe care îl am deja? R: Da. Redesign complet sau optimizare, îți spunem onest ce are sens după ce ne uităm la ce ai acum.
**Propus:** Î: Puteți reface un site pe care îl am deja? R: Da. Redesign complet sau optimizare, îți spunem onest ce are sens după ce ne uităm la ce ai acum. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > packagesFaqs[4]]
**Original:** Î: Pot combina serviciile? R: Da, și de obicei e mai eficient. Web, mentenanță și grafică la același partener înseamnă coerență: fără trei furnizori care nu știu unul de altul.
**Propus:** Î: Pot combina serviciile? R: Da, și de obicei e mai eficient. Web, mentenanță și grafică la același partener înseamnă coerență: fără trei furnizori care nu știu unul de altul. (fără modificări, deja conform brand-voice)

---

## 3. Secțiuni statice de preț (`pricingSections`, `src/data/pricing.ts`)

### [src/data/pricing.ts > pricingSections[0] „grafica", header (eyebrow/title+accent/sub)]
**Original:** Grafică & branding — Identitate, vizualuri și materiale — De la identitate vizuală la materiale de promovare, tot ce te face recognoscibil.
**Propus:** Grafică & branding — Identitate, vizualuri și materiale — De la identitate vizuală la materiale de promovare, tot ce te face recognoscibil. (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > pricingSections[0] „grafica", cards[0] „Identitate vizuală completă"]
**Original:** Sistem vizual coerent construit în jurul logo-ului tău. Include: Brand guide complet; Paletă, tipografie, elemente grafice; Aplicații pe materiale: carte vizită, antet, semnătură email. Notă: Logo-uri nu facem. Te punem în legătură cu specialiști dedicați și construim identitatea în jurul lui.
**Propus:** (fără modificări, deja conform brand-voice)
Sistem vizual coerent construit în jurul logo-ului tău. Include: Brand guide complet; Paletă, tipografie, elemente grafice; Aplicații pe materiale: carte vizită, antet, semnătură email. Notă: Logo-uri nu facem. Te punem în legătură cu specialiști dedicați și construim identitatea în jurul lui.

Notă: nota de aici („specialiști dedicați") diferă puțin de nota pachetului `identitate-vizuala` din
DB („specialiști", fără „dedicați" — vezi secțiunea 4). Semnalez diferența, nu unific eu cifrele/
formulările fără să bifez cu Andrei care variantă rămâne sursa unică.

### [src/data/pricing.ts > pricingSections[0] „grafica", cards[1] „Set materiale grafice"]
**Original:** 5 vizualuri pentru print sau digital: afișe, bannere, broșuri, social media. Include: Grafică adaptată pe canale; Fișiere pentru print (CMYK) și online; Gândit pe unde se uită oamenii (heatmaps).
**Propus:** 5 vizualuri pentru print sau digital: afișe, bannere, broșuri, social media. Include: Grafică adaptată pe canale; Fișiere pentru print (CMYK) și online; Gândit pe unde se uită oamenii (heatmaps). (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > pricingSections[0] „grafica", cards[2] „Grafică recurentă"]
**Original:** Vizualuri lunare pentru social media și promovare, coerente cu brandul tău.
**Propus:** Vizualuri lunare pentru social media și promovare, coerente cu brandul tău. (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > pricingSections[0] „grafica", ctaLabel]
**Original:** Cere ofertă grafică →
**Propus:** Cere ofertă grafică → (fără modificări, deja conform brand-voice; scurt și direct, diferit destul de CTA-ul principal ca să nu sune repetitiv)

### [src/data/pricing.ts > pricingSections[1] „social-media", header]
**Original:** Social media — Conținut și prezență, pe canalele potrivite — Strategie editorială, creație vizuală și administrare, fără să postăm de dragul de a posta.
**Propus:** Social media — Conținut și prezență, pe canalele potrivite — Strategie editorială, creație vizuală și administrare, fără să postăm de dragul de a posta. (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > pricingSections[1] „social-media", cards[0] „Conținut + administrare (2 canale)"]
**Original:** Calendar editorial, creație vizuală și text, publicare și răspuns la comentarii. Include: Strategie de conținut pe obiective; 8-12 postări pe lună; Creație vizuală și copywriting; Administrare cont și comunitate.
**Propus:** Calendar editorial, creație vizuală și text, publicare și răspuns la comentarii. Include: Strategie de conținut pe obiective; 8-12 postări pe lună; Creație vizuală și copywriting; Administrare cont și comunitate. (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > pricingSections[1] „social-media", cards[1] „Administrare completă (3 canale cu rapoarte)"]
**Original:** Prezență pe 3 canale, conținut mai frecvent, raport lunar cu date și recomandări. Include: Tot ce include pachetul de bază; Al 3-lea canal inclus; 16-20 postări pe lună; Raport lunar cu metrici și optimizări.
**Propus:** Prezență pe 3 canale, conținut mai frecvent, raport lunar cu date și recomandări. Include: Tot ce include pachetul de bază; Al 3-lea canal inclus; 16-20 postări pe lună; Raport lunar cu metrici și optimizări. (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > pricingSections[1] „social-media", ctaLabel]
**Original:** Discută despre social media →
**Propus:** Discută despre social media → (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > pricingSections[2] „consultanta", header]
**Original:** Consultanță marketing — Strategie și decizii pe date — Marketing fundamentat pe cercetare și neuromarketing, nu pe presupuneri.
**Propus:** Consultanță marketing — Strategie și decizii pe date — Marketing fundamentat pe cercetare și neuromarketing.

Notă: am tăiat coada antitetică „nu pe presupuneri" (bugetul de antiteză pe pagină e deja consumat de
`PageHeader`); ideea de bază (fundamentat pe cercetare) rămâne.

### [src/data/pricing.ts > pricingSections[2] „consultanta", cards[0] „Audit + strategie"]
**Original:** Analiză completă a situației actuale și plan concret pe obiective măsurabile. Include: Audit prezență digitală; Cercetare public și concurență; Analiză atenție vizuală prin heatmaps și expoze.app; Strategie pe canale și obiective; Plan de execuție prioritizat.
**Propus:** Analiză completă a situației actuale și plan concret pe obiective măsurabile. Include: Audit prezență digitală; Cercetare public și concurență; Analiză atenție vizuală prin heatmaps și expoze.app; Strategie pe canale și obiective; Plan de execuție prioritizat. (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > pricingSections[2] „consultanta", cards[1] „Retainer lunar"]
**Original:** Partener de marketing pe termen lung: strategie, urmărire rezultate, ajustări. Include: Review lunar al datelor; Recomandări prioritizate; Optimizare continuă; Acces direct pentru întrebări punctuale.
**Propus:** Partener de marketing pe termen lung: strategie, urmărire rezultate, ajustări. Include: Review lunar al datelor; Recomandări prioritizate; Optimizare continuă; Acces direct pentru întrebări punctuale. (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > pricingSections[2] „consultanta", ctaLabel]
**Original:** Solicită consultanță →
**Propus:** Solicită consultanță → (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > pricingSections[3] „ai", header]
**Original:** AI pentru business — Automatizări care îți cumpără timp — Munca repetitivă o face sistemul. Tu îți vezi de afacere.
**Propus:** AI pentru business — Automatizări care îți cumpără timp — Munca repetitivă o face sistemul. Tu îți vezi de afacere. (fără modificări, deja conform brand-voice)

Notă: aici AI-ul e descris ca automatizare de procese repetitive de business (nu ca monitorizare de
site), un produs diferit de mentenanță. Nu intră în conflict cu regula din brand-voice.md §3, care
vizează strict cadrul „AI la mentenanță" (unde AI trebuie să rămână la tracking/alertare, nu reparare
singură). „Sistemul o face" aici înseamnă automatizare de task-uri repetitive, nu „AI diagnostichează
și rezolvă singur o problemă a site-ului tău".

### [src/data/pricing.ts > pricingSections[3] „ai", cards[0] „Setup automatizări"]
**Original:** Identificăm ce se repetă și construim sistemele care o fac singure. Include: Audit procese repetitive; Construire fluxuri automate; Integrare cu uneltele existente; Testare și predare.
**Propus:** Identificăm ce se repetă și construim sistemele care o fac singure. Include: Audit procese repetitive; Construire fluxuri automate; Integrare cu uneltele existente; Testare și predare. (fără modificări, deja conform brand-voice)

### [src/data/pricing.ts > pricingSections[3] „ai", cards[1] „Mentenanță automatizări"]
**Original:** Urmărim că totul merge, prindem ce se strică, optimizăm pe parcurs.
**Propus:** Urmărim că totul merge, prindem ce se strică, optimizăm pe parcurs. (fără modificări, deja conform brand-voice; verbele sunt „urmărim"/„prindem", exact tiparul de monitorizare cerut la §3)

### [src/data/pricing.ts > pricingSections[3] „ai", ctaLabel]
**Original:** Hai să discutăm despre AI →
**Propus:** Hai să discutăm despre AI → (fără modificări, deja conform brand-voice)

---

## 4. Pachete din DB (`packages`, active, `ORDER BY kind, sort`)

Notă generală: pachetele `identitate-vizuala`, `pachet-grafica` și `strategie-marketing` (kind=`service`,
categoria `grafica-marketing`) au rânduri active în DB, dar `pachete.astro` filtrează secțiunea 1
(„showpiece") doar pe `category === 'web'` — deci aceste trei nu sunt randate nicăieri pe `/pachete`
azi, sunt orfane pe pagina asta. La fel, cele 5 pachete `kind='fix-service'` (`optimizare-viteza`,
`configurare-email-pro`, `securizare-malware`, `migrare-site`, `setup-cloudflare`) nu apar pe `/pachete`
(pagina randează doar `kind='addon'` în lista „Adaugi oricând"); ele aparțin altei pagini
(`/servicii-rapide`, în afara scopului acestei unități). Le includ mai jos conform interogării cerute
pentru acest pas, dar semnalez orfanitatea ca să nu fie tratate ca și cum ar fi vizibile azi pe
„Pachete și prețuri".

### [db:packages.name WHERE slug='ux-ui-redesign']
**Original:** UX/UI Redesign
**Propus:** UX/UI Redesign (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='ux-ui-redesign']
**Original:** Ne uităm la stadiul actual al site-ului tău și îi verificăm integritatea.
**Propus:** Ne uităm la stadiul actual al site-ului tău și îi verificăm integritatea. (fără modificări, deja conform brand-voice)

### [db:packages.note WHERE slug='ux-ui-redesign']
**Original:** După un audit al site-ului actual îți spunem prețul exact. Dacă infrastructura e încărcată (zeci de plugin-uri, cod vechi), uneori e mai rapid și mai ieftin să reconstruim decât să cârpim. Îți recomandăm varianta corectă, nu cea mai scumpă.
**Propus:** După un audit al site-ului actual îți spunem prețul exact. Dacă infrastructura e încărcată (zeci de plugin-uri, cod vechi), uneori e mai rapid și mai ieftin să reconstruim decât să cârpim. Îți recomandăm varianta corectă pentru tine.

Notă: alt loc cu antiteza „nu cea mai scumpă" (aceeași idee ca în `pk-ai-note` de mai sus). Bugetul de
o antiteză pe pagină e deja folosit în `PageHeader`; am rescris afirmativ.

### [db:packages.feature_groups WHERE slug='ux-ui-redesign']
**Original:**
Audit & strategie: Verificăm viteză, structură, SEO (Audit complet: viteză, structură, SEO, securitate și ce merită păstrat) · Analiză UX pe paginile cheie (Ce funcționează, ce încurcă vizitatorul și ce schimbăm) · Reparăm sau reconstruim, onest (Îți spunem sincer dacă merită reparat sau e mai bine de la zero) · Plan de migrare a conținutului.
Design & UX: Redesign complet pe identitatea ta · Structură clară, pe conversii (Reorganizăm informația ca vizitatorul să ajungă ușor la acțiune) · Responsive, mobile-first.
Implementare & lansare: Reconstruit în WordPress · Migrarea conținutului existent (Mutăm texte, imagini și pagini fără să pierzi poziții în Google) · Publicare și configurare tehnică (Domeniu, email, redirecturi 301 și indexare, fără downtime).
**Propus:** (fără modificări, deja conform brand-voice; text concret, fără cuvinte de pe kill-list)
Audit & strategie: Verificăm viteză, structură, SEO (Audit complet: viteză, structură, SEO, securitate și ce merită păstrat) · Analiză UX pe paginile cheie (Ce funcționează, ce încurcă vizitatorul și ce schimbăm) · Reparăm sau reconstruim, onest (Îți spunem sincer dacă merită reparat sau e mai bine de la zero) · Plan de migrare a conținutului.
Design & UX: Redesign complet pe identitatea ta · Structură clară, pe conversii (Reorganizăm informația ca vizitatorul să ajungă ușor la acțiune) · Responsive, mobile-first.
Implementare & lansare: Reconstruit în WordPress · Migrarea conținutului existent (Mutăm texte, imagini și pagini fără să pierzi poziții în Google) · Publicare și configurare tehnică (Domeniu, email, redirecturi 301 și indexare, fără downtime).

### [db:packages.name WHERE slug='site-prezentare']
**Original:** Site de prezentare
**Propus:** Site de prezentare (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='site-prezentare']
**Original:** Site nou, croit pe afacerea ta: fie o pagină, fie cincizeci.
**Propus:** Site nou, croit pe afacerea ta: fie o pagină, fie cincizeci. (fără modificări, deja conform brand-voice; niciun em-dash, spre deosebire de varianta semnalată în audit-text-v1.md — pare deja corectată în DB între audit și acum)

### [db:packages.feature_groups WHERE slug='site-prezentare']
**Original:**
Ce facem, pe scurt: Structura site-ului pe pagini · Grafică inițială generată cu AI · Prelucrare grafică în Figma · Implementare în WordPress.
SEO & optimizare: SEO on-page (Titluri, meta, structură, sitemap și indexare în Google) · Analytics, Search Console, GTM (Creăm și configurăm conturile: GA4, GSC, GTM, și tracking-ul de conversii) · Optimizat pe viteză și mobil (Cache, CDN, imagini optimizate și scor bun pe mobil).
Conținut & publicare: Meniu, header și footer · Pagini legale + formular de contact (Confidențialitate, termeni, formular de contact și newsletter) · Verificări finale (Responsiveness pe toate dispozitivele, backup și securitate).
**Propus:** (fără modificări, deja conform brand-voice; AI-ul apare doar ca unealtă de generare grafică inițială, nu ca „AI rezolvă mentenanța")
Ce facem, pe scurt: Structura site-ului pe pagini · Grafică inițială generată cu AI · Prelucrare grafică în Figma · Implementare în WordPress.
SEO & optimizare: SEO on-page (Titluri, meta, structură, sitemap și indexare în Google) · Analytics, Search Console, GTM (Creăm și configurăm conturile: GA4, GSC, GTM, și tracking-ul de conversii) · Optimizat pe viteză și mobil (Cache, CDN, imagini optimizate și scor bun pe mobil).
Conținut & publicare: Meniu, header și footer · Pagini legale + formular de contact (Confidențialitate, termeni, formular de contact și newsletter) · Verificări finale (Responsiveness pe toate dispozitivele, backup și securitate).

### [db:packages.name WHERE slug='magazin-online']
**Original:** Magazin online
**Propus:** Magazin online (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='magazin-online']
**Original:** Magazin online care chiar vinde, nu doar arată bine. De la câteva produse la mii.
**Propus:** Magazin online construit să vândă, de la câteva produse la mii.

Notă: am tăiat antiteza „nu doar arată bine" (bugetul de o antiteză/pagină e deja consumat de
`PageHeader`) și am păstrat „de la câteva produse la mii" ca listare reală de plajă de capacitate, nu
ca umplutură repetată (brand-voice.md §4 permite explicit acest tipar când descrie ceva concret).

### [db:packages.note WHERE slug='magazin-online']
**Original:** Prețul variază după numărul de produse și integrările third-party (curieri, ERP/facturare, feed-uri Google/marketplace). Îți dăm prețul exact după ce înțelegem ce ai de vândut.
**Propus:** Prețul variază după numărul de produse și integrările third-party (curieri, ERP/facturare, feed-uri Google/marketplace). Îți dăm prețul exact după ce înțelegem ce ai de vândut. (fără modificări, deja conform brand-voice)

### [db:packages.feature_groups WHERE slug='magazin-online']
**Original:**
Magazin WooCommerce: Construit pe WooCommerce (WordPress) · Catalog de produse (Le urcăm noi pe primele, cu categorii, filtre și căutare) · Pagini de produs care vând (Imagini, descriere, preț și buton de comandă clar, gândite pe conversii) · Stocuri și disponibilitate (Vezi în timp real ce ai pe stoc).
Vânzare & plată: Plată cu cardul și curierat (Sisteme de plată cu cardul și curierat din România, configurate) · Facturare automată (Facturi emise automat, SmartBill) · Coș și checkout optimizat (Checkout scurt și clar, gândit să reducă abandonul coșului).
Operare & predare: Conturi clienți și comenzi · Training pe administrare (Te învățăm să adaugi produse și să gestionezi comenzile) · Tot din site de prezentare.
**Propus:** (fără modificări, deja conform brand-voice)
Magazin WooCommerce: Construit pe WooCommerce (WordPress) · Catalog de produse (Le urcăm noi pe primele, cu categorii, filtre și căutare) · Pagini de produs care vând (Imagini, descriere, preț și buton de comandă clar, gândite pe conversii) · Stocuri și disponibilitate (Vezi în timp real ce ai pe stoc).
Vânzare & plată: Plată cu cardul și curierat (Sisteme de plată cu cardul și curierat din România, configurate) · Facturare automată (Facturi emise automat, SmartBill) · Coș și checkout optimizat (Checkout scurt și clar, gândit să reducă abandonul coșului).
Operare & predare: Conturi clienți și comenzi · Training pe administrare (Te învățăm să adaugi produse și să gestionezi comenzile) · Tot din site de prezentare.

### [db:packages.name WHERE slug='identitate-vizuala']
**Original:** Identitate vizuală
**Propus:** Identitate vizuală (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='identitate-vizuala']
**Original:** Brandul tău, coerent peste tot.
**Propus:** Brandul tău, coerent peste tot. (fără modificări, deja conform brand-voice)

Notă: acest pachet nu e randat azi pe `/pachete` (vezi nota generală de la începutul secțiunii 4).

### [db:packages.note WHERE slug='identitate-vizuala']
**Original:** Logo-uri nu facem. Te punem în legătură cu specialiști și construim identitatea în jurul lui.
**Propus:** Logo-uri nu facem. Te punem în legătură cu specialiști și construim identitatea în jurul lui. (fără modificări, deja conform brand-voice)

Notă: varianta din secțiunea 3 (`pricingSections`, card „Identitate vizuală completă") spune „specialiști
dedicați" în loc de „specialiști". Semnalez diferența minoră, nu unific fără confirmare.

### [db:packages.features WHERE slug='identitate-vizuala']
**Original:** Paletă de culori + tipografie · Brand kit editabil (Canva/Figma) (Fișiere editabile, gata de folosit în Canva sau Figma) · Reguli de folosire, do & don't (Cum se folosesc corect culorile, fonturile și logo-ul) · Aplicat pe materialele tale.
**Propus:** Paletă de culori + tipografie · Brand kit editabil (Canva/Figma) (Fișiere editabile, gata de folosit în Canva sau Figma) · Reguli de folosire, do & don't (Cum se folosesc corect culorile, fonturile și logo-ul) · Aplicat pe materialele tale. (fără modificări, deja conform brand-voice)

### [db:packages.name WHERE slug='pachet-grafica']
**Original:** Grafică publicitară
**Propus:** Grafică publicitară (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='pachet-grafica']
**Original:** Vizualuri care opresc scrollul.
**Propus:** Vizualuri care opresc scrollul. (fără modificări; frază concretă, descrie un efect real, nu e pe kill-list)

Notă: acest pachet nu e randat azi pe `/pachete` (vezi nota generală de la începutul secțiunii 4).

### [db:packages.features WHERE slug='pachet-grafica']
**Original:** Vizualuri pentru social media + ads (Postări, story-uri și reclame, coerente cu brandul) · Materiale print, flyere, roll-up, cărți (Flyere, roll-up, cărți de vizită și afișe, pregătite pentru tipar) · Revizii incluse · Fișiere finale + editabile.
**Propus:** Vizualuri pentru social media + ads (Postări, story-uri și reclame, coerente cu brandul) · Materiale print, flyere, roll-up, cărți (Flyere, roll-up, cărți de vizită și afișe, pregătite pentru tipar) · Revizii incluse · Fișiere finale + editabile. (fără modificări, deja conform brand-voice)

### [db:packages.name WHERE slug='strategie-marketing']
**Original:** Strategie marketing
**Propus:** Strategie marketing (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='strategie-marketing']
**Original:** Un plan, nu intuiție.
**Propus:** Un plan clar, cu pași concreți.

Notă: „Un plan, nu intuiție" e tot tiparul „X, nu Y" (bugetul de o antiteză/pagină e deja consumat de
`PageHeader`). Am păstrat ideea (plan structurat, nu ghicit) rescrisă afirmativ. Pachetul nu e randat
azi pe `/pachete` (vezi nota generală de la începutul secțiunii 4).

### [db:packages.features WHERE slug='strategie-marketing']
**Original:** Poziționare + analiză concurență (Unde te situezi față de concurență și cum te diferențiezi) · Public-țintă + mesaje cheie · Canale + plan de acțiune (Pe ce canale comunici și ce pași urmezi, lună de lună) · Document + prezentare.
**Propus:** Poziționare + analiză concurență (Unde te situezi față de concurență și cum te diferențiezi) · Public-țintă + mesaje cheie · Canale + plan de acțiune (Pe ce canale comunici și ce pași urmezi, lună de lună) · Document + prezentare. (fără modificări, deja conform brand-voice)

### [db:packages.name WHERE slug='mentenanta-standard']
**Original:** Mentenanță Standard
**Propus:** Mentenanță Standard (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='mentenanta-standard']
**Original:** Backup, update-uri și mici modificări, le ținem noi.
**Propus:** Backup, update-uri și mici modificări, le ținem noi. (fără modificări, deja conform brand-voice)

### [db:packages.features WHERE slug='mentenanta-standard']
**Original:** Backup săptămânal · Actualizări CMS · Securitate · 1h modificări incluse (O oră de modificări de conținut incluse în fiecare lună).
**Propus:** Backup săptămânal · Actualizări CMS · Securitate · 1h modificări incluse (O oră de modificări de conținut incluse în fiecare lună). (fără modificări, deja conform brand-voice)

### [db:packages.name WHERE slug='mentenanta-premium']
**Original:** Mentenanță Premium
**Propus:** Mentenanță Premium (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='mentenanta-premium']
**Original:** Te monitorizăm continuu și sărim primii când apare ceva.
**Propus:** Te monitorizăm continuu și sărim primii când apare ceva. (fără modificări, deja conform brand-voice; exact tiparul cerut la §3, „noi" monitorizăm și intervenim, nu „AI rezolvă singur")

### [db:packages.features WHERE slug='mentenanta-premium']
**Original:** Monitorizare continuă (Supraveghere 24/7, prindem problemele înainte să le vezi tu) · Securitate avansată · 3h modificări incluse (Trei ore de modificări de conținut incluse în fiecare lună) · Priority support.
**Propus:** Monitorizare continuă (Supraveghere 24/7, prindem problemele înainte să le vezi tu) · Securitate avansată · 3h modificări incluse (Trei ore de modificări de conținut incluse în fiecare lună) · Priority support. (fără modificări, deja conform brand-voice)

### [db:packages.name WHERE slug='addon-suport']
**Original:** +2 ore suport tehnic
**Propus:** +2 ore suport tehnic (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='addon-suport']
**Original:** Ore suplimentare de intervenții și modificări, în același abonament.
**Propus:** Ore suplimentare de intervenții și modificări, în același abonament. (fără modificări, deja conform brand-voice)

### [db:packages.name WHERE slug='addon-seo']
**Original:** SEO continuu
**Propus:** SEO continuu (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='addon-seo']
**Original:** Monitorizare poziții Google, optimizare cuvinte cheie, ajustări on-page lunare.
**Propus:** Monitorizare poziții Google, optimizare cuvinte cheie, ajustări on-page lunare. (fără modificări, deja conform brand-voice)

### [db:packages.name WHERE slug='addon-hosting']
**Original:** Găzduire premium dedicată
**Propus:** Găzduire premium dedicată (fără modificări de voce)

Notă: acest addon (Simplead vinde direct găzduire) pare să contrazică FAQ #3 de pe aceeași pagină
(„Vă ocupați și de găzduire? Nu, găzduirea nu e la noi... recomandăm Simplenet"). Nu schimb numele/
descrierea, pentru că nu știu care variantă e cea corectă azi (poate fi un addon vechi, rămas activ
din greșeală). De verificat cu Andrei înainte de orice modificare de conținut.

### [db:packages.description WHERE slug='addon-hosting']
**Original:** Server NVMe rapid, securitate extra.
**Propus:** Server NVMe rapid, securitate extra. (fără modificări de voce; vezi nota de contradicție de mai sus, la `name`)

### [db:packages.name WHERE slug='addon-analytics']
**Original:** Raportare avansată Analytics
**Propus:** Raportare avansată Analytics (fără modificări, deja conform brand-voice)

### [db:packages.description WHERE slug='addon-analytics']
**Original:** Rapoarte trafic & conversii + sugestii.
**Propus:** Rapoarte trafic & conversii + sugestii. (fără modificări, deja conform brand-voice)

### [db:packages.name WHERE slug='optimizare-viteza']
**Original:** Optimizare viteză site
**Propus:** Optimizare viteză site (fără modificări, deja conform brand-voice)

Notă: acest pachet e `kind='fix-service'`, nu apare pe `/pachete` (vezi nota generală de la începutul
secțiunii 4); aparține probabil de `/servicii-rapide`, în afara acestei unități.

### [db:packages.description WHERE slug='optimizare-viteza']
**Original:** Site mai rapid: cache, imagini, scripturi și scor mai bun pe mobil.
**Propus:** Site mai rapid: cache, imagini, scripturi și scor mai bun pe mobil. (fără modificări, deja conform brand-voice)

### [db:packages.features WHERE slug='optimizare-viteza']
**Original:** Audit de viteză, PageSpeed/Core Web Vitals (Măsurăm încărcarea pe mobil și desktop) · Cache + compresie + lazy-load imagini · Curățare scripturi și plugin-uri grele · Raport înainte/după.
**Propus:** Audit de viteză, PageSpeed/Core Web Vitals (Măsurăm încărcarea pe mobil și desktop) · Cache + compresie + lazy-load imagini · Curățare scripturi și plugin-uri grele · Raport înainte/după. (fără modificări, deja conform brand-voice)

### [db:packages.name WHERE slug='configurare-email-pro']
**Original:** Configurare email profesional
**Propus:** Configurare email profesional (fără modificări, deja conform brand-voice)

Notă: `kind='fix-service'`, nu apare pe `/pachete` (vezi nota generală de la începutul secțiunii 4).

### [db:packages.description WHERE slug='configurare-email-pro']
**Original:** Email pe domeniul tău, cu livrabilitate corectă (nu mai ajunge în spam).
**Propus:** Email pe domeniul tău, cu livrabilitate corectă (nu mai ajunge în spam). (fără modificări; negația e descriptivă/tehnică, nu tiparul „nu doar X, ci Y" vizat de brand-voice.md §4)

### [db:packages.features WHERE slug='configurare-email-pro']
**Original:** Setup Google Workspace sau Microsoft 365 · Înregistrări SPF, DKIM, DMARC (Autentificarea care ține emailul departe de spam) · Migrarea emailurilor existente (opțional) · Test de livrabilitate.
**Propus:** Setup Google Workspace sau Microsoft 365 · Înregistrări SPF, DKIM, DMARC (Autentificarea care ține emailul departe de spam) · Migrarea emailurilor existente (opțional) · Test de livrabilitate. (fără modificări, deja conform brand-voice)

### [db:packages.name WHERE slug='securizare-malware']
**Original:** Securizare & scanare malware
**Propus:** Securizare & scanare malware (fără modificări, deja conform brand-voice)

Notă: `kind='fix-service'`, nu apare pe `/pachete` (vezi nota generală de la începutul secțiunii 4).

### [db:packages.description WHERE slug='securizare-malware']
**Original:** Curățăm site-ul infectat și îl securizăm ca să nu se repete.
**Propus:** Curățăm site-ul infectat și îl securizăm ca să nu se repete. (fără modificări, deja conform brand-voice)

### [db:packages.note WHERE slug='securizare-malware']
**Original:** Prețul final depinde de gravitatea infecției și de mărimea site-ului.
**Propus:** Prețul final depinde de gravitatea infecției și de mărimea site-ului. (fără modificări, deja conform brand-voice)

### [db:packages.features WHERE slug='securizare-malware']
**Original:** Scanare și curățare malware · Hardening, parole, permisiuni, plugin-uri · Firewall și reguli de protecție · Backup și monitorizare după curățare.
**Propus:** Scanare și curățare malware · Hardening, parole, permisiuni, plugin-uri · Firewall și reguli de protecție · Backup și monitorizare după curățare. (fără modificări, deja conform brand-voice)

### [db:packages.name WHERE slug='migrare-site']
**Original:** Migrare site
**Propus:** Migrare site (fără modificări, deja conform brand-voice)

Notă: `kind='fix-service'`, nu apare pe `/pachete` (vezi nota generală de la începutul secțiunii 4).

### [db:packages.description WHERE slug='migrare-site']
**Original:** Mutăm site-ul pe alt hosting sau domeniu, fără downtime și fără pierderi.
**Propus:** Mutăm site-ul pe alt hosting sau domeniu, fără downtime și fără pierderi. (fără modificări, deja conform brand-voice)

### [db:packages.features WHERE slug='migrare-site']
**Original:** Migrare fișiere + bază de date · Configurare DNS și domeniu · Redirecturi 301, fără pierderi SEO (Păstrăm pozițiile în Google după mutare) · Verificare SSL și funcționare.
**Propus:** Migrare fișiere + bază de date · Configurare DNS și domeniu · Redirecturi 301, fără pierderi SEO (Păstrăm pozițiile în Google după mutare) · Verificare SSL și funcționare. (fără modificări, deja conform brand-voice)

### [db:packages.name WHERE slug='setup-cloudflare']
**Original:** Setup & optimizare Cloudflare
**Propus:** Setup & optimizare Cloudflare (fără modificări, deja conform brand-voice)

Notă: `kind='fix-service'`, nu apare pe `/pachete` (vezi nota generală de la începutul secțiunii 4).

### [db:packages.description WHERE slug='setup-cloudflare']
**Original:** CDN, cache și protecție prin Cloudflare, configurate corect.
**Propus:** CDN, cache și protecție prin Cloudflare, configurate corect. (fără modificări, deja conform brand-voice)

### [db:packages.features WHERE slug='setup-cloudflare']
**Original:** Conectare domeniu la Cloudflare · Cache și reguli de performanță · WAF și protecție de bază · SSL și redirecturi corecte.
**Propus:** Conectare domeniu la Cloudflare · Cache și reguli de performanță · WAF și protecție de bază · SSL și redirecturi corecte. (fără modificări, deja conform brand-voice)
