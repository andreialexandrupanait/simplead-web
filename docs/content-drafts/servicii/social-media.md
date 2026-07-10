Status: draft

# Serviciu: Social media (`src/data/services.ts`, slug `social-media`)

Sursă: am citit integral intrarea `social-media` din array-ul `services` din `src/data/services.ts` (linii ~539-685): `title`, `summary`, `claim`, `claimSub`, `description`, `includes`, `heroTitle`/`heroTitleAccent`, `heroSub`, `capHead`, `capabilities`, `process`, `caseStudy`, `faqs`. Am citit înainte `docs/brand-voice.md` (regulile) și `docs/audit-text-v1.md` (findingurile deja raportate pentru acest fișier). Am verificat încrucișat testimonialul din `caseStudy` cu `src/data/testimonials.ts` și `src/data/content.ts`, și cifrele din FAQ cu `src/data/pricing.ts`.

**Notă privind editarea din această sesiune:** `summary` și `heroTitleAccent` conțineau amândouă antiteza „clienți, nu doar aprecieri" (semnalat în `docs/audit-text-v1.md` ca „Majoră"). `summary` a fost deja rescris în această sesiune pentru a elimina duplicarea, păstrez modificarea. Am revizuit însă restul intrării și am găsit **alte trei apariții ale aceluiași tipar antiteză** (`nu doar` / `nu pe`) mai jos în pagină, pe care regula din brand-voice §4 le limitează la maxim una pe pagină (cea din hero, deja aprobată). Le-am rescris afirmativ pe cele trei, marcate mai jos.

### [src/data/services.ts > title]
**Original:** Social media
**Propus:** Social media (fără modificări, deja conform brand-voice)

