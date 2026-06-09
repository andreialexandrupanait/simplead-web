import type { APIRoute } from 'astro';
import type Stripe from 'stripe';
import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/server/db';
import { customers, orders, packages } from '../../../lib/server/schema';
import { getStripe, getStripeWebhookSecret } from '../../../lib/server/stripe';
import { sendEmail } from '../../../lib/server/email';
import { notifySlack } from '../../../lib/server/slack';
import { issueInvoice } from '../../../lib/server/smartbill';
import { serverEnv } from '../../../lib/server/env';
import { site } from '../../../data/site';

export const prerender = false;

/**
 * Webhook Stripe: confirmă comenzile după plată.
 * Configurare în Stripe Dashboard: endpoint `https://domeniu/api/stripe/webhook`,
 * eveniment `checkout.session.completed`; secretul whsec_... se salvează în
 * /admin/integrari (câmpul „Webhook secret").
 */
export const POST: APIRoute = async ({ request }) => {
  const stripe = await getStripe();
  const webhookSecret = await getStripeWebhookSecret();
  if (!stripe || !webhookSecret) {
    return new Response('Stripe webhook neconfigurat.', { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) return new Response('Semnătură lipsă.', { status: 400 });

  let event: Stripe.Event;
  try {
    const rawBody = await request.text();
    event = await stripe.webhooks.constructEventAsync(rawBody, signature, webhookSecret);
  } catch (err) {
    console.warn('[stripe-webhook] Semnătură invalidă:', err);
    return new Response('Semnătură invalidă.', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    try {
      await handleCheckoutCompleted(event.data.object);
    } catch (err) {
      // Logăm dar răspundem 200: Stripe ar retrimite la nesfârșit altfel,
      // iar comanda poate fi reconciliată manual din admin.
      console.error('[stripe-webhook] Procesarea comenzii a eșuat:', err);
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  const db = getDb();
  if (!db) {
    console.error('[stripe-webhook] Fără DB: comanda nu poate fi înregistrată.', session.id);
    return;
  }

  const orderId = session.metadata?.order_id;
  const email = session.customer_details?.email ?? '';
  const name = session.customer_details?.name ?? '';

  let [order] = orderId
    ? await db.select().from(orders).where(eq(orders.id, orderId)).limit(1)
    : await db.select().from(orders).where(eq(orders.stripeCheckoutSessionId, session.id)).limit(1);
  if (!order) {
    console.error('[stripe-webhook] Comanda nu a fost găsită pentru sesiunea', session.id);
    return;
  }
  // Idempotență: Stripe poate retrimite evenimentul.
  if (order.status === 'paid') return;

  // Client: upsert după email.
  let customerId: string | null = null;
  if (email) {
    const [customer] = await db
      .insert(customers)
      .values({
        email,
        name: name || null,
        stripeCustomerId: typeof session.customer === 'string' ? session.customer : null,
      })
      .onConflictDoUpdate({
        target: customers.email,
        set: {
          name: name || undefined,
          stripeCustomerId: typeof session.customer === 'string' ? session.customer : undefined,
        },
      })
      .returning();
    customerId = customer.id;
  }

  [order] = await db
    .update(orders)
    .set({
      status: 'paid',
      customerId,
      customerEmail: email || null,
      stripePaymentIntentId:
        typeof session.payment_intent === 'string' ? session.payment_intent : null,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, order.id))
    .returning();

  const [pkg] = order.packageId
    ? await db.select().from(packages).where(eq(packages.id, order.packageId)).limit(1)
    : [];
  const packageName = pkg?.name ?? 'Pachet Simplead';
  const amount = (order.amountCents / 100).toFixed(2).replace(/\.00$/, '');
  const currency = order.currency.trim();

  // Factură SmartBill (best-effort; numărul se salvează pe comandă).
  if (email) {
    const invoice = await issueInvoice({
      clientName: name,
      clientEmail: email,
      productName: packageName,
      amount: order.amountCents / 100,
      currency,
    });
    if (invoice.issued) {
      await db
        .update(orders)
        .set({ invoiceSeries: invoice.series, invoiceNumber: invoice.number })
        .where(eq(orders.id, order.id));
    } else {
      console.warn('[stripe-webhook] Factura nu a fost emisă:', invoice.reason);
    }
  }

  // Confirmare către client.
  if (email) {
    await sendEmail({
      to: email,
      replyTo: site.contact.email,
      subject: `Confirmare comandă Simplead: ${packageName}`,
      text: [
        `Salut${name ? ` ${name}` : ''},`,
        '',
        `Îți mulțumim pentru comandă. Am primit plata pentru „${packageName}" (${amount} ${currency}).`,
        'Te contactăm în cel mult o zi lucrătoare cu pașii următori.',
        '',
        `Întrebări? Scrie-ne la ${site.contact.email} sau sună la ${site.contact.phone}.`,
        '',
        'Echipa Simplead',
      ].join('\n'),
    });
  }

  // Notificare internă (email + Slack).
  const internalTo = serverEnv('CONTACT_TO_EMAIL') || site.contact.email;
  await sendEmail({
    to: internalTo,
    subject: `[Simplead] Comandă nouă: ${packageName} (${amount} ${currency})`,
    text: [
      `Pachet: ${packageName}`,
      `Sumă: ${amount} ${currency}`,
      `Client: ${name || '-'} <${email || '-'}>`,
      order.otoForOrderId ? 'Tip: ofertă OTO acceptată' : 'Tip: achiziție directă',
      `Comandă: ${order.id}`,
    ].join('\n'),
  });
  void notifySlack(
    `:tada: Comandă nouă pe simplead.ro\n*${packageName}* · ${amount} ${currency}\n${name || '-'} <${email || '-'}>${order.otoForOrderId ? '\n(ofertă OTO acceptată)' : ''}`,
  );
}
