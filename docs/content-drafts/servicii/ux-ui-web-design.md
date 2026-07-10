Status: draft

# Serviciu: UX/UI & web design (`src/data/services.ts`, slug `ux-ui-web-design`)

Sursă: am citit integral `docs/brand-voice.md` și `docs/audit-text-v1.md` înainte de orice altceva. Apoi am citit integral a doua intrare din array-ul `services` din `src/data/services.ts` (linii ~224-381, blocul „2. UX/UI & WEB DESIGN"): `title`, `summary`, `claim`, `claimSub`, `description`, `includes`, `heroTitle`/`heroTitleAccent`, `heroSub`, `capHead`, `capabilities`, `process`, `caseStudy`, `faqs`. Am verificat și randarea reală în `src/pages/servicii/[slug].astro`: `ServiceHero` (heroTitle/heroTitleAccent/heroSub) → `CapabilitiesGrid` (capHead + capabilities) → `ServiceProcess` (process) → `FaqSection` (faqs) → `CtaNotch` (claim/claimSub). Câmpurile `description` și `caseStudy` există în date dar nu sunt legate la niciun component randat pe pagina de serviciu în acest moment (`ProjectsGrid` afișează proiecte reale din DB pe `service.key`, nu `caseStudy`); le tratez oricum ca blocuri, pentru că fac parte din unitatea de conținut cerută, dar semnalez că par date moarte azi. Am verificat și `src/data/testimonials.ts`: `caseStudy` de aici e identic cu al doilea testimonial din lista comună (Universitatea „Dunărea de Jos", proiect Cross2Map) și `caseStat` (statBig „zeci"/statBigAccent „de proiecte") e statistica partajată, deocamdată identică pe toate paginile de servicii.

### [src/data/services.ts > ux-ui-web-design.title]
**Original:** UX/UI & web design
**Propus:** UX/UI & web design (fără modificări, deja conform brand-voice)

### [src/data/services.ts > ux-ui-web-design.summary]
**Original:** Site-uri și magazine online rapide, clare, unde oamenii găsesc ce caută și știu ce să apese.
**Propus:** Site-uri și magazine online rapide, clare, unde oamenii găsesc ce caută și știu ce să apese. (fără modificări, deja conform brand-voice; formularea „oamenii găsesc ce caută și știu ce să apese" e chiar exemplul ✅ dat explicit în brand-voice.md §4 ca alternativă corectă la clișeul „transformăm vizitatori în clienți".)

### [src/data/services.ts > ux-ui-web-design.claim]
**Original:** Site-uri care chiar îți aduc clienți.
**Propus:** Site-uri care chiar îți aduc clienți. (fără modificări, deja conform brand-voice; e o promisiune legată de un lucru concret pe care-l livrăm, nu vaga „să arăți profesional și să vinzi mai mult" interzisă în §4.)

### [src/data/services.ts > ux-ui-web-design.claimSub]
**Original:** Hai să construim unul împreună.
**Propus:** Hai să construim unul împreună. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > ux-ui-web-design.description]
**Original:** Realizăm site-uri de prezentare și magazine online rapide, clare și ușor de administrat. Frumoase pentru oameni, prietenoase cu Google și pornite de la cum aleg oamenii (neuromarketing).
**Propus:** Realizăm site-uri de prezentare și magazine online rapide, clare și ușor de administrat. Frumoase pentru oameni, prietenoase cu Google și pornite de la cum aleg oamenii (neuromarketing). (fără modificări, deja conform brand-voice; e o listă de trei atribute concrete și diferite unul de altul, nu triada goală de tipul „rapid, sigur și actualizat" flagată în §4. Notă: câmpul pare nefolosit în randarea live azi, vezi nota din „Sursă".)

### [src/data/services.ts > ux-ui-web-design.includes]
**Original:**
- UX/UI design validat pe atenția vizuală
- Site-uri de prezentare (WordPress)
- Magazine online (WooCommerce)
- Optimizare pentru viteză și mobil
- SEO de bază la lansare

**Propus:**
- UX/UI design validat pe atenția vizuală
- Site-uri de prezentare (WordPress)
- Magazine online (WooCommerce)
- Optimizare pentru viteză și mobil
- SEO de bază la lansare