### [src/data/services.ts > summary]
**Original:** Conținut și prezență care aduc clienți reali, construite pe date.
**Propus:** Conținut și prezență care aduc clienți reali, construite pe date. (fără modificări, deja conform brand-voice; aceasta e forma deja editată în sesiunea curentă, care a eliminat duplicarea antitezei „nu doar aprecieri" ce apărea și aici anterior)

### [src/data/services.ts > claim]
**Original:** Prezență constantă, conținut care prinde.
**Propus:** Prezență constantă, conținut care prinde. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > claimSub]
**Original:** Hai să discutăm despre canalele tale.
**Propus:** Hai să discutăm despre canalele tale. (fără modificări, deja conform brand-voice; CTA colocvial, aliniat cu „Hai să vorbim" aprobat în brand-voice §4)

### [src/data/services.ts > description]
**Original:** Administrăm prezența ta în social media cu strategie clară și conținut coerent: ce postezi, cum arăți și cum răspunzi. Construim o prezență care ține pe termen lung, pe canalele unde se află publicul tău.
**Propus:** Administrăm prezența ta în social media cu strategie clară și conținut coerent: ce postezi, cum arăți și cum răspunzi. Construim o prezență care ține pe termen lung, pe canalele unde se află publicul tău. (fără modificări, deja conform brand-voice; voce „noi" implicită, fără cuvinte din kill-list; „ce postezi, cum arăți și cum răspunzi" e o listă de trei lucruri concrete și distincte, nu o triadă goală de tipul „rapid, sigur și actualizat")

### [src/data/services.ts > includes]
**Original:**
- Strategie & calendar editorial
- Administrare conturi (Facebook, Instagram, TikTok, YouTube)
- Creație de conținut (vizual + copywriting)
- Community management & interacțiune
- Raportare și optimizare

**Propus:**
- Strategie & calendar editorial
- Administrare conturi (Facebook, Instagram, TikTok, YouTube)
- Creație de conținut (vizual + copywriting)
- Community management & interacțiune
- Raportare și optimizare

(fără modificări, deja conform brand-voice)

### [src/data/services.ts > heroTitle + heroTitleAccent]
**Original:** Social media care aduce **clienți, nu doar aprecieri**
**Propus:** Social media care aduce **clienți, nu doar aprecieri** (fără modificări, deja conform brand-voice; aceasta rămâne singura antiteză „nu doar X" a paginii, poziționată corect în hero conform brand-voice §4. Restul aparițiilor aceluiași tipar, găsite mai jos în `capabilities`, `process` și `faqs`, au fost rescrise afirmativ ca să nu se depășească limita de una pe pagină)

### [src/data/services.ts > heroSub]
**Original:** Prezență coerentă pe canalele unde se află publicul tău, conținut care prinde și o comunitate îngrijită. Cu măsurare reală, ca să știi ce aduce clienți.
**Propus:** Prezență coerentă pe canalele unde se află publicul tău, conținut care prinde și o comunitate îngrijită. Cu măsurare reală, ca să știi ce aduce clienți. (fără modificări; enumerarea „prezență coerentă / conținut care prinde / comunitate îngrijită" descrie trei lucruri diferite, nu e triada de adjective goale interzisă de tipul „rapid, sigur și actualizat", așa că am lăsat-o neatinsă)

### [src/data/services.ts > capHead (eyebrow + title + titleAccent + sub)]
**Original:** Ce oferim / De la conținut la **clienți reali** / Trei zone de lucru care, împreună, transformă atenția în rezultate.
**Propus:** Ce oferim / De la conținut la **clienți reali** / Trei zone de lucru care, împreună, aduc clienți reali din prezența ta pe social media.

(Motiv: „transformă atenția în rezultate" e prea aproape de clișeul explicit interzis din brand-voice §4, „transformăm vizitatori în clienți" — aceeași structură „transformăm X în Y". Am rescris concret, pe ce fac cele trei zone de lucru, păstrând sensul.)

### [src/data/services.ts > capabilities[0] „Strategie & Conținut"]
**Original:** Titlu: Strategie & Conținut. Descriere: „Un plan clar pe obiective și o prezență coerentă pe canalele potrivite." Listă: Strategie de conținut · Calendar editorial · Creație vizuală & copywriting · Administrare conturi.
**Propus:** Titlu: Strategie & Conținut. Descriere: „Un plan clar pe obiective și o prezență coerentă pe canalele potrivite." Listă: Strategie de conținut · Calendar editorial · Creație vizuală & copywriting · Administrare conturi. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > capabilities[1] „Publicare & Comunitate"]
**Original:** Titlu: Publicare & Comunitate. Descriere: „Ținem prezența vie și constantă: publicăm la timp, răspundem, moderăm, menținem tonul." Listă: Publicare constantă, după un plan · Răspuns la comentarii & mesaje · Moderare & ton consecvent · Comunitate activă, nu doar postări.
**Propus:** Titlu: Publicare & Comunitate. Descriere: „Ținem prezența vie și constantă: publicăm la timp, răspundem, moderăm, menținem tonul." Listă: Publicare constantă, după un plan · Răspuns la comentarii & mesaje · Moderare & ton consecvent · Comunitate activă și implicată.

(Motiv: ultimul punct al listei, „Comunitate activă, nu doar postări", repeta tiparul antiteză „nu doar X" deja folosit în hero. L-am rescris afirmativ, păstrând ideea de comunitate care interacționează real, nu doar consumă conținut.)

### [src/data/services.ts > capabilities[2] „Analiză & Optimizare"]
**Original:** Titlu: Analiză & Optimizare. Descriere: „Măsurăm ce funcționează și ajustăm cu decizii pe date." Listă: Tracking conversii & evenimente · Rapoarte clare, pe înțelesul tău · Heatmaps & atenție vizuală · Optimizare continuă.
**Propus:** Titlu: Analiză & Optimizare. Descriere: „Măsurăm ce funcționează și ajustăm cu decizii pe date." Listă: Tracking conversii & evenimente · Rapoarte clare, pe înțelesul tău · Heatmaps & atenție vizuală · Optimizare continuă. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > process[0] „01 Audit & obiective"]
**Original:** Ne uităm la ce ai acum, la concurență și la publicul tău, apoi stabilim obiective clare: ce vrei să obții din social media, dincolo de aprecieri.
**Propus:** Ne uităm la ce ai acum, la concurență și la publicul tău, apoi stabilim obiective clare: ce vrei să obții din social media, dincolo de aprecieri. (fără modificări; „dincolo de aprecieri" nu e tiparul antiteză „nu doar X, ci Y" interzis explicit, e o construcție diferită, așa că am lăsat-o. Notă de stil, nu de regulă: reia tematic ideea din hero „nu doar aprecieri" — dacă Andrei preferă să nu se repete deloc tema, se poate simplifica la „...obiective clare pentru social media.")

### [src/data/services.ts > process[1] „02 Strategie & calendar"]
**Original:** Construim direcția de conținut și un calendar editorial pe canalele unde chiar se află publicul tău, ca să nu postăm „de dragul de a posta".
**Propus:** Construim direcția de conținut și un calendar editorial pe canalele unde chiar se află publicul tău, ca să nu postăm „de dragul de a posta". (fără modificări, deja conform brand-voice)

### [src/data/services.ts > process[2] „03 Producție de conținut"]
**Original:** Creăm vizualul și textul, coerente cu brandul, gata de publicat pe calendarul stabilit.
**Propus:** Creăm vizualul și textul, coerente cu brandul, gata de publicat pe calendarul stabilit. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > process[3] „04 Publicare & comunitate"]
**Original:** Publicăm constant, conform planului, și ținem prezența vie: răspundem, ajustăm și menținem un ton consecvent, ca brandul să fie recognoscibil.
**Propus:** Publicăm constant, conform planului, și ținem prezența vie: răspundem, ajustăm și menținem un ton consecvent, ca brandul să fie recognoscibil. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > process[4] „05 Raportare & optimizare"]
**Original:** Măsurăm ce funcționează cu date reale, raportăm clar, fără jargon, și optimizăm de la o lună la alta. Decizii pe cifre, nu pe impresii.
**Propus:** Măsurăm ce funcționează cu date reale, raportăm clar, fără jargon, și optimizăm de la o lună la alta. Deciziile vin din cifre.

(Motiv: „Decizii pe cifre, nu pe impresii" repetă tiparul „nu pe X" din brand-voice §4, exact ca exemplele „nu pe noroc" / „nu pe gust" deja suprafolosite pe site. L-am rescris afirmativ, păstrând sensul: deciziile se bazează pe date, nu pe impresii.)

### [src/data/services.ts > caseStudy]
**Original:** Stat mare: „al doilea proiect". Text sub stat: „Clienți care revin pentru o nouă colaborare cu Simplead." Citat: „«Profesionalism, fairplay, pricepere, asumare.»" Text: „Cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună, datorită implicării active și relaționării impecabile." Client: Ștefan Chelmu, Blitzstudio.
**Propus:** Stat mare: „al doilea proiect". Text sub stat: „Clienți care revin pentru o nouă colaborare cu Simplead." Citat: „«Profesionalism, fairplay, pricepere, asumare.»" Text: „Cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună, datorită implicării active și relaționării impecabile." Client: Ștefan Chelmu, Blitzstudio. (fără modificări de conținut; testimonial real, verificat: același citat + client (Ștefan Chelmu, Blitzstudio) apar identic în `src/data/testimonials.ts` și `src/data/content.ts`, deci nu e placeholder ca la cazul semnalat în audit pentru `consultanta-marketing`. Nu am atins „al doilea proiect", e o descriere calitativă, nu o cifră de umplutură inventată.)

### [src/data/services.ts > faqs[0] „Pe ce rețele lucrați?"]
**Original:** În principal Facebook, Instagram și TikTok, plus YouTube când are sens. Alegem canalele după publicul tău și obiectiv, nu „pe toate, ca să fie".
**Propus:** În principal Facebook, Instagram și TikTok, plus YouTube când are sens. Alegem canalele după publicul tău și obiectiv, cu un motiv clar pentru fiecare canal.

(Motiv: „nu «pe toate, ca să fie»" e tot tiparul antiteză „nu X" din brand-voice §4. L-am rescris afirmativ, păstrând ideea că alegerea canalelor e intenționată, nu automată.)

### [src/data/services.ts > faqs[1] „Creați conținutul sau doar îl publicați?"]
**Original:** Îl creăm (vizual și text) și îl publicăm pe un calendar editorial clar. Dacă ai deja materiale bune, le integrăm în plan.
**Propus:** Îl creăm (vizual și text) și îl publicăm pe un calendar editorial clar. Dacă ai deja materiale bune, le integrăm în plan. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > faqs[2] „Câte postări includeți pe lună?"]
**Original:** Pachetul de bază (2 canale) include 8-12 postări pe lună, iar cel complet (3 canale + rapoarte) 16-20. Calendarul editorial îl stabilim împreună, pe obiectivele tale.
**Propus:** Pachetul de bază (2 canale) include 8-12 postări pe lună, iar cel complet (3 canale + rapoarte) 16-20. Calendarul editorial îl stabilim împreună, pe obiectivele tale. (fără modificări; cifrele 8-12 / 16-20 nu sunt de umplutură, apar identic în `src/data/pricing.ts` ca detalii reale de pachet, verificate prin grep)

### [src/data/services.ts > faqs[3] „Cât costă administrarea de social media?"]
**Original:** Depinde de câte canale gestionăm și de cât conținut și raportare îți trebuie. Stabilim pachetul potrivit după o discuție despre obiectivele tale. Vezi pachetele pe pagina Pachete.
**Propus:** Depinde de câte canale gestionăm și de cât conținut și raportare îți trebuie. Stabilim pachetul potrivit după o discuție despre obiectivele tale. Vezi pachetele pe pagina Pachete. (fără modificări, deja conform brand-voice)
