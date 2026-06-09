import {
  boolean,
  char,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const packageKind = pgEnum('package_kind', ['service', 'maintenance', 'addon']);
export const billingInterval = pgEnum('billing_interval', ['one_time', 'monthly', 'yearly']);
export const leadStatus = pgEnum('lead_status', [
  'nou',
  'contactat',
  'calificat',
  'castigat',
  'pierdut',
]);
export const orderStatus = pgEnum('order_status', [
  'pending',
  'paid',
  'failed',
  'refunded',
  'canceled',
]);

/**
 * Setări cheie/valoare. Cheile sunt namespaced (ex. `integration.stripe.secret_key`).
 * Valorile secrete sunt criptate AES-256-GCM (blob `v1:...`) și marcate `encrypted`.
 */
export const settings = pgTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  encrypted: boolean('encrypted').notNull().default(false),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** Pachete vândabile: pachete de servicii, planuri de mentenanță și add-on-uri. */
export const packages = pgTable('packages', {
  id: uuid('id').primaryKey().defaultRandom(),
  kind: packageKind('kind').notNull(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull().default(''),
  priceCents: integer('price_cents').notNull(),
  currency: char('currency', { length: 3 }).notNull().default('EUR'),
  interval: billingInterval('interval').notNull().default('one_time'),
  features: jsonb('features').$type<string[]>().notNull().default([]),
  sort: integer('sort').notNull().default(0),
  active: boolean('active').notNull().default(true),
  // Pregătit pentru Milestone 2 (Stripe Checkout).
  stripePriceId: text('stripe_price_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** Lead-uri din formularul de contact (și, ulterior, din alte surse). */
export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  service: text('service'),
  message: text('message').notNull(),
  source: text('source').notNull().default('contact-form'),
  status: leadStatus('status').notNull().default('nou'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

/** Stub pentru Milestone 2 (Stripe). */
export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  stripeCustomerId: text('stripe_customer_id').unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

/** Stub pentru Milestone 2 (Stripe). */
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').references(() => customers.id),
  packageId: uuid('package_id').references(() => packages.id),
  status: orderStatus('status').notNull().default('pending'),
  amountCents: integer('amount_cents').notNull(),
  currency: char('currency', { length: 3 }).notNull().default('EUR'),
  stripeCheckoutSessionId: text('stripe_checkout_session_id').unique(),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** Abonați newsletter (folosit într-o fază ulterioară). */
export const subscribers = pgTable('subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  confirmedAt: timestamp('confirmed_at', { withTimezone: true }),
});