(fără modificări, deja conform brand-voice; fiecare punct e concret și verificabil, fără cuvinte din kill-list.)

### [src/data/services.ts > ux-ui-web-design.heroTitle + heroTitleAccent]
**Original:** Site-uri și magazine online unde oamenii găsesc ce caută și cumpără
**Propus:** Site-uri și magazine online unde oamenii găsesc ce caută și cumpără (fără modificări, deja conform brand-voice)

### [src/data/services.ts > ux-ui-web-design.heroSub]
**Original:** De la site-uri de prezentare la magazine online: construim platforme rapide, clare și ușor de administrat. Plac oamenilor, le place și Google, și sunt gândite să aducă clienți.
**Propus:** De la site-uri de prezentare la magazine online: construim platforme rapide, clare și ușor de administrat. Plac oamenilor, le place și Google, și sunt gândite să aducă clienți. (fără modificări, deja conform brand-voice; tiparul „de la X la Y" e explicit aprobat în §4 când listează servicii reale, iar aici enumeră concret ce facem, nu doar promisiuni vagi. Zero antiteze „nu doar/nu pe" pe pagina asta, deci nicio limită de una-pe-pagină nu e atinsă.)

### [src/data/services.ts > ux-ui-web-design.capHead]
**Original:** Ce oferim / De la idee la rezultate / Trei zone de lucru care, împreună, fac un site să arate bine și să muncească pentru tine.
**Propus:** Ce oferim / De la idee la rezultate / Trei zone de lucru care, împreună, fac un site să arate bine și să muncească pentru tine. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > ux-ui-web-design.capabilities[0] „UX/UI Design"]
**Original:** Titlu: UX/UI Design. Descriere: „Structură clară și un design care ghidează vizitatorul exact unde vrei tu, pornit de la cum se uită și aleg oamenii (neuromarketing)." Listă: Arhitectură de conținut · Wireframe & prototip · Design responsive & mobile-first · Ierarhie vizuală pe atenție · Accesibilitate de bază.
**Propus:** Titlu: UX/UI Design. Descriere: „Structură clară și un design care ghidează vizitatorul exact unde vrei tu, pornit de la cum se uită și aleg oamenii (neuromarketing)." Listă: Arhitectură de conținut · Wireframe & prototip · Design responsive & mobile-first · Ierarhie vizuală pe atenție · Accesibilitate de bază. (fără modificări, deja conform brand-voice; neuromarketingul apare corect ca fundament al deciziei de design, nu ca pas de validare ulterioară, conform pilonului 1 din §2.)

### [src/data/services.ts > ux-ui-web-design.capabilities[1] „WordPress & WooCommerce"]
**Original:** Titlu: WordPress & WooCommerce. Descriere: „Site-uri de prezentare și magazine online pe care le administrezi ușor, fără să depinzi de noi pentru orice modificare." Listă: Site-uri de prezentare (WordPress) · Magazine online (WooCommerce) · Editare ușoară a conținutului · Integrări plăți & curierat · Structură scalabilă.
**Propus:** Titlu: WordPress & WooCommerce. Descriere: „Site-uri de prezentare și magazine online pe care le administrezi ușor, fără să depinzi de noi pentru orice modificare." Listă: Site-uri de prezentare (WordPress) · Magazine online (WooCommerce) · Editare ușoară a conținutului · Integrări plăți & curierat · Structură scalabilă. (fără modificări, deja conform brand-voice; „fără să depinzi de noi pentru orice modificare" spune concret ce NU acoperă modelul de lucru, exact recomandarea din §4 în loc de clișeul „tot sub un singur acoperiș".)

