import { inArray } from 'drizzle-orm';
import { getDb } from './db';
import { settings } from './schema';
import { site } from '@data/site';
import {
  HOME_SECTIONS,
  TOGGLEABLE_PAGES,
  SECTION_KEYS,
  PAGE_PATHS,
  normalizePath,
} from '@data/sections';

export { HOME_SECTIONS, TOGGLEABLE_PAGES, normalizePath };

/**
 * Setări publice editabile din /admin/setari (peste tabela `settings`, separat
 * de integrările-secret din settings.ts). Cache scurt in-memory; default-uri
 * sigure: telefonul e ASCUNS până când Andrei îl activează din admin.
 *
 * Fără DATABASE_URL / la eroare nu aruncă niciodată — întoarce default-urile.
 */

/** ID-uri de tracking (publice — apar în sursa paginii). Gol = dezactivat. */
export interface TrackingSettings {
  gtmId: string; // GTM-XXXXXX
  ga4Id: string; // G-XXXXXXXXXX
  clarityId: string; // Microsoft Clarity
  metaPixelId: string; // Meta/Facebook Pixel (doar cifre)
  tiktokPixelId: string; // TikTok Pixel
  gscVerification: string; // Google Search Console: content-ul meta-tagului
}

export interface PublicSettings {
  showPhone: boolean;
  whatsappNumber: string; // doar cifre (E.164 fără +), '' = neconfigurat
  hiddenHomeSections: string[]; // cheile secțiunilor de homepage ascunse
  constructionPages: string[]; // căile paginilor marcate „în construcție"
  maintenanceMode: boolean; // tot site-ul în mentenanță (vizitatorii văd 503)
  tracking: TrackingSettings;
}

const KEYS = {
  showPhone: 'site.show_phone',
  whatsappNumber: 'site.whatsapp_number',
  hiddenHomeSections: 'site.hidden_home_sections',
  constructionPages: 'site.construction_pages',
  maintenanceMode: 'site.maintenance_mode',
  gtmId: 'site.gtm_id',
  ga4Id: 'site.ga4_id',
  clarityId: 'site.clarity_id',
  metaPixelId: 'site.meta_pixel_id',
  tiktokPixelId: 'site.tiktok_pixel_id',
  gscVerification: 'site.gsc_verification',
} as const;

const EMPTY_TRACKING: TrackingSettings = {
  gtmId: '',
  ga4Id: '',
  clarityId: '',
  metaPixelId: '',
  tiktokPixelId: '',
  gscVerification: '',
};

const DEFAULTS: PublicSettings = {
  showPhone: false,
  whatsappNumber: '',
  // Implicit: „Studii de caz" e ascunsă până e gata. „Ce spun clienții" e activă.
  hiddenHomeSections: ['case-studies'],
  constructionPages: [],
  maintenanceMode: false,
  tracking: { ...EMPTY_TRACKING },
};

const TTL_MS = 60_000;
let cache: { at: number; value: PublicSettings } | null = null;

export function bustPublicSettingsCache(): void {
  cache = null;
}

/** Parsează un JSON-array de string-uri din DB, păstrând doar valorile permise. */
function parseList(raw: string | undefined, allowed: string[]): string[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    if (!Array.isArray(v)) return [];
    return v.filter((x): x is string => typeof x === 'string' && allowed.includes(x));
  } catch {
    return [];
  }
}

export async function getPublicSettings(): Promise<PublicSettings> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.value;

  const value: PublicSettings = {
    ...DEFAULTS,
    hiddenHomeSections: [...DEFAULTS.hiddenHomeSections],
    constructionPages: [...DEFAULTS.constructionPages],
    tracking: { ...EMPTY_TRACKING },
  };
  const db = getDb();
  if (db) {
    try {
      const rows = await db
        .select()
        .from(settings)
        .where(inArray(settings.key, Object.values(KEYS)));
      const map = new Map(rows.map((r) => [r.key, r.value]));
      value.showPhone = map.get(KEYS.showPhone) === 'true';
      value.whatsappNumber = (map.get(KEYS.whatsappNumber) ?? '').replace(/[^\d]/g, '');
      value.maintenanceMode = map.get(KEYS.maintenanceMode) === 'true';
      // Cheie prezentă = setare salvată din admin (poate fi listă goală).
      // Cheie absentă = niciodată salvată → folosim default-ul.
      if (map.has(KEYS.hiddenHomeSections)) {
        value.hiddenHomeSections = parseList(map.get(KEYS.hiddenHomeSections), SECTION_KEYS);
      }
      value.constructionPages = parseList(map.get(KEYS.constructionPages), PAGE_PATHS);
      value.tracking = {
        gtmId: (map.get(KEYS.gtmId) ?? '').trim(),
        ga4Id: (map.get(KEYS.ga4Id) ?? '').trim(),
        clarityId: (map.get(KEYS.clarityId) ?? '').trim(),
        metaPixelId: (map.get(KEYS.metaPixelId) ?? '').trim(),
        tiktokPixelId: (map.get(KEYS.tiktokPixelId) ?? '').trim(),
        gscVerification: (map.get(KEYS.gscVerification) ?? '').trim(),
      };
    } catch (err) {
      console.warn('[public-settings] Citirea a eșuat, folosim default-uri:', err);
    }
  }
  cache = { at: Date.now(), value };
  return value;
}

