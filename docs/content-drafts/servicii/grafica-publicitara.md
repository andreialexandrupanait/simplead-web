Status: draft

# Serviciu: Grafică publicitară (`src/data/services.ts`, slug `grafica-publicitara`)

Sursă: am citit integral `docs/brand-voice.md` și `docs/audit-text-v1.md` înainte de orice altceva. Apoi am citit integral a treia intrare din array-ul `services` din `src/data/services.ts` (linii ~384-536): `title`, `summary`, `claim`, `claimSub`, `description`, `includes`, `heroTitle`/`heroTitleAccent`, `heroSub`, `capHead`, `capabilities`, `process`, `caseStudy`, `faqs`. Am verificat și randarea reală în `src/pages/servicii/[slug].astro` ca să respect ordinea de pe pagină: `ServiceHero` (heroTitle/heroTitleAccent/heroSub) → `CapabilitiesGrid` (capHead + capabilities) → `ServiceProcess` (process) → `FaqSection` (faqs) → `CtaNotch` (claim/claimSub). Câmpurile `description` și `caseStudy` există în datele sursă dar nu par legate la niciun component randat pentru pagina de serviciu în acest moment (grep pe `caseStudy` în `src` întoarce doar `services.ts`; `description`-ul serviciului nu apare folosit în nicio componentă `.astro`) — le tratez oricum ca blocuri, pentru că fac parte din unitatea de conținut cerută, dar semnalez că par date moarte azi, nu text vizibil live.

### [src/data/services.ts > title]
**Original:** Grafică publicitară
**Propus:** Grafică publicitară (fără modificări, deja conform brand-voice)

### [src/data/services.ts > summary]
**Original:** Identitate vizuală, materiale de promovare și grafică publicitară care te fac ușor de recunoscut, la fel peste tot.
**Propus:** Identitate vizuală, materiale de promovare și grafică publicitară care te fac ușor de recunoscut, la fel peste tot. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > heroTitle + heroTitleAccent]
**Original:** O imagine coerentă, ușor de recunoscut
**Propus:** O imagine coerentă, ușor de recunoscut (fără modificări, deja conform brand-voice)

### [src/data/services.ts > heroSub]
**Original:** De la identitate vizuală și materiale de promovare, până la print și grafică publicitară. Simplu, dar fundamentat pe cum se uită și decid oamenii.
**Propus:** De la identitate vizuală și materiale de promovare, până la print și grafică publicitară. Simplu, dar fundamentat pe cum se uită și decid oamenii. (fără modificări, deja conform brand-voice. Tiparul „de la X, până la Y" e explicit aprobat în brand-voice §4 când listezi servicii reale, iar „simplu, dar fundamentat" e formularea aprobată din §4/§5, nu o triadă goală.)

### [src/data/services.ts > description]
**Original:** De la identitate vizuală și materiale de promovare, până la print și grafică publicitară. Simplu, dar fundamentat pe cum se uită și decid oamenii.
**Propus:** De la identitate vizuală și materiale de promovare, până la print și grafică publicitară. Simplu, dar fundamentat pe cum se uită și decid oamenii. (fără modificări, deja conform brand-voice. Notă: text identic cu `heroSub` de mai sus; câmpul pare nefolosit în randarea live azi, dar dacă va fi cuplat undeva, nu are nevoie de altă variantă.)

### [src/data/services.ts > includes]
**Original:**
- Identitate vizuală & branding (sistem vizual, brand guide)
- Grafică publicitară (print, outdoor, social media)
- Materiale de prezentare (broșuri, cărți de vizită, prezentări)
- Design pornit de la unde se uită oamenii (heatmaps)

**Propus:**
- Identitate vizuală & branding (sistem vizual, brand guide)
- Grafică publicitară (print, outdoor, social media)
- Materiale de prezentare (broșuri, cărți de vizită, prezentări)
- Design pornit de la unde se uită oamenii (heatmaps)

(fără modificări, deja conform brand-voice; fiecare punct e concret, fără cuvinte din kill-list.)