### [src/data/services.ts > ux-ui-web-design.capabilities[2] „SEO & Viteză"]
**Original:** Titlu: SEO & Viteză. Descriere: „Un site rapid, găsit de Google și pregătit să convertească din prima zi." Listă: Optimizare pentru viteză · SEO de bază la lansare · Optimizare mobil · Tracking & conversii · Bune practici tehnice.
**Propus:** Titlu: SEO & Viteză. Descriere: „Un site rapid, găsit de Google și pregătit să convertească din prima zi." Listă: Optimizare pentru viteză · SEO de bază la lansare · Optimizare mobil · Tracking & conversii · Bune practici tehnice. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > ux-ui-web-design.process[0] „Brief & obiective"]
**Original:** Pornim de la afacerea ta: ce vrei să obții, cui te adresezi și ce trebuie să facă efectiv site-ul. Stabilim împreună structura, conținutul, bugetul și termenele: ca să lucrăm pe obiective clare.
**Propus:** Pornim de la afacerea ta: ce vrei să obții, cui te adresezi și ce trebuie să facă efectiv site-ul. Stabilim împreună structura, conținutul, bugetul și termenele: ca să lucrăm pe obiective clare. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > ux-ui-web-design.process[1] „Arhitectură & wireframe"]
**Original:** Înainte de design, așezăm scheletul: ce pagini, ce informație unde și pe ce drum trece vizitatorul. Aici intră prima dată partea de atenție vizuală, ca structura să ghideze spre acțiune.
**Propus:** Înainte de design, așezăm scheletul: ce pagini, ce informație unde și pe ce drum trece vizitatorul. Aici intră prima dată partea de atenție vizuală, ca structura să ghideze spre acțiune. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > ux-ui-web-design.process[2] „Design pe brand"]
**Original:** Ducem scheletul într-un design clar, pe identitatea ta, gândit pe conversii și pe cum decid oamenii, dincolo de estetică.
**Propus:** Ducem scheletul într-un design clar, pe identitatea ta, gândit pe conversii și pe cum decid oamenii, dincolo de estetică. (fără modificări, deja conform brand-voice; „cum decid oamenii" apare ca bază a deciziei de design, nu ca etapă de „validare" cu neuromarketing, consistent cu pilonul 1 din §2.)

### [src/data/services.ts > ux-ui-web-design.process[3] „Dezvoltare & integrări"]
**Original:** Construim site-ul: rapid, responsive și ușor de administrat de tine. Conectăm plăți, formulare, curierat sau orice altă unealtă de care ai nevoie.
**Propus:** Construim site-ul: rapid, responsive și ușor de administrat de tine. Conectăm plăți, formulare, curierat sau orice altă unealtă de care ai nevoie. (fără modificări de sens; notă de stil, nu de voce: „rapid, responsive și ușor de administrat" reia aproape aceleași trei atribute din `heroSub` și `description` de mai sus. Nu le-am rescris, pentru că fiecare descrie ceva real despre livrabil, deci nu sunt triada goală „de dragul ritmului" interzisă în §4, dar dacă Andrei vrea variație, aici e locul cu cea mai multă suprapunere pe pagină.)

### [src/data/services.ts > ux-ui-web-design.process[4] „Lansare & optimizare"]
**Original:** Testăm pe dispozitive și browsere, punem site-ul online cu SEO de bază făcut, apoi urmărim datele și ajustăm. Și rămânem aproape, cu mentenanță și suport.
**Propus:** Testăm pe dispozitive și browsere, punem site-ul online cu SEO de bază făcut, apoi urmărim datele și ajustăm. Și rămânem aproape, cu mentenanță și suport. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > ux-ui-web-design.caseStudy]
**Original:** Stat mare: „zeci" / „de proiecte". Text sub stat: „Afaceri care au ales Simplead pentru web și marketing." Citat: „«Platformă digitală de turism gastronomic»". Text: „Am dezvoltat un ecosistem digital complet pentru promovarea turismului gastronomic local, incluzând aplicații web și mobile, sistem de management al conținutului și funcționalități multilingve. Colaborarea a fost profesionistă, iar rezultatele au depășit așteptările." Client: Universitatea „Dunărea de Jos" din Galați, proiect Cross2Map, logo UGAL.
**Propus:** Stat mare: „[confirmă: zeci] / de proiecte". Text sub stat: „Afaceri care au ales Simplead pentru web și marketing." Citat: „«Platformă digitală de turism gastronomic»". Text: „Am dezvoltat un ecosistem digital complet pentru promovarea turismului gastronomic local, incluzând aplicații web și mobile, sistem de management al conținutului și funcționalități multilingve. Colaborarea a fost profesionistă, iar rezultatele au depășit așteptările." Client: Universitatea „Dunărea de Jos" din Galați, proiect Cross2Map, logo UGAL. (Citatul e verbatim identic cu al doilea testimonial real din `src/data/testimonials.ts` (client confirmat, nu placeholder), deci nu-l rescriu: e vocea clientului, nu a noastră. Singura schimbare e pe „zeci de proiecte": e un stat partajat pe toate paginile de servicii (`caseStat` din `testimonials.ts`), nu o cifră inventată de mine, dar rămâne o cantitate neconfirmată în sens strict, la fel ca „10+ ani" tratat similar pe alte pagini de servicii; l-am marcat `[confirmă: ...]` fără să-l înlocuiesc cu alt număr. Numele de client și „Galați" din câmpul `clientNote`/`client` sunt nume proprii de client, nu poziționare Simplead, deci nu intră sub regula „Galați doar în footer" din §3, la fel cum semnalează și `docs/audit-text-v1.md` la finding-ul minor despre FEAA/UGAL.)

