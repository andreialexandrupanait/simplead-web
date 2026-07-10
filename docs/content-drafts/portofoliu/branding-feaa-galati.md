Status: draft

# Proiect: Campanie admitere FEAA Galați

Sursă: `docker exec simplead_db psql -U simplead -d simplead -c "SELECT title,client,service,summary,challenge,solution,result,body,seo_title,seo_description FROM projects WHERE slug='branding-feaa-galati';"` (rândul `projects` cu `slug='branding-feaa-galati'`; `seo_title`/`seo_description` sunt goale, deci nu au bloc mai jos).

### [db:projects.title WHERE slug='branding-feaa-galati']
**Original:** Campanie admitere FEAA Galați
**Propus:** Campanie admitere FEAA Galați (fără modificări, deja conform brand-voice)

Notă: „Galați" apare aici ca parte din numele real al clientului (FEAA / Universitatea „Dunărea de Jos"), nu ca poziționare proprie Simplead, deci regula „Galați doar în footer + schema" din brand-voice.md §3 nu se aplică la numele clientului.

### [db:projects.client WHERE slug='branding-feaa-galati']
**Original:** FEAA, Universitatea „Dunărea de Jos" Galați
**Propus:** FEAA, Universitatea „Dunărea de Jos" Galați (fără modificări, deja conform brand-voice)

Notă: client real, confirmat (nu e placeholder de tip „Client Simplead"), nimic de corectat.

### [db:projects.service WHERE slug='branding-feaa-galati']
**Original:** Marketing
**Propus:** Marketing (fără modificări, deja conform brand-voice)

### [db:projects.summary WHERE slug='branding-feaa-galati']
**Original:** Campanie integrată de admitere: strategie, creație și media, pentru creșterea numărului de candidați.
**Propus:** Campanie integrată de admitere: strategie, creație și media, pentru creșterea numărului de candidați. (fără modificări, deja conform brand-voice)

### [db:projects.challenge WHERE slug='branding-feaa-galati']
**Original:** Atragerea unui număr mai mare de candidați calificați într-o piață educațională competitivă, cu un buget limitat.
**Propus:** Atragerea unui număr mai mare de candidați calificați într-o piață educațională competitivă, cu un buget limitat. (fără modificări, deja conform brand-voice)

### [db:projects.solution WHERE slug='branding-feaa-galati']
**Original:** Am construit o strategie pe obiective clare, am produs creații validate cu principii de neuromarketing și am rulat campanii Meta & Google Ads, optimizate săptămânal pe baza datelor.
**Propus:** Am construit o strategie pe obiective clare, am produs creații validate cu principii de neuromarketing și am rulat campanii Meta & Google Ads, optimizate săptămânal pe baza datelor. (fără modificări, deja conform brand-voice)

Notă: cele trei acțiuni (strategie, creații, campanii) sunt concrete, nu e triada goală de tip „rapid, sigur și actualizat" interzisă în brand-voice.md §4.

### [db:projects.result WHERE slug='branding-feaa-galati']
**Original:** Creștere semnificativă a interacțiunilor și a cererilor de informații în perioada de admitere. `<!-- TODO: cifră reală -->`
**Propus:** Creștere a interacțiunilor și a cererilor de informații în perioada de admitere. [confirmă: cifră reală de creștere]

Notă: comentariul `<!-- TODO: cifră reală -->` din original arată clar că nu există încă o cifră confirmată; am scos calificativul vag „semnificativă" și am marcat explicit locul cifrei cu `[confirmă: ...]`, fără să inventez un procent sau un număr.

### [db:projects.body WHERE slug='branding-feaa-galati' → secțiunea "## Provocarea"]
**Original:**
```
## Provocarea

Facultatea avea nevoie de o campanie de admitere care să iasă în evidență și să
convertească interesul în înscrieri reale, nu doar în aprecieri pe social media.
```
**Propus:**
```
## Provocarea

Facultatea avea nevoie de o campanie de admitere care să iasă în evidență și să
convertească interesul în înscrieri reale, nu doar în aprecieri pe social media.
```
(fără modificări, deja conform brand-voice)

Notă: aceasta e singura antiteză „nu doar X, ci Y" de pe pagină, deci rămâne (max. 1 per pagină, conform brand-voice.md §4) — nu adăuga alta în restul textului. Comentariul `<!-- TODO: detaliază contextul real al proiectului. -->` din sursă (cod, nu text vizibil) semnalează că Andrei vrea context suplimentar; nu am inventat detalii care nu erau deja în DB.

### [db:projects.body WHERE slug='branding-feaa-galati' → secțiunea "## Ce am făcut" (listă)]
**Original:**
```
## Ce am făcut

- Strategie de comunicare pe obiective măsurabile
- Identitate de campanie coerentă pe toate canalele
- Creații (statice + video) validate vizual
- Campanii plătite Meta Ads & Google Ads, cu tracking de conversii
- Raportare și optimizare săptămânală
```
**Propus:**
```
## Ce am făcut

- Strategie de comunicare pe obiective măsurabile
- Identitate de campanie coerentă pe toate canalele
- Creații (statice + video) validate vizual
- Campanii plătite Meta Ads & Google Ads, cu tracking de conversii
- Raportare și optimizare săptămânală
```
(fără modificări, deja conform brand-voice)

### [db:projects.body WHERE slug='branding-feaa-galati' → secțiunea "## Rezultatul"]
**Original:**
```
## Rezultatul

O campanie unitară, măsurabilă, care a adus rezultate apreciate de echipa facultății.
```
**Propus:**
```
## Rezultatul

O campanie unitară, măsurabilă, care a adus rezultate apreciate de echipa facultății. [confirmă: rezultat concret și cifre]
```

Notă: comentariul `<!-- TODO: completează cu rezultate concrete și cifre. -->` din original confirmă că nu există încă date concrete; am păstrat fraza (nu e pe kill-list și nu inventează nimic), doar am adăugat marcajul explicit `[confirmă: ...]` cerut de brand-voice.md §3 pentru orice cifră/rezultat neconfirmat, în loc să las impresia falsă că „rezultate apreciate" e deja o dovadă măsurată.
