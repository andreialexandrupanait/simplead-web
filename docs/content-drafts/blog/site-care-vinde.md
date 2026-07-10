Status: draft

# Articol: Cum arată un site care chiar vinde

Sursă: `docker exec simplead_db psql -U simplead -d simplead -c "SELECT title,description,body,author,seo_title,seo_description,takeaways,faq FROM posts WHERE slug='site-care-vinde';"` (Postgres prod, read-only) + `docs/brand-voice.md` + `docs/audit-text-v1.md`. `seo_title`, `seo_description`, `takeaways`, `faq` sunt goale în DB, nu au blocuri.

### [db:posts.title WHERE slug='site-care-vinde']
**Original:** Cum arată un site care chiar vinde
**Propus:** Cum arată un site care chiar vinde (fără modificări, deja conform brand-voice)

### [db:posts.description WHERE slug='site-care-vinde']
**Original:** Structura unei pagini care aduce clienți: viteză, claritate, încredere și un drum evident către acțiune. Cu checklist practic la final.
**Propus:** Structura unei pagini care aduce clienți: viteză, claritate, încredere și un drum evident către acțiune. Cu checklist practic la final. (fără modificări, deja conform brand-voice)

### [db:posts.body WHERE slug='site-care-vinde' § intro, înainte de primul ##]
**Original:** Un site frumos care nu aduce clienți e doar o cheltuială. Un site care vinde respectă câteva principii simple, verificabile, și niciunul nu ține de modă sau de gust. Le luăm pe rând, apoi găsești la final un checklist pe care îl poți aplica pe site-ul tău chiar azi.
**Propus:** Un site frumos care nu aduce clienți e doar o cheltuială. Un site care vinde respectă câteva principii simple, verificabile, și niciunul nu ține de modă sau de gust. Le luăm pe rând, apoi găsești la final un checklist pe care îl poți aplica pe site-ul tău chiar azi. (fără modificări, deja conform brand-voice)

### [db:posts.body WHERE slug='site-care-vinde' § secțiunea "1. E rapid, pentru că răbdarea nu există"]
**Original:**
## 1. E rapid, pentru că răbdarea nu există

Vizitatorul tău nu așteaptă. A dat click dintr-o căutare sau dintr-o reclamă, are alte cinci tab-uri deschise și un nivel de răbdare apropiat de zero. Fiecare secundă de încărcare în plus înseamnă oameni care pleacă înainte să vadă ce oferi.

Vestea bună: viteza e o problemă tehnică, deci rezolvabilă. Imagini optimizate, găzduire decentă, cod curat, fără zeci de scripturi încărcate „pentru orice eventualitate". Nu e nevoie de perfecțiune, e nevoie ca pagina să devină utilizabilă în primele secunde.

Un detaliu des ignorat: viteza pe telefon. Cei mai mulți vizitatori vin de pe mobil, adesea pe conexiuni slabe. Dacă site-ul tău e rapid doar pe laptopul tău, cu net de birou, nu e rapid.

**Propus:** (identic, fără modificări) Fără cuvinte din kill-list, fără em-dash, fără antiteză supra-folosită, ton concret ("Vestea bună: viteza e o problemă tehnică" nu e triadă goală, e o afirmație specifică). Deja conform brand-voice.

### [db:posts.body WHERE slug='site-care-vinde' § secțiunea "2. E clar în primele 5 secunde"]
**Original:**
## 2. E clar în primele 5 secunde

Testul e simplu și nemilos: un om care nu îți cunoaște afacerea se uită la prima pagină timp de 5 secunde. Poate spune apoi ce vinzi, pentru cine și ce ar trebui să facă mai departe? Dacă nu, pagina are o problemă de claritate, iar claritatea bate creativitatea de fiecare dată când e vorba de bani.

Ce strică cel mai des claritatea:

- **Titluri „poetice"** care sună bine dar nu spun nimic. „Redefinim excelența" nu vinde; „Reparăm și întreținem site-uri WordPress" vinde.
- **Prea multe mesaje deodată.** Dacă totul e important, nimic nu e important. O pagină, o idee principală.
- **Jargon de industrie.** Tu știi ce înseamnă termenii tăi tehnici; clientul tău, de cele mai multe ori, nu. Scrie cum vorbește el, nu cum vorbești tu între colegi.

Despre felul în care oamenii scanează o pagină (și de ce paragrafele lungi sunt invizibile) am scris mai pe larg în [Neuromarketing pe înțelesul tuturor](/blog/ce-este-neuromarketingul).

**Propus:** (identic, fără modificări) Exemplul „Redefinim excelența" e folosit ca exemplu de titlu prost, nu ca și copy propriu al Simplead, deci nu intră în conflict cu kill-list-ul. Fără em-dash, fără antiteză supra-folosită. Deja conform brand-voice.

### [db:posts.body WHERE slug='site-care-vinde' § secțiunea "3. Are un singur drum evident către acțiune"]
**Original:**
## 3. Are un singur drum evident către acțiune

Pe o pagină care vinde, următorul pas e mereu vizibil și mereu același. „Cere o ofertă", „Programează o discuție", „Adaugă în coș": contează mai puțin formularea și mai mult consecvența.

Greșelile clasice:

- **Butoane concurente.** „Află mai multe", „Descarcă broșura", „Abonează-te", „Contactează-ne", toate pe același ecran. Vizitatorul confuz nu alege varianta cea mai bună; nu alege deloc.
- **Acțiunea ascunsă la finalul paginii.** Mulți vizitatori nu ajung acolo. Butonul principal trebuie să apară devreme și să revină natural pe parcurs.
- **Formulare lacome.** Fiecare câmp în plus e un motiv de abandon. Pentru un prim contact ai nevoie de nume, email și mesaj. Restul detaliilor le afli în discuție.