### [src/data/services.ts > ux-ui-web-design.faqs[0] „Cu ce construiți site-urile?"]
**Original:** De obicei pe WordPress și WooCommerce, ca să le poți administra singur, fără să depinzi de noi pentru fiecare modificare. Când proiectul cere altceva, folosim soluții la comandă. Tehnologia o alegem după nevoia ta, nu invers.
**Propus:** De obicei pe WordPress și WooCommerce, ca să le poți administra singur, fără să depinzi de noi pentru fiecare modificare. Când proiectul cere altceva, construim la comandă. Tehnologia o alegem după nevoia ta, nu invers. (Am înlocuit „folosim soluții la comandă" cu „construim la comandă": cuvântul „soluții" e pe kill-list-ul din §4 ca termen gol de umplutură; restul frazei rămâne neschimbat, inclusiv „nu invers", care aici e o formulare cauzală, nu antiteza „nu doar X, ci Y" numărată separat.)

### [src/data/services.ts > ux-ui-web-design.faqs[1] „În cât timp e gata un site?"]
**Original:** Depinde de cât de complex e. Un site de prezentare se face de obicei în câteva săptămâni, un magazin online durează ceva mai mult. La prima discuție primești o estimare concretă, nu una „de complezență".
**Propus:** Depinde de cât de complex e. Un site de prezentare se face de obicei în câteva săptămâni, un magazin online durează ceva mai mult. La prima discuție primești o estimare concretă, nu una „de complezență". (fără modificări, deja conform brand-voice; „nu una de complezență" e singura construcție de tip „X, nu Y" din tot articolul de FAQ și rămâne sub limita de o antiteză pe pagină din §4, calculată împreună cu restul textelor de mai sus, unde nu am găsit nicio altă antiteză.)

### [src/data/services.ts > ux-ui-web-design.faqs[2] „Cât costă?"]
**Original:** Depinde de tip (site de prezentare, magazin online sau redesign) și de cât de complex e. Prețul exact îl stabilim după ce înțelegem ce ai nevoie. Vezi pachetele pe pagina Pachete.
**Propus:** Depinde de tip (site de prezentare, magazin online sau redesign) și de cât de complex e. Prețul exact îl stabilim după ce înțelegem ce ai nevoie. Vezi pachetele pe pagina Pachete. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > ux-ui-web-design.faqs[3] „Site-ul iese optimizat pentru Google?"]
**Original:** Da. Pleacă la drum cu SEO de bază pus la punct (structură, viteză, versiune de mobil, meta), iar dacă vrei, continuăm cu o strategie SEO dedicată.
**Propus:** Da. Pleacă la drum cu SEO de bază pus la punct (structură, viteză, versiune de mobil, meta), iar dacă vrei, continuăm cu o strategie SEO dedicată. (fără modificări, deja conform brand-voice)

### [src/data/services.ts > ux-ui-web-design.faqs[4] „Aveți deja un site, îl puteți reface?"]
**Original:** Sigur. Ne uităm la ce ai acum și îți spunem onest dacă merită îmbunătățit sau reconstruit de la zero. Păstrăm ce funcționează și schimbăm ce te ține pe loc.
**Propus:** Sigur. Ne uităm la ce ai acum și îți spunem onest dacă merită îmbunătățit sau reconstruit de la zero. Păstrăm ce funcționează și schimbăm ce te ține pe loc. (fără modificări, deja conform brand-voice)
