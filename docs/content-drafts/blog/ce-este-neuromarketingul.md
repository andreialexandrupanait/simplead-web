Status: draft

# Articol: Neuromarketing pe înțelesul tuturor

Sursă: `docker exec simplead_db psql -U simplead -d simplead -c "SELECT title,description,body,author,seo_title,seo_description,takeaways,faq FROM posts WHERE slug='ce-este-neuromarketingul';"` — am citit `title`, `description`, `body` (împărțit pe secțiuni ## din articol), `author`. `seo_title`, `seo_description`, `takeaways` și `faq` sunt goale (NULL / `[]`) în DB, deci nu am generat blocuri pentru ele (nimic de rescris). Am citit înainte `docs/brand-voice.md` și `docs/audit-text-v1.md`.

Notă generală: articolul folosește tiparul de antiteză „nu X, ci Y" / „X, nu Y" de multe ori (cel puțin 8 apariții pe tot corpul textului: „nu pe gust", „nu ca să manipuleze, ci ca să elimine", „nu o face bugetul, ci întrebarea", „nu la ce site-uri arată bine", „nu unde rămâne loc liber", „nu sfârșitul ei", „nu de magie", „nu de estetică", „nu în afara paginii", „nu e un truc de vânzări", „nu mai depind de gust și noroc", „testăm, nu ghicim"). Brand-voice §4 permite maxim o singură apariție pe pagină. Am păstrat-o pe cea din `description` (ecou direct al H1 aprobat „nu pe noroc"/„nu pe gust") și am rescris afirmativ restul, fără să schimb ce oferă efectiv Simplead. Titlul care conține „nu pentru mine" e un citat al obiecției cititorului (între ghilimele, nu o afirmație a studioului), așa că nu l-am numărat în bugetul de antiteze și l-am lăsat neschimbat.

Doctoratul apare o singură dată în articol, scurt, deja în formularea corectă „doctorat în marketing, cu accent pe neuromarketing" (nu „doctor în neuromarketing"). Conform brief-ului, e ok să rămână, fără să adaug altă mențiune sau emfază.

### [db:posts.title WHERE slug='ce-este-neuromarketingul']
**Original:** Neuromarketing pe înțelesul tuturor
**Propus:** Neuromarketing pe înțelesul tuturor (fără modificări, deja conform brand-voice)

### [db:posts.description WHERE slug='ce-este-neuromarketingul']
**Original:** Ce este neuromarketingul, cum funcționează hărțile termice și cum te ajută să iei decizii de design și marketing bazate pe date, nu pe gust.
**Propus:** Ce este neuromarketingul, cum funcționează hărțile termice și cum te ajută să iei decizii de design și marketing bazate pe date, nu pe gust. (fără modificări, deja conform brand-voice — asta rămâne singura antiteză „nu X" păstrată pe toată pagina, ecou al H1 aprobat „nu pe noroc")

### [db:posts.body WHERE slug='ce-este-neuromarketingul' — paragraful introductiv, înainte de primul ##]
**Original:** Neuromarketingul sună complicat, dar ideea din spate e simplă: în loc să **presupunem** ce le place oamenilor, **măsurăm** cum reacționează de fapt. Restul articolului e despre cum se face asta concret și, mai ales, la ce îți folosește ție, ca antreprenor.
**Propus:** Neuromarketingul sună complicat, dar ideea din spate e simplă: în loc să **presupunem** ce le place oamenilor, **măsurăm** cum reacționează de fapt. Restul articolului e despre cum se face asta concret și, mai ales, la ce îți folosește ție, ca antreprenor. (fără modificări, deja conform brand-voice)

### [db:posts.body WHERE slug='ce-este-neuromarketingul' — secțiunea „## Problema cu „mie îmi place""]
**Original:** Aproape orice discuție despre un site sau un logo ajunge, la un moment dat, la fraza „mie îmi place varianta asta". E o frază periculoasă, pentru un motiv simplu: tu nu ești clientul tău.

Tu îți cunoști produsul pe dinafară. Știi unde e butonul de comandă, știi ce înseamnă termenii din meniu, știi de ce prețul e corect. Vizitatorul care ajunge prima dată pe site nu știe nimic din toate astea. El decide în câteva secunde dacă rămâne sau pleacă, iar decizia aia nu e una rațională, cântărită: e un reflex.

