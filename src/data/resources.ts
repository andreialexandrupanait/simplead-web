/**
 * Resursele de pe /resurse: produse digitale și lead magnets. Cele marcate
 * `[confirmă]` sunt drafturi — Andrei decide titlurile, prețurile și
 * conținutul final. Resursele `gated` cer email (se salvează ca abonat cu
 * sursa `resurse:{slug}`), cele `paid` vor avea checkout când există fișierul.
 */
export interface Resource {
  slug: string;
  title: string;
  description: string;
  kind: 'ghid' | 'checklist' | 'audit';
  /** `gated` = gratuit contra email; `paid` = produs digital plătit. */
  access: 'gated' | 'paid';
  /** Disponibilitate: resursele `coming-soon` colectează interesul. */
  status: 'available' | 'coming-soon';
  priceLabel?: string;
}

export const resources: Resource[] = [
  {
    slug: 'audit-neuromarketing',
    title: 'Audit neuromarketing al site-ului tău',
    description:
      'Analiză predictivă de tip eye-tracking pe paginile tale cheie + raport cu heatmaps și recomandări concrete, interpretate de un doctor în marketing. [confirmă: preț + livrabile finale]',
    kind: 'audit',
    access: 'paid',
    status: 'coming-soon',
    priceLabel: '[confirmă: preț]',
  },
  {
    slug: 'ghid-site-care-vinde',
    title: 'Ghid: site-ul care vinde',
    description:
      'Checklist-ul nostru de conversie: ce trebuie să aibă un site ca să-i facă pe oameni să cumpere, explicat fără jargon. [confirmă: conținutul final]',
    kind: 'ghid',
    access: 'gated',
    status: 'coming-soon',
  },
  {
    slug: 'checklist-mentenanta',
    title: 'Checklist: mentenanța lunară a site-ului',
    description:
      'Lista exactă de verificări lunare ca site-ul să rămână rapid și sigur, fără surprize, aceeași pe care o folosim pentru clienții noștri. [confirmă: conținutul final]',
    kind: 'checklist',
    access: 'gated',
    status: 'coming-soon',
  },
];
