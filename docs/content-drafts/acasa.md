Status: draft

# Acasă (homepage)

Sursă: citite integral, în ordinea de randare, `src/components/home/HomeHero.astro`, `Differentiator.astro`,
`ProcessTimeline.astro`, `ProofSection.astro`, `CaseStudiesTabbed.astro` (+ `homeCaseStudies` din
`src/data/content.ts`), `AiSection.astro`, `MaintenanceTeaser.astro`, `ToolsSection.astro` (+
`toolCategories`/`toolsAiNote` din `content.ts`), `ClientsStrip.astro`, `Testimonials.astro` (+
`testimonials` din `content.ts`), `CtaFinal.astro`. Context citit înainte: `docs/brand-voice.md`,
`docs/audit-text-v1.md`. Cardurile din `ProofSection` (titlu/rezumat/rezultat per proiect) vin dinamic
din DB (`getPublishedProjects()`), nu din text static în componentă: nu sunt extrase aici ca blocuri
(deja semnalate în `audit-text-v1.md`, ex. clienți placeholder). Mock-ul de dashboard din
`MaintenanceTeaser` (`SimpleAd Manager`, „Live", „99.85%", „37 Site-uri" etc.) e marcat
`aria-hidden="true"` în cod, decorativ, cu nume de site-uri mascate intenționat: nu e o statistică
reală afișată ca atare, așa că nu l-am tratat ca bloc de copy.

### [src/components/home/HomeHero.astro > `hero__pill`]
**Original:** Studio de grafică & marketing digital
**Propus:** Studio de grafică & marketing digital (fără modificări, deja conform brand-voice; aprobat explicit în brand-voice.md §5)

### [src/components/home/HomeHero.astro > `hero__title` (H1)]
**Original:** Servicii digitale fundamentate pe neuroștiință, nu pe noroc.
**Propus:** Servicii digitale fundamentate pe neuroștiință, nu pe noroc. (fără modificări, aprobat explicit în brand-voice.md §5; ăsta e și singurul loc unde ținem antiteza „nu pe X" pe toată pagina)

### [src/components/home/HomeHero.astro > `hero__sub`]
**Original:** Înainte să arate bine, ne asigurăm că și funcționează: pornim de la cum decid oamenii și de la nevoile tale. Combinăm creativitatea cu cercetarea, ca afacerile mici și mijlocii să concureze de la egal la egal cu cele mari.
**Propus:** Înainte să arate bine, ne asigurăm că și funcționează: pornim de la cum decid oamenii și de la nevoile tale. Combinăm creativitatea cu cercetarea, ca afacerile mici și mijlocii să concureze de la egal la egal cu cele mari. (fără modificări, aprobat explicit în brand-voice.md §5)

Notă: brand-voice.md §5 descrie și o listă de servicii pe liniuțe sub subtitlu („Identitate vizuală ·
Design grafic · Dezvoltare web · Mentenanță tehnică lunară"), care nu apare azi în `HomeHero.astro`.
Semnalăm diferența, nu adăugăm noi conținut nou aici (nu e o problemă de voce, ci posibil o piesă
neimplementată încă); de discutat cu Andrei dacă vrea lista adăugată.

### [src/components/home/HomeHero.astro > `hero__cta` (butoane)]
**Original:** Cere o ofertă / Vezi serviciile
**Propus:** Cere o ofertă / Vezi serviciile (fără modificări; „Cere o ofertă" e CTA-ul principal aprobat, brand-voice.md §3)

### [src/components/home/HomeHero.astro > `hero__show` (figcaption-uri)]
**Original:** Designul / Unde se duce atenția, măsurat
**Propus:** Designul / Unde se duce atenția, măsurat (fără modificări, deja conform brand-voice)

### [src/components/home/HomeHero.astro > `hero__trust-lbl`]
**Original:** Lucrează cu noi
**Propus:** Lucrează cu noi (fără modificări, deja conform brand-voice)

### [src/components/home/Differentiator.astro > `diff__title` (H2)]
**Original:** Designul bun se vede și se măsoară.
**Propus:** Designul bun se vede și se măsoară. (fără modificări, deja conform brand-voice)

### [src/components/home/Differentiator.astro > `diff__sub`]
**Original:** Un material bun arată bine și, mai ales, funcționează. De-asta pornim de la cum gândesc și aleg oamenii, fie că lucrăm la o identitate vizuală sau la un site. Urmărim efectul real în afacerea ta, nu doar aspectul. AI-ul ne ajută să lucrăm mai repede, dar cum arată totul la final decidem noi.
**Propus:** Un material bun arată bine și, mai ales, funcționează. De-asta pornim de la cum gândesc și aleg oamenii, fie că lucrăm la o identitate vizuală sau la un site. Urmărim efectul real în afacerea ta: ce se întâmplă după ce cineva vede materialul. AI-ul ne ajută să lucrăm mai repede, dar cum arată totul la final decidem noi.

Notă: „nu doar aspectul" e a doua antiteză „nu doar X" de pe pagină (prima, aprobată, e în H1: „nu pe
noroc"). Brand-voice.md §4 cere maximum una pe pagină, în hero; am rescris afirmativ aici ca să nu o
mai dublăm.

### [src/components/home/Differentiator.astro > `diff__meta` (listă)]
**Original:**
- Metodă: Eye-tracking + heatmap
- Ce citim: Primele secunde de atenție
**Propus:** (fără modificări, deja conform brand-voice)
- Metodă: Eye-tracking + heatmap
- Ce citim: Primele secunde de atenție

### [src/components/home/Differentiator.astro > `study__cap` + `plate__tag` (etichete studiu de caz)]
**Original:** Studiu de caz / FEAA Galați · reclamă / Fig. 01 · Design / Fig. 02 · Heatmap
**Propus:** Studiu de caz / FEAA Galați · reclamă / Fig. 01 · Design / Fig. 02 · Heatmap (fără modificări, deja conform brand-voice)

### [src/components/home/Differentiator.astro > `study__notes` (2 paragrafe)]
**Original:**
1. Reclama, așa cum o vede oricine. Un design publicat pentru FEAA Galați. Frumos, dar atât poate vedea ochiul liber.
2. Heatmap din eye-tracking. Zonele calde arată unde cade privirea întâi: pe fețe, pe „economic", pe buton. De-aici știm unde să punem mesajul, fără să ghicim.
**Propus:** (fără modificări, deja conform brand-voice)
1. Reclama, așa cum o vede oricine. Un design publicat pentru FEAA Galați. Frumos, dar atât poate vedea ochiul liber.
2. Heatmap din eye-tracking. Zonele calde arată unde cade privirea întâi: pe fețe, pe „economic", pe buton. De-aici știm unde să punem mesajul, fără să ghicim.

### [src/components/home/ProcessTimeline.astro > `SectionHeading` props (eyebrow/title/subtitle)]
**Original:** Cum lucrăm — Procesul, pas cu pas — Un proces clar, în care știi mereu unde suntem și de ce.
**Propus:** Cum lucrăm — Procesul, pas cu pas — Un proces clar, în care știi mereu unde suntem și de ce. (fără modificări, deja conform brand-voice)

### [src/components/home/ProcessTimeline.astro > `steps[]` (listă, 5 pași)]
**Original:**
1. Ne cunoaștem (Start): O discuție fără obligații în care ascultăm: ce vrei să obții, unde ești blocat și dacă suntem partenerii potriviți pentru tine.
2. Analiză & cercetare (Cercetare): Ne uităm la situația ta, la concurență și la public. Aici intervin datele și neuromarketingul: deciziile pornesc de la cum gândesc oamenii, nu de la presupuneri.
3. Strategie (Plan): Punem concluziile într-un plan concret, pe obiective măsurabile. Știi exact ce facem, pe ce canale și ce rezultat țintim.
4. Execuție (Execuție): Ducem planul în realitate (design, grafică, web), transparent și cu update-uri regulate, ca să știi mereu unde suntem.
5. Rezultate & mentenanță (Rezultate): Rămânem alături și după lansare. Măsurăm, optimizăm și ținem site-ul în formă până se văd rezultatele.
**Propus:**
1. Ne cunoaștem (Start): O discuție fără obligații în care ascultăm: ce vrei să obții, unde ești blocat și dacă suntem partenerii potriviți pentru tine.
2. Analiză & cercetare (Cercetare): Ne uităm la situația ta, la concurență și la public. Aici intervin datele și neuromarketingul: pornim de la cum gândesc și decid oamenii reali.
3. Strategie (Plan): Punem concluziile într-un plan concret, pe obiective măsurabile. Știi exact ce facem, pe ce canale și ce rezultat țintim.
4. Execuție (Execuție): Ducem planul în realitate (design, grafică, web), transparent și cu update-uri regulate, ca să știi mereu unde suntem.
5. Rezultate & mentenanță (Rezultate): Rămânem alături și după lansare. Măsurăm, optimizăm și ținem site-ul în formă până se văd rezultatele.

Notă: pasul 2 avea „nu de la presupuneri", a treia antiteză „nu X" de pe pagină (după H1 și
`Differentiator`). Am tăiat coada antitetică și am păstrat ideea afirmativ, ca să respectăm regula
„maximum o antiteză pe pagină" din brand-voice.md §4.

### [src/components/home/ProofSection.astro > `SectionHeading` props (eyebrow/title/subtitle)]
**Original:** Dovada — Ce-am construit și ce s-a schimbat. — Proiecte reale, pentru afaceri reale. Vezi ce am construit și rezultatele lor.
**Propus:** Dovada — Ce-am construit și ce s-a schimbat. — Proiecte reale, pentru afaceri reale. Vezi ce am construit și rezultatele lor. (fără modificări, deja conform brand-voice)

### [src/components/home/ProofSection.astro > `proof__all` (link CTA)]
**Original:** Vezi tot portofoliul
**Propus:** Vezi tot portofoliul (fără modificări, deja conform brand-voice)

### [src/components/home/CaseStudiesTabbed.astro > `cs2__all` (link CTA, sus)]
**Original:** Vezi tot portofoliul
**Propus:** Vezi tot portofoliul (fără modificări, deja conform brand-voice)

### [src/components/home/CaseStudiesTabbed.astro > `cs2__title` (H2)]
**Original:** Rezultate care se văd, pentru orice afacere.
**Propus:** Rezultate care se văd, pentru orice afacere. (fără modificări, deja conform brand-voice)

### [src/components/home/CaseStudiesTabbed.astro > `cs2__sub`]
**Original:** Proiecte reale, pentru afaceri reale. Dovada e în rezultatele clienților noștri.
**Propus:** Proiecte reale, pentru afaceri reale. Dovada e în rezultatele clienților noștri.

Notă: fraza „Proiecte reale, pentru afaceri reale." apare identic și în subtitlul `ProofSection` de
mai sus, pe aceeași pagină. Nu e o regulă încălcată explicit, dar e o repetiție ușor de observat între
două secțiuni consecutive; las-o neatinsă în această rundă (nu inventez variație doar de dragul
variației), semnalez pentru rundă viitoare dacă Andrei vrea diferențiere.

### [src/components/home/CaseStudiesTabbed.astro > `homeCaseStudies[].tab` (etichete taburi, listă)]
**Original:** Web & eCommerce / Branding & creație / Mentenanță & suport
**Propus:** Web & eCommerce / Branding & creație / Mentenanță & suport (fără modificări, deja conform brand-voice)

### [src/components/home/CaseStudiesTabbed.astro > `cs2__read` (CTA, per card)]
**Original:** Citește studiul complet
**Propus:** Citește studiul complet (fără modificări, deja conform brand-voice)

### [db-adjacent: src/data/content.ts > `homeCaseStudies[0]` (tab „Web & eCommerce")]
**Original:** Citat: „Le-am studiat portofoliul și am remarcat originalitatea și claritatea soluțiilor propuse. Proiectul a decurs conform așteptărilor, iar rezultatul a fost foarte apreciat de compania noastră." — Silviu Costiniuc, Echipamente-medicale.ro. Statistici: „3 săpt." (de la brief la lansare) · „100%" (responsiv, pe orice dispozitiv).
**Propus:** Citat: neschimbat (vezi notă). Statistici: „[confirmă: 3 săpt. de la brief la lansare]" · „100%" (responsiv, pe orice dispozitiv) — neschimbat.

Notă: citatul e un testimonial real, în cuvintele clientului (conține „remarcat"/„soluțiilor", cuvinte
de pe kill-list-ul nostru de voce, dar nu rescriem vocea unui client real). Statistica „3 săpt." are
în cod comentariul `// TODO: confirmă`, deci nu e o cifră confirmată; am marcat-o `[confirmă: ...]` în
Propus, nu am schimbat valoarea. „100% responsiv" e o afirmație tehnică, nu o cifră de sondaj, am
lăsat-o neschimbată.

### [db-adjacent: src/data/content.ts > `homeCaseStudies[1]` (tab „Branding & creație")]
**Original:** Citat: „Profesionalism, fairplay, pricepere, asumare: cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună, datorită implicării active și relaționării impecabile." — Ștefan Chelmu, Blitzstudio. Statistici: „2" (proiecte împreună) · „100%" (ar recomanda mai departe).
**Propus:** Citat: neschimbat (testimonial real). Statistici: „2" (proiecte împreună, neschimbat) · „[confirmă: 100% ar recomanda mai departe]".

Notă: „100% ar recomanda mai departe" are `// TODO: confirmă` în cod; marcat ca atare, nu am
inventat altă valoare.

### [db-adjacent: src/data/content.ts > `homeCaseStudies[2]` (tab „Mentenanță & suport")]
**Original:** Citat: „Simply professional. Trustworthy, honest and creative." — Bogdan Drăgan, FEAA Galați. Statistici: „99.9%" (uptime monitorizat) · „5+ ani" (parteneriat continuu).
**Propus:** Citat: neschimbat (testimonial real). Statistici: „[confirmă: 99.9% uptime monitorizat]" · „[confirmă: 5+ ani parteneriat continuu]".

Notă: ambele statistici au `// TODO: confirmă` în cod; marcate ca atare, valorile rămân neschimbate.

### [src/components/home/AiSection.astro > `ai__title` (H2)]
**Original:** AI gândit pe afacerea ta.
**Propus:** AI gândit pe afacerea ta. (fără modificări, deja conform brand-voice)

### [src/components/home/AiSection.astro > `ai__sub`]
**Original:** Folosim AI ca să automatizăm ce e repetitiv în firma ta și să construim aplicații pe nevoile tale, de la fluxuri interne la unelte care nu există de-a gata. Unde nu ajută cu adevărat, îți spunem direct.
**Propus:** Folosim AI ca să automatizăm ce e repetitiv în firma ta și să construim aplicații pe nevoile tale, de la fluxuri interne la unelte care nu există de-a gata. Unde nu ajută cu adevărat, îți spunem direct. (fără modificări, deja conform brand-voice)

### [src/components/home/AiSection.astro > `ai__cta` (buton)]
**Original:** Descoperă AI pentru business
**Propus:** Descoperă AI pentru business (fără modificări, deja conform brand-voice)

### [src/components/home/AiSection.astro > `ai__panel-head`]
**Original:** Ce construim cu AI / 03 direcții
**Propus:** Ce construim cu AI / 03 direcții (fără modificări, deja conform brand-voice)

### [src/components/home/AiSection.astro > `features[]` (listă, 3 direcții)]
**Original:**
1. Procese mai bune: Ne uităm la felul în care lucrezi și folosim AI ca să eliminăm pașii inutili și să scurtăm drumul de la idee la rezultat.
2. Aplicații pe măsura ta: Dezvoltăm aplicații specifice businessului tău: de la fluxuri interne la unelte care nu există „de-a gata" pe piață.
3. Automatizări cu cap: Sarcinile repetitive trec pe pilot automat, ca tu să nu le mai faci de mână.
**Propus:** (fără modificări, deja conform brand-voice)
1. Procese mai bune: Ne uităm la felul în care lucrezi și folosim AI ca să eliminăm pașii inutili și să scurtăm drumul de la idee la rezultat.
2. Aplicații pe măsura ta: Dezvoltăm aplicații specifice businessului tău: de la fluxuri interne la unelte care nu există „de-a gata" pe piață.
3. Automatizări cu cap: Sarcinile repetitive trec pe pilot automat, ca tu să nu le mai faci de mână.

Notă: fraza „de la fluxuri interne la unelte care nu există de-a gata" apare aproape identic și în
`ai__sub` de mai sus, la câteva rânduri distanță. Repetiție minoră, nu o regulă încălcată; nu am
rescris ca să nu ating conținutul (ce anume construiește Simplead cu AI), doar semnalez.

### [src/components/home/MaintenanceTeaser.astro > `mnt__title` (H2)]
**Original:** Site-ul tău, monitorizat continuu. Prindem problemele înainte să le simți tu.
**Propus:** Site-ul tău, monitorizat continuu. Prindem problemele înainte să le simți tu. (fără modificări, deja conform brand-voice)

### [src/components/home/MaintenanceTeaser.astro > `mnt__sub`]
**Original:** Site-ul tău e monitorizat în permanență de aplicația noastră, SimpleAd Manager. Așa, tu îți vezi liniștit de afacere, iar noi rezolvăm problemele înainte să le simți tu. Și înainte să te coste.
**Propus:** Site-ul tău e monitorizat în permanență de aplicația noastră, SimpleAd Manager. Așa, tu îți vezi liniștit de afacere, iar noi rezolvăm problemele înainte să le simți tu. Și înainte să te coste. (fără modificări, deja conform brand-voice; AI-ul monitorizează, „noi" rezolvăm, exact regula dură din §3)

### [src/components/home/MaintenanceTeaser.astro > `mnt__cta` (buton + link)]
**Original:** Calculează-ți pachetul / Vezi ce monitorizăm
**Propus:** Calculează-ți pachetul / Vezi ce monitorizăm (fără modificări, deja conform brand-voice)

### [src/components/home/ToolsSection.astro > `SectionHeading` props (eyebrow/title)]
**Original:** Cu ce lucrăm — Uneltele potrivite, pentru fiecare etapă.
**Propus:** Cu ce lucrăm — Uneltele potrivite, pentru fiecare etapă. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > `toolCategories[]` (listă categorii + unelte)]
**Original:**
- Design: Figma, Photoshop, Illustrator, InDesign, Premiere Pro, CorelDRAW
- Web: WordPress, WooCommerce, Elementor
- Marketing: Google Ads, Search Console, Tag Manager, Google Analytics 4, MailerLite
- Frontend: React, Vue.js, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, PHP, Laravel, Python
- Bază de date: MySQL, PostgreSQL, Redis
- AI: Claude, OpenAI
**Propus:** (fără modificări, deja conform brand-voice; liste de unelte reale, nu copy de voce)
- Design: Figma, Photoshop, Illustrator, InDesign, Premiere Pro, CorelDRAW
- Web: WordPress, WooCommerce, Elementor
- Marketing: Google Ads, Search Console, Tag Manager, Google Analytics 4, MailerLite
- Frontend: React, Vue.js, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, PHP, Laravel, Python
- Bază de date: MySQL, PostgreSQL, Redis
- AI: Claude, OpenAI

### [src/data/content.ts > `toolsAiNote`]
**Original:** Cea mai mare parte din dezvoltare (frontend, backend, baze de date) o construim asistat de AI. Fără vrăjeală: îl folosim acolo unde ne face mai rapizi și mai buni.
**Propus:** Cea mai mare parte din dezvoltare (frontend, backend, baze de date) o construim asistat de AI. Fără vrăjeală: îl folosim acolo unde ne face mai rapizi și mai buni. (fără modificări, deja conform brand-voice; „Fără vrăjeală" e onest și concret, nu clișeul interzis „Fără hype")

### [src/components/home/ClientsStrip.astro > `clients__label`]
**Original:** Au lucrat cu noi
**Propus:** Au lucrat cu noi (fără modificări, deja conform brand-voice)

### [src/components/home/ClientsStrip.astro > `clients[]` (listă nume clienți)]
**Original:** Blitzstudio, Echipamente-medicale.ro, FEAA Galați, Universitatea „Dunărea de Jos", Cross2Map
**Propus:** Blitzstudio, Echipamente-medicale.ro, FEAA Galați, Universitatea „Dunărea de Jos", Cross2Map (fără modificări)

Notă: brand-voice.md §3 zice „Galați doar în footer + schema LocalBusiness", dar aici „Galați" apare
ca parte din numele real al unor clienți (FEAA Galați, Universitatea „Dunărea de Jos" e din Galați),
nu ca poziționare proprie a Simplead. Tratez asta ca nume de client, nu ca încălcare (aceeași
ambiguitate semnalată deja în audit-text-v1.md, secțiunea Minoră); nu schimb numele clienților.

### [src/components/home/Testimonials.astro > `SectionHeading` props (eyebrow/title)]
**Original:** Ce spun clienții — Oameni care au lucrat direct cu noi.
**Propus:** Ce spun clienții — Oameni care au lucrat direct cu noi. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > `testimonials[0]` (Ștefan Chelmu, Blitzstudio)]
**Original:** „Profesionalism, fairplay, pricepere, asumare: cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună, datorită implicării active și relaționării impecabile."
**Propus:** neschimbat (testimonial real, în cuvintele clientului; nu rescriem vocea unui client real).

### [src/data/content.ts > `testimonials[1]` (Silviu Costiniuc, Echipamente-medicale.ro)]
**Original:** „Le-am studiat portofoliul și am remarcat originalitatea și claritatea soluțiilor propuse. Proiectul a decurs conform așteptărilor, iar rezultatul a fost foarte apreciat de compania noastră. I-am recomandat cu mare încredere și altor colegi."
**Propus:** neschimbat (testimonial real, în cuvintele clientului; conține cuvinte de pe kill-list-ul nostru intern, dar e citatul clientului, nu vocea Simplead, deci nu îl rescriem).

### [src/data/content.ts > `testimonials[2]` (Bogdan Drăgan, FEAA Galați)]
**Original:** „Simply professional. Trustworthy, honest and creative."
**Propus:** neschimbat (testimonial real, în cuvintele clientului).

### [src/data/content.ts > `testimonials[3]` (Andreea Marin, Verdana Studio)]
**Original:** „Comunicare clară de la brief la livrare. Am primit exact ce ne-am dorit, la timp și fără surprize."
**Propus:** neschimbat.

Notă: pare dată placeholder / de verificat cu Andrei, neatins în această rundă. În cod, autorul și
compania sunt marcate explicit `// PLACEHOLDER`, cu comentariul „testimoniale FICTIVE, de înlocuit cu
reale înainte de a le considera definitive". Nu invent un client sau citat nou aici.

### [src/data/content.ts > `testimonials[4]` (Radu Popescu, Nordis Construct)]
**Original:** „Site-ul nou ne-a adus mai multe cereri de ofertă în prima lună decât tot anul trecut. Recomand fără rezerve."
**Propus:** neschimbat.

Notă: pare dată placeholder / de verificat cu Andrei, neatins în această rundă (marcat
`// PLACEHOLDER` în cod; conține și o comparație numerică nesusținută, „mai multe... decât tot anul
trecut", care nu are sursă reală).

### [src/data/content.ts > `testimonials[5]` (Ioana Dumitru, Lumea Copiilor)]
**Original:** „Oameni cu care e ușor să lucrezi: ascultă, propun soluții și își respectă termenele."
**Propus:** neschimbat.

Notă: pare dată placeholder / de verificat cu Andrei, neatins în această rundă (marcat
`// PLACEHOLDER` în cod).

### [src/data/content.ts > `testimonials[6]` (Mihai Ionescu, Cofetăria Dulce)]
**Original:** „De la rebranding până la mentenanță lunară, ne-au fost alături la fiecare pas. Un partener de încredere."
**Propus:** neschimbat.

Notă: pare dată placeholder / de verificat cu Andrei, neatins în această rundă (marcat
`// PLACEHOLDER` în cod).

### [src/components/home/CtaFinal.astro > `cta__title` (H2)]
**Original:** Ai o afacere bună.<br />Hai s-o facem și să se vadă.
**Propus:** Ai o afacere bună. Hai s-o facem și să se vadă. (fără modificări de fond, deja conform brand-voice)

### [src/components/home/CtaFinal.astro > `cta__sub`]
**Original:** Spune-ne în câteva cuvinte cu ce te putem ajuta. Îți răspundem noi, oameni, la fiecare mesaj.
**Propus:** Spune-ne în câteva cuvinte cu ce te putem ajuta. Îți răspundem noi, oameni, la fiecare mesaj. (fără modificări, deja conform brand-voice)

### [src/components/home/CtaFinal.astro > `cta__actions` (buton)]
**Original:** Cere o ofertă
**Propus:** Cere o ofertă (fără modificări, CTA principal aprobat, brand-voice.md §3)
