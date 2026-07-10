Status: draft

# Panoul "De ce Simplead" (comun pe paginile de servicii)

Sursă: am citit integral exportul `whySimplead` din `src/data/content.ts` (L691-717, incl. interfața `WhyItem`), plus componenta care randează panoul, `src/components/sections/WhySimplead.astro` (titlul de secțiune de la L15, folosit ca H2 pe toate paginile de serviciu care includ acest component).

### [src/components/sections/WhySimplead.astro > `<h2 class="sec-title">`]
**Original:** Lucruri pe care alții <span class="g">nu ți le spun</span>
**Propus:** Lucruri pe care alții nu ți le spun (fără modificări, deja conform brand-voice)

### [src/data/content.ts > whySimplead[0].title]
**Original:** Pornim de la date, nu de la „mie îmi place"
**Propus:** Pornim de la ce arată comportamentul real al oamenilor
Notă: „nu de la X" oglindește exact tiparul „nu pe gust" pe care brand-voice.md §4 îl citează ca deja supra-folosit pe site. Cum acest panou apare identic pe toate paginile de servicii, am rescris afirmativ ca să nu adauge automat o antiteză pe fiecare pagină (unde heroul propriu poate avea deja una).

### [src/data/content.ts > whySimplead[0].body]
**Original:** Nu ne bazăm pe gusturi. Ne uităm la cum se comportă oamenii cu adevărat înainte ca ceva să ajungă public. Așa știm de ce funcționează, dincolo de cum arată.
**Propus:** Ne uităm la cum se comportă oamenii cu adevărat înainte ca ceva să ajungă public. Așa știm de ce funcționează, dincolo de cum arată.
Notă: am tăiat prima propoziție („Nu ne bazăm pe gusturi") fiindcă repetă negativ aceeași idee pe care titlul o spune deja afirmativ, o dată rescris.

### [src/data/content.ts > whySimplead[1].title]
**Original:** Prindem problema înainte s-o vezi
**Propus:** Prindem problema înainte s-o vezi (fără modificări, deja conform brand-voice)

### [src/data/content.ts > whySimplead[1].body]
**Original:** Aplicația noastră, SimpleAd Manager, urmărește non-stop uptime, securitate, viteză și backup. De cele mai multe ori intervenim înainte ca tu sau clienții tăi să observați ceva.
**Propus:** Aplicația noastră, SimpleAd Manager, urmărește non-stop uptime, securitate, viteză și backup. De cele mai multe ori intervenim înainte ca tu sau clienții tăi să observați ceva. (fără modificări, deja conform brand-voice)
Notă: AI-ul (SimpleAd Manager) e descris strict ca monitorizare + intervenție umană ulterioară, exact cum cere regula din §3 (nu „AI rezolvă singur"). Nu era nevoie de reformulare.

### [src/data/content.ts > whySimplead[2].title]
**Original:** Suntem puțini, și asta e intenționat
**Propus:** Suntem puțini, și asta e intenționat (fără modificări, deja conform brand-voice)

### [src/data/content.ts > whySimplead[2].body]
**Original:** Web, grafică, mentenanță și social, toate la aceeași echipă restrânsă. Nu alergi între furnizori care nu vorbesc între ei și nu se pierde nimic pe drum.
**Propus:** Web, grafică, mentenanță și social, toate la aceeași echipă restrânsă. Nu alergi între furnizori care nu vorbesc între ei și nu se pierde nimic pe drum. (fără modificări, deja conform brand-voice)
Notă: transmite ideea de „tot sub un singur acoperiș" fără să folosească vreunul din clișeele interzise, listând concret ce acoperă echipa (web, grafică, mentenanță, social), exact cum cere corecția aprobată din §4.

### [src/data/content.ts > whySimplead[3].title]
**Original:** Îți spunem și când nu-ți trebuie
**Propus:** Îți spunem și când nu-ți trebuie (fără modificări, deja conform brand-voice)

### [src/data/content.ts > whySimplead[3].body]
**Original:** Dacă un site merită reparat, nu reconstruit, îți zicem. Dacă undeva nu ai nevoie de noi, la fel. Fără costuri ascunse. Și fără TVA, prețul e prețul.
**Propus:** Dacă un site poate fi doar reparat, exact asta facem, fără reconstrucție de care n-ai nevoie. Dacă undeva nu ai nevoie de noi, la fel. Fără costuri ascunse. Fără TVA, prețul e prețul.
Notă: „reparat, nu reconstruit" e aceeași familie stilistică de antiteză („X, nu Y") ca „nu pe noroc" din hero. Cum panoul e comun tuturor paginilor de serviciu, am scos structura de contrast explicit ca să nu se adauge o a doua antiteză pe paginile care au deja una în hero. Am păstrat informația (recomandăm reparație în loc de reconstrucție inutilă) și am scos „Și" redundant de la ultima propoziție.
