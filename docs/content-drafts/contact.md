Status: draft

# Contact

Sursă: `src/pages/contact.astro` citit integral. Blocurile de mai jos acoperă textul propriu paginii (title/meta, header, secțiunea CTA de programare). Componenta `<ContactSection variant="page" />` (formularul + datele de contact) este importată în pagină dar conținutul ei nu a fost citit în această rundă, conform scope-ului dat pentru această unitate (doar `contact.astro`). Am sărit peste breadcrumb-ul de navigare (`crumb`: „Acasă" / „Contact") ca element de UI/navigare, nu copy de pagină.

### [src/pages/contact.astro > BaseLayout title prop]
**Original:** Contact
**Propus:** Contact (fără modificări, deja conform brand-voice)

### [src/pages/contact.astro > BaseLayout description prop (meta description)]
**Original:** Hai să discutăm despre proiectul tău. Spune-ne pe scurt ce ai nevoie și revenim rapid. Prima discuție e fără obligații.
**Propus:** Hai să discutăm despre proiectul tău. Spune-ne pe scurt ce ai nevoie și revenim în 24 de ore lucrătoare. Prima discuție e fără obligații.

Notă: „revenim rapid" e vag și inconsistent cu subtitlul de imediat mai jos de pe aceeași pagină, care promite explicit „24 de ore lucrătoare" (valoare reală, din `site.ts` → `contact.responseTime`). Am aliniat la cifra deja confirmată în cod, nu am inventat un număr nou.

### [src/pages/contact.astro > PageHeader eyebrow prop]
**Original:** Contact
**Propus:** Contact (fără modificări, deja conform brand-voice)

### [src/pages/contact.astro > PageHeader title/accent props]
**Original:** Hai să discutăm despre proiectul tău
**Propus:** Hai să discutăm despre proiectul tău (fără modificări, deja conform brand-voice)

### [src/pages/contact.astro > PageHeader subtitle prop]
**Original:** Spune-ne pe scurt ce ai nevoie și revenim în 24 de ore lucrătoare. Prima discuție e fără obligații.
**Propus:** Spune-ne pe scurt ce ai nevoie și revenim în 24 de ore lucrătoare. Prima discuție e fără obligații. (fără modificări, deja conform brand-voice)

### [src/pages/contact.astro > secțiunea calLink, h2]
**Original:** Preferi o discuție directă?
**Propus:** Preferi o discuție directă? (fără modificări, deja conform brand-voice)

### [src/pages/contact.astro > secțiunea calLink, paragraf]
**Original:** Programează o întâlnire la un moment care ți se potrivește.
**Propus:** Programează o întâlnire la un moment care ți se potrivește. (fără modificări, deja conform brand-voice)

### [src/pages/contact.astro > secțiunea calLink, CTA link]
**Original:** Programează o întâlnire
**Propus:** Programează o întâlnire (fără modificări, deja conform brand-voice)
