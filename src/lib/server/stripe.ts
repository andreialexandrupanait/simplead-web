import Stripe from 'stripe';
import { getIntegration } from './settings';

let cached: { key: string; client: Stripe } | null = null;

/** Client Stripe construit cu cheia din admin/DB → env. Null dacă nu e configurat. */
export async function getStripe(): Promise<Stripe | null> {
  const { secretKey } = await getIntegration('stripe');
  const key = secretKey.value;
  if (!key) return null;
  if (cached?.key !== key) {
    cached = { key, client: new Stripe(key) };
  }
  return cached.client;
}

/** Secretul de semnare al webhook-ului (whsec_...), pentru verificarea evenimentelor. */
export async function getStripeWebhookSecret(): Promise<string | null> {
  const { webhookSecret } = await getIntegration('stripe');
  return webhookSecret.value ?? null;
}
