import type { APIRoute } from 'astro';
import { and, eq } from 'drizzle-orm';
import { getDb } from '../../lib/server/db';
import { orders, packages } from '../../lib/server/schema';
import { getStripe } from '../../lib/server/stripe';
import { serverEnv } from '../../lib/server/env';
import { OTO_WINDOW_MS } from '../../lib/server/packages';

export const prerender = false;

/**
 * Inițiază o sesiune Stripe Checkout pentru un pachet (formular HTML de pe
 * /pachete sau /multumim). Fără Stripe sau DB configurate, degradează elegant:
 * redirect către /contact cu serviciul preselectat.
 */
export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData().catch(() => null);
  const slug = String(form?.get('slug') ?? '').trim();
  const otoForOrderId = String(form?.get('oto_for') ?? '').trim();
  if (!slug) return redirect('/pachete', 303);

  const fallback = () => redirect(`/contact?service=${encodeURIComponent(slug)}`, 303);

  const db = getDb();
  const stripe = await getStripe();
  if (!db || !stripe) return fallback();

  let pkg: typeof packages.$inferSelect | undefined;
  try {
    [pkg] = await db
      .select()
      .from(packages)
      .where(and(eq(packages.slug, slug), eq(packages.active, true)))
      .limit(1);
  } catch (err) {
    console.warn('[checkout] Citirea pachetului a eșuat:', err);
    return fallback();
  }
  // Pachetele fără preț confirmat nu se pot cumpăra direct.
  if (!pkg || pkg.priceCents <= 0) return fallback();

  // Validare OTO: comanda-părinte există, e plătită, oferta corespunde,
  // fereastra nu a expirat și nu a fost deja consumată.
  let amountCents = pkg.priceCents;
  let validatedOtoFor: string | null = null;
  if (otoForOrderId) {
    try {
      const [parent] = await db.select().from(orders).where(eq(orders.id, otoForOrderId)).limit(1);
      const [parentPkg] = parent?.packageId
        ? await db.select().from(packages).where(eq(packages.id, parent.packageId)).limit(1)
        : [];
      // Consumată = comandă OTO plătită; sesiunile abandonate nu blochează oferta.
      const [consumed] = await db
        .select({ id: orders.id })
        .from(orders)
        .where(and(eq(orders.otoForOrderId, otoForOrderId), eq(orders.status, 'paid')))
        .limit(1);

      const isValid =
        parent &&
        parent.status === 'paid' &&
        parentPkg?.otoPackageId === pkg.id &&
        pkg.interval === 'one_time' &&
        !consumed &&
        Date.now() - parent.createdAt.getTime() < OTO_WINDOW_MS;

      if (isValid) {
        const discount = Math.min(Math.max(parentPkg.otoDiscountPercent, 0), 90);
        amountCents = Math.round((pkg.priceCents * (100 - discount)) / 100);
        validatedOtoFor = otoForOrderId;
      }
      // OTO invalid/expirat: continuăm ca achiziție normală, la preț întreg.
    } catch (err) {
      console.warn('[checkout] Validarea OTO a eșuat, continuăm la preț întreg:', err);
    }
  }

  const siteUrl = serverEnv('SITE_URL') || new URL(request.url).origin;
  const currency = pkg.currency.trim().toLowerCase();
  const isSubscription = pkg.interval !== 'one_time';

  try {
    // Comanda pending, legată de sesiune după creare.
    const [order] = await db
      .insert(orders)
      .values({
        packageId: pkg.id,
        amountCents,
        currency: pkg.currency,
        otoForOrderId: validatedOtoFor,
      })
      .returning();

    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? 'subscription' : 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: amountCents,
            product_data: { name: pkg.name, description: pkg.description || undefined },
            ...(isSubscription
              ? { recurring: { interval: pkg.interval === 'monthly' ? 'month' : 'year' } }
              : {}),
          },
        },
      ],
      success_url: `${siteUrl}/multumim?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pachete?canceled=1`,
      metadata: { order_id: order.id, package_slug: pkg.slug },
      locale: 'ro',
    });

    await db
      .update(orders)
      .set({ stripeCheckoutSessionId: session.id, updatedAt: new Date() })
      .where(eq(orders.id, order.id));

    return redirect(session.url ?? '/pachete', 303);
  } catch (err) {
    console.error('[checkout] Crearea sesiunii Stripe a eșuat:', err);
    return fallback();
  }
};
