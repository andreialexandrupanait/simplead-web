import { inArray } from 'drizzle-orm';
import { getDb } from './db';
import { settings } from './schema';
import { site } from '@data/site';

/**
 * Setări publice editabile din /admin/setari (peste tabela `settings`, separat
 * de integrările-secret din settings.ts). Cache scurt in-memory; default-uri
 * sigure: telefonul e ASCUNS până când Andrei îl activează din admin.
 *
 * Fără DATABASE_URL / la eroare nu aruncă niciodată — întoarce default-urile.
 */

export interface PublicSettings {
  showPhone: boolean;
  whatsappNumber: string; // doar cifre (E.164 fără +), '' = neconfigurat
}

const KEYS = {
  showPhone: 'site.show_phone',
  whatsappNumber: 'site.whatsapp_number',
} as const;

const DEFAULTS: PublicSettings = { showPhone: false, whatsappNumber: '' };

const TTL_MS = 60_000;
let cache: { at: number; value: PublicSettings } | null = null;

export function bustPublicSettingsCache(): void {
  cache = null;
}

export async function getPublicSettings(): Promise<PublicSettings> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.value;

  const value: PublicSettings = { ...DEFAULTS };
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
}): Promise<SavePublicResult> {
  const db = getDb();
  if (!db) {
    return { ok: false, error: 'Baza de date nu e configurată (DATABASE_URL lipsește).' };
  }
  const pairs: { key: string; value: string }[] = [
    { key: KEYS.showPhone, value: input.showPhone ? 'true' : 'false' },
    { key: KEYS.whatsappNumber, value: input.whatsappNumber.replace(/[^\d]/g, '') },
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
