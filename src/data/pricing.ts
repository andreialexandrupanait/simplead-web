/**
 * Conținut static pentru pagina /pachete care nu sunt pachete vandabile:
 * tarifele orare, bannerul „prima lună gratuită" și secțiunile de prețuri pentru
 * grafică, social media, consultanță și AI (preț de pornire, fără checkout).
 */
import type { ServiceIcon, ServiceKey } from './services';

export const hourlyRatesIntro =
  'Pentru lucrări mici sau în afara pachetelor lucrăm la oră, transparent — știi exact cât plătești, fără surprize la final.';

export const hourlyRates: { label: string; amount: string; period: string }[] = [
  { label: 'Web development și design', amount: '50€', period: '/oră' },
  { label: 'Grafică publicitară', amount: '35€', period: '/oră' },
  { label: 'Tracking și analytics', amount: '25€', period: '/oră' },
];

export const freeMonthBanner =
  'Prima lună de mentenanță gratuită la orice site nou construit de noi.';

/** Un card de preț dintr-o secțiune statică (grafică, social, consultanță, AI). */
export interface PricingCard {
  name: string;
  price: string;
  desc: string;
  features?: string[];
  note?: string;
}

/** O secțiune de prețuri statică de pe /pachete. */
export interface PricingSection {
  id: string;
  eyebrow: string;
  title: string;
  /** Partea din titlu evidențiată (accent electric). Trebuie să apară în `title`. */
  accent: string;
  sub: string;
  icon: ServiceIcon;
  cards: PricingCard[];
  ctaLabel: string;
  ctaHref: string;
}

/**
 * Secțiuni cu preț de pornire (fără cumpărare directă) afișate sub pachetele web
 * și mentenanță. Conținut de marketing — prețurile sunt indicative („de la").
 */
export const pricingSections: PricingSection[] = [
  {
    id: 'grafica',
    eyebrow: 'Grafică & branding',
    title: 'Identitate, vizualuri și materiale',
    accent: 'vizualuri',
    sub: 'De la identitate vizuală la materiale de promovare, tot ce te face recognoscibil.',
    icon: 'grafica',
    cards: [
      {
        name: 'Identitate vizuală completă',
        price: 'de la 700€',
        desc: 'Sistem vizual coerent construit în jurul logo-ului tău.',
        features: [
          'Brand guide complet',
          'Paletă, tipografie, elemente grafice',
          'Aplicații pe materiale: carte vizită, antet, semnătură email',
        ],
        note: 'Logo-uri nu facem. Te punem în legătură cu specialiști dedicați și construim identitatea în jurul lui.',
      },
      {
        name: 'Set materiale grafice',
        price: 'de la 175€',
        desc: '5 vizualuri pentru print sau digital: afișe, bannere, broșuri, social media.',
        features: [
          'Grafică adaptată pe canale',
          'Fișiere pentru print (CMYK) și online',
          'Validat cu heatmaps',
        ],
      },
      {
        name: 'Grafică recurentă',
        price: 'de la 150€/lună',
        desc: 'Vizualuri lunare pentru social media sau campanii, coerente cu brandul tău.',
      },
    ],
    ctaLabel: 'Cere ofertă grafică',
    ctaHref: '/contact?service=Grafica',
  },
  {
    id: 'social-media',
    eyebrow: 'Social media',
    title: 'Conținut și prezență, pe canalele potrivite',
    accent: 'prezență',
    sub: 'Strategie editorială, creație vizuală și administrare, fără să postăm de dragul de a posta.',
    icon: 'social',
    cards: [
      {
        name: 'Conținut + administrare (2 canale)',
        price: 'de la 250€/lună',
        desc: 'Calendar editorial, creație vizuală și text, publicare și răspuns la comentarii.',
        features: [
          'Strategie de conținut pe obiective',
          '8–12 postări pe lună',
          'Creație vizuală și copywriting',
          'Administrare cont și comunitate',
        ],
      },
      {
        name: 'Administrare completă (3 canale cu rapoarte)',
        price: 'de la 450€/lună',
        desc: 'Prezență pe 3 canale, conținut mai frecvent, raport lunar cu date și recomandări.',
        features: [
          'Tot ce include pachetul de bază',
          'Al 3-lea canal inclus',
          '16–20 postări pe lună',
          'Raport lunar cu metrici și optimizări',
        ],
      },
    ],
    ctaLabel: 'Discută despre social media',
    ctaHref: '/contact?service=Social+media',
  },
  {
    id: 'consultanta',
    eyebrow: 'Consultanță marketing',
    title: 'Strategie și decizii pe date',
    accent: 'decizii pe date',
    sub: 'Marketing fundamentat pe cercetare și neuromarketing, nu pe presupuneri.',
    icon: 'marketing',
    cards: [
      {
        name: 'Audit + strategie',
        price: 'de la 400€',
        desc: 'Analiză completă a situației actuale și plan concret pe obiective măsurabile.',
        features: [
          'Audit prezență digitală',
          'Cercetare public și concurență',
          'Analiză atenție vizuală prin heatmaps și expoze.app',
          'Strategie pe canale și obiective',
          'Plan de execuție prioritizat',
        ],
      },
      {
        name: 'Retainer lunar',
        price: 'de la 300€/lună',
        desc: 'Partener de marketing pe termen lung: strategie, urmărire rezultate, ajustări.',
        features: [
          'Review lunar al datelor',
          'Recomandări prioritizate',
          'Optimizare continuă',
          'Acces direct pentru întrebări punctuale',
        ],
      },
    ],
    ctaLabel: 'Solicită consultanță',
    ctaHref: '/contact?service=Consultanta+marketing',
  },
  {
    id: 'ai',
    eyebrow: 'AI pentru business',
    title: 'Automatizări care îți cumpără timp',
    accent: 'cumpără timp',
    sub: 'Munca repetitivă preluată de sistem. Tu te concentrezi pe ce contează.',
    icon: 'ai',
    cards: [
      {
        name: 'Setup automatizări',
        price: 'de la 500€',
        desc: 'Identificăm ce se repetă și construim sistemele care o fac singure.',
        features: [
          'Audit procese repetitive',
          'Construire fluxuri automate',
          'Integrare cu uneltele existente',
          'Testare și predare',
        ],
      },
      {
        name: 'Mentenanță automatizări',
        price: 'de la 75€/lună',
        desc: 'Urmărim că totul merge, prindem ce se strică, optimizăm pe parcurs.',
      },
    ],
    ctaLabel: 'Hai să discutăm despre AI',
    ctaHref: '/contact?service=AI+pentru+business',
  },
];

