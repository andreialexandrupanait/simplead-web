Status: draft

# Articol: Cum arată un brand pe care clienții îl țin minte

Sursă: `docs/brand-voice.md` și `docs/audit-text-v1.md` citite integral înainte de orice; conținutul unității din `docker exec simplead_db psql -U simplead -d simplead -c "SELECT title,description,body,author,seo_title,seo_description,takeaways,faq FROM posts WHERE slug='brand-pe-care-clientii-il-tin-minte';"` (read-only, prod). `seo_title`/`seo_description` sunt goale și `takeaways`/`faq` sunt liste vide, deci nu au blocuri proprii (nimic de arătat).

### [db:posts.title WHERE slug='brand-pe-care-clientii-il-tin-minte']
**Original:** Cum arată un brand pe care clienții îl țin minte
**Propus:** Cum arată un brand pe care clienții îl țin minte (fără modificări, deja conform brand-voice)

### [db:posts.description WHERE slug='brand-pe-care-clientii-il-tin-minte']
**Original:** Diferența dintre un logo și un brand care rămâne în mintea clienților: coerență, o idee simplă, personalitate și experiență. Cu mini-checklist la final.
**Propus:** Diferența dintre un logo și un brand care rămâne în mintea clienților: coerență, o idee simplă, personalitate și experiență. Cu mini-checklist la final. (fără modificări, deja conform brand-voice)

### [db:posts.body WHERE slug='brand-pe-care-clientii-il-tin-minte' — intro, înainte de primul ##]
**Original:** Un logo nu e un brand. Brandul e tot ce simte clientul când dă peste tine: de la culori și ton, până la felul în care răspunzi la un mesaj. Logo-ul e doar semnătura; brandul e reputația pe care semnătura o evocă. Iar diferența dintre firmele pe care clienții le țin minte și cele pe care le confundă cu concurența stă în câteva principii surprinzător de concrete.
**Propus:** Un logo nu e un brand. Brandul e tot ce simte clientul când dă peste tine: de la culori și ton, până la felul în care răspunzi la un mesaj. Logo-ul e doar semnătura; brandul e reputația pe care semnătura o evocă. Iar diferența dintre firmele pe care clienții le țin minte și cele pe care le confundă cu concurența stă în câteva principii surprinzător de concrete. (fără modificări, deja conform brand-voice)

### [db:posts.body WHERE slug='brand-pe-care-clientii-il-tin-minte' — secțiunea „## 1. Coerență peste tot, fără excepții"]
**Original:**
## 1. Coerență peste tot, fără excepții

Aceleași culori, aceleași fonturi, același ton: pe site, pe social media, pe ofertele PDF, pe cartea de vizită, în semnătura de email. Sună banal, dar e regula încălcată cel mai des.

