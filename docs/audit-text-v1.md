# Audit text simplead-web — v1 — 2026-07-01

## Sumar executiv

- **Portofoliul public expune date factual greșite**: 3 din 6 proiecte publicate au clientul setat la `"Client Simplead"` (placeholder generic), iar studiul de caz de pe `/servicii/consultanta-marketing` reatribuie testimonialul real al lui Silviu Costiniuc unui client fictiv "Andrei Panait / panaitandrei.ro".
- **Kill-list-ul e încălcat chiar în conținutul din DB**, nu doar în cod: cuvinte interzise (`memorabilă`, `remarcată`) și clișeul „transformă vizitatorii în clienți" apar live pe `/portofoliu`, iar 3 pachete au em-dash „—" (interzis complet din iun. 2026) direct în `description`/`note`.
- **Doctoratul apare complet în cel puțin 6 locuri** (despre.astro ×2, whyPanel, statisticile hub-ului de servicii, un articol de blog, un caz de studiu greșit atribuit), în timp ce componenta aprobată „Omul din spate" (`FounderQuote.astro`) nu e afișată nicăieri pe site în acest moment.
- **`/despre` publică cifre neconfirmate ca fapt** ("12+ ani de lucru", "70+ proiecte", "5+ ani cea mai lungă colaborare") exact în timp ce `brand-voice.md` §7 le listează ca întrebare deschisă, nerezolvată; și cifra de "ani experiență" diferă între `/despre` (12+) și hub-ul `/servicii` (10+).
- **Secțiunea "Automatizare" de pe `/mentenanta`** descrie AI-ul făcând diagnostic și încercând să rezolve singur incidente (nu doar monitorizare), ceea ce intră în tensiune directă cu regula dură din §3 ("AI doar în tracking/monitorizare").

## Metodologie (transparență privind acoperirea)

