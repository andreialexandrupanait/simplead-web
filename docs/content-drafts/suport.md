Status: draft

# Suport tehnic

Sursă: `src/pages/suport.astro` citit integral (toate grupurile/itemele de suport sunt inline în acest fișier, conform indicației din task). Context citit înainte: `docs/brand-voice.md` (regulile de voce) și `docs/audit-text-v1.md` (găsirile de audit deja existente pentru acest cod). Nu am citit `src/data/support-services.ts` (doar iconițele SVG sunt importate din el, nu text) conform scopului unității.

### [src/pages/suport.astro > PageHeader eyebrow (L172)]
**Original:** Suport tehnic
**Propus:** Suport tehnic (fără modificări, deja conform brand-voice)

### [src/pages/suport.astro > PageHeader title + accent (L173-174)]
**Original:** Probleme tehnice rezolvate, fără să deschizi un proiect întreg *(accent pe „fără să deschizi un proiect întreg")*
**Propus:** Probleme tehnice rezolvate, fără să deschizi un proiect întreg (fără modificări, deja conform brand-voice). Concret, fără cuvinte din kill-list, fără antiteză „nu doar/nu pe".

### [src/pages/suport.astro > PageHeader subtitle (L175)]
**Original:** WordPress căzut, SSL expirat, DNS greșit, email în spam sau site de mutat. Intervenim rapid și transparent, la oră. Lucrăm și pe site-uri construite de altcineva.
**Propus:** WordPress căzut, SSL expirat, DNS greșit, email în spam sau site de mutat. Intervenim rapid și transparent, la oră. Lucrăm și pe site-uri construite de altcineva. (fără modificări, deja conform brand-voice)

### [src/pages/suport.astro > secțiunea intro, CTA-uri (L180-181)]
**Original:** Buton: „Descrie-ne problema" (→ `/contact?service=Suport+tehnic`) + link secundar: „Sau trimite-ne un tichet →" (→ `/cere-suport`)
**Propus:** identic (fără modificări, deja conform brand-voice). Etichete scurte, la subiect, persoana „noi" corectă („descrie-ne", „trimite-ne").

### [src/pages/suport.astro > grupul 1, titlu + accent (L30-31)]
**Original:** Site-ul **tău**
**Propus:** Site-ul tău (fără modificări, deja conform brand-voice)

### [src/pages/suport.astro > grupul 1, intro (L32)]
**Original:** Îl reparăm, îl mutăm și îl construim rapid. Partea tehnică o ținem noi.
**Propus:** Îl reparăm, îl mutăm și îl construim rapid. Partea tehnică o ținem noi. (fără modificări, deja conform brand-voice; persoana „noi" corectă)

### [src/pages/suport.astro > item „wordpress-support", titlu + descriere + bullets (L35-45)]
**Original:** Titlu: „Suport WordPress". Descriere: „Diagnosticăm și reparăm: ecran alb, erori fatale, conflicte de plugin sau temă, WooCommerce stricat. Facem și update-uri și backup, sau le preluăm în mentenanță lunară dacă vrei să nu mai ajungi în situații de urgență." Bullets: „Ecran alb și erori fatale" · „Conflicte plugin sau temă" · „WooCommerce și checkout" · „Update-uri și securitate".
**Propus:** identic (fără modificări, deja conform brand-voice). Concret, fără AI menționat greșit, fără cuvinte din kill-list.

### [src/pages/suport.astro > item „migrare-site", titlu + descriere + bullets (L47-57)]
**Original:** Titlu: „Migrare site". Descriere: „Mutăm tot: fișiere, bază de date, emailuri, redirecturi, fără downtime și fără să pierzi poziții în Google." Bullets: „Pregătire pe staging" · „Testare înainte de live" · „Schimbare DNS controlată" · „Redirecturi 301 pentru SEO".
**Propus:** identic (fără modificări, deja conform brand-voice).

### [src/pages/suport.astro > item „site-astro-ai", titlu + descriere (L59-63)]
**Original:** Titlu: „Site-uri Astro cu AI". Descriere: „Site static rapid construit pe Astro, ideal pentru prezentare, landing sau blog. Costuri de rulare minime, viteză maximă, livrat mai repede cu AI în flux."
**Propus:** Titlu: „Site-uri Astro" (fără „cu AI" în titlu, ca să nu sune ca un serviciu de „suport cu AI"). Descriere: „Site static, rapid, construit pe Astro: potrivit pentru prezentare, landing sau blog. Costuri de găzduire mici, iar la construcție folosim AI ca unealtă de lucru, ca să livrăm mai repede."
Notă: `docs/audit-text-v1.md` semnalează la Majoră acest item ca fiind „apropiat de suport cu AI interzis" și recomandă clarificare cu Andrei (e despre construcție, nu mentenanță, poate merită alt loc în navigare decât pagina de Suport tehnic). Am păstrat sensul (AI = unealtă folosită de noi în construcție, nu „AI repară/menține site-ul"), dar decizia dacă acest item rămâne pe pagina de suport sau se mută în altă parte e a lui Andrei, neatinsă în această rundă.

### [src/pages/suport.astro > grupul 2, titlu + accent (L67-68)]
**Original:** Securitate și **email**
**Propus:** Securitate și email (fără modificări, deja conform brand-voice)

### [src/pages/suport.astro > grupul 2, intro (L69)]
**Original:** Domeniu protejat, emailuri în inbox, site rapid și sigur.
**Propus:** Domeniu protejat, emailuri în inbox, site rapid și sigur. (fără modificări; nu e triadă goală, sunt trei rezultate concrete diferite, nu trei adjective pentru același lucru)

### [src/pages/suport.astro > item „cloudflare-support", titlu + descriere + bullets (L72-82)]
**Original:** Titlu: „Suport Cloudflare". Descriere: „DNS, SSL, cache, reguli firewall și protecție anti-DDoS configurate corect, fără să blochezi traficul real." Bullets: „Cache și CDN" · „Firewall, WAF și anti-bot" · „DNS și SSL" · „Optimizare performanță".
**Propus:** identic (fără modificări, deja conform brand-voice).

### [src/pages/suport.astro > item „dmarc", titlu + descriere + bullets (L84-94)]
**Original:** Titlu: „Configurare și monitorizare DMARC". Descriere: „SPF, DKIM și DMARC setate ca emailurile tale să ajungă în inbox și monitorizăm cine trimite în numele domeniului tău." Bullets: „Configurare SPF, DKIM, DMARC" · „Aliniere servicii: newsletter, facturare, workspace" · „Monitorizare rapoarte DMARC" · „Protecție anti-spoofing".
**Propus:** identic (fără modificări, deja conform brand-voice). „Monitorizăm" e framing-ul corect pentru AI/automatizare de tip supraveghere, nu contrazice regula din §3.

### [src/pages/suport.astro > grupul 3, titlu + accent (L98-99)]
**Original:** Intervenții **rapide**
**Propus:** Intervenții rapide (fără modificări, deja conform brand-voice)

### [src/pages/suport.astro > grupul 3, intro (L100)]
**Original:** Când arde sau când e o singură treabă de rezolvat, intervenim pe loc.
**Propus:** Când arde sau când e o singură treabă de rezolvat, intervenim pe loc. (fără modificări, deja conform brand-voice)

### [src/pages/suport.astro > item „suport-urgenta", titlu + descriere + bullets (L103-113)]
**Original:** Titlu: „Suport de urgență". Descriere: „Site-ul e jos sau ceva critic s-a stricat. Intervenim cât de repede putem: oprim focul și te repunem online." Bullets: „Site căzut sau hack" · „Erori critice și restore din backup" · „Checkout sau email de comandă stricat" · „DNS și SSL urgent".
**Propus:** identic (fără modificări, deja conform brand-voice).

### [src/pages/suport.astro > item „quick-fix", titlu + descriere + bullets (L115-124)]
**Original:** Titlu: „Sesiune Quick Fix". Descriere: „O singură problemă, o singură sesiune. Dacă cere mai mult, îți spunem din start, fără să facturăm timp pierdut." Bullets: „Modificări mici și bug-uri izolate" · „Setări și configurări punctuale" · „Verificare rapidă sau a doua opinie".
**Propus:** identic (fără modificări, deja conform brand-voice).

### [src/pages/suport.astro > eticheta „Vezi detalii" pe cardurile de serviciu (L220, apare de 7 ori identic)]
**Original:** Vezi detalii
**Propus:** Vezi detalii (fără modificări, deja conform brand-voice)

### [src/pages/suport.astro > secțiunea tarife, titlu (L242)]
**Original:** Plătești **la oră**, fără surprize
**Propus:** Plătești la oră, fără surprize (fără modificări, deja conform brand-voice)

### [src/pages/suport.astro > lista de tarife (L129-132)]
**Original:** Intervenții tehnice web: 50€/h · Tracking, analytics, configurări: 25€/h
**Propus:** identic (fără modificări). Cifre reale de business (tarife), nu „cifre inventate" în sensul §3, nu au fost atinse.

### [src/pages/suport.astro > nota de sub tarife (L254)]
**Original:** Fără oră minimă ascunsă. Estimarea o primești înainte să începem.
**Propus:** Fără oră minimă ascunsă. Estimarea o primești înainte să începem. (fără modificări, deja conform brand-voice)

### [src/pages/suport.astro > FaqSection, eyebrow + titlu (L261-263)]
**Original:** Eyebrow: „Întrebări frecvente". Titlu: „Ce vor să știe " + accent „clienții noștri" → „Ce vor să știe clienții noștri".
**Propus:** identic (fără modificări, deja conform brand-voice).

### [src/pages/suport.astro > FAQ Q1 (L136-139)]
**Original:** Î: „Cât de repede interveniți?" R: „Pentru urgențe, cât de repede putem în programul de lucru. Scrie-ne contextul și îți dăm imediat un timp realist, nu o fereastră de 48h."
**Propus:** identic (fără modificări). Notă: „un timp realist, nu o fereastră de 48h" e singura antiteză „X, nu Y" de pe toată pagina, deci se încadrează în limita de maximum una pe pagină din brand-voice.md §4; nu mai adăuga alta în restul paginii.

### [src/pages/suport.astro > FAQ Q2 (L141-144)]
**Original:** Î: „Lucrați pe site-uri pe care nu le-ați construit voi?" R: „Da, pentru orice intervenție tehnică intrăm și pe site-uri construite de altcineva."
**Propus:** identic (fără modificări, deja conform brand-voice).

### [src/pages/suport.astro > FAQ Q3 (L145-149)]
**Original:** Î: „Ce acces aveți nevoie?" R: „Depinde de problemă. De obicei admin WordPress, acces hosting (cPanel sau Plesk) ori FTP/SFTP. Îți spunem exact ce ne trebuie după ce ne descrii situația."
**Propus:** identic (fără modificări, deja conform brand-voice).

### [src/pages/suport.astro > FAQ Q4 (L151-156)]
**Original:** Î: „Ce se întâmplă dacă nu se rezolvă în sesiune?" R: „Îți spunem clar ce cere și cât costă să mergem mai departe. Nu facturăm timp dacă n-am rezolvat nimic util."
**Propus:** identic (fără modificări, deja conform brand-voice).

### [src/pages/suport.astro > CtaSection finală (L266-274)]
**Original:** Kicker: „Hai să rezolvăm". Titlu: „Ai o problemă tehnică acum?". Subtitlu: „Descrie-ne pe scurt situația și îți răspundem în aceeași zi lucrătoare." CTA principal: „Solicită ajutor tehnic". CTA secundar: „Trimite un tichet".
**Propus:** identic (fără modificări, deja conform brand-voice).
Notă: promisiunea „răspundem în aceeași zi lucrătoare" apare și pe `/contact`, unde `audit-text-v1.md` (Majoră) o semnalează ca posibil inconsistentă cu `site.ts` (`responseTime: '24'`, marcat TODO). Nu e o problemă de text pe pagina asta în sine, dar merită aliniată cu Andrei la nivel de site, neatins aici.

### [src/pages/suport.astro > meta description (L159-160, folosit în `<BaseLayout description={...}>`, apare în rezultate căutare/social, nu vizibil pe pagină)]
**Original:** Probleme tehnice rezolvate la oră, fără proiect întreg: WordPress, SSL, DNS, migrare, securitate, email și urgențe. Intervenim rapid, transparent, și pe site-uri construite de altcineva.
**Propus:** Probleme tehnice rezolvate la oră, fără proiect întreg: WordPress, SSL, DNS, migrare, securitate, email și urgențe. Intervenim rapid, transparent și pe site-uri construite de altcineva.
Notă: singura schimbare e eliminarea virgulei de dinaintea „și" (nu e uz standard în română), fără modificare de sens sau de fapte.