Neuromarketingul studiază exact acest reflex: ce atrage privirea, ce creează încredere, ce produce ezitare. Nu ca să „manipuleze", ci ca să elimine fricțiunea dintre un om care caută ceva și o afacere care chiar oferă acel ceva.
**Propus:** Aproape orice discuție despre un site sau un logo ajunge, la un moment dat, la fraza „mie îmi place varianta asta". E o frază periculoasă, pentru un motiv simplu: tu nu ești clientul tău.

Tu îți cunoști produsul pe dinafară. Știi unde e butonul de comandă, știi ce înseamnă termenii din meniu, știi de ce prețul e corect. Vizitatorul care ajunge prima dată pe site nu știe nimic din toate astea. El decide în câteva secunde dacă rămâne sau pleacă, iar decizia aia nu e una rațională, cântărită: e un reflex.

Neuromarketingul studiază exact acest reflex: ce atrage privirea, ce creează încredere, ce produce ezitare. Nu e despre manipulare. E despre eliminarea fricțiunii dintre un om care caută ceva și o afacere care chiar oferă acel ceva.

*(Am scos tiparul „nu ca să X, ci ca să Y" — split în două propoziții scurte, aceeași idee, fără antiteza care ar fi fost a doua de pe pagină.)*

### [db:posts.body WHERE slug='ce-este-neuromarketingul' — secțiunea „## Ce măsoară, de fapt, neuromarketingul"]
**Original:** Câteva instrumente apar cel mai des în practică:

- **Eye-tracking (urmărirea privirii):** unde se uită oamenii pe o pagină, în ce ordine și cât timp. Există echipamente fizice de laborator, dar și modele predictive care estimează traseul privirii pe baza a mii de înregistrări reale.
- **Hărțile termice (heatmaps):** vizualizarea acelor date. Zonele „fierbinți" primesc atenție; zonele „reci" sunt invizibile pentru public, indiferent cât de importante ți se par ție.
- **Datele de comportament:** ce fac vizitatorii după ce se uită. Click-uri, derulare, formulare abandonate. Google Analytics îți spune *ce* s-a întâmplat; cercetarea privirii îți sugerează *de ce*.

Pus cap la cap: vezi ce observă oamenii, ce ignoră și unde se blochează. Apoi ajustezi exact acolo.
**Propus:** Câteva instrumente apar cel mai des în practică:

- **Eye-tracking (urmărirea privirii):** unde se uită oamenii pe o pagină, în ce ordine și cât timp. Există echipamente fizice de laborator, dar și modele predictive care estimează traseul privirii pe baza a mii de înregistrări reale.
- **Hărțile termice (heatmaps):** vizualizarea acelor date. Zonele „fierbinți" primesc atenție; zonele „reci" sunt invizibile pentru public, indiferent cât de importante ți se par ție.
- **Datele de comportament:** ce fac vizitatorii după ce se uită. Click-uri, derulare, formulare abandonate. Google Analytics îți spune *ce* s-a întâmplat; cercetarea privirii îți sugerează *de ce*.

Pus cap la cap: vezi ce observă oamenii, ce ignoră și unde se blochează. Apoi ajustezi exact acolo.

(fără modificări, deja conform brand-voice)

### [db:posts.body WHERE slug='ce-este-neuromarketingul' — secțiunea „## Un exemplu pe care îl vezi zilnic"]
**Original:** Gândește-te la o pagină cu un banner mare, trei oferte și un buton de contact. Intuiția spune că vizitatorul le vede pe toate. Cercetarea privirii arată altceva, în mod repetat:

- Oamenii urmăresc fețele umane din imagini, iar privirea lor merge acolo unde se uită persoana din fotografie. O imagine aleasă greșit poate trage atenția fix în afara mesajului tău.
- Textul nu se citește, se scanează: titluri, începuturi de paragraf, cuvinte îngroșate. Un paragraf lung și compact e, practic, invizibil.
- Elementele care seamănă a reclamă sunt ignorate din reflex, chiar și atunci când conțin informația cea mai importantă de pe pagină.

Niciuna dintre observațiile astea nu e o părere. Sunt tipare măsurate, documentate în cercetarea de specialitate, iar un site bun le folosește în avantajul lui.
**Propus:** Gândește-te la o pagină cu un banner mare, trei oferte și un buton de contact. Intuiția spune că vizitatorul le vede pe toate. Cercetarea privirii arată altceva, în mod repetat:

- Oamenii urmăresc fețele umane din imagini, iar privirea lor merge acolo unde se uită persoana din fotografie. O imagine aleasă greșit poate trage atenția fix în afara mesajului tău.
- Textul nu se citește, se scanează: titluri, începuturi de paragraf, cuvinte îngroșate. Un paragraf lung și compact e, practic, invizibil.
- Elementele care seamănă a reclamă sunt ignorate din reflex, chiar și atunci când conțin informația cea mai importantă de pe pagină.

Niciuna dintre observațiile astea nu e o părere. Sunt tipare măsurate, documentate în cercetarea de specialitate, iar un site bun le folosește în avantajul lui.

(fără modificări, deja conform brand-voice)

### [db:posts.body WHERE slug='ce-este-neuromarketingul' — secțiunea „## „E pentru corporații, nu pentru mine""]
**Original:** E reacția cea mai frecventă, și e de înțeles: neuromarketingul a intrat în vocabular prin studii scumpe făcute pentru branduri uriașe. Realitatea s-a schimbat. Analiza predictivă a atenției și interpretarea corectă a datelor de comportament sunt azi accesibile și pentru un site de prezentare sau un magazin online mic.

Diferența reală nu o face bugetul, ci întrebarea de la care pornești. În loc de „cum să arate site-ul?", întrebarea devine „ce trebuie să vadă vizitatorul în primele secunde ca să înțeleagă ce oferim?". E o schimbare mică de unghi, cu efect mare în rezultate.
**Propus:** E reacția cea mai frecventă, și e de înțeles: neuromarketingul a intrat în vocabular prin studii scumpe făcute pentru branduri uriașe. Realitatea s-a schimbat. Analiza predictivă a atenției și interpretarea corectă a datelor de comportament sunt azi accesibile și pentru un site de prezentare sau un magazin online mic.

Bugetul contează mai puțin decât întrebarea de la care pornești. În loc de „cum să arate site-ul?", întrebarea devine „ce trebuie să vadă vizitatorul în primele secunde ca să înțeleagă ce oferim?". E o schimbare mică de unghi, cu efect mare în rezultate.

*(Titlul secțiunii „E pentru corporații, nu pentru mine" e citatul obiecției cititorului, între ghilimele — l-am lăsat neschimbat, nu se pune la bugetul de antiteze al paginii. Am rescris doar propoziția „nu o face bugetul, ci..." afirmativ.)*

### [db:posts.body WHERE slug='ce-este-neuromarketingul' — secțiunea „## Cum aplicăm asta la Simplead"]
**Original:** Partea aceasta e și motivul pentru care există studioul: cercetarea din spatele deciziilor nu e un moft, e obișnuința rămasă dintr-un doctorat în marketing, cu accent pe neuromarketing. Concret, în proiecte:

- **Înainte de design:** ne uităm la cum decid oamenii din publicul tău și ce caută, nu la ce site-uri „arată bine" în portofoliile altora.
- **În design:** ierarhia vizuală urmează traseul natural al privirii. Mesajul principal stă unde se uită oamenii, nu unde rămâne loc liber.
- **După lansare:** analizăm comportamentul real (atenție, derulare, conversii) și ajustăm. Versiunea lansată e începutul optimizării, nu sfârșitul ei.

Rezultatul nu e magie: e mai puțin buget irosit pe elemente pe care nimeni nu le vede și mai multă atenție pe lucrurile care aduc clienți.
**Propus:** Partea aceasta e și motivul pentru care există studioul: cercetarea din spatele deciziilor nu e un moft, e obișnuința rămasă dintr-un doctorat în marketing, cu accent pe neuromarketing. Concret, în proiecte:

- **Înainte de design:** pornim de la cum decid oamenii din publicul tău și ce caută ei pe pagină.
- **În design:** ierarhia vizuală urmează traseul natural al privirii, iar mesajul principal stă exact unde se uită oamenii.
- **După lansare:** analizăm comportamentul real (atenție, derulare, conversii) și ajustăm mai departe. Versiunea lansată e doar începutul optimizării.

Rezultatul e concret: mai puțin buget irosit pe elemente pe care nimeni nu le vede și mai multă atenție pe lucrurile care aduc clienți.

*(Mențiunea doctoratului rămâne exact în formularea corectă „doctorat în marketing, cu accent pe neuromarketing" — nu am adăugat emfază, e deja scurtă și e singura din articol. Am scos patru antiteze „X, nu Y" din același paragraf, toate redundante cu ideea deja spusă mai sus; secțiunea rămâne cu același conținut faptic, doar afirmativ.)*

### [db:posts.body WHERE slug='ce-este-neuromarketingul' — secțiunea „## De unde începi, practic"]
**Original:** Dacă vrei să aplici ideile de bază chiar azi, fără niciun instrument:

1. **Testul celor 5 secunde.** Arată-i homepage-ul cuiva care nu îți cunoaște afacerea, timp de 5 secunde. Apoi întreabă-l ce vinzi și ce trebuia să facă pe pagină. Dacă ezită, ai o problemă de claritate, nu de estetică.
2. **Urmărește fețele.** Verifică imaginile de pe site: privirea persoanelor din fotografii ar trebui să conducă spre mesaj sau buton, nu în afara paginii.
3. **Scanează-ți propriul text.** Citește pagina doar din titluri și cuvinte îngroșate. Dacă povestea nu se înțelege așa, rescrie: exact așa o citește publicul tău.

Iar dacă vrei o analiză făcută cu instrumente și interpretare de specialitate, de la asta pornim în [consultanța de marketing](/servicii/consultanta-marketing): ne uităm la datele tale, la publicul tău și îți spunem concret ce am schimba și de ce. Despre cum arată un site construit pe principiile astea am scris pe larg în [Cum arată un site care chiar vinde](/blog/site-care-vinde).
**Propus:** Dacă vrei să aplici ideile de bază chiar azi, fără niciun instrument:

1. **Testul celor 5 secunde.** Arată-i homepage-ul cuiva care nu îți cunoaște afacerea, timp de 5 secunde. Apoi întreabă-l ce vinzi și ce trebuia să facă pe pagină. Dacă ezită, ai o problemă de claritate.
2. **Urmărește fețele.** Verifică imaginile de pe site: privirea persoanelor din fotografii ar trebui să conducă spre mesaj sau buton.
3. **Scanează-ți propriul text.** Citește pagina doar din titluri și cuvinte îngroșate. Dacă povestea nu se înțelege așa, rescrie: exact așa o citește publicul tău.

Iar dacă vrei o analiză făcută cu instrumente și interpretare de specialitate, de la asta pornim în [consultanța de marketing](/servicii/consultanta-marketing): ne uităm la datele tale, la publicul tău și îți spunem concret ce am schimba și de ce. Despre cum arată un site construit pe principiile astea am scris pe larg în [Cum arată un site care chiar vinde](/blog/site-care-vinde).

*(Am scos „nu de estetică" și „nu în afara paginii" — antiteze redundante cu ideea deja spusă în `description` a articolului. Restul secțiunii, inclusiv linkurile interne, neatins.)*

### [db:posts.body WHERE slug='ce-este-neuromarketingul' — secțiunea „## Pe scurt"]
**Original:** Neuromarketingul nu e un truc de vânzări, e o disciplină de cercetare care răspunde la o întrebare veche de când există comerțul: de ce aleg oamenii ce aleg? Când răspunsul vine din măsurători, deciziile tale de design și marketing nu mai depind de gust și noroc. Asta e toată filosofia: testăm, nu ghicim.
**Propus:** Neuromarketingul e o disciplină de cercetare care răspunde la o întrebare veche de când există comerțul: de ce aleg oamenii ce aleg? Când răspunsul vine din măsurători, deciziile tale de design și marketing se bazează pe date concrete. Asta e toată filosofia: măsurăm, apoi decidem.

*(Paragraful final avea trei antiteze „nu X" pe rând, ecou al celei deja păstrate în `description` și al „Nu e despre manipulare" din secțiunea „Problema cu «mie îmi place»". Le-am rescris afirmativ, păstrând ideea de fond a articolului: decizii bazate pe măsurători, nu pe presupuneri.)*
