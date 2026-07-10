Status: draft

# Servicii (hub)

Sursă: citite integral `src/pages/servicii/index.astro`, `src/components/sections/ServiceHubHero.astro`,
și exporturile `whyPanel` + `svcHubStats` din `src/data/content.ts` (randate de `ServiceHubHero`).
Context citit înainte: `docs/brand-voice.md`, `docs/audit-text-v1.md`. Nu am deschis
`ServiceHubCards.astro` (cardurile celor 6 servicii) sau `servicesFaqs`/`FaqSection.astro` în
detaliu de implementare, dincolo de ce era necesar ca să extrag textul afișat: nu erau în lista de
"ce citești pentru unitatea asta"; presupun că fac parte dintr-o unitate separată (paginile de
serviciu individuale / FAQ), nu le tratez ca finalizate aici. Am citit totuși textul lor static
(`servicesFaqs`) fiindcă e randat direct pe pagina asta prin `<FaqSection items={servicesFaqs} />`.
Notă tehnică: prop-ul `eyebrow` e pasat atât la `ServiceHubHero` ("Servicii"), cât și la
`FaqSection` ("Întrebări frecvente"), dar niciuna dintre cele două componente nu-l destructurează
sau randează (prop mort, cod neactiv azi) — nu apare vizibil pe pagină, deci nu l-am tratat ca bloc.

### [src/pages/servicii/index.astro > `BaseLayout` props `title` + `description`]
**Original:** Servicii — Marketing, grafică, web și mentenanță, la un singur partener. Lucrăm pe obiective clare și pornim de la date și de la cum decid oamenii (neuromarketing).
**Propus:** Servicii — Marketing, grafică, web și mentenanță, la un singur partener. Lucrăm pe obiective clare și pornim de la date și de la cum decid oamenii (neuromarketing). (fără modificări, deja conform brand-voice)

### [src/pages/servicii/index.astro > `ServiceHubHero` props `title` + `titleAccent` (H1)]
**Original:** Grafică, web și marketing, la un singur partener
**Propus:** Grafică, web și marketing, la un singur partener (fără modificări, deja conform brand-voice)

### [src/pages/servicii/index.astro > `ServiceHubHero` prop `sub` (subtitlu hero)]
**Original:** Marketing, grafică, web și mentenanță, la un singur partener. Doi oameni și colaboratori aleși pe proiect: destui cât să acoperim tot, destul de puțini cât să luăm fiecare proiect în serios.
**Propus:** Marketing, grafică, web și mentenanță, la un singur partener. Doi oameni și colaboratori aleși pe proiect: destui cât să acoperim tot, destul de puțini cât să luăm fiecare proiect în serios. (fără modificări, deja conform brand-voice)

Notă: sintagma „la un singur partener" apare de 4 ori pe pagina asta (titlu, meta description, sub
hero, primul item din „De ce Simplead?" mai jos). Brand-voice.md §4 interzice explicit varianta
„un singur partener, zero presupuneri" ca clișeu de agenție, dar nu interzice sintagma în sine, iar
aici e mereu urmată de o listă concretă (grafică, web, marketing) — nu e vagă. Nu am rescris ca să
nu ating structura, dar semnalez repetiția pentru o rundă viitoare de variație.

