import { and, asc, eq } from 'drizzle-orm';
import { getDb } from './db';
import { packages } from './schema';
import { fallbackPackages, type DisplayPackage } from '../../data/packages-fallback';

export type PublicPackages = { items: DisplayPackage[]; fromDb: boolean };

/** Fereastra în care oferta OTO rămâne valabilă după comanda-părinte. */
export const OTO_WINDOW_MS = 30 * 60 * 1000;

/** Pachetele active pentru pagina publică; fallback pe array-ul din cod. */
export async function getPublicPackages(): Promise<PublicPackages> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db
        .select()
        .from(packages)
        .where(and(eq(packages.active, true)))
        .orderBy(asc(packages.kind), asc(packages.sort));
      return {
        items: rows.map((row) => ({
          kind: row.kind,
          slug: row.slug,
          name: row.name,
          description: row.description,
          priceCents: row.priceCents,
          currency: row.currency.trim(),
          interval: row.interval,
          features: row.features,
          sort: row.sort,
        })),
        fromDb: true,
      };
    } catch (err) {
      console.warn('[packages] Citirea pachetelor a eșuat, folosim fallback-ul:', err);
    }
  }
  return { items: fallbackPackages, fromDb: false };
}

/** „480€" / „50 lei". Trăiește aici (nu în frontmatter .astro): compilatorul
 *  Astro parsează greșit regex-urile din template literals în frontmatter. */
export function formatAmount(cents: number, currency: string): string {
  const amount = (cents / 100).toFixed(2).replace(/\.00$/, '');
  return `${amount}${currency.trim() === 'EUR' ? '€' : ' lei'}`;
}

/** Format de afișare a prețului: „480 €" / „50 €/lună" / „[confirmă: preț]". */
export function formatPrice(pkg: DisplayPackage): string {
  if (pkg.priceCents === 0) return '[confirmă: preț]';
  const amount = (pkg.priceCents / 100).toFixed(2).replace(/\.00$/, '');
  const symbol = pkg.currency === 'EUR' ? '€' : ' lei';
  const suffix = pkg.interval === 'monthly' ? '/lună' : pkg.interval === 'yearly' ? '/an' : '';
  return `${amount}${symbol}${suffix}`;
}