export type SavePublicResult = { ok: true } | { ok: false; error: string };

export async function savePublicSettings(input: {
  showPhone: boolean;
  whatsappNumber: string;
  hiddenHomeSections: string[];
  constructionPages: string[];
  maintenanceMode: boolean;
}): Promise<SavePublicResult> {
  const db = getDb();
  if (!db) {
    return { ok: false, error: 'Baza de date nu e configurată (DATABASE_URL lipsește).' };
  }
  const hidden = input.hiddenHomeSections.filter((s) => SECTION_KEYS.includes(s));
  const construction = input.constructionPages.filter((p) => PAGE_PATHS.includes(p));
  const pairs: { key: string; value: string }[] = [
    { key: KEYS.showPhone, value: input.showPhone ? 'true' : 'false' },
    { key: KEYS.whatsappNumber, value: input.whatsappNumber.replace(/[^\d]/g, '') },
    { key: KEYS.hiddenHomeSections, value: JSON.stringify(hidden) },
    { key: KEYS.constructionPages, value: JSON.stringify(construction) },
    { key: KEYS.maintenanceMode, value: input.maintenanceMode ? 'true' : 'false' },
  ];
  try {
    for (const p of pairs) {
      await db
        .insert(settings)
        .values({ key: p.key, value: p.value, encrypted: false })
        .onConflictDoUpdate({
          target: settings.key,
          set: { value: p.value, encrypted: false, updatedAt: new Date() },
        });
    }
    bustPublicSettingsCache();
    return { ok: true };
  } catch (err) {
    console.error('[public-settings] Salvarea a eșuat:', err);
    return { ok: false, error: 'Salvarea în baza de date a eșuat. Verifică conexiunea.' };
  }
}

/** Salvează ID-urile de tracking (non-secret) din /admin/tracking. */
export async function saveTrackingSettings(input: TrackingSettings): Promise<SavePublicResult> {
  const db = getDb();
  if (!db) {
    return { ok: false, error: 'Baza de date nu e configurată (DATABASE_URL lipsește).' };
  }
  const pairs: { key: string; value: string }[] = [
    { key: KEYS.gtmId, value: input.gtmId.trim() },
    { key: KEYS.ga4Id, value: input.ga4Id.trim() },
    { key: KEYS.clarityId, value: input.clarityId.trim() },
    { key: KEYS.metaPixelId, value: input.metaPixelId.trim() },
    { key: KEYS.tiktokPixelId, value: input.tiktokPixelId.trim() },
    { key: KEYS.gscVerification, value: input.gscVerification.trim() },
  ];
  try {
    for (const p of pairs) {
      await db
        .insert(settings)
        .values({ key: p.key, value: p.value, encrypted: false })
        .onConflictDoUpdate({
          target: settings.key,
          set: { value: p.value, encrypted: false, updatedAt: new Date() },
        });
    }
    bustPublicSettingsCache();
    return { ok: true };
  } catch (err) {
    console.error('[public-settings] Salvarea tracking-ului a eșuat:', err);
    return { ok: false, error: 'Salvarea în baza de date a eșuat. Verifică conexiunea.' };
  }
}

/** Link wa.me din numărul configurat (gol dacă nu e setat). */
export function whatsappHref(num: string, text?: string): string {
  const digits = (num ?? '').replace(/[^\d]/g, '');
  if (!digits) return '';
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

export type DirectContact =
  | { kind: 'phone'; href: string; label: string; sub: string }
  | { kind: 'whatsapp'; href: string; label: string; sub: string }
  | null;

/**
 * Butonul de contact direct din heroes/CTA: telefon dacă e activat; altfel
 * WhatsApp dacă e configurat; altfel nimic (componenta nu randează butonul).
 */
export function getDirectContact(pub: PublicSettings): DirectContact {
  if (pub.showPhone) {
    return {
      kind: 'phone',
      href: site.contact.phoneHref,
      label: site.contact.phone,
      sub: 'Sună-ne acum',
    };
  }
  if (pub.whatsappNumber) {
    return {
      kind: 'whatsapp',
      href: whatsappHref(pub.whatsappNumber),
      label: 'Scrie pe WhatsApp',
      sub: 'Răspundem rapid',
    };
  }
  return null;
}
