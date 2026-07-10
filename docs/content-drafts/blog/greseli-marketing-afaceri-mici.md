Status: draft

# Articol: 5 greșeli de marketing pe care le fac afacerile mici

Sursă: `docker exec simplead_db psql -U simplead -d simplead -c "SELECT title,description,body,author,seo_title,seo_description,takeaways,faq FROM posts WHERE slug='greseli-marketing-afaceri-mici';"` (Postgres, prod, citire read-only) + `docs/brand-voice.md` + `docs/audit-text-v1.md` ca referință de reguli. `seo_title`, `seo_description`, `takeaways`, `faq` sunt goale în DB, deci nu apar blocuri pentru ele.

### [db:posts.title WHERE slug='greseli-marketing-afaceri-mici']
**Original:** 5 greșeli de marketing pe care le fac afacerile mici
**Propus:** 5 greșeli de marketing pe care le fac afacerile mici (fără modificări, deja conform brand-voice)

### [db:posts.description WHERE slug='greseli-marketing-afaceri-mici']
**Original:** Cele mai frecvente greșeli de marketing la firmele mici și cum le repari cu buget limitat: obiective, public, design, reclame nemonitorizate și canale abandonate.
**Propus:** Cele mai frecvente greșeli de marketing la firmele mici și cum le repari cu buget limitat: obiective, public, design, reclame nemonitorizate și canale abandonate. (fără modificări, deja conform brand-voice)

### [db:posts.body WHERE slug='greseli-marketing-afaceri-mici' — introducere, înainte de primul „##"]
**Original:** Afacerile mici au resurse limitate: cu atât mai mult contează să nu le risipești. Marketingul se face de obicei „printre picături", între clienți, facturi și operațional, iar în graba asta apar mereu aceleași greșeli. Le-am adunat pe cele cinci pe care le vedem cel mai des, fiecare cu remediul ei practic.
**Propus:** Afacerile mici au resurse limitate: cu atât mai mult contează să nu le risipești. Marketingul se face de obicei „printre picături", între clienți, facturi și operațional, iar în graba asta apar mereu aceleași greșeli. Le-am adunat pe cele cinci pe care le vedem cel mai des, fiecare cu remediul ei practic. (fără modificări, deja conform brand-voice)

### [db:posts.body WHERE slug='greseli-marketing-afaceri-mici' — secțiunea „## 1. Marketing fără obiectiv"]
**Original:** ## 1. Marketing fără obiectiv

„Vrem mai mulți clienți" nu e un obiectiv, e o dorință. Nu poți măsura „mai mulți", deci nu poți ști dacă ce faci funcționează, deci nu poți decide ce să repeți și ce să oprești. Așa ajunge marketingul un ritual: postezi pentru că „așa se face", dai bani pe reclame pentru că „a mers și luna trecută".

**Remediul:** transformă dorința într-o țintă cu număr și termen. „Vrem 10 cereri de ofertă pe lună prin site, până la finalul trimestrului" e un obiectiv: poți măsura lunar cât de aproape ești și poți lega fiecare acțiune de el. Dacă o activitate nu împinge spre țintă, e divertisment, nu marketing.
**Propus:** (fără modificări, deja conform brand-voice) Fără em-dash, fără cuvinte din kill-list, fără antiteză „nu doar X, ci Y". Cifra „10 cereri de ofertă pe lună" e un exemplu ipotetic de formulare a unui obiectiv (nu o statistică despre Simplead), deci nu are nevoie de `[confirmă: ...]`.

### [db:posts.body WHERE slug='greseli-marketing-afaceri-mici' — secțiunea „## 2. Vorbești cu toată lumea, deci cu nimeni"]
**Original:** ## 2. Vorbești cu toată lumea, deci cu nimeni

„Clienții noștri sunt toți cei care au nevoie de produsul nostru." Sună generos, dar în practică înseamnă mesaje generice și rezultate subțiri. Când vorbești cu toată lumea, nimeni nu se simte vizat.

**Remediul:** alege-ți clientul principal și descrie-l concret. Nu „IMM-uri din România", ci „administratorul unei pensiuni care își pierde weekendurile răspunzând la mesaje". Pentru omul ăsta scrii pagina, reclama, postarea. Paradoxul marketingului bun: cu cât țintești mai precis, cu atât atragi mai mulți oameni potriviți.
**Propus:** (fără modificări, deja conform brand-voice) Notă: pagina are două construcții de tip „nu X, ci Y" (aici și în secțiunea 3), iar regula permite maximum una pe pagină. Am păstrat-o pe aceasta (cea mai concretă, cu exemplul „administratorul unei pensiuni") și am rescris afirmativ varianta din secțiunea 3, mai jos.

### [db:posts.body WHERE slug='greseli-marketing-afaceri-mici' — secțiunea „## 3. Design „după ureche""]
**Original:** ## 3. Design „după ureche"

Un design care „ție îți place" nu e neapărat unul care **vinde**. Tu îți cunoști afacerea pe dinafară; vizitatorul nou decide în câteva secunde, din reflex, dacă rămâne sau pleacă. Ce ți se pare ție elegant poate fi pentru el neclar, iar ce ți se pare „prea simplu" e adesea exact ce înțelege instant.