/**
 * Ancore de preț pentru paginile de serviciu (S4). Sursă unică: tier-urile pentru
 * grafică/social/consultanță/AI se derivă din `pricingSections` (fără drift), iar
 * web/mentenanță sunt definite explicit (acolo prețurile vin din DB pe /pachete).
 */
export interface AnchorTier {
  name: string;
  price: string;
  badge?: string;
}
export interface ServiceAnchor {
  /** Link către secțiunea relevantă din /pachete. */
  anchor: string;
  tiers: AnchorTier[];
  note?: string;
}

const psTiers = (id: string): AnchorTier[] => {
  const s = pricingSections.find((x) => x.id === id);
  return s ? s.cards.map((c) => ({ name: c.name, price: c.price })) : [];
};

export const serviceAnchors: Record<ServiceKey, ServiceAnchor> = {
  'ux-ui': {
    anchor: '/pachete#web',
    tiers: [
      { name: 'UX/UI Redesign', price: 'de la 900€' },
      { name: 'Site de prezentare', price: 'de la 1.500€', badge: 'Cel mai cerut' },
      { name: 'Magazin online', price: 'de la 2.500€' },
    ],
  },
  grafica: {
    anchor: '/pachete#grafica',
    tiers: psTiers('grafica'),
    note: 'Logo-uri nu facem — te punem în legătură cu specialiști dedicați și construim identitatea în jurul lui.',
  },
  'social-media': {
    anchor: '/pachete#social-media',
    tiers: psTiers('social-media'),
  },
  consultanta: {
    anchor: '/pachete#consultanta',
    tiers: psTiers('consultanta'),
  },
  ai: {
    anchor: '/pachete#ai',
    tiers: psTiers('ai'),
  },
  mentenanta: {
    anchor: '/pachete#mentenanta',
    tiers: [
      { name: 'Standard', price: '75€/lună' },
      { name: 'Premium', price: '120€/lună', badge: 'Recomandat' },
    ],
  },
};

export const getServiceAnchor = (key: ServiceKey): ServiceAnchor => serviceAnchors[key];