De ce contează atât: creierul recunoaște tipare. De fiecare dată când clientul vede aceeași combinație de culoare, formă și voce, recunoașterea devine mai rapidă și mai sigură. De fiecare dată când vede altceva (azi albastru corporate, mâine portocaliu „mai prietenos"), recunoașterea se resetează. Practic, inconsecvența te face să plătești de mai multe ori pentru aceeași notorietate.

Instrumentul care rezolvă asta nu e inspirația, ci un **ghid de identitate**: un document scurt care fixează culorile exacte, fonturile, variantele permise de logo și tonul vocii. Nu e birocrație; e ce îți permite ca orice colaborator, azi sau peste doi ani, să producă materiale care arată „de-ale tale".

**Propus:** identic cu Original (fără modificări, deja conform brand-voice). Fără em-dash, fără cuvinte din kill-list, fără antiteză „nu doar X, ci Y" aici.

### [db:posts.body WHERE slug='brand-pe-care-clientii-il-tin-minte' — secțiunea „## 2. O idee simplă, repetată cu încăpățânare"]
**Original:**
## 2. O idee simplă, repetată cu încăpățânare

Brandurile care rămân în minte spun un singur lucru clar, nu zece lucruri deodată. Volvo înseamnă siguranță. IKEA înseamnă design accesibil. Nu pentru că ar face un singur lucru, ci pentru că au ales ce idee să apere public și au repetat-o ani la rând, în toate formele.

La scara unei afaceri mici, principiul e identic. Alege ideea pe care vrei să o asociezi cu numele tău: „cei care răspund în aceeași zi", „cofetăria care lucrează doar cu unt", „contabilul care vorbește pe limba ta". Apoi repet-o: în titlul site-ului, în descrierea de Google Business, în felul în care îți deschizi ofertele.

Testul e simplu: dacă un client mulțumit te recomandă unui prieten într-o singură frază, ce ai vrea să spună? Aia e ideea ta de brand. Dacă nu o poți formula tu, nici clienții tăi nu o vor putea.

**Propus:** identic cu Original (fără modificări, deja conform brand-voice). Exemplele Volvo/IKEA sunt fapte publice cunoscute, nu cifre inventate despre Simplead; nu ating.

### [db:posts.body WHERE slug='brand-pe-care-clientii-il-tin-minte' — secțiunea „## 3. Personalitate, nu doar estetică"]
**Original:**
## 3. Personalitate, nu doar estetică

Oamenii țin minte branduri care au caracter; designul îngrijit, singur, nu e de ajuns. Caracterul se vede în limbaj (vorbești ca un funcționar sau ca un om?), în alegerile vizuale care nu seamănă cu ale concurenței și, mai ales, în comportament: cum răspunzi la un mesaj, cum gestionezi o reclamație, ce faci când greșești.

Aici e și vestea bună pentru afacerile mici: personalitatea nu costă nimic. O firmă de doi oameni își permite o voce caldă și directă pe care o corporație, cu zece niveluri de aprobare, nu și-o permite niciodată. E un avantaj competitiv gratuit; păcat că majoritatea îl îngroapă sub formulări „profesionale" care sună identic la toată lumea.

**Propus:** identic cu Original (fără modificări, deja conform brand-voice). Notă: titlul secțiunii („nu doar estetică") e singura antiteză „nu doar X" din tot articolul, deci se încadrează în limita de maxim una pe pagină din brand-voice.md §4; nu mai adăuga alta în restul textului.

### [db:posts.body WHERE slug='brand-pe-care-clientii-il-tin-minte' — secțiunea „## 4. Experiența confirmă (sau demolează) promisiunea"]
**Original:**
## 4. Experiența confirmă (sau demolează) promisiunea

Poți avea cel mai coerent vizual și cea mai clară idee: dacă experiența reală contrazice promisiunea, clientul ține minte contradicția. Un brand care promite „rapid și simplu" și răspunde la email-uri în cinci zile tocmai și-a învățat clienții să nu-l creadă.

De aceea brandingul nu e doar treaba designerului. Fiecare punct de contact e brand: viteza site-ului, claritatea facturii, mesajul de mulțumire după comandă. Despre partea de site am scris în [Cum arată un site care chiar vinde](/blog/site-care-vinde); despre felul în care percep oamenii toate aceste semnale, în [Neuromarketing pe înțelesul tuturor](/blog/ce-este-neuromarketingul).

**Propus:** identic cu Original (fără modificări, deja conform brand-voice). „Rapid și simplu" e o promisiune-exemplu a unui brand ipotetic care greșește, nu o triadă proprie Simplead; linkurile interne rămân neschimbate.

### [db:posts.body WHERE slug='brand-pe-care-clientii-il-tin-minte' — secțiunea „## Mini-checklist: brandul tău trece testul?" (listă + paragraf final)]
**Original:**
## Mini-checklist: brandul tău trece testul?

1. Dacă acoperi logo-ul de pe materialele tale, se mai recunoaște că sunt ale tale (culori, fonturi, ton)?
2. Poți spune într-o frază ce idee vrei să apere brandul tău? Apare fraza aia pe site?
3. Materialele din ultimul an folosesc aceleași culori și fonturi, sau fiecare a fost „creativ" în felul lui?
4. Vocea ta scrisă sună a om sau a proces verbal?
5. Promisiunea publică e confirmată de experiența reală a clientului, de la primul mesaj la livrare?

Dacă ai ezitat la mai mult de două întrebări, nu ai nevoie neapărat de un logo nou: ai nevoie de ordine în identitate. De multe ori, cel mai valoros livrabil dintr-un proiect de branding nu e desenul, ci deciziile: ce idee aperi, cum vorbești, ce rămâne fix și ce e liber.

**Propus:** identic cu Original (fără modificări, deja conform brand-voice). Lista rămâne cu 5 puncte în aceeași ordine.

### [db:posts.body WHERE slug='brand-pe-care-clientii-il-tin-minte' — secțiunea „## Următorul pas"]
**Original:**
## Următorul pas

Exact asta facem la [grafică publicitară și branding](/servicii/grafica-publicitara): de la identitate vizuală completă cu ghid de utilizare, până la punerea în ordine a materialelor existente, cu decizii fundamentate, nu „după gust". [Scrie-ne](/contact) și povestește-ne unde e brandul tău acum; prima discuție e fără obligații.

**Propus:** identic cu Original (fără modificări, deja conform brand-voice). Construcția „de la X, până la Y" e folosită corect aici (servicii reale, nu umplutură repetată); CTA „Scrie-ne" e conform vocii de blog „noi", nu clișeul interzis „Discută cu un expert".
