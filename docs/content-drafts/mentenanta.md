Status: draft

# Mentenanță (calculator, pagina /mentenanta)

Sursă: `src/pages/mentenanta.astro` citit integral (hero, `AppShowcase`, calculator de pachete, `ProjectsGrid`, `FaqSection`, `CtaNotch`, script și stiluri) + exporturile `appTopics` (L331-431) și `mentenantaFaqs` (L720-769) din `src/data/content.ts`, folosite ca props pe această pagină. Text din `src/lib/maintenance-plans.ts` (numele/tag-urile pachetelor, add-on-urile) e randat tot aici, dar rămâne în afara ariei acestei runde conform brief-ului primit; nu apare mai jos.

Notă generală: spre deosebire de alte pagini auditate (`despre.astro`, proiectele din DB), textul de pe `/mentenanta` respectă deja aproape integral `brand-voice.md`: persoana e „noi" peste tot, nu apare em-dash, nu apare kill-list-ul, iar cardul „Alertă automată la incidente" folosește deja formularea corectă pentru AI („ne alertează... intervenim noi"), exact ce cerea §3. Modificările propuse mai jos sunt minime.

### [src/pages/mentenanta.astro > ServiceHero title + titleAccent]
**Original:** "Tu te ocupi de afacere, " + "noi de partea tehnică"
**Propus:** Tu te ocupi de afacere, noi de partea tehnică (fără modificări, deja conform brand-voice)

### [src/pages/mentenanta.astro > ServiceHero sub]
**Original:** "Îți monitorizăm site-ul continuu cu aplicația noastră internă, SimpleAd Manager, care urmărește uptime, securitate, performanță și backup. Așa prindem problemele înainte să le simți tu. Alege-ți pachetul mai jos; prețul se actualizează automat."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[0] „monitorizare": eyebrow + title + titleAccent]
**Original:** eyebrow "Monitorizare", title "Site-ul tău, sub observație " + titleAccent "non-stop"
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[0].intro]
**Original:** "Aplicația noastră internă, SimpleAd Manager, urmărește continuu sănătatea site-ului tău. În clipa în care ceva nu mai e în regulă, suntem anunțați automat, de cele mai multe ori înainte să observi tu sau clienții tăi."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[0].cards[0] „Uptime și disponibilitate"]
**Original:** "Verificăm site-ul automat, la intervale configurabile (HTTP/HTTPS), urmărim valabilitatea certificatului SSL și detectăm chiar și „ecranul alb". Când ceva pică, primim alertă imediat (email, Slack, Discord, Telegram sau webhook) și intervenim."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[0].cards[1] „Performanță și Core Web Vitals"]
**Original:** "Rulăm teste de viteză (PageSpeed/Lighthouse) pe mai multe pagini și urmărim Core Web Vitals (LCP, CLS) în timp, cu praguri și istoric. Așa vedem din vreme dacă site-ul începe să încetinească și putem acționa înainte să te coste vizitatori."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[0].cards[2] „DNS, domenii și email"]
**Original:** "Detectăm modificările de DNS, cu valori înainte/după, și verificăm protecția email-ului (SPF, DKIM, DMARC). Astfel afli rapid dacă cineva îți schimbă configurația sau dacă mesajele tale riscă să ajungă în spam."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[1] „securitate": eyebrow + title + titleAccent]
**Original:** eyebrow "Securitate", title "Protecție și plasă de siguranță, " + titleAccent "la fiecare nivel"
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[1].intro]
**Original:** "Te apărăm proactiv de probleme și păstrăm mereu o cale de întoarcere. Scanăm vulnerabilitățile, întărim site-ul și facem backup-uri pe care le putem restaura într-un singur click."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[1].cards[0] „Scanare și întărire"]
**Original:** "Scanăm constant punctele slabe: WordPress neactualizat, debug expus, user „admin" implicit, permisiuni greșite de fișiere, XML-RPC. Acolo unde se poate, aplicăm măsuri de întărire (hardening), ca site-ul să fie mai greu de spart."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[1].cards[1] „Backup și restaurare"]
**Original:** "Facem backup automat și programat (bază de date + fișiere), cu stocare incrementală și copii în mai multe locuri (S3, Dropbox, local). Dacă e nevoie, restaurăm site-ul la o versiune funcțională cu un singur click."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[1].cards[2] „Comunicare securizată"]
**Original:** "Legătura dintre aplicație și site-ul tău este semnată criptografic (HMAC-SHA256) și protejată împotriva interceptării și a reluării atacurilor. Practic, doar aplicația noastră poate da comenzi site-ului tău, nimeni altcineva."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[2] „automatizare": eyebrow + title + titleAccent]
**Original:** eyebrow "Automatizare", title "Probleme rezolvate din timp, " + titleAccent "rapoarte clare"
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[2].intro]
**Original:** "Multe lucruri se rezolvă automat, înainte să devină probleme. Iar tu primești lunar un raport clar, fără jargon tehnic, cu tot ce s-a întâmplat cu site-ul tău."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[2].cards[0] „Actualizări sigure"]
**Original:** "Nu actualizăm „pe încredere": facem backup, o captură înainte, aplicăm update-ul, încă o captură după și comparăm vizual cele două. Dacă apare o problemă, revenim automat la versiunea anterioară (rollback), fără întreruperi pentru tine."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > appTopics[2].cards[1] „Alertă automată la incidente"]
**Original:** "Pentru situațiile clare avem scenarii predefinite, iar un diagnostic asistat de AI ne alertează cu context deja pregătit: site căzut, bază de date critică, plugin vulnerabil. Intervenim noi: deciziile importante rămân la oameni, iar tu primești un rezumat cu ce s-a întâmplat."
**Propus:** (fără modificări, deja conform brand-voice)
Notă: acesta e exact blocul flagat critic în `audit-text-v1.md` (§3, "AI doar în tracking/monitorizare"). Formularea actuală din cod respectă deja regula: AI-ul doar alertează cu context, „intervenim noi" e explicit, deciziile rămân la oameni. Nu propunem nicio schimbare, pare deja corectată.