### [src/data/services.ts > capHead (eyebrow + title + titleAccent + sub)]
**Original:** Ce oferim / De la identitate la materiale care vând / Trei zone de lucru care, împreună, îți construiesc o imagine coerentă și ușor de recunoscut.
**Propus:** Ce oferim / De la identitate la materiale gata de folosit / Trei zone de lucru care, împreună, îți construiesc o imagine coerentă și ușor de recunoscut. („materiale care vând" e o promisiune de rezultat neancorată în nimic concret, genul de formulare pe care brand-voice §Markety o cere legată de o situație reală, nu lăsată ca slogan; am înlocuit-o cu ce oferim de fapt, materiale gata de pus în folosință. Restul e neschimbat.)

### [src/data/services.ts > capabilities[0] „Identitate vizuală & Branding"]
**Original:** Titlu: Identitate vizuală & Branding. Descriere: „Un brand coerent, de la regulile de folosire la aplicații, recognoscibil peste tot." Listă: Sistem vizual coerent · Brand guide complet · Paletă, tipografie & elemente grafice · Aplicații pe materiale.
**Propus:** Titlu: Identitate vizuală & Branding. Descriere: „Un brand coerent, de la regulile de folosire la aplicații, recognoscibil peste tot." Listă: Sistem vizual coerent · Brand guide complet · Paletă, tipografie & elemente grafice · Aplicații pe materiale. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > capabilities[1] „Grafică publicitară & Print"]
**Original:** Titlu: Grafică publicitară & Print. Descriere: „Materiale de promovare gândite să atragă atenția potrivită." Listă: Print, outdoor & social media · Grafică promoțională · Adaptare coerentă pe canale · Layout pornit de la unde se uită oamenii (heatmaps).
**Propus:** Titlu: Grafică publicitară & Print. Descriere: „Materiale de promovare gândite să atragă atenția potrivită." Listă: Print, outdoor & social media · Grafică promoțională · Adaptare coerentă pe canale · Layout pornit de la unde se uită oamenii (heatmaps). (fără modificări, deja conform brand-voice)

### [src/data/services.ts > capabilities[2] „Materiale de prezentare"]
**Original:** Titlu: Materiale de prezentare. Descriere: „Materialele cu care te prezinți, coerente între ele și gata de folosit." Listă: Broșuri, cărți de vizită, prezentări · Machete pentru print & online · Layout & punere în pagină · Punere în pagină gândită pe atenția cititorului.
**Propus:** Titlu: Materiale de prezentare. Descriere: „Materialele cu care te prezinți, coerente între ele și gata de folosit." Listă: Broșuri, cărți de vizită, prezentări · Machete pentru print & online · Layout & punere în pagină · Punere în pagină gândită pe atenția cititorului. (fără modificări de voce; notă de structură, nu de voce: ultimele două puncte din listă folosesc amândouă „punere în pagină" ca sintagmă, ceea ce sună puțin repetitiv unul lângă altul. Nu am rescris, pentru că e o decizie de conținut/ofertă, nu de ton, și task-ul e strict stilistic; semnalez doar pentru cazul în care Andrei vrea să diferențieze mai clar cele două puncte.)

### [src/data/services.ts > process[0] „Brief creativ"]
**Original:** Pornim de la brandul tău, publicul lui și mesajul care contează. Strângem referințe și stabilim ce trebuie să comunice materialele, înainte să desenăm ceva.
**Propus:** Pornim de la brandul tău, publicul lui și mesajul care contează. Strângem referințe și stabilim ce trebuie să comunice materialele, înainte să desenăm ceva. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > process[1] „Concept & direcție"]
**Original:** Propunem direcția vizuală: ton, paletă, tipografie, atmosferă. Alegem împreună drumul, ca să nu pierdem timp pe variante care nu te reprezintă.
**Propus:** Propunem direcția vizuală: ton, paletă, tipografie, atmosferă. Alegem împreună drumul, ca să nu pierdem timp pe variante care nu te reprezintă. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > process[2] „Execuție vizuală"]
**Original:** Ducem conceptul în materiale concrete (identitate vizuală, grafică publicitară, print și materiale de prezentare), coerente între ele și gata de folosit.
**Propus:** Ducem conceptul în materiale concrete (identitate vizuală, grafică publicitară, print și materiale de prezentare), coerente între ele și gata de folosit. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > process[3] „Mesaj clar"]
**Original:** Ne asigurăm că materialele transmit exact ce trebuie: aplicăm principii din neuromarketing, ca mesajul important să fie ușor de văzut și de înțeles.
**Propus:** Ne asigurăm că materialele transmit exact ce trebuie: aplicăm principii din neuromarketing, ca mesajul important să fie ușor de văzut și de înțeles. (fără modificări, deja conform brand-voice; neuromarketingul e menționat corect ca fundament de decizie, nu ca pas de validare ulterioară, conform pilonului 1 din brand-voice §2.)