- **Surse citite integral:** `docs/brand-voice.md`; toate fișierele din harta §8 (`site.ts`, `nav.ts`, `services.ts`, `content.ts`); plus `clients.ts`, `testimonials.ts`, `pricing.ts`, `support-services.ts`, `packages-fallback.ts` (nu sunt în harta §8, dar conțin copy public); toate cele 11 componente din `src/components/home/*`; paginile `despre.astro`, `mentenanta.astro`, `pachete.astro`, `contact.astro`, `servicii-rapide.astro`, `suport.astro`, `servicii/index.astro`, `servicii/[slug].astro` (routing).
- **DB (Postgres, prod, citire read-only pe host):** toate cele 4 `posts` publicate, toate cele 6 `projects` publicate, toate cele 17 `packages` active — 100% acoperire, nu eșantion.
- **Nu au fost auditate în detaliu în această rundă** (pagini existente, verificate doar ca rută, nu ca text): `/blog`, `/portofoliu` (template-uri, conținutul din spate a fost citit din DB), `/resurse`, `/intrebari-frecvente`, `/termeni`, `/confidentialitate`, `/cookies`, `/multumim`, `/404`, `/in-constructie`, `/in-mentenanta`, `/instrumente/*`, `/cere-suport` (parțial). Recomand o rundă v2 dedicată acestora dacă timpul o permite.
- **Corectare față de prompt-ul inițial de audit:** §7 din `brand-voice.md` e un registru de întrebări deschise ale lui Andrei, nu lista de clienți confirmați — lista de clienți e în §6 (Cross2Map, Universitatea „Dunărea de Jos"). Am verificat clienții din DB și din `src/data/clients.ts` (listă separată, cu ~22 clienți reali de mentenanță) față de ambele surse.
- **Pozitiv, de reținut:** em-dash-ul „—" e absent din tot copy-ul vizibil din fișierele repo (aparițiile găsite sunt exclusiv în comentarii de cod, nu în text afișat) — kill-list-ul e respectat corect acolo. Singurele apariții live sunt în 3 rânduri din DB (vezi găsirile).

## Găsiri detaliate

### Critică

| Severitate | Fișier | Citat (sub 15 cuvinte) | Regula încălcată | Direcție de corectare |
|---|---|---|---|---|
| Critică | DB `projects` (administrare-continut, materiale-promovare, productie-video-brand) | `"client": "Client Simplead"` | brand-voice.md §7/2d — clientul trebuie confirmat, nu generic | Înlocuiește cu numele real al clientului sau retrage proiectul din `published` până se confirmă |
| Critică | `src/data/services.ts` (caseStudy, consultanta-marketing, ~L800-809) | „Originalitate și claritate în soluțiile propuse" → atribuit „Andrei Panait" | 2d factual — testimonial real (Silviu Costiniuc) reatribuit altui „client" | Scoate citatul dublat; pune un caz de studiu propriu sau `[confirmă: ...]` |
| Critică | DB `projects` (identitate-blitzstudio) | „identitate vizuală... memorabilă... pentru a fi remarcată" | brand-voice.md §4 kill-list — `remarcabil`/`memorabil` interzise | Rescrie concret: ce anume face identitatea recognoscibilă |
| Critică | DB `projects` (magazin-online-echipamente) | „gândit să transforme vizitatorii în clienți" | brand-voice.md §4 — clișeu explicit interzis | Înlocuiește cu ce face efectiv magazinul (ex. „ușor de navigat și de cumpărat") |
| Critică | DB `packages` (site-prezentare, magazin-online, ux-ui-redesign) | „...fie o pagină, fie cincizeci" / „...arată — de la câteva produse" | brand-voice.md §4 — em-dash „—" interzis complet | Actualizează rândurile din DB (nu doar `packages-fallback.ts`, care are deja varianta corectă) |
| Critică | `despre.astro` L176, L9-10; `content.ts` L638 (whyPanel); `ServiceHubHero` (svcHubStats "Dr."); post `ce-este-neuromarketingul`; `services.ts` caseStudy consultanta | „doctor în marketing" apare complet în ≥6 locuri | brand-voice.md §3 — o singură dată complet, „Omul din spate" (nefolosit azi) | Redu la 1 mențiune completă + semnătură discretă în rest |
| Critică | `despre.astro` L90-91, L235, L240-241 | „12+ ani de lucru" / „70+ proiecte" / „5+ ani" | brand-voice.md §3 „fără cifre inventate" + §7 (încă neconfirmat) | Marchează `[confirmă: ...]` până Andrei confirmă cifrele din §7 |
| Critică | `content.ts` L399-418 (appTopics „automatizare", randat pe `/mentenanta`) | „diagnostic asistat de AI care încearcă să rezolve singur problema" | brand-voice.md §3 — AI doar în tracking/monitorizare | Reformulează pe „alertă + intervenim noi", nu „AI rezolvă" |

### Majoră

| Severitate | Fișier | Citat (sub 15 cuvinte) | Regula încălcată | Direcție de corectare |
|---|---|---|---|---|
| Majoră | `despre.astro` L90 vs `content.ts` L649 (svcHubStats) | „12+ ani de lucru" vs „10" ani experiență | 2e consistență cross-fișier | Unifică cifra (sau marchează ambele `[confirmă]`) |
| Majoră | DB `projects` (4 din 6, body) | `<!-- TODO: cifră reală -->` urmat de „Rezultatul" vag, fără cifre | brand-voice.md §3 — rezultat fără sursă trebuie `[confirmă: ...]` | Completează cu rezultate reale sau marchează explicit `[confirmă]` |
| Majoră | `HomeHero.astro` H1 + `ProofSection.astro` titlu (aceeași pagină, Acasă) | „nu pe noroc" + „nu doar imagini frumoase" | brand-voice.md §4 — antiteza max 1x/pagină, în hero | Rescrie afirmativ titlul din ProofSection |
| Majoră | `services.ts` L578 (heroTitleAccent) + L562 (summary), social-media | „clienți, nu doar aprecieri" repetat de 2 ori pe aceeași pagină | brand-voice.md §4 — antiteza max 1x/pagină | Păstrează o singură formulare, rescrie cealaltă |
| Majoră | `contact.astro` L22 vs `site.ts` L28 | „revenim în aceeași zi lucrătoare" vs `responseTime: '24'` (TODO) | 2e consistență cross-fișier | Confirmă o singură promisiune de timp de răspuns |
| Majoră | `support-services.ts` (site-astro-ai) + `suport.astro` L59-63 | „Site-uri Astro cu AI"... „livrat mai repede cu AI în flux" | brand-voice.md §3 — apropiat de „suport cu AI" interzis | Clarifică cu Andrei: e despre construcție, nu mentenanță — poate merită alt loc în navigare |

### Minoră

| Severitate | Fișier | Citat (sub 15 cuvinte) | Regula încălcată | Direcție de corectare |
|---|---|---|---|---|
| Minoră | `services.ts` L120-222 („mentenanta-website", date moarte, redirect 301 spre `/mentenanta`) | „eu de partea tehnică"... „fără bătăi de cap"... „rapid, sigur și actualizat" | brand-voice.md §4 (persona + triadă + cuvânt gol) — dar nerandat live azi | Curăță intrarea din `services.ts` sau aliniaz-o la varianta „noi" de pe `/mentenanta` |
| Minoră | DB, toate cele 10 înregistrări publicate (4 posts + 6 projects) | `"seo_title": null, "seo_description": null` | 2g SEO — lipsă override pe toate paginile din DB | Completează măcar pentru articolele/proiectele cu trafic |
| Minoră | DB, toate cele 4 `posts` publicate | `"takeaways": [], "faq": []` | 2h — funcționalitate nefolosită | Populează sau elimină câmpurile din UI dacă nu se vor folosi curând |
| Minoră | `services.ts` L204 (FAQ mentenanță) | „Cum intră AI-ul în mentenanță?" (titlu întrebare) | brand-voice.md §3 — titlul asociază direct AI+mentenanță | Reformulează titlul (răspunsul de dedesubt e deja corect, doar monitorizare) |
| Minoră | 4 articole de blog (`posts.author = "Andrei Panait"`) | text scris consecvent la „noi", nu la „eu" | brand-voice.md §1 — nu clarifică explicit vocea pt. articole semnate individual | De discutat cu Andrei: „eu" sau „noi" pentru blog |
| Minoră | `despre.astro` L185 | „Doctorand în marketing" (Gabriel) | brand-voice.md §6 — doar faptele lui Andrei sunt verificate acolo | De verificat/adăugat în registrul de fapte |
| Minoră | `despre.astro` L86 | „Am deschis firma cu ajutorul unei finanțări europene" | brand-voice.md §6 — fapt neconsemnat | De verificat cu Andrei înainte de a-l trata ca definitiv |
| Minoră | 7+ fișiere (`clients.ts`, `testimonials.ts`, `services.ts`, `HomeHero.astro`, `ClientsStrip.astro`, `Differentiator.astro`, `despre.astro`, `portofoliu` DB) | „FEAA Galați", „Universitatea «Dunărea de Jos»... Galați" | brand-voice.md §3 — litera regulii („Galați doar în footer + schema") | Majoritatea sunt nume de clienți, nu poziționare proprie — de clarificat dacă regula vizează și numele de clienți sau doar copy-ul propriu al Simplead |

## La final

Raportul se oprește aici. Aștept alegerea priorităților și ordinea de corectare înainte de a modifica orice fișier.
