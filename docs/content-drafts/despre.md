Status: draft

# Despre

Sursă: `src/pages/despre.astro` citit integral (meta description + toate secțiunile: hero, povestea,
metoda, cei doi, dovada, colaborări, valori, CTA final). Context citit înainte: `docs/brand-voice.md`
și `docs/audit-text-v1.md`.

### [src/pages/despre.astro > `metaDescription` (const, L9-10)]
**Original:** Simplead e un studio mic de grafică și marketing digital. Suntem doi, Andrei (doctor în marketing) și Gabriel, plus colaboratori la nevoie. Pornim de la cum decid oamenii, nu de la presupuneri.
**Propus:** Simplead e un studio mic de grafică și marketing digital. Suntem doi: Andrei (doctor în marketing) și Gabriel, plus colaboratori aduși atunci când proiectul are nevoie. Pornim de la cum decid oamenii înainte să luăm orice decizie de design sau marketing.

Notă: am rescris afirmativ finalul ("nu de la presupuneri" → "înainte să luăm orice decizie"), pentru
că am păstrat deja singura antiteză "nu doar X / nu Y" permisă pe pagină în subtitlul din hero
(blocul următor). Mențiunea scurtă a doctoratului rămâne, e deja discretă, nu completă.

### [src/pages/despre.astro > secțiunea hero, `.dh-hero__eyebrow`, L44]
**Original:** Despre noi
**Propus:** Despre noi (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > secțiunea hero, `.dh-hero__title` (H1), L45-47]
**Original:** Doi oameni care îți tratează proiectul ca pe-al lor.
**Propus:** Doi oameni care îți tratează proiectul ca pe-al lor. (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > secțiunea hero, `.dh-hero__sub`, L48-51]
**Original:** Studio mic de grafică și marketing digital, nu o agenție cu zeci de oameni. Lucrezi direct cu noi, de la prima discuție până la final.
**Propus:** Studio mic de grafică și marketing digital, nu o agenție cu zeci de oameni. Lucrezi direct cu noi, de la prima discuție până la final. (fără modificări, deja conform brand-voice)

Notă: aici păstrăm singura antiteză "nu X" permisă pe toată pagina (brand-voice §4: max 1/pagină, de
preferat în hero) — de-aia am rescris afirmativ celelalte două apariții de mai jos (manifesto și
secțiunea „Colaborări").

### [src/pages/despre.astro > `.dh-duo` (semnătura celor doi), L54-62]
**Original:** Andrei Panait — Strategie, web & cercetare / Gabriel Tulearca — Grafică, marketing & social
**Propus:** Andrei Panait, Strategie, web și cercetare / Gabriel Tulearca, Grafică, marketing și social media

Notă: în markup nu există em-dash real (simbolul „/" desparte cele două carduri, iar „&" e doar
tipografic), deci nu e o încălcare live a regulii, dar am notat varianta fără „&" ca opțiune mai
caldă dacă se dorește uniformizare cu restul textului.

### [src/pages/despre.astro > `.dh-hero__cta` buton primar (`Button`), L66]
**Original:** Hai să discutăm
**Propus:** Hai să discutăm (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > `.dh-hero__cta` link secundar, L67]
**Original:** Vezi portofoliu
**Propus:** Vezi portofoliu (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > secțiunea Povestea, `.dh-story-eyebrow`, L77]
**Original:** Povestea
**Propus:** Povestea (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > secțiunea Povestea, H2 `.sec-title`, L78]
**Original:** De ce există Simplead
**Propus:** De ce există Simplead (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > secțiunea Povestea, paragraf 1, L80-83]
**Original:** Am început să fac grafică încă din liceu. Colegii și primii mei colaboratori veneau mereu cu cereri: un afiș, un logo, un material pentru promovare. Și de fiecare dată procesul era mult mai complicat decât trebuia, pentru un rezultat care putea fi simplu și folositor.
**Propus:** Am început să fac grafică încă din liceu. Colegii și primii mei colaboratori veneau mereu cu cereri: un afiș, un logo, un material pentru promovare. Și de fiecare dată procesul era mult mai complicat decât trebuia, pentru un rezultat care putea fi simplu și folositor. (fără modificări, deja conform brand-voice)

Notă: persoana I „eu" e permisă aici (secțiunea „poveste", cf. brand-voice §1).

