Status: draft

# Proiect: Magazin online (Echipamente-medicale.ro)

Sursă: `docker exec simplead_db psql -U simplead -d simplead -c "SELECT title,client,service,summary,challenge,solution,result,body,seo_title,seo_description FROM projects WHERE slug='magazin-online-echipamente';"` (Postgres prod, read-only), verificat contra `docs/brand-voice.md` și `docs/audit-text-v1.md`.

### [db:projects.title WHERE slug='magazin-online-echipamente']
**Original:** Magazin online
**Propus:** Magazin online (fără modificări, deja conform brand-voice)

### [db:projects.client WHERE slug='magazin-online-echipamente']
**Original:** Echipamente-medicale.ro
**Propus:** Echipamente-medicale.ro (fără modificări, deja conform brand-voice)

Notă: spre deosebire de alte 3 proiecte semnalate în audit cu clientul setat generic la „Client Simplead", aici clientul e un nume real, nu placeholder. Nu necesită corecție.

### [db:projects.service WHERE slug='magazin-online-echipamente']
**Original:** Web Design
**Propus:** Web Design (fără modificări, deja conform brand-voice)

### [db:projects.summary WHERE slug='magazin-online-echipamente']
**Original:** Magazin online clar și rapid, ușor de navigat și de cumpărat.
**Propus:** Magazin online clar și rapid, ușor de navigat și de cumpărat. (fără modificări, deja conform brand-voice)

Notă: acest câmp a fost deja editat în sesiunea curentă pentru a scoate clișeul „gândit să transforme vizitatorii în clienți" semnalat în audit. Corecția e păstrată, nu se mai atinge.

### [db:projects.challenge WHERE slug='magazin-online-echipamente']
**Original:** Un catalog complex de produse medicale, prezentat într-un mod ușor de navigat și de cumpărat.
**Propus:** Un catalog complex de produse medicale, prezentat într-un mod ușor de navigat și de cumpărat. (fără modificări, deja conform brand-voice)

### [db:projects.solution WHERE slug='magazin-online-echipamente']
**Original:** UX/UI orientat pe conversie, structură de catalog clară, optimizare pentru viteză și mobil, plus SEO de bază la lansare.
**Propus:** UX/UI orientat pe conversie, structură de catalog clară, optimizare pentru viteză și mobil, plus SEO de bază la lansare. (fără modificări, deja conform brand-voice)

### [db:projects.result WHERE slug='magazin-online-echipamente']
**Original:** Experiență de cumpărare simplificată și o prezență online profesionistă, apreciată de client. <!-- TODO: cifră reală -->
**Propus:** Experiență de cumpărare simplificată și o prezență online mai profesionistă. <!-- TODO: cifră reală -->

Notă: am scos „apreciată de client" (afirmație fără sursă/citat atașat, gen claim de agenție necuantificat) și am păstrat neatins comentariul `<!-- TODO: cifră reală -->` - nu s-a inventat nicio cifră în locul lui.

### [db:projects.body WHERE slug='magazin-online-echipamente' > secțiunea "## Provocarea"]
**Original:**
```
## Provocarea

<!-- TODO: detalii reale. -->
Clientul avea nevoie de un magazin online care să inspire încredere și să facă
procesul de achiziție simplu, pentru un public exigent.
```
**Propus:**
```
## Provocarea

<!-- TODO: detalii reale. -->
Clientul avea nevoie de un magazin online care să inspire încredere și să facă
procesul de achiziție simplu, pentru un public exigent.
```
(fără modificări, deja conform brand-voice; comentariul `<!-- TODO: detalii reale. -->` e păstrat neatins, nu s-a completat cu detalii inventate)

### [db:projects.body WHERE slug='magazin-online-echipamente' > secțiunea "## Ce am făcut" (listă)]
**Original:**
```
## Ce am făcut

- Audit și arhitectură de informație
- UX/UI design orientat pe conversie
- Implementare WooCommerce
- Optimizare viteză & mobil
- SEO de bază la lansare
```
**Propus:**
```
## Ce am făcut

- Audit și arhitectură de informație
- UX/UI design orientat pe conversie
- Implementare WooCommerce
- Optimizare viteză & mobil
- SEO de bază la lansare
```
(fără modificări, deja conform brand-voice - „am făcut" e forma corectă de auxiliar și pentru „noi", nu presupune persoana I singular)

### [db:projects.body WHERE slug='magazin-online-echipamente' > secțiunea "## Rezultatul"]
**Original:**
```
## Rezultatul

<!-- TODO: completează cu rezultate concrete. -->
Un magazin online clar și profesionist, ușor de administrat de către echipa clientului.
```
**Propus:**
```
## Rezultatul

<!-- TODO: completează cu rezultate concrete. -->
Un magazin online clar și profesionist, ușor de administrat de către echipa clientului.
```
(fără modificări, deja conform brand-voice; comentariul `<!-- TODO: completează cu rezultate concrete. -->` e păstrat neatins, nu s-a inventat niciun rezultat/cifră în locul lui)

### [db:projects.seo_title / db:projects.seo_description WHERE slug='magazin-online-echipamente']
**Original:** (ambele goale/`NULL`, nu apar ca text vizibil pe pagină, doar ca meta tags)
**Propus:** Nu se modifică în această rundă (câmpuri goale, fără text de rescris). Notă: confirmă cifra din audit-text-v1.md §Minoră - toate proiectele/articolele din DB au `seo_title`/`seo_description` goale; de completat separat, nu ține de vocea copy-ului.
