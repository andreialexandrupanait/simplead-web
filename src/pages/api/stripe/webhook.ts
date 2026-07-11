import type { APIRoute } from 'astro';
import type Stripe from 'stripe';
import { eq } from 'drizzle-orm';
import { getDb } from '../../../lib/server/db';
import { customers, orders, packages } from '../../../lib/server/schema';
import { getStripe, getStripeWebhookSecret } from '../../../lib/server/stripe';
import { sendEmail } from '../../../lib/server/email';
import { notifySlack } from '../../../lib/server/slack';
import { issueInvoice, recordCardPayment } from '../../../lib/server/smartbill';
import { pushOrderToErp } from '../../../lib/server/erp';
import { getContactToEmail } from '../../../lib/server/settings';
import { trackServerConversion } from '../../../lib/server/capi';
import { alertAdmin } from '../../../lib/server/alert';
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
      // Eșec ÎNAINTE ca comanda să fie marcată plătită (DB căzut, comandă
      // negăsită): răspundem 500 ca Stripe să retrimită (backoff, până la ~72h).
      // Idempotența pe `status === 'paid'` face retrimiterea sigură. Pașii de
      // după plată (factură/email/ERP) au propriul try/catch + alertă și NU
      // ajung aici.
      console.error('[stripe-webhook] Procesarea comenzii a eșuat:', err);
      void alertAdmin(
        'Webhook Stripe: procesare eșuată (se reîncearcă)',
        `Sesiune: ${event.data.object.id}\nEroare: ${err instanceof Error ? err.message : String(err)}`,
      );
      return new Response('Procesarea a eșuat; Stripe va retrimite.', { status: 500 });
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
    // Aruncăm ca POST-ul să răspundă 500 → Stripe retrimite când DB revine.
    // (Înainte se răspundea 200 și comanda plătită se pierdea definitiv.)
    throw new Error(`Fără DB: comanda pentru sesiunea ${session.id} nu poate fi înregistrată.`);
  }

  const orderId = session.metadata?.order_id;
  const email = session.customer_details?.email ?? '';
  const name = session.customer_details?.name ?? '';

  let [order] = orderId
    ? await db.select().from(orders).where(eq(orders.id, orderId)).limit(1)
    : await db.select().from(orders).where(eq(orders.stripeCheckoutSessionId, session.id)).limit(1);
  if (!order) {
    // Plată încasată fără comandă în DB = bani nepotriviți cu nimic → retry + alertă.
    throw new Error(`Comanda nu a fost găsită pentru sesiunea ${session.id}.`);
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

  // De aici încolo comanda E marcată plătită: orice eșec (factură/email/ERP) se
  // ALERTEAZĂ dar nu mai aruncă — un retry Stripe ar fi oricum ignorat de
  // idempotență, deci fără alertă problema ar rămâne invizibilă.
  try {
  const [pkg] = order.packageId
    ? await db.select().from(packages).where(eq(packages.id, order.packageId)).limit(1)
    : [];
  const packageName = pkg?.name ?? 'Pachet Simplead';
  const amount = (order.amountCents / 100).toFixed(2).replace(/\.00$/, '');
  const currency = order.currency.trim();

  // Conversie server-side (Meta CAPI + GA4 MP). Server-to-server: fără context de
  // cookie, dar cu email pentru matching. event_id = id-ul comenzii → deduplicare
  // cu evenimentul `purchase` din browser (dacă GTM îl trimite cu același id).
  void trackServerConversion({
    event: 'purchase',
    eventId: `order_${order.id}`,
    email: email || undefined,
    value: order.amountCents / 100,
    currency: currency.toUpperCase(),
    transactionId: order.id,
  });

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
      order = { ...order, invoiceSeries: invoice.series, invoiceNumber: invoice.number };
      // Plata e confirmată de Stripe → înregistrăm și încasarea (Card) în
      // SmartBill; astfel factura apare „încasată" și aplicația internă o
      // preia automat la sync-ul zilnic (regula doar-încasate).
      void recordCardPayment({
        series: invoice.series,
        number: invoice.number,
        clientName: name || email,
        amount: order.amountCents / 100,
        currency,
      });
    } else {
      // Comandă plătită FĂRĂ factură = problemă fiscală → alertă, nu doar log.
      void alertAdmin(
        'Comandă plătită fără factură SmartBill',
        `Comanda ${order.id} (${amount} ${currency}, ${email}) e plătită, dar factura nu a fost emisă.\nMotiv: ${invoice.reason}\nEmite manual din SmartBill și completează seria/numărul pe comandă în /admin/comenzi.`,
      );
    }
  }

  // Push în aplicația internă (best-effort, idempotent pe orderId).
  if (email)
    void pushOrderToErp({
      orderId: order.id,
      packageSlug: pkg?.slug ?? 'necunoscut',
      packageName,
      packageKind: pkg?.kind ?? null,
      packageInterval: pkg?.interval ?? null,
      amountCents: order.amountCents,
      currency,
      customerEmail: email,
      customerName: name || null,
      stripeCheckoutSessionId: order.stripeCheckoutSessionId,
      stripePaymentIntentId: order.stripePaymentIntentId,
      invoiceSeries: order.invoiceSeries ?? null,
      invoiceNumber: order.invoiceNumber ?? null,
    });

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
        `Întrebări? Scrie-ne la ${site.contact.email}.`,
        '',
        'Echipa Simplead',
      ].join('\n'),
    });
  }

  // Notificare internă (email + Slack).
  const internalTo = await getContactToEmail(site.contact.email);
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
  } catch (err) {
    void alertAdmin(
      'Comandă plătită, procesare parțială',
      `Comanda ${order.id} e plătită, dar un pas post-plată a eșuat (factură/email/notificări).\nVerifică în /admin/comenzi/${order.id}.\nEroare: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}
