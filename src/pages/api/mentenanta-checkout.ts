import type { APIRoute } from 'astro';
import type Stripe from 'stripe';
import { and, eq } from 'drizzle-orm';
import { getDb } from '../../lib/server/db';
import { orders, packages } from '../../lib/server/schema';
import { getStripe } from '../../lib/server/stripe';
import { serverEnv } from '../../lib/server/env';
import {
  findMaintenanceAddon,
  findMaintenanceBase,
  type MaintenanceAddon,
} from '../../lib/maintenance-plans';

export const prerender = false;

/**
 * Inițiază o sesiune Stripe Checkout (abonament lunar) pentru configurația aleasă
 * din calculatorul de mentenanță: un pachet de bază + oricâte add-on-uri.
 * Prețurile se iau autoritar din `lib/maintenance-plans`, nu din formular.
 * Fără Stripe/DB configurate, degradează elegant către /contact cu selecția
 * preîncărcată în câmpul „service".
 */
export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData().catch(() => null);
  const baseSlug = String(form?.get('base') ?? '').trim();
  const base = findMaintenanceBase(baseSlug);

  // Add-on-uri valide, deduplicate, în ordinea din catalog.
  const selectedAddonSlugs = new Set((form?.getAll('addons') ?? []).map((v) => String(v).trim()));
  const addons: MaintenanceAddon[] = [...selectedAddonSlugs]
    .map((s) => findMaintenanceAddon(s))
    .filter((a): a is MaintenanceAddon => Boolean(a));

  // Rezumat lizibil pentru fallback și metadata.
  const summary = [base?.name && `Mentenanță ${base.name}`, ...addons.map((a) => a.name)]
    .filter(Boolean)
    .join(' + ');
  const fallback = () =>
    redirect(`/contact?service=${encodeURIComponent(summary || 'Mentenanță website')}`, 303);

  if (!base) return fallback();

  const db = getDb();
  const stripe = await getStripe();
  if (!db || !stripe) return fallback();

  // Un singur serviciu „Mentenanță" cu prețul total. Add-on-urile NU sunt linii
  // separate în Stripe/factură; sunt incluse în descriere (informativ) și în
  // metadata, dar se facturează ca un singur abonament.
  const amountCents = (base.price + addons.reduce((s, a) => s + a.price, 0)) * 100;
  const includeDesc = addons.length
    ? `Abonament lunar de mentenanță website. Include: ${addons.map((a) => a.name).join(', ')}.`
    : 'Abonament lunar de mentenanță website.';
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: 'eur',
        unit_amount: amountCents,
        product_data: { name: `Mentenanță website — ${base.name}`, description: includeDesc },
        recurring: { interval: 'month' },
      },
    },
  ];

  const siteUrl = serverEnv('SITE_URL') || new URL(request.url).origin;

  try {
    // Best-effort: leagă comanda de pachetul de bază din DB, dacă există.
    let basePackageId: string | null = null;
    try {
      const [pkg] = await db
        .select({ id: packages.id })
        .from(packages)
        .where(and(eq(packages.slug, base.slug), eq(packages.active, true)))
        .limit(1);
      basePackageId = pkg?.id ?? null;
    } catch {
      // tabel lipsă / DB indisponibil: continuăm fără legătură.
    }

    const [order] = await db
      .insert(orders)
      .values({ packageId: basePackageId, amountCents, currency: 'EUR' })
      .returning();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: lineItems,
      success_url: `${siteUrl}/multumim?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/mentenanta?canceled=1`,
      metadata: {
        order_id: order.id,
        base_slug: base.slug,
        addon_slugs: addons.map((a) => a.slug).join(','),
        summary,
      },
      locale: 'ro',
    });

    await db
      .update(orders)
      .set({ stripeCheckoutSessionId: session.id, updatedAt: new Date() })
      .where(eq(orders.id, order.id));

    return redirect(session.url ?? '/mentenanta', 303);
  } catch (err) {
    console.error('[mentenanta-checkout] Crearea sesiunii Stripe a eșuat:', err);
    return fallback();
  }
};