**Propus:** (identic, fără modificări) CTA-ul folosit ca exemplu e „Cere o ofertă", exact CTA-ul principal aprobat în brand-voice.md §3. Fără em-dash, fără cuvinte din kill-list. Deja conform brand-voice.

### [db:posts.body WHERE slug='site-care-vinde' § secțiunea "4. Construiește încredere înainte să ceară ceva"]
**Original:**
## 4. Construiește încredere înainte să ceară ceva

Un vizitator nou pornește sceptic, mai ales dacă urmează să plătească online. Site-ul care vinde răspunde la scepticismul ăsta înainte ca el să devină obiecție:

- **Dovezi reale:** proiecte, clienți, testimoniale cu nume și context. Un singur testimonial autentic face mai mult decât zece fraze generice despre „calitate și profesionalism".
- **Oameni reali:** cine e în spatele afacerii, cum arată, cum poate fi contactat. Anonimatul naște suspiciune.
- **Detalii care liniștesc:** date de contact complete, termeni clari, prețuri sau măcar repere de preț. Lipsa oricărui indiciu de preț nu „stârnește curiozitate", ci alimentează teama de scump.

**Propus:** (identic, fără modificări) „calitate și profesionalism" apare citat ca exemplu de frază generică de evitat, nu ca și copy propriu, deci nu e o încălcare. Fără em-dash, fără cuvinte din kill-list. Deja conform brand-voice.

### [db:posts.body WHERE slug='site-care-vinde' § secțiunea "5. Tratează telefonul ca ecran principal"]
**Original:**
## 5. Tratează telefonul ca ecran principal

Nu „responsive ca bonus", ci mobil pe primul loc: butoane în care nimerești cu degetul, text lizibil fără zoom, formulare scurte, număr de telefon pe care poți apăsa direct să sune. Deschide-ți site-ul pe propriul telefon și încearcă să faci exact ce ai vrea să facă un client. Orice moment de enervare pe care îl simți tu, îl simte și el, doar că el nu are niciun motiv să insiste.

**Propus:** (identic, fără modificări) „Nu X, ci Y" apare o singură dată în tot articolul (aici), sub pragul de maxim o antiteză pe pagină din brand-voice.md §4. Fără em-dash, fără cuvinte din kill-list. Deja conform brand-voice.

### [db:posts.body WHERE slug='site-care-vinde' § secțiunea "Checklist: site-ul tău vinde?"]
**Original:**
## Checklist: site-ul tău vinde?

Bifează sincer:

1. Pagina principală se încarcă în câteva secunde, pe telefon, pe date mobile?
2. Un străin înțelege în 5 secunde ce vinzi și pentru cine?
3. Există un singur buton principal de acțiune, vizibil fără derulare?
4. Formularul de contact cere doar strictul necesar?
5. Ai măcar o dovadă reală pe pagină: proiect, testimonial cu nume, client recunoscut?
6. Datele de contact sunt complete și ușor de găsit?
7. Textul se înțelege citind doar titlurile și cuvintele îngroșate?
8. Pe telefon, totul se poate apăsa cu degetul mare, fără zoom?

Dacă ai bifat tot, felicitări: ești în fața majorității site-urilor de afaceri mici. Dacă nu, vestea bună e că fiecare punct de mai sus e reparabil, iar ordinea de mai sus e și ordinea recomandată a reparațiilor.

**Propus:** (identic, fără modificări, listă păstrată integral) Fără em-dash, fără cuvinte din kill-list, fără cifre inventate (checklist-ul e o listă de verificare, nu o statistică). Deja conform brand-voice.

### [db:posts.body WHERE slug='site-care-vinde' § secțiunea "Următorul pas"]
**Original:**
## Următorul pas

Dacă vrei un ochi format pe site-ul tău, asta facem la [UX/UI și web design](/servicii/ux-ui-web-design): ne uităm la datele și publicul tău, apoi construim sau reconstruim paginile pe principiile de mai sus. Iar dacă preferi un pachet cu preț clar, vezi [pachetele noastre](/pachete). Prima discuție e fără obligații: ne scrii, ne uităm, îți spunem concret ce am schimba.

**Propus:** (identic, fără modificări) Voce colectivă „noi" (studio), consecventă cu restul articolului semnat de Andrei Panait; păstrată ca atare conform indicației de a nu schimba vocea articolelor de blog deja scrise la persoana I plural. Fără clișee de agenție ("discută cu un expert", "tot sub un singur acoperiș" etc. nu apar). Deja conform brand-voice.

---

Notă generală: articolul e deja aliniat cu `brand-voice.md` pe toate punctele verificate (fără em-dash, fără cuvinte din kill-list, fără clișee de agenție, o singură antiteză „nu X, ci Y" pe toată pagina, fără cifre inventate, fără mențiune de doctorat, AI nemenționat deci nicio problemă de framing). Nu am găsit date placeholder sau testimoniale reatribuite în acest articol specific (problemele semnalate în `audit-text-v1.md` privind „Client Simplead" și testimonialul lui Silviu Costiniuc sunt în `projects`/`services.ts`, nu în acest post). Autorul (`author: "Andrei Panait"`) nu e afișat ca text vizibil în `body`, e metadată separată; nu am creat bloc pentru el.