**Remediul:** mută discuția de la gust la comportament. Întrebarea corectă nu e „cum să arate?", ci „ce trebuie să vadă vizitatorul în primele secunde ca să înțeleagă ce oferim?". Există o disciplină întreagă care studiază asta: am explicat-o fără jargon în [Neuromarketing pe înțelesul tuturor](/blog/ce-este-neuromarketingul), iar aplicarea ei pe structura unui site, în [Cum arată un site care chiar vinde](/blog/site-care-vinde).
**Propus:** ## 3. Design „după ureche"

Un design care „ție îți place" nu e neapărat unul care **vinde**. Tu îți cunoști afacerea pe dinafară; vizitatorul nou decide în câteva secunde, din reflex, dacă rămâne sau pleacă. Ce ți se pare ție elegant poate fi pentru el neclar, iar ce ți se pare „prea simplu" e adesea exact ce înțelege instant.

**Remediul:** mută discuția de la gust la comportament. Întrebarea corectă e ce trebuie să vadă vizitatorul în primele secunde ca să înțeleagă ce oferim. Există o disciplină întreagă care studiază asta: am explicat-o fără jargon în [Neuromarketing pe înțelesul tuturor](/blog/ce-este-neuromarketingul), iar aplicarea ei pe structura unui site, în [Cum arată un site care chiar vinde](/blog/site-care-vinde).

(Singura modificare: am scos a doua antiteză „nu e X, ci Y" din remediu, ca să rămână o singură antiteză pe toată pagina, cea din secțiunea 2. Restul secțiunii e neschimbat.)

### [db:posts.body WHERE slug='greseli-marketing-afaceri-mici' — secțiunea „## 4. Reclame nemonitorizate"]
**Original:** ## 4. Reclame nemonitorizate

Fără tracking de conversii, plătești fără să știi ce primești înapoi. Reclama aduce vizitatori, dar nu știi care campanie aduce clienți și care doar consumă buget. Și mai des: banii se duc pe reclame care trimit oameni către un site lent sau neclar. Reclama își face treaba, site-ul îi pierde, iar concluzia trasă e „reclamele nu funcționează în domeniul nostru".

**Remediul:** două reguli simple. Întâi destinația, apoi traficul: nu pornești campanii către o pagină care nu trece testul celor 5 secunde. Și nimic plătit fără măsurare: fiecare campanie are un cost per rezultat (mesaj, comandă, telefon), pe care îl compari lunar. O reclamă care nu-și poate dovedi rezultatul se oprește.
**Propus:** (fără modificări, deja conform brand-voice)

### [db:posts.body WHERE slug='greseli-marketing-afaceri-mici' — secțiunea „## 5. Prezent peste tot, consecvent nicăieri"]
**Original:** ## 5. Prezent peste tot, consecvent nicăieri

Cont de Instagram abandonat din februarie, pagină de Facebook cu postări sporadice, newsletter trimis de două ori. Fiecare canal început și părăsit transmite vizitatorilor același mesaj: aici nu se mai întâmplă nimic.

**Remediul:** alege puține canale și ține-le în viață. Pentru cele mai multe afaceri mici, combinația sănătoasă e: un site îngrijit (baza, singurul loc pe care îl controlezi complet), un singur canal social unde publicul tău chiar petrece timp, și profilul Google Business la zi, dacă ai clienți locali. Un canal viu bate cinci canale moarte, de fiecare dată.
**Propus:** (fără modificări, deja conform brand-voice)

### [db:posts.body WHERE slug='greseli-marketing-afaceri-mici' — secțiunea „## Rădăcina comună"]
**Original:** ## Rădăcina comună

Toate cele cinci greșeli vin din același loc: marketingul tratat ca o listă de bifat, nu ca un sistem. O postare ici, o reclamă colo, un site refăcut o dată la câțiva ani, fără legătură între ele.

Sistemul e simplu de descris: un obiectiv cu număr, un public clar, o destinație care convertește, reclame măsurate și puține canale ținute consecvent. Fiecare piesă o întărește pe cealaltă, iar întregul funcționează și cu buget mic, tocmai pentru că nu risipește nimic.

Nu trebuie construit tot deodată. Începe cu greșeala care te costă cel mai mult acum (la majoritatea firmelor: numărul 4) și urcă în listă. Iar dacă preferi să nu o faci singur, la asta lucrăm în [consultanța de marketing](/servicii/consultanta-marketing): ne uităm la cifrele și publicul tău, apoi îți spunem concret cu ce am începe. [Scrie-ne](/contact); prima discuție e fără obligații.
**Propus:** (fără modificări, deja conform brand-voice) Vocea la persoana I plural „noi" (uzitate: „ne uităm", „am adunat", „vedem", „îți spunem", „am începe") e cea corectă pentru articole de blog semnate individual, per instrucțiuni ("nu doar în Omul din spate"); nu s-a schimbat la „eu". Fără AI menționat în această secțiune, deci nicio problemă cu regula „AI doar tracking/monitorizare". Fără cifre inventate: „numărul 4" e o trimitere internă la secțiunea anterioară a articolului, nu o statistică.
