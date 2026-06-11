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
  // Grupare pe pagina /pachete: '' | 'web' | 'grafica-marketing'. Text liber
  // validat de Zod (admin-schemas), nu enum pg: o grupare nouă = o editare acolo.
  category: text('category').notNull().default(''),
  // Text-callout afișat vizibil pe card (ex. precizarea „nu creăm logo-uri").
  note: text('note').notNull().default(''),
  sort: integer('sort').notNull().default(0),
  active: boolean('active').notNull().default(true),
  stripePriceId: text('stripe_price_id'),
  // OTO (one-time offer): pachetul oferit cu discount imediat după achiziție.
  otoPackageId: uuid('oto_package_id'),
  otoDiscountPercent: integer('oto_discount_percent').notNull().default(0),
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
  // Notițe interne (vizibile doar în admin).
  notes: text('notes').notNull().default(''),
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

/** Comenzi: create la inițierea checkout-ului, finalizate de webhook-ul Stripe. */
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').references(() => customers.id),
  packageId: uuid('package_id').references(() => packages.id),
  status: orderStatus('status').notNull().default('pending'),
  amountCents: integer('amount_cents').notNull(),
  currency: char('currency', { length: 3 }).notNull().default('EUR'),
  customerEmail: text('customer_email'),
  stripeCheckoutSessionId: text('stripe_checkout_session_id').unique(),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  // Setat când comanda e o ofertă OTO acceptată după comanda-părinte.
  otoForOrderId: uuid('oto_for_order_id'),
  // Factura emisă prin SmartBill (best-effort).
  invoiceSeries: text('invoice_series'),
  invoiceNumber: text('invoice_number'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** Abonați newsletter (formularul din footer + email-gate-urile de pe /resurse). */
export const subscribers = pgTable('subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  status: text('status').notNull().default('pending'),
  // De unde a venit abonarea (ex. `footer`, `resurse:ghid-seo`).
  source: text('source').notNull().default('footer'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  confirmedAt: timestamp('confirmed_at', { withTimezone: true }),
});

export const contentStatus = pgEnum('content_status', ['draft', 'published']);

/** Articole de blog: editate din /admin, randate on-demand din DB (publicare instant). */
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull().default(''),
  // Corpul articolului, în Markdown; randat prin `renderMarkdown()` (sanitizat).
  body: text('body').notNull().default(''),
  author: text('author').notNull().default('Andrei Panait'),
  tags: jsonb('tags').$type<string[]>().notNull().default([]),
  cover: text('cover'),
  status: contentStatus('status').notNull().default('draft'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  // Suprascrieri SEO opționale (gol = se folosesc title/description).
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

/** Proiecte de portofoliu: editate din /admin, randate on-demand din DB. */
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  client: text('client').notNull().default(''),
  // Text liber validat de Zod (`projectServices`), nu pg enum: o categorie nouă
  // înseamnă o editare în admin-schemas.ts, nu o migrație.
  service: text('service').notNull().default('Marketing'),
  summary: text('summary').notNull().default(''),
  challenge: text('challenge'),
  solution: text('solution'),
  result: text('result'),
  body: text('body').notNull().default(''),
  cover: text('cover'),
  sort: integer('sort').notNull().default(99),
  status: contentStatus('status').notNull().default('draft'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