### [src/pages/despre.astro > secțiunea Povestea, paragraf 2, L84-88]
**Original:** De-acolo a pornit Simplead: din dorința de a face lucrurile mai simple și mai utile. Am deschis firma cu ajutorul unei finanțări europene și de-atunci am mers mai departe, proiect cu proiect.
**Propus:** De-acolo a pornit Simplead: din dorința de a face lucrurile mai simple și mai utile. Am deschis firma cu ajutorul unei finanțări europene și de-atunci am mers mai departe, proiect cu proiect. (fără modificări, deja conform brand-voice)

Notă: `audit-text-v1.md` semnalează fraza despre finanțarea europeană ca „fapt neconsemnat" (nu e în
lista de fapte verificate din brand-voice §6). Nu e o cifră sau un nume placeholder, deci nu am
schimbat nimic; las mai departe decizia de confirmare la Andrei.

### [src/pages/despre.astro > `.dh-story-stats`, L89-92]
**Original:** [confirmă] ani de lucru / [confirmă] proiecte
**Propus:** [confirmă] ani de lucru / [confirmă] proiecte (fără modificări, deja conform brand-voice: cifrele nu sunt încă confirmate și sunt deja marcate corect ca `[confirmă]`)

### [src/pages/despre.astro > `.dh-logo-panel__cap`, L97]
**Original:** Pornit cu o finanțare europeană
**Propus:** Pornit cu o finanțare europeană (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > secțiunea Metoda, H2 `.sec-title`, L107]
**Original:** Mai puțin noroc, mai multă metodă.
**Propus:** Mai puțin noroc, mai multă metodă. (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > `.dh-manifesto__lead` paragraf 1, L109-114]
**Original:** Cele mai multe mesaje de marketing nu dau greș din cauza bugetului mic. Dau greș fiindcă deciziile se iau pe „mie îmi place" sau pe ce zic oamenii într-un chestionar. Și oamenii nu prea cumpără cum spun: cele mai multe decizii se iau repede și emoțional, înainte ca rațiunea să intre în joc.
**Propus:** Cele mai multe mesaje de marketing nu dau greș din cauza bugetului mic. Dau greș fiindcă deciziile se iau pe „mie îmi place" sau pe ce zic oamenii într-un chestionar. Și oamenii nu prea cumpără cum spun: cele mai multe decizii se iau repede și emoțional, înainte ca rațiunea să intre în joc. (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > `.dh-manifesto__lead` paragraf 2, L115-119]
**Original:** De-aia pornim de la cum decid oamenii cu adevărat, nu de la presupuneri. Asta intră în alegeri concrete de pe proiectul tău: ce vede omul întâi, cum simte pagina în primele secunde, ce îl face să aibă încredere și să acționeze.
**Propus:** De-aia pornim de la cum decid oamenii cu adevărat. Ne uităm la alegeri concrete de pe proiectul tău: ce vede omul întâi, cum simte pagina în primele secunde, ce îl face să aibă încredere și să acționeze.

Notă: am scos antiteza „nu de la presupuneri" (rescris afirmativ), fiindcă bugetul de o antiteză pe
pagină e deja folosit în hero.

### [src/pages/despre.astro > `.dh-quote-card` blockquote, L123-126]
**Original:** Nu avem un buton magic și nici nu promitem ceva ce nu putem livra. Ne bazăm pe date, procesăm informațiile și îmbunătățim acolo unde este nevoie să intervenim.
**Propus:** Nu avem un buton magic și nici nu promitem ceva ce nu putem livra. Ne bazăm pe date: măsurăm ce se întâmplă și îmbunătățim ce nu funcționează.

Notă: am tăiat redundanța „îmbunătățim acolo unde este nevoie să intervenim" (îmbunătățim +
intervenim spun același lucru de două ori); nu am atins nimic din promisiunea de fond.

### [src/pages/despre.astro > secțiunea Cei doi, H2 `.sec-title`, L140-143]
**Original:** Suficient de mici cât să ne pese. Suficient de buni cât să ducem treaba la capăt.
**Propus:** Suficient de mici cât să ne pese. Suficient de buni cât să ducem treaba la capăt. (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > secțiunea Cei doi, paragraf 1, L144-150]
**Original:** Lucrăm direct pe proiectele clienților, fără să pasăm la juniori și fără să dispărem după ce semnăm. Eu mă ocup de strategie, web și partea de cercetare. Gabriel a preluat grafica de la mine și ține design-ul, strategiile de marketing și social media. Când e nevoie de foto, video sau dezvoltare specializată, chemăm colaboratori cu care lucrăm de ani de zile și în care avem încredere.
**Propus:** Lucrăm direct pe proiectele clienților, fără să pasăm la juniori și fără să dispărem după ce semnăm. Andrei se ocupă de strategie, web și partea de cercetare. Gabriel a preluat grafica de la Andrei și ține design-ul, strategiile de marketing și social media. Când e nevoie de foto, video sau dezvoltare specializată, chemăm colaboratori cu care lucrăm de ani de zile și în care avem încredere.