### [src/data/services.ts > process[4] „Livrare"]
**Original:** Predăm fișierele în toate formatele de care ai nevoie: print (CMYK, la rezoluția corectă) și online, plus regulile de folosire, ca totul să rămână coerent.
**Propus:** Predăm fișierele în toate formatele de care ai nevoie: print (CMYK, la rezoluția corectă) și online, plus regulile de folosire, ca totul să rămână coerent. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > caseStudy]
**Original:** Stat mare: „10+ ani". Text sub stat: „Experiență în foto-video și creație vizuală pentru branduri." Citat: „«Originalitate și claritate în soluțiile propuse.»" Text: „Le-am studiat portofoliul și am remarcat originalitatea și claritatea soluțiilor. Proiectul a decurs conform așteptărilor, iar rezultatul a fost foarte apreciat de compania noastră." Client: Silviu Costiniuc, Echipamente-medicale.ro.
**Propus:** Stat mare: „[confirmă: 10+ ani]". Text sub stat: „Experiență în foto-video și creație vizuală pentru branduri." Citat: „«Originalitate și claritate în soluțiile propuse.»" Text: „Le-am studiat portofoliul și am remarcat originalitatea și claritatea soluțiilor. Proiectul a decurs conform așteptărilor, iar rezultatul a fost foarte apreciat de compania noastră." Client: Silviu Costiniuc, Echipamente-medicale.ro. (Cuvântul „soluții" e din kill-list, dar aici e în interiorul unui citat direct al clientului, nu în vocea noastră; nu rescriu cuvintele altcuiva, așa că citatul rămâne verbatim. Am pus doar cifra „10+ ani" sub `[confirmă: ...]`, pentru că brand-voice §3/§7 cere exact asta pentru orice cifră neconfirmată, fără s-o înlocuiesc cu alta. Notă de verificat cu Andrei, separată de kill-list: conform `docs/audit-text-v1.md`, exact același citat („Originalitate și claritate în soluțiile propuse") apare și pe pagina `/servicii/consultanta-marketing`, unde e atribuit greșit unui „client" fictiv „Andrei Panait / panaitandrei.ro". Atribuirea de aici, către Silviu Costiniuc / Echipamente-medicale.ro, pare cea reală/originală, nu placeholder-ul. Nu am schimbat nimic în acest bloc, dar semnalez: același testimonial folosit pe două pagini de servicii diferite poate arăta reciclat/copy-paste către un vizitator care le vede pe amândouă, indiferent care atribuire e corectă; decizia care pagină păstrează citatul rămâne a lui Andrei.)

### [src/data/services.ts > faqs[0] „Faceți și logo?"]
**Original:** Pentru logo lucrăm cu parteneri dedicați. Noi ne ocupăm de identitatea vizuală din jurul lui (sistem vizual, brand guide, paletă, tipografie și aplicații pe materiale), ca brandul să arate coerent peste tot.
**Propus:** Pentru logo lucrăm cu parteneri dedicați. Noi ne ocupăm de identitatea vizuală din jurul lui (sistem vizual, brand guide, paletă, tipografie și aplicații pe materiale), ca brandul să arate coerent peste tot. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > faqs[1] „Vă ocupați și de foto-video?"]
**Original:** Foto-video îl acoperim prin colaboratori, ca să ai tot ce-ți trebuie dintr-un loc. Nu e focusul nostru, dar te punem în legătură cu un fotograf cu experiență când proiectul cere.
**Propus:** Foto-video îl acoperim prin colaboratori de încredere. Nu e focusul nostru, dar te punem în legătură cu un fotograf cu experiență când proiectul cere. („ca să ai tot ce-ți trebuie dintr-un loc" e varianta mai discretă a clișeului „tot sub un singur acoperiș", explicit interzis în brand-voice §4. Restul propoziției spune deja concret ce acoperim și ce nu, care e exact recomandarea din §4, așa că am scos doar bucata de „one-stop-shop" și am păstrat sensul.)

### [src/data/services.ts > faqs[2] „Cum folosiți neuromarketingul în design?"]
**Original:** Pornim de la cum percep și decid oamenii când văd un material și aplicăm principiile astea când îl punem în pagină. Așa mesajul principal e clar și ușor de prins, dincolo de cât de bine arată.
**Propus:** Pornim de la cum percep și decid oamenii când văd un material și aplicăm principiile astea când îl punem în pagină. Așa mesajul principal e clar și ușor de prins, dincolo de cât de bine arată. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > faqs[3] „Primesc materialele și pentru print, și pentru online?"]
**Original:** Da. Le predăm în formatele potrivite fiecărui canal: print (CMYK, rezoluție corectă) și online (web/social), gata de pus în folosință.
**Propus:** Da. Le predăm în formatele potrivite fiecărui canal: print (CMYK, rezoluție corectă) și online (web/social), gata de pus în folosință. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > faqs[4] „Cât costă?"]
**Original:** Depinde de ce ai nevoie: un set de materiale, o identitate vizuală completă sau grafică recurentă lunară. Îți dăm o estimare concretă după o scurtă discuție. Vezi pachetele pe pagina Pachete.
**Propus:** Depinde de ce ai nevoie: un set de materiale, o identitate vizuală completă sau grafică recurentă lunară. Îți dăm o estimare concretă după o scurtă discuție. Vezi pachetele pe pagina Pachete. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > claim + claimSub]
**Original:** O imagine coerentă, ușor de recunoscut. / Pornim de la o discuție.
**Propus:** O imagine coerentă, ușor de recunoscut. / Pornim de la o discuție. (fără modificări, deja conform brand-voice; repetă intenționat mesajul din hero ca hook final de CTA, nu e o antiteză „nu doar X" care ar trebui numărată la limita de o dată pe pagină.)
