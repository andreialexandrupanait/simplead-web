Status: draft

# Testimoniale comune (pagini de servicii) — `src/data/testimonials.ts`

Sursă: am citit integral `src/data/testimonials.ts` (comentariu din fișier: "Testimoniale comune, afișate (deocamdată) identic pe toate paginile de servicii în secțiunea de dovadă socială (ClientCase)") — array `testimonials` (4 intrări) + obiectul `caseStat`, plus `docs/brand-voice.md` și `docs/audit-text-v1.md` pentru reguli și găsiri deja semnalate pe acest fișier.

### [src/data/testimonials.ts > caseStat]
**Original:** `statBig: 'zeci'`, `statBigAccent: 'de proiecte'`, `statCap: 'Afaceri care lucrează cu Simplead.'` (randat ca "zeci de proiecte" + legenda "Afaceri care lucrează cu Simplead.")
**Propus:** (fără modificări, deja conform brand-voice) — "zeci" e o cifră deliberat vagă, nu o cifră inventată cu aparență de precizie (gen "70+"), deci nu intră sub regula §3 "fără cifre inventate" și nu are nevoie de `[confirmă: ...]`. Legenda e deja factuală și fără cuvinte din kill-list.

### [src/data/testimonials.ts > testimonials[0] (Bogdan Drăgan / FEAA Galați)]
**Original:**
- quote: „Simply professional. Trustworthy, honest and creative."
- body: O colaborare bazată pe încredere, în care partea tehnică nu mai e o grijă. Ne ocupăm de tot ce ține de funcționarea site-ului, ca afacerea să meargă mai departe fără opriri.
- client: Bogdan Drăgan · clientNote: FEAA Galați · clientLogo: FE

**Propus:** (fără modificări, deja conform brand-voice) — quote-ul e citatul verbatim al clientului (în engleză, cum a fost dat), nu se modifică. Body-ul e deja la persoana "noi" (voce de studio, corectă pentru o pagină de serviciu), fără em-dash, fără cuvinte din kill-list, fără clișee de agenție.
Notă: `clientNote` conține „Galați" (nume instituție client, FEAA = Facultatea de Economie și Administrarea Afacerilor Galați), nu poziționare proprie Simplead — regula §3 despre „Galați doar în footer + schema" vizează copy-ul de poziționare al Simplead, nu numele real al clienților, deci nu se atinge.

### [src/data/testimonials.ts > testimonials[1] (Universitatea „Dunărea de Jos" din Galați / Cross2Map)]
**Original:**
- quote: „Platformă digitală de turism gastronomic"
- body: Am dezvoltat un ecosistem digital complet pentru promovarea turismului gastronomic local, incluzând aplicații web și mobile, sistem de management al conținutului și funcționalități multilingve. Colaborarea a fost profesionistă, iar rezultatele au depășit așteptările.
- client: Universitatea „Dunărea de Jos" din Galați · clientNote: Proiect Cross2Map · clientLogo: UGAL

**Propus:** (fără modificări, deja conform brand-voice) — "Am dezvoltat..." e formă de perfect compus identică pentru "eu" și "noi" în română, deci rămâne corect ca voce de studio ("noi"), nu e o scăpare la persoana I. Fără em-dash, fără kill-list, fără antiteză "nu doar/nu pe". „Rezultatele au depășit așteptările" e o formulare vagă, dar nu e o cifră inventată și nu apare pe kill-list, deci nu se forțează o rescriere fără un fapt concret de pus în loc.
Notă: „Galați" apare aici tot ca parte din numele real al instituției client, nu ca poziționare Simplead — neatins, la fel ca la blocul de mai sus.

### [src/data/testimonials.ts > testimonials[2] (Silviu Costiniuc / Echipamente-medicale.ro)]
**Original:**
- quote: „Originalitate și claritate în soluțiile propuse."
- body: Le-am studiat portofoliul și am remarcat originalitatea și claritatea soluțiilor. Proiectul a decurs conform așteptărilor, iar rezultatul a fost foarte apreciat de compania noastră.
- client: Silviu Costiniuc · clientNote: Echipamente-medicale.ro · clientLogo: EM

**Propus:** (fără modificări, deja conform brand-voice) — quote + body sunt vocea clientului (client-ul vorbește despre portofoliul Simplead, „compania noastră" = a clientului), nu copy Simplead, deci cuvântul „soluții" de aici nu intră sub kill-list-ul care vizează copy-ul propriu al Simplead. Nu se corectează cuvintele clientului.
Notă: `docs/audit-text-v1.md` (găsire Critică) semnalează că acest exact citat („Originalitate și claritate în soluțiile propuse.") apare **și** în `src/data/services.ts` (caseStudy de pe `/servicii/consultanta-marketing`), atribuit greșit unui alt "client" ("Andrei Panait"/panaitandrei.ro). Testimonialul de aici (Silviu Costiniuc, Echipamente-medicale.ro) pare varianta corectă/originală. Nu ating această intrare în runda asta — de rezolvat cu Andrei prin corectarea/eliminarea duplicatului din `services.ts`, nu prin modificarea acestui fișier.

### [src/data/testimonials.ts > testimonials[3] (Ștefan Chelmu / Blitzstudio)]
**Original:**
- quote: „Profesionalism, fairplay, pricepere, asumare."
- body: Cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună, datorită implicării active și relaționării impecabile.
- client: Ștefan Chelmu · clientNote: Blitzstudio · clientLogo: BS

**Propus:** (fără modificări, deja conform brand-voice) — quote + body sunt vocea clientului („relația noastră cu Simplead", „Suntem la al doilea proiect împreună" = clientul vorbește despre el și Simplead, la persoana I plural a clientului, nu a studioului). Fără em-dash, fără kill-list, fără clișee.