Notă: am înlocuit „Eu mă ocup de..." cu „Andrei se ocupă de...", fiindcă secțiunea „Cei doi" nu e
„poveste" sau „metodă" (singurele secțiuni unde brand-voice §1 permite persoana I pe /despre); restul
paragrafului e deja la „noi", deci amestecul de persoană se rezolvă păstrând a treia persoană aici.

### [src/pages/despre.astro > secțiunea Cei doi, paragraf 2, L151-154]
**Original:** Așa, ai mereu cu cine vorbi direct, nu se pierde informație între departamente și tot ce livrăm a trecut prin aceleași mâini, de la brief până la final.
**Propus:** Așa, ai mereu cu cine vorbi direct, nu se pierde informație între departamente și tot ce livrăm a trecut prin aceleași mâini, de la brief până la final. (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > secțiunea Cei doi, paragraf 3, L155-158]
**Original:** Lucrăm cu afaceri mici și medii din România, dar și cu clienți din afara țării care vor un partener serios.
**Propus:** Lucrăm cu afaceri mici și medii din România, dar și cu clienți din afara țării care vor un partener serios. (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > card echipă Andrei (`.team-card`), L173-177]
**Original:** Andrei Alexandru Panait — Fondator — Strategie, web și cercetare. Doctor în marketing, cu cercetare în neuromarketing.
**Propus:** Andrei Alexandru Panait — Fondator — Strategie, web și cercetare. Doctor în marketing, cu cercetare în neuromarketing. (fără modificări, deja conform brand-voice)

Notă: acesta e cardul de bio al echipei de pe /despre, exact locul unde brand-voice §3/§6 cere
mențiunea completă și corectă a doctoratului ("doctor în marketing, cu cercetare în neuromarketing"),
o singură dată pe site. Formularea e deja corectă, nu se repetă complet altundeva pe pagina asta
(în meta description apare doar scurt, „doctor în marketing"). Nu am atins nimic aici.
(„—" de mai sus e doar notația mea pentru separarea nume/rol/bio în acest draft, nu apare ca atare
în markup.)

### [src/pages/despre.astro > card echipă Gabriel (`.team-card`), L183-185]
**Original:** Gabriel Tulearca — Grafică, marketing & social media — Doctorand în marketing.
**Propus:** Gabriel Tulearca — Grafică, marketing & social media — Doctorand în marketing. (fără modificări)

Notă: pare dată de verificat cu Andrei — „Doctorand în marketing" pentru Gabriel nu apare în lista
de fapte confirmate din brand-voice §6 (care acoperă doar faptele lui Andrei); neatins în această
rundă, doar semnalat, cf. `audit-text-v1.md` (găsire minoră).

### [src/pages/despre.astro > secțiunea Dovada, H2 `.sec-title`, L197-199]
**Original:** Afaceri mici, instituții, proiecte din mai multe domenii.
**Propus:** Afaceri mici, instituții, proiecte din mai multe domenii. (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > `.dh-proof__lead`, L200-205]
**Original:** Am lucrat cu afaceri la început de drum și cu instituții mari: FEAA Galați, Universitatea „Dunărea de Jos", plus clienți din sănătate și beauty, educație, brand personal și business. Peste 20 de site-uri construite de noi sunt și azi online, în patru domenii diferite. Fiecare a primit aceeași atenție, indiferent de buget.
**Propus:** Am lucrat cu afaceri la început de drum și cu instituții mari: FEAA Galați, Universitatea „Dunărea de Jos", plus clienți din sănătate și beauty, educație, brand personal și business. [confirmă: peste 20 de site-uri] construite de noi sunt și azi online, în patru domenii diferite. Fiecare a primit aceeași atenție, indiferent de buget.

Notă: „peste 20 de site-uri" nu are marcaj `[confirmă: ...]` în original și nu e în lista de cifre deja
confirmate din brand-voice; l-am încadrat ca `[confirmă: ...]` fără să schimb numărul. Menționarea
„Galați" e nume de client/instituție (FEAA Galați, Universitatea „Dunărea de Jos"), nu poziționare
proprie a Simplead, deci nu intră sub regula „Galați doar în footer" cf. notei din
`audit-text-v1.md`; neatins.

