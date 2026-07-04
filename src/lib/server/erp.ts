import { getIntegration } from './settings';

/**
 * Push-ul unei comenzi plătite către aplicația internă (hub.simplead.ro).
 * Best-effort ca Slack/SmartBill: orice eroare e logată și înghițită —
 * webhook-ul Stripe nu depinde niciodată de ERP. Endpoint-ul ERP e
 * idempotent pe orderId, deci retrimiterea evenimentului de către Stripe
 * e inofensivă.
 */
export type ErpOrderPush = {
  orderId: string;
  packageSlug: string;
  packageName: string;
  packageKind?: string | null;
  packageInterval?: string | null;
  amountCents: number;
  currency: string;
  customerEmail: string;
  customerName?: string | null;
  stripeCheckoutSessionId?: string | null;
  stripePaymentIntentId?: string | null;
  invoiceSeries?: string | null;
  invoiceNumber?: string | null;
};

export async function pushOrderToErp(order: ErpOrderPush): Promise<void> {
  try {
    const erp = await getIntegration('erp');
    const baseUrl = (erp.baseUrl.value || '').replace(/\/+$/, '');
    const token = erp.apiToken.value;
    if (!baseUrl || !token) return;

    const res = await fetch(`${baseUrl}/api/site/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        site_order_id: order.orderId,
        package_slug: order.packageSlug,
        package_name: order.packageName,
        package_kind: order.packageKind ?? null,
        package_interval: order.packageInterval ?? null,
        amount_cents: order.amountCents,
        currency: order.currency,
        customer_email: order.customerEmail,
        customer_name: order.customerName ?? null,
        stripe_checkout_session_id: order.stripeCheckoutSessionId ?? null,
        stripe_payment_intent_id: order.stripePaymentIntentId ?? null,
        smartbill_series: order.invoiceSeries ?? null,
        smartbill_number: order.invoiceNumber ?? null,
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) {
      console.warn(`[erp] Push-ul comenzii ${order.orderId} a răspuns ${res.status}.`);
    }
  } catch (err) {
    console.error('[erp] Push-ul comenzii a eșuat (nu blochează webhook-ul):', err);
  }
}
