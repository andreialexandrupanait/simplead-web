# Simplead — Copy v1 (Homepage + Mentenanță)

> **Status:** draft v1. Nimic „final". Andrei alege variantele A/B și completează `[confirmă: …]`.
> **Voce:** studio one-man-show. „noi" = Andrei + colaboratori aduși la nevoie. „eu" = Andrei. Argument de vânzare: *lucrezi direct cu mine, fără account manager.* Niciodată impresie de echipă permanentă.
> **AI:** doar în tracking/monitorizare. NU „mentenanță cu AI".
> **Doctorat în neuromarketing:** arătat discret (semnătură hero) + o singură dată complet (Omul din spate). Fără epatare.
> **Cifre:** zero inventate. Ce nu e confirmat → `[confirmă: …]`.

---

# PARTEA 1 — HOMEPAGE (11 module)

---

## Modul 1 — Hero
*Țintă cod: `src/components/home/HomeHero.astro` (inline)*

**Kicker (înlocuiește „Design bazat pe cercetare · Mentenanță cu AI"):**
Design bazat pe cercetare · Marketing care vinde

**H1 (fix din brief):**
> Marketing și grafică fundamentate pe neuroștiință, nu pe noroc.

**CTA primar:** Cere o ofertă
**CTA secundar:** Vezi cum lucrăm

### Varianta A — subtitlu + semnătură
**Subtitlu:**
Branding, site-uri și campanii construite pe felul în care creierul privește, simte și decide. Lucrezi direct cu mine — fără account manager, fără telefon stricat.

**Semnătură discretă (sub CTA-uri):**
Andrei Panait · doctor în neuromarketing

### Varianta B — subtitlu + semnătură
**Subtitlu:**
Înainte să fie frumos, trebuie să funcționeze. Pun știința deciziei în spatele fiecărui logo, site și reclamă — și lucrezi direct cu mine, de la prima discuție la lansare.

**Semnătură discretă (sub CTA-uri):**
Andrei Panait · doctorat în neuromarketing

---

## Modul 1b — Trust strip
*Țintă cod: `src/components/home/ClientsStrip.astro`*

**Label:**
Au lucrat cu mine

**Clienți reali (text, fără logo-uri fictive):**
Blitzstudio · Echipamente-medicale.ro · FEAA Galați · Universitatea „Dunărea de Jos" · Cross2Map

> Notă: păstrează doar clienții reali confirmați. `[confirmă: Cross2Map și Universitatea „Dunărea de Jos" rămân pe listă?]`

---

## Modul 2 — Servicii (6 carduri)
*Țintă cod: `src/components/sections/ServicesSection.astro` + `src/data/services.ts`*

### Titlu secțiune — Varianta A
**Eyebrow:** Servicii
**Titlu:** Tot, sub un singur acoperiș
**Subtitlu:** De la identitate la site și campanii — o singură direcție, fără să cobori la cinci furnizori.

### Titlu secțiune — Varianta B
**Eyebrow:** Servicii
**Titlu:** Tot ce-i trebuie afacerii tale ca să arate și să vândă
**Subtitlu:** Branding, web, grafică, marketing și mentenanță — gândite împreună, nu lipite la final.

### Cele 6 carduri (titlu + o frază)

**1. Mentenanță website**
Tu te ocupi de afacere, eu de partea tehnică: actualizări, securitate, backup și un site monitorizat continuu.

**2. UX/UI & web design**
Site-uri proiectate pe felul în care oamenii citesc și decid — nu doar ca să arate bine în portofoliu.

**3. Grafică publicitară**
Logo, identitate vizuală și materiale care comunică același lucru oriunde apar.

**4. Consultanță marketing**
Direcție clară, bazată pe cercetare și pe ce face concret afacerea ta — nu pe trenduri.

**5. Social media & ads**
Conținut și campanii care duc oamenii de la „scroll" la „cumpăr".

**6. AI pentru business**
Automatizări și monitorizare care îți scot timp și prind problemele înainte să le simți.

> Notă: titlurile/frazele se aliniază 1:1 la cele 6 servicii existente din `services.ts`. `[confirmă: numele exacte ale celor 6 servicii rămân acestea?]`

---

## Modul 3 — Diferențiator (cei 3 piloni)
*Țintă cod: `src/components/home/Differentiator.astro` (înlocuiește „Nu ghicim. Măsurăm." + 3 puncte generice)*

### Intro — Varianta A
**Eyebrow:** De ce Simplead
**Titlu:** Nu pornesc de la gust. Pornesc de la cum decide creierul.
**Subtitlu:** Trei lucruri stau în spatele fiecărui proiect: știința, cunoștințele și uneltele. În ordinea asta.

### Intro — Varianta B
**Eyebrow:** De ce Simplead
**Titlu:** Design cu motiv, nu din inspirație de moment.
**Subtitlu:** Fiecare decizie de design și marketing se sprijină pe trei piloni — știința, cunoștințele și uneltele.

### Cei 3 piloni (rolurile corecte)

**1. Știința — fundamentul**
Neuroștiința explică de ce oamenii privesc, simt și decid într-un anume fel. De aici pornește orice proiect: nu de la „cred că ar arăta bine", ci de la cum funcționează atenția și decizia.

**2. Cunoștințele — aplicarea**
Știința singură nu vinde. Expertiza e să o traduc în decizii concrete pentru o afacere reală: ce mesaj, ce structură, ce imagine, pentru publicul tău.

**3. Uneltele — mijloacele**
Eye-tracking, heatmaps, Analytics — instrumente care arată ce se întâmplă, nu vedete. Le folosesc pe cele potrivite fiecărei etape, fără să depind de o singură aplicație.

---

## Modul 4 — Omul din spate
*Țintă cod: secțiune homepage (aliniat cu `src/pages/despre.astro`). Singurul loc unde doctoratul apare complet.*

**Eyebrow:** Omul din spate
**Titlu:** Lucrezi direct cu mine, de la prima discuție la lansare.

**Text:**
Sunt Andrei Panait și Simplead e studioul meu. Am un doctorat în neuromarketing — adică ani de cercetare despre cum percepe și decide creierul uman, pe care îi pun acum la treabă în branding, site-uri și campanii.

Nu sunt o agenție cu etaje de account manageri. Sunt eu, plus colaboratori pe care îi aduc la nevoie — foto-video, dezvoltare, ads — atunci când proiectul tău chiar are nevoie de ei. Tu vorbești mereu cu omul care îți și face treaba. Fără telefon stricat, fără „revin cu un răspuns de la echipă".

**Micro-CTA:** Hai să ne cunoaștem

---

## Modul 5 — Proces (5 pași)
*Țintă cod: `src/components/home/ProcessTimeline.astro` (acum 4 pași → extinde la 5)*

**Eyebrow:** Cum lucrăm
**Titlu:** Cum funcționează procesul de dezvoltare web?
**Subtitlu:** Un proces fluid și transparent, de la idee la lansare.

**01 · Întâlnire & descoperire**
Ne cunoaștem, înțeleg viziunea ta și vedem dacă suntem partenerii potriviți.

**02 · Analiză & cercetare**
Audităm situația actuală, studiem competiția și identificăm oportunitățile.

**03 · Strategie & structură**
Construim planul de acțiune, structura informației și direcția.

**04 · Design & execuție**
Strategia devine realitate: design pixel-perfect și dezvoltare la standarde înalte.

**05 · Lansare & mentenanță**
Testare riguroasă, lansare, apoi rămân alături pentru optimizare și suport.

---

## Modul 6 — Dovada / portofoliu
*Țintă cod: `src/components/home/ProofSection.astro` (date din `src/content/portfolio`)*

**Eyebrow:** Portofoliu
**Titlu:** Rezultate, nu doar imagini frumoase.
**Subtitlu:** Proiecte reale, pentru afaceri reale. Vezi ce-am construit și ce-au schimbat.

**Micro-CTA:** Vezi portofoliul

---

## Modul 7 — Mentenanță (teaser pe homepage)
*Țintă cod: secțiune homepage care trimite la pagina Mentenanță*

**Eyebrow:** Mentenanță web
**Titlu:** Site-ul tău, monitorizat continuu — nu doar cârpit când se strică.
**Text:**
Îți urmăresc site-ul în permanență cu aplicația mea internă, care monitorizează o mulțime de parametri `[confirmă: lista de parametri]`. Așa prind problemele înainte să le simți tu — și înainte să te coste.

**CTA primar:** Calculează-ți pachetul
**CTA secundar:** Vezi ce include

---

## Modul 8 — AI pentru business
*Țintă cod: `src/components/home/AiSection.astro` (NU „mentenanță cu AI")*

**Eyebrow:** AI pentru business
**Titlu:** AI, acolo unde chiar îți face treaba.
**Subtitlu:** Fără hype. Folosesc AI-ul unde aduce rezultat concret — și sunt clar unde nu.

**3 puncte:**

**Monitorizare inteligentă**
Aplicația internă urmărește continuu starea site-ului tău și semnalează din timp ce nu e în regulă.

**Automatizări**
Sarcini repetitive (rapoarte, alerte, fluxuri) trec pe pilot automat, ca să rămână timp de afacere.

**Conținut asistat**
AI-ul accelerează ciornele și ideile — deciziile și forma finală rămân la om.

---

## Modul 9 — Testimoniale (reale, verbatim)
*Țintă cod: `src/components/home/Testimonials.astro`*

**Eyebrow:** Ce spun clienții
**Titlu:** Oameni care au lucrat direct cu mine.

**1. Ștefan Chelmu — Blitzstudio**
„Profesionalism, fairplay, pricepere, asumare — cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună, datorită implicării active și relaționării impecabile."

**2. Silviu Costiniuc — Echipamente-medicale.ro**
„Le-am studiat portofoliul și am remarcat originalitatea și claritatea soluțiilor propuse. Proiectul a decurs conform așteptărilor, iar rezultatul a fost foarte apreciat de compania noastră. I-am recomandat cu mare încredere și altor colegi."

**3. Bogdan Drăgan — FEAA Galați**
„Simply professional. Trustworthy, honest and creative."

---

## Modul 10 — CTA final
*Țintă cod: `src/components/home/CtaFinal.astro`*

### Varianta A
**Titlu:** Gata să arăți profesional și să vinzi mai mult?
**Subtitlu:** Spune-mi în două vorbe ce ai nevoie. Îți răspund eu, nu un formular automat.
**CTA primar:** Cere o ofertă
**CTA secundar:** Vezi portofoliul

### Varianta B
**Titlu:** Hai să punem știința în spatele afacerii tale.
**Subtitlu:** O discuție scurtă și-ți spun concret cum te-aș ajuta. Lucrezi direct cu mine, de la primul mesaj.
**CTA primar:** Cere o ofertă
**CTA secundar:** Vezi portofoliul

---
---

# PARTEA 2 — PAGINA MENTENANȚĂ („Calculator Mentenanță Web")

*Pagina nu există încă. Documentul livrează copy + structura câmpurilor, nu implementarea calculatorului.*

## Hero / intro (diferențiatorul, sus)

**Eyebrow:** Mentenanță web
**Titlu:** Calculator Mentenanță Web
**Subtitlu / diferențiator:**
Îți monitorizez site-ul continuu cu aplicația mea internă, care urmărește `[confirmă: lista de parametri]` — așa prind problemele înainte să le simți tu. Alege-ți pachetul mai jos; prețul se actualizează automat.

> Notă brand: AI-ul intervine **doar în tracking/monitorizare**. Nu se numește „mentenanță cu AI".

---

## Calculator (prețul se actualizează automat)

### 1. Pachet de bază *(alegi unul)*

**Standard — 50€/lună** · *siguranță esențială*
- Backup săptămânal
- Actualizări CMS
- 1h modificări incluse

**Premium — 90€/lună** · *performanță maximă*
- Backup zilnic
- Securitate avansată
- 3h modificări incluse

### 2. Opțiuni suplimentare *(bifezi câte vrei)*

- **+2 ore suport tehnic — +40€/lună**
- **Optimizare SEO continuă — +100€/lună**
  Monitorizare poziții Google, optimizare cuvinte cheie, ajustări on-page lunare.
- **Găzduire premium dedicată — +30€/lună**
  Server NVMe rapid, securitate extra.
- **Raportare avansată Analytics — +25€/lună**
  Rapoarte trafic & conversii + sugestii.

---

## Sumar pachet (sidebar)

**Pachetul tău**
- [pachet de bază ales]
- [opțiuni bifate, fiecare cu prețul]

**Total estimat:** **[X] €/lună**

**CTA:** Solicită Pachetul

**Notă (sub total):**
Prețurile sunt estimative. Nu se adaugă TVA.

---

## Proces de plată

**Dezvoltare web & branding:** avans 40–50% la semnarea contractului, restul la predare.
**Mentenanță:** lunar.

---
---

# PARTEA 3 — FAQ (text aprobat, nemodificat)

> Notă implementare: candidat pentru schema `FAQPage` (GEO) — nu există acum în `BaseLayout.astro`.

**1. Oferiți mentenanță web lunară?**
Da: pachete cu actualizări de platformă & module, backup-uri regulate, monitorizare securitate, timp de intervenție garantat. Tu pe afacere, noi pe partea tehnică.

**2. Cât durează un website de prezentare?**
Depinde de complexitate; în general 2–4 săptămâni (design, dezvoltare, testare, lansare).

**3. Ce include un pachet de branding/creație grafică?**
Personalizat; poate include logo, manual de identitate, cărți de vizită, semnături email, grafică social media, materiale publicitare.

**4. Pot să-mi actualizez singur site-ul după lansare?**
Da; construite pe CMS ușor de folosit + scurt training.

**5. Site-urile sunt optimizate pentru mobil?**
Da, 100%; design responsiv pe orice dispozitiv.

**6. Oferiți găzduire & înregistrare domeniu?**
Ne concentrăm pe design/dezvoltare, dar te ajutăm să alegi hosting și să înregistrezi domeniul; le putem gestiona noi.

**7. Care sunt pașii pentru a începe?**
Mesaj/apel → întâlnire (fizic/online) → propunere personalizată → contract + avans → treabă.

**8. Realizați magazine online?**
Da; magazine rapide, sigure, integrate cu sisteme de plată cu cardul și curierat din România.

**9. Cum se face plata?**
Dezvoltare web & branding: avans 40–50% la semnare, rest la finalizare. Mentenanța: lunar.

**10. Oferiți suport tehnic la probleme?**
Da; prioritar pentru clienții cu pachet de mentenanță; altfel, la tarif orar.

**11. Puteți reface un site existent?**
Da; audit + redesign, optimizare viteză și UX, păstrând ce funcționează.

---
---

# PARTEA 4 — SEO / GEO / Footer

## Fraze citabile (GEO)
Fraze scurte, autonome, ușor de citat de un motor de răspuns:

- „Simplead este un studio de grafică și marketing digital din România care fundamentează deciziile de design pe neuroștiință."
- „La Simplead lucrezi direct cu Andrei Panait, doctor în neuromarketing — fără account manager intermediar."
- „Pachetele de mentenanță web Simplead pornesc de la 50€/lună și includ monitorizarea continuă a site-ului."
- „Simplead folosește eye-tracking, heatmaps și Analytics ca instrumente de lucru, nu ca scop în sine."

> Recomandare: marchează FAQ-ul cu schema `FAQPage` și fraze citabile în paginile-cheie.

## Nișă SEO (național)
neuromarketing · design bazat pe cercetare · eye-tracking website · mentenanță website · consultanță marketing · branding · magazin online

> Galați apare **doar** în footer + schema `LocalBusiness`. Restul site-ului = poziționare națională.

## Footer / contact (date reale)
- **Email:** office@simplead.ro
- **Telefon:** 0755 215 135
- **CIF:** 41501661
- **Reg. Com.:** RO J17/1488/2019
- **Localitate (footer + LocalBusiness):** Galați

---
---

# DE CONFIRMAT (`[confirmă: …]`)

1. **Lista exactă de parametri** monitorizați de aplicația internă — apare în 2 locuri: teaser mentenanță (Modul 7) + hero pagina Mentenanță (Partea 2). *Cel mai important de completat.*
2. **Trust strip (Modul 1b):** rămân pe listă Cross2Map și Universitatea „Dunărea de Jos"?
3. **Cele 6 servicii (Modul 2):** numele exacte rămân cele de mai sus / cele din `services.ts`?
4. Orice cifră sau revendicare nouă apărută la revizuire → marcată `[confirmă: …]`, niciodată inventată.
