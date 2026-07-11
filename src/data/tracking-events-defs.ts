/**
 * Definiții comune (izomorfe) pentru evenimentele de tracking no-code.
 * Modul PUR (fără server/DB) ca să fie importabil și de insula React (client) și
 * de helper-ul de server. Conține: tipuri, schema Zod, potrivirea pe pagini și
 * biblioteca de presets (evenimente gata făcute, activabile cu un click).
 */
import { z } from 'zod';
import { normalizePath } from './sections';

export const TRIGGER_TYPES = ['pageview', 'click', 'submit', 'scroll', 'timer'] as const;
export type TriggerType = (typeof TRIGGER_TYPES)[number];

export interface EventTrigger {
  type: TriggerType;
  /** click/submit: selector CSS pe care se prinde declanșarea. */
  selector?: string;
  /** scroll: procentul de pagină parcurs (1–100). */
  threshold?: number;
  /** timer: secunde de la încărcare. */
  seconds?: number;
}

export interface TrackingEventRule {
  id: string;
  enabled: boolean;
  /** Numele evenimentului trimis în dataLayer (litere/cifre/underscore). */
  name: string;
  /** Paginile pe care e activ: `['*']` = toate; suportă sufix `/blog/*`. */
  pages: string[];
  trigger: EventTrigger;
  /** Parametri statici atașați evenimentului. */
  params?: Record<string, string>;
  /** Categoria de consimțământ (informativ; GTM gate-uiește la nivel de tag). */
  consent?: 'analytics' | 'marketing';
}

const eventNameSchema = z
  .string()
  .trim()
  .min(1, 'Numele evenimentului e obligatoriu.')
  .max(64)
  .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, 'Doar litere, cifre și underscore (începe cu literă).');

const triggerSchema = z
  .object({
    type: z.enum(TRIGGER_TYPES),
    selector: z.string().trim().max(300).optional(),
    threshold: z.number().int().min(1).max(100).optional(),
    seconds: z.number().int().min(1).max(3600).optional(),
  })
  .superRefine((t, ctx) => {
    if ((t.type === 'click' || t.type === 'submit') && !t.selector) {
      ctx.addIssue({
        code: 'custom',
        message: 'Selectorul CSS e obligatoriu pentru click/submit.',
      });
    }
    if (t.type === 'scroll' && !t.threshold) {
      ctx.addIssue({ code: 'custom', message: 'Pragul de scroll (%) e obligatoriu.' });
    }
    if (t.type === 'timer' && !t.seconds) {
      ctx.addIssue({ code: 'custom', message: 'Numărul de secunde e obligatoriu pentru timer.' });
    }
  });

export const trackingEventRuleSchema = z.object({
  id: z.string().trim().min(1).max(64),
  enabled: z.boolean(),
  name: eventNameSchema,
  pages: z.array(z.string().trim().min(1).max(200)).min(1, 'Alege cel puțin o pagină.').max(200),
  trigger: triggerSchema,
  params: z.record(z.string().max(64), z.string().max(300)).optional(),
  consent: z.enum(['analytics', 'marketing']).optional(),
});

export const trackingEventsSchema = z.array(trackingEventRuleSchema).max(300);

/** True dacă `pages` acoperă pathname-ul dat (`*`, exact, sau prefix `/x/*`). */
export function matchPage(pages: string[], pathname: string): boolean {
  if (!pages || pages.length === 0) return false;
  const path = normalizePath(pathname);
  for (const raw of pages) {
    if (raw === '*') return true;
    const pat = normalizePath(raw);
    if (pat.endsWith('/*')) {
      const base = pat.slice(0, -2);
      if (path === base || path.startsWith(base + '/')) return true;
    } else if (path === pat) {
      return true;
    }
  }
  return false;
}

/** Rezumat scurt al unui trigger, pentru afișare în tabel. */
export function triggerSummary(t: EventTrigger): string {
  switch (t.type) {
    case 'pageview':
      return 'La deschiderea paginii';
    case 'click':
      return `Click pe ${t.selector}`;
    case 'submit':
      return `Submit pe ${t.selector}`;
    case 'scroll':
      return `Scroll ${t.threshold}%`;
    case 'timer':
      return `După ${t.seconds}s`;
    default:
      return t.type;
  }
}

/** Șablon de preset: o regulă gata făcută, fără `id`/`enabled` (se atribuie la activare). */
export interface TrackingPreset {
  key: string;
  label: string;
  description: string;
  rule: Omit<TrackingEventRule, 'id' | 'enabled'>;
}

/** Biblioteca de evenimente predefinite, activabile cu un click din admin. */
export const TRACKING_PRESETS: TrackingPreset[] = [
  {
    key: 'click_telefon',
    label: 'Click pe telefon',
    description: 'Orice link tel: apăsat (buton „Sună").',
    rule: {
      name: 'click_telefon',
      pages: ['*'],
      trigger: { type: 'click', selector: 'a[href^="tel:"]' },
      consent: 'analytics',
    },
  },
  {
    key: 'click_whatsapp',
    label: 'Click pe WhatsApp',
    description: 'Orice link wa.me / api.whatsapp.com.',
    rule: {
      name: 'click_whatsapp',
      pages: ['*'],
      trigger: { type: 'click', selector: 'a[href*="wa.me"], a[href*="api.whatsapp.com"]' },
      consent: 'analytics',
    },
  },
  {
    key: 'click_email',
    label: 'Click pe email',
    description: 'Orice link mailto: apăsat.',
    rule: {
      name: 'click_email',
      pages: ['*'],
      trigger: { type: 'click', selector: 'a[href^="mailto:"]' },
      consent: 'analytics',
    },
  },
  {
    key: 'click_cta',
    label: 'Click pe CTA',
    description: 'Butoane marcate cu atributul data-cta.',
    rule: {
      name: 'click_cta',
      pages: ['*'],
      trigger: { type: 'click', selector: '[data-cta]' },
      consent: 'analytics',
    },
  },
  {
    key: 'scroll_50',
    label: 'Scroll 50%',
    description: 'Vizitatorul a parcurs jumătate din pagină.',
    rule: {
      name: 'scroll_50',
      pages: ['*'],
      trigger: { type: 'scroll', threshold: 50 },
      consent: 'analytics',
    },
  },
  {
    key: 'scroll_90',
    label: 'Scroll 90%',
    description: 'Vizitatorul a ajuns aproape de finalul paginii.',
    rule: {
      name: 'scroll_90',
      pages: ['*'],
      trigger: { type: 'scroll', threshold: 90 },
      consent: 'analytics',
    },
  },
  {
    key: 'click_outbound',
    label: 'Click link extern',
    description: 'Linkuri absolute către alt domeniu (outbound).',
    rule: {
      name: 'click_outbound',
      pages: ['*'],
      trigger: { type: 'click', selector: 'a[href^="http"]:not([href*="simplead.ro"])' },
      consent: 'analytics',
    },
  },
  {
    key: 'download_resursa',
    label: 'Descărcare resursă',
    description: 'Linkuri către PDF sau cu atributul download.',
    rule: {
      name: 'download_resursa',
      pages: ['*'],
      trigger: { type: 'click', selector: 'a[href$=".pdf"], a[download]' },
      consent: 'analytics',
    },
  },
];