### [src/components/sections/ServiceHubHero.astro > `.svchub-hero__actions` (butoane CTA)]
**Original:** Cere o ofertă / Vezi serviciile
**Propus:** Cere o ofertă / Vezi serviciile (fără modificări; „Cere o ofertă" e CTA-ul principal aprobat, brand-voice.md §3)

### [src/components/sections/ServiceHubHero.astro > `.svchub-hero__panel h3` (titlu panel)]
**Original:** De ce Simplead?
**Propus:** De ce Simplead? (fără modificări, deja conform brand-voice)

### [src/data/content.ts > `whyPanel` (listă, 4 iteme, randată de `ServiceHubHero`)]
**Original:**
- Un singur partener pentru grafică, web și marketing
- Decizii bazate pe date și neuromarketing
- Proces simplu, cu efort minim din partea ta
- Condus de Andrei Panait, cu fundal de cercetare în marketing
**Propus:** (fără modificări, deja conform brand-voice)
- Un singur partener pentru grafică, web și marketing
- Decizii bazate pe date și neuromarketing
- Proces simplu, cu efort minim din partea ta
- Condus de Andrei Panait, cu fundal de cercetare în marketing

Notă: ultimul item menționează cercetarea lui Andrei foarte pe scurt, fără cuvântul „doctor" și
fără fraza completă „doctor în marketing, cu cercetare în neuromarketing". Brand-voice.md §3 cere
ca doctoratul să apară complet o singură dată (în „Omul din spate"/despre) și, în rest, doar
„arătat, nu anunțat" (mențiune scurtă) — exact ce se întâmplă deja aici. Nu e nevoie de nicio
schimbare pentru regula asta în acest bloc.

### [src/data/content.ts > `svcHubStats` (listă, 3 statistici, randată de `ServiceHubHero`)]
**Original:**
- zeci · proiecte (cod: `// TODO: nr. exact (confirmă Andrei)`)
- 10+ · ani experiență (cod: `// TODO: cifră neconfirmată, vezi audit-text-v1.md`)
- 6 · servicii, un singur partener
**Propus:**
- zeci · proiecte (fără modificări; deja formulat vag, nu afișează o cifră exactă neconfirmată)
- [confirmă: ani experiență] · ani experiență
- 6 · servicii, un singur partener (fără modificări)

Notă: cifra „10" de la „ani experiență" e marcată explicit în cod ca neconfirmată și, în plus, intră
în conflict direct cu `/despre`, care afișează „12+ ani de lucru" pentru aceeași informație
(inconsistență semnalată deja în audit-text-v1.md, secțiunea Majoră). Nu aleg un număr nou (nici
10, nici 12): las valoarea din Original neatinsă în cod și marchez explicit `[confirmă: ani
experiență]` în Propus, până Andrei confirmă cifra reală și unifică cele două pagini.

### [src/pages/servicii/index.astro > `.svc-support__title` (H3, card „suport tehnic")]
**Original:** Ai o problemă tehnică punctuală?
**Propus:** Ai o problemă tehnică punctuală? (fără modificări, deja conform brand-voice)

### [src/pages/servicii/index.astro > `.svc-support__desc`]
**Original:** WordPress căzut, SSL expirat, DNS greșit, email în spam sau vrei să muți site-ul fără downtime. Le rezolvăm fără să deschizi un proiect întreg.
**Propus:** WordPress căzut, SSL expirat, DNS greșit, email în spam sau vrei să muți site-ul fără downtime. Le rezolvăm fără să deschizi un proiect întreg. (fără modificări, deja conform brand-voice)

### [src/pages/servicii/index.astro > `.svc-support__cta` (link)]
**Original:** Vezi ce acoperim
**Propus:** Vezi ce acoperim (fără modificări, deja conform brand-voice)

### [src/pages/servicii/index.astro > `FaqSection` props `title` + `titleAccent` (H2)]
**Original:** Ce vor să știe clienții noștri
**Propus:** Ce vor să știe clienții noștri (fără modificări, deja conform brand-voice)

### [src/data/content.ts > `servicesFaqs[0]`]
**Original:** Q: Pot lua un singur serviciu sau trebuie să iau tot? A: Cum ai nevoie. Poți începe cu un singur lucru și adăugăm restul când are sens. Nu lucrăm cu pachete rigide impuse.
**Propus:** Q: Pot lua un singur serviciu sau trebuie să iau tot? A: Cum ai nevoie. Poți începe cu un singur lucru și adăugăm restul când are sens. Nu lucrăm cu pachete rigide impuse. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > `servicesFaqs[1]`]
**Original:** Q: Cât costă o colaborare? A: Găsești prețurile de start pe pagina Pachete. Pentru proiecte mai complexe pornim de la o discuție și îți dăm o ofertă concretă, nu un deviz standard trimis automat.
**Propus:** Q: Cât costă o colaborare? A: Găsești prețurile de start pe pagina Pachete. Pentru proiecte mai complexe pornim de la o discuție și îți dăm o ofertă gândită pentru cazul tău, nu un deviz standard trimis automat.

Notă: am lăsat antiteza „nu un deviz standard trimis automat" (nu am rescris-o afirmativ) fiindcă
pagina asta nu are nicio altă antiteză de tip „nu X, ci Y" (heroul de aici nu folosește tiparul deloc,
spre deosebire de Acasă). Rămânem sub bugetul „maximum o dată pe pagină" din brand-voice.md §4, deci
o păstrăm aici, dar am întărit puțin partea afirmativă („o ofertă gândită pentru cazul tău") ca să nu
sune ca umplutură.

### [src/data/content.ts > `servicesFaqs[2]`]
**Original:** Q: Ce înseamnă „pe date și neuromarketing"? A: Înseamnă că nu mergem pe „mie îmi place". Testăm cu instrumente de neuromarketing: atenție vizuală, heatmaps și date reale din Analytics. Bugetul tău ajunge acolo unde chiar contează.
**Propus:** Q: Ce înseamnă „pe date și neuromarketing"? A: Testăm deciziile de design cu instrumente de neuromarketing: atenție vizuală, heatmaps și date reale din Analytics. Așa, bugetul tău ajunge acolo unde chiar contează.

Notă: „nu mergem pe «mie îmi place»" e practic aceeași construcție ca exemplul explicit interzis din
brand-voice.md §4 („nu pe gust"). Am mai păstrat deja o antiteză „nu X, ci Y" în FAQ-ul anterior (Q2:
„nu un deviz standard trimis automat"), așa că, pentru a rămâne la maximum una pe pagină, am rescris-o
pe asta afirmativ, fără să pierd ideea (testăm, nu presupunem).

### [src/data/content.ts > `servicesFaqs[3]`]
**Original:** Q: Lucrați și cu afaceri mici? A: Da, exact pentru ele există Simplead. Instrumente și metodă de agenție mare, la scara unui partener care te cunoaște pe tine.
**Propus:** Q: Lucrați și cu afaceri mici? A: Da, exact pentru ele există Simplead. Instrumente și metodă de agenție mare, la scara unui partener care te cunoaște pe tine. (fără modificări, deja conform brand-voice)

### [src/data/content.ts > `servicesFaqs[4]`]
**Original:** Q: Oferiți și suport tehnic punctual, fără proiect? A: Da. WordPress, SSL, DNS, securitate, email, migrare și quick fix. Găsești tot pe pagina Suport tehnic.
**Propus:** Q: Oferiți și suport tehnic punctual, fără proiect? A: Da. WordPress, SSL, DNS, securitate, email, migrare și quick fix. Găsești tot pe pagina Suport tehnic. (fără modificări, deja conform brand-voice)

### [src/components/sections/CtaSection.astro > prop `title` (default, H2)]
**Original:** Gata să-ți pui afacerea pe roți?
**Propus:** Gata să-ți pui afacerea pe roți? (fără modificări, deja conform brand-voice)

### [src/components/sections/CtaSection.astro > prop `subtitle` (default)]
**Original:** Hai să discutăm despre proiectul tău. Prima întâlnire e fără obligații.
**Propus:** Hai să discutăm despre proiectul tău. Prima întâlnire e fără obligații. (fără modificări, deja conform brand-voice)

### [src/components/sections/CtaSection.astro > prop `cta` (default, buton)]
**Original:** Cere o ofertă
**Propus:** Cere o ofertă (fără modificări, CTA principal aprobat, brand-voice.md §3)