### [src/data/content.ts > appTopics[2].cards[2] „Rapoarte și notificări"]
**Original:** "Lunar primești un raport PDF personalizat (cu logo) care adună uptime, securitate, actualizări, backup, performanță și SEO. Plus alerte în timp real pe canalul preferat, cu ore de liniște ca să nu te deranjăm noaptea degeaba."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/pages/mentenanta.astro > calc__block legend, pas 1]
**Original:** "1 Pachet de bază"
**Propus:** Pachet de bază (fără modificări de conținut, deja conform brand-voice; „1" e doar indicatorul de pas din UI)

### [src/pages/mentenanta.astro > calc__block legend, pas 2]
**Original:** "2 Opțiuni suplimentare"
**Propus:** Opțiuni suplimentare (fără modificări de conținut, deja conform brand-voice; „2" e doar indicatorul de pas din UI)

### [src/pages/mentenanta.astro > summary__title]
**Original:** "Pachetul tău"
**Propus:** (fără modificări, deja conform brand-voice)

### [src/pages/mentenanta.astro > summary__cta (buton)]
**Original:** "Mergi la plată"
**Propus:** (fără modificări, deja conform brand-voice; CTA direct, fără clișeul „Discută cu un expert")

### [src/pages/mentenanta.astro > summary__note]
**Original:** "Plată securizată prin Stripe, abonament lunar. Nu se adaugă TVA. Poți anula oricând."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/pages/mentenanta.astro > ProjectsGrid title prop]
**Original:** "Site-uri pe care le ținem live chiar acum"
**Propus:** (fără modificări, deja conform brand-voice)

### [src/pages/mentenanta.astro > FaqSection eyebrow + title + titleAccent]
**Original:** eyebrow "Întrebări frecvente", title "Ai " + titleAccent "întrebări?"
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > mentenantaFaqs[0] „Oferiți mentenanță web lunară?"]
**Original:** "Da. Pachete cu actualizări de platformă și module, backup-uri regulate, monitorizare de securitate și uptime, plus timp de intervenție inclus. Tu pe afacere, noi pe partea tehnică."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > mentenantaFaqs[1] „Ce monitorizați, mai exact?"]
**Original:** "Disponibilitate (uptime) și certificat SSL, securitate și actualizări, backup-uri, viteză și Core Web Vitals, plus DNS și protecția emailului, totul prin SimpleAd Manager, cu alerte în timp real."
**Propus:** (fără modificări, deja conform brand-voice)
Notă: acest răspuns rezolvă deja registrul deschis din `brand-voice.md` §7 („Parametrii aplicației de monitorizare, lista exactă") - lista de parametri e deja explicită și consistentă cu `appTopics`.

### [src/data/content.ts > mentenantaFaqs[2] „Datele și backup-urile mele sunt în siguranță?"]
**Original:** "Da. Backup-urile sunt copiate în mai multe locuri, iar comunicarea dintre aplicație și site e semnată și protejată. Le putem restaura rapid la nevoie."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > mentenantaFaqs[3] „Ce se întâmplă dacă pică sau e infectat site-ul?"]
**Original:** "Suntem anunțați automat și intervenim. Cu backup-urile regulate readucem rapid site-ul la o versiune funcțională și curată."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > mentenantaFaqs[4] „Cât de repede aflu dacă pică site-ul?"]
**Original:** "Verificăm site-ul automat, la intervale scurte. Când ceva nu răspunde cum trebuie, primim alertă imediat și intervenim, de cele mai multe ori înainte să observi tu sau clienții tăi."
**Propus:** "Verificăm site-ul automat, la intervale scurte. Când ceva nu răspunde cum trebuie, primim alertă imediat și intervenim, de multe ori chiar înainte ca tu sau clienții tăi să apucați să observați."
Notă: nicio regulă din brand-voice.md nu e încălcată de originalul acesta (persoană corectă, fără kill-list). Singurul motiv al propunerii e stilistic, propoziția finală e aproape identică, cuvânt cu cuvânt, cu cea din `appTopics[0].intro` de mai sus pe aceeași pagină; am variat ușor formularea ca să nu sune ca un copy-paste în două locuri din același FAQ/pagină. Faptul comunicat rămâne neschimbat.

### [src/data/content.ts > mentenantaFaqs[5] „Cum vă asigurați că o actualizare nu strică site-ul?"]
**Original:** "Înainte de orice update facem backup și o captură a site-ului, aplicăm actualizarea, facem o nouă captură și le comparăm vizual. Dacă apare o diferență sau o eroare, revenim automat la versiunea anterioară, fără ca tu să simți întreruperi."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > mentenantaFaqs[6] „Primesc rapoarte? Ce conțin?"]
**Original:** "Da. Lunar primești un raport PDF personalizat (cu logo) care adună uptime, securitate, actualizările făcute, backup-urile, performanța și evoluția SEO. Vezi clar, fără jargon, ce s-a întâmplat cu site-ul tău."
**Propus:** (fără modificări, deja conform brand-voice)

### [src/data/content.ts > mentenantaFaqs[7] „Cât costă?"]
**Original:** "Standard 75€/lună, Premium 120€/lună, plus add-on-uri opționale. Calculează-ți pachetul exact cu ajutorul calculatorului de mai sus. Simplead nu e plătitor de TVA: prețurile sunt finale."
**Propus:** (fără modificări, deja conform brand-voice)
Notă: prețurile (75€/120€) sunt valori reale, configurate în `src/lib/maintenance-plans.ts` (sursa unică folosită și server-side la checkout), nu cifre de marketing nesusținute; le-am lăsat neatinse conform regulii „fără cifre inventate".

### [src/pages/mentenanta.astro > CtaNotch title + subtitle]
**Original:** title "Tu te ocupi de afacere." + subtitle "Noi ne ocupăm de site."
**Propus:** (fără modificări, deja conform brand-voice)