### [src/pages/despre.astro > `.dh-quote` (testimonial), L209-210]
**Original:** „Simply professional. Trustworthy, honest and creative." — Bogdan Drăgan, FEAA Galați
**Propus:** „Simply professional. Trustworthy, honest and creative." — Bogdan Drăgan, FEAA Galați (fără modificări, deja conform brand-voice)

Notă: acesta e un testimonial atribuit corect (spre deosebire de cazul semnalat în audit pe
`/servicii/consultanta-marketing`, unde testimonialul lui Silviu Costiniuc apare reatribuit unui alt
„client"); nu am schimbat nimic.

### [src/pages/despre.astro > secțiunea Colaborări, `.trust__title`, L231-233]
**Original:** Relații care țin de ani, nu de luni
**Propus:** Relații care durează ani întregi

Notă: am rescris afirmativ (a doua antiteză de pe pagină, peste bugetul de 1/pagină din brand-voice
§4); singura antiteză păstrată e cea din hero.

### [src/pages/despre.astro > `.trust__sub`, L234-238]
**Original:** Unii clienți sunt cu noi de [confirmă: ani]. Doi parteneri principali, Marketing Deck și M1 Med Beauty, ne trimit constant proiecte noi, fiindcă rezultatele se văd în timp.
**Propus:** Unii clienți sunt cu noi de [confirmă: ani]. Doi parteneri principali, Marketing Deck și M1 Med Beauty, ne trimit constant proiecte noi, fiindcă rezultatele se văd în timp. (fără modificări, deja conform brand-voice: cifra e deja marcată corect `[confirmă: ...]`)

### [src/pages/despre.astro > `.trust__stats`, L239-242]
**Original:** [confirmă] ani, cea mai lungă colaborare / 2 parteneri principali
**Propus:** [confirmă] ani, cea mai lungă colaborare / 2 parteneri principali (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > `.trust__partners` (etichetă + carduri parteneri), L245-285]
**Original:** Parteneri principali — Marketing Deck: Vezi site-ul — M1 Med Beauty: Vezi site-ul
**Propus:** Parteneri principali — Marketing Deck: Vezi site-ul — M1 Med Beauty: Vezi site-ul (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > secțiunea Valori, H2 `.sec-title`, L293-295]
**Original:** Câteva lucruri în care credem.
**Propus:** Câteva lucruri în care credem. (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > `.belief` 1 (titlu + text), L299-300]
**Original:** Un client informat e un client mai bun — Îți explicăm ce primești și de ce, fără jargon. Deciziile bune se iau cu lucrurile pe masă.
**Propus:** Un client informat e un client mai bun — Îți explicăm ce primești și de ce, fără jargon. Deciziile bune se iau cu lucrurile pe masă. (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > `.belief` 2 (titlu + text), L304-305]
**Original:** Onestitatea de la început costă mai puțin — Inclusiv un „asta nu e specialitatea noastră" spus din start, în loc de o dezamăgire la final.
**Propus:** Onestitatea de la început costă mai puțin — Inclusiv un „asta nu e specialitatea noastră" spus din start, în loc de o dezamăgire la final. (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > `.belief` 3 (titlu + text), L309-310]
**Original:** Un proiect mic, tratat serios — Face mai mult decât un proiect mare tratat ca un simplu număr de factură.
**Propus:** Un proiect mic, tratat serios — Face mai mult decât un proiect mare tratat ca un simplu număr de factură. (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > `<CtaSection>` props `kicker` / `title` / `subtitle`, L317-319]
**Original:** Hai să începem — Vrei să lucrăm împreună? — Spune-ne în câteva cuvinte cu ce te putem ajuta. Îți răspundem noi, oameni, la fiecare mesaj.
**Propus:** Hai să începem — Vrei să lucrăm împreună? — Spune-ne în câteva cuvinte cu ce te putem ajuta. Îți răspundem noi, oameni, la fiecare mesaj. (fără modificări, deja conform brand-voice)

### [src/pages/despre.astro > `<CtaSection>` props `cta` / `secondaryLabel`, L321-323]
**Original:** Hai să discutăm / Vezi portofoliu
**Propus:** Hai să discutăm / Vezi portofoliu (fără modificări, deja conform brand-voice)
