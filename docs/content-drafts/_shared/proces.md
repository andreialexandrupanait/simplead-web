Status: draft

# Procesul în pași (comun: fallback pagini de servicii + componente partajate)

Sursă: am citit integral exporturile `processSteps` (proces în 5 pași, cu `bullets`) și `startSteps`
(„Cum începem colaborarea", 4 pași) din `src/data/content.ts`, plus comentariile lor de context
(„Procesul în 5 pași - cu detalii pentru tab-urile interactive (din design)" și „Pași „Cum începem
colaborarea" (hub /servicii)"). Am verificat și unde sunt folosite azi: `processSteps` e fallback-ul
generic în `src/pages/servicii/[slug].astro` (afișat de `ServiceProcess.astro` doar când un serviciu
nu are propriul `process` în `services.ts`; câmpul `bullets` nu e randat acolo, doar `n`/`title`/`text`).
Ambele exporturi mai sunt consumate de `src/components/sections/ProcessStepper.astro` (`processSteps`,
randează doar `title`+`text` în panou; `bullets` rămâne nefolosit acolo) și de
`src/components/sections/StartSteps.astro` (`startSteps`), dar niciuna din aceste două componente nu e
importată azi pe nicio pagină (`grep` fără rezultate în `src/pages` sau `src/components/home`) — par
componente orfane/pregătite pentru o variantă viitoare a hub-ului de servicii sau al homepage-ului.
Homepage-ul (`/`) are azi propriul proces hardcodat separat, în
`ProcessTimeline.astro` (deja tratat în `docs/content-drafts/acasa.md`), nu prin `processSteps`.
Am citit și `docs/brand-voice.md` și `docs/audit-text-v1.md` pentru reguli și găsiri deja semnalate.

### [src/data/content.ts > `processSteps[]` (5 pași, cu `bullets`)]
**Original:**
1. Întâlnire: Pornim de la tine. Ne așezăm la masă, fizic sau online, și ascultăm. Vrem să înțelegem afacerea, obiectivele și ce te frământă, înainte să propunem orice.
   - Discuție fără obligații
   - Înțelegem obiectivele tale
   - Stabilim bugetul și termenele
2. Analiză: Studiem terenul. Cercetăm publicul, concurența și ce ai deja. Aici intră partea de date și neuromarketing, ca deciziile să nu fie pe ghicite.
   - Audit al prezenței actuale
   - Analiza publicului și concurenței
   - Heatmaps și date de comportament
3. Strategie: Transformăm concluziile într-un plan concret, pe obiective măsurabile. Știi exact ce facem, pe ce canale și cu ce rezultat țintim.
   - Direcție creativă și mesaje
   - Canale și calendar de execuție
   - KPI și buget pe obiective
4. Acțiune: Punem totul în mișcare: design, grafică, web. Lucrăm transparent, cu update-uri regulate, ca să știi mereu unde suntem.
   - Design și producție de conținut
   - Dezvoltare web
   - Grafică și materiale de promovare
5. Rezultate: Măsurăm și optimizăm. Urmărim rezultatele, raportăm transparent și ajustăm continuu, pentru că treaba nu se termină la lansare.
   - Rapoarte clare, pe înțelesul tău
   - Optimizare continuă
   - Recomandări pentru pasul următor

**Propus:** (fără modificări, deja conform brand-voice) — vocea e „noi" consecvent (corect pentru un
element partajat, non-„despre"), fără em-dash, fără niciun cuvânt din kill-list, fără clișee de agenție
(„Transformăm concluziile într-un plan concret" descrie ce fac ei cu datele proprii, nu clișeul
interzis „transformăm vizitatori în clienți"), fără triade goale și fără nicio cifră. „ca deciziile să
nu fie pe ghicite" e o negație simplă, nu tiparul de antiteză „nu doar X, ci Y" vizat de regulă, așa că
nu se pune problema limitei de o antiteză pe pagină. Nu apare AI nicăieri în această listă, deci nu
există risc de „AI rezolvă singur". Nu apare doctoratul. Bullets-urile sunt deja concrete și scurte,
fără nimic de tăiat.

### [src/data/content.ts > `startSteps[]` („Cum începem colaborarea", 4 pași)]
**Original:**
1. Ne scrii: Completezi formularul sau ne suni. Ne spui pe scurt unde vrei să ajungi.
2. Discutăm: Stabilim o întâlnire fără obligații și înțelegem nevoile, bugetul și termenele.
3. Primești oferta: Îți trimitem o propunere clară, cu plan pe obiective și buget transparent.
4. Începem: Punem totul în mișcare și te ținem la curent la fiecare pas.

**Propus:** (fără modificări, deja conform brand-voice) — persoana e consecventă (clientul face lucruri
la „tu", studioul răspunde la „noi"), fără em-dash, fără kill-list, fără clișee de agenție, fără triade
goale, fără cifre. Nimic de scurtat sau de rescris.

---

Notă (context, nu un bloc de conținut de corectat aici): componenta `StartSteps.astro` are în props
implicite un `sub` hardcodat direct în fișierul `.astro` (nu în `content.ts`) care conține sintagma din
kill-list „fără bătăi de cap" — „Patru pași simpli, fără bătăi de cap și fără limbaj corporatist." Cum
componenta nu e folosită azi pe nicio pagină și textul nu vine din `processSteps`/`startSteps` (scopul
exact al acestei unități), nu-l ating aici; semnalez pentru o rundă viitoare dacă/când componenta e
repusă în circuit (de corectat atunci direct în `StartSteps.astro`, prop `sub`).
