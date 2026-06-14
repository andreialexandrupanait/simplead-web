import { eq, inArray } from 'drizzle-orm';
import { getDb } from './db';
import { settings } from './schema';
import { decryptSecret, encryptSecret, maskSecret } from './crypto';
import { serverEnv } from './env';

/**
 * Registrul integrărilor: fiecare câmp are o cheie în tabela `settings`,
 * un fallback pe env și un flag `secret` (criptat la rest + mascat în UI).
 * Andrei completează valorile din /admin/integrari; env-ul rămâne fallback.
 */
export const INTEGRATIONS = {
  stripe: {
    label: 'Stripe',
    group: 'Plăți & facturare',
    desc: 'Plăți online: pachete și abonamente. Necesar pentru checkout.',
    docs: 'https://dashboard.stripe.com/apikeys',
    testable: true,
    fields: {
      secretKey: { key: 'integration.stripe.secret_key', env: 'STRIPE_SECRET_KEY', secret: true },
      webhookSecret: {
        key: 'integration.stripe.webhook_secret',
        env: 'STRIPE_WEBHOOK_SECRET',
        secret: true,
      },
    },
  },
  smartbill: {
    label: 'SmartBill',
    group: 'Plăți & facturare',
    desc: 'Facturare automată la fiecare plată. e-Factura e gestionată de SmartBill.',
    docs: 'https://cloud.smartbill.ro',
    testable: true,
    fields: {
      email: { key: 'integration.smartbill.email', env: 'SMARTBILL_EMAIL', secret: false },
      token: { key: 'integration.smartbill.token', env: 'SMARTBILL_TOKEN', secret: true },
      series: { key: 'integration.smartbill.series', env: 'SMARTBILL_SERIES', secret: false },
      cif: { key: 'integration.smartbill.cif', env: 'SMARTBILL_CIF', secret: false },
      taxName: { key: 'integration.smartbill.tax_name', env: 'SMARTBILL_TAX_NAME', secret: false },
      taxPercent: {
        key: 'integration.smartbill.tax_percent',
        env: 'SMARTBILL_TAX_PERCENT',
        secret: false,
      },
    },
  },
  postmark: {
    label: 'Postmark',
    group: 'Email',
    desc: 'Trimiterea emailurilor: formular de contact, confirmări de comandă, resetare parolă.',
    docs: 'https://account.postmarkapp.com/servers',
    testable: true,
    fields: {
      serverToken: {
        key: 'integration.postmark.server_token',
        env: 'POSTMARK_SERVER_TOKEN',
        secret: true,
      },
      fromEmail: {
        key: 'integration.postmark.from_email',
        env: 'POSTMARK_FROM_EMAIL',
        secret: false,
      },
    },
  },
  email: {
    label: 'Email contact',
    group: 'Email',
    desc: 'Adresa unde ajung mesajele din formulare (contact, tichete, cereri de ofertă).',
    testable: false,
    fields: {
      toEmail: { key: 'integration.email.to', env: 'CONTACT_TO_EMAIL', secret: false },
    },
  },
  slack: {
    label: 'Slack',
    group: 'Notificări',
    desc: 'Notificări instant pe Slack: lead nou, comandă nouă, tichet nou.',
    docs: 'https://api.slack.com/messaging/webhooks',
    testable: true,
    fields: {
      webhookUrl: { key: 'integration.slack.webhook_url', env: 'SLACK_WEBHOOK_URL', secret: true },
    },
  },
  google: {
    label: 'Login Google',
    group: 'Autentificare',
    desc: 'Buton „Continuă cu Google" pe pagina de admin. Acces doar pentru conturile din domeniul permis.',
    docs: 'https://console.cloud.google.com/apis/credentials',
    testable: true,
    fields: {
      clientId: { key: 'integration.google.client_id', env: 'GOOGLE_CLIENT_ID', secret: false },
      clientSecret: {
        key: 'integration.google.client_secret',
        env: 'GOOGLE_CLIENT_SECRET',
        secret: true,
      },
      allowedDomain: {
        key: 'integration.google.allowed_domain',
        env: 'GOOGLE_ALLOWED_DOMAIN',
        secret: false,
      },
    },
  },
} as const;

export type IntegrationName = keyof typeof INTEGRATIONS;
type FieldName<I extends IntegrationName> = keyof (typeof INTEGRATIONS)[I]['fields'] & string;

export type ResolvedField = {
  value: string | undefined;
  source: 'db' | 'env' | null;
};

export type ResolvedIntegration<I extends IntegrationName> = Record<FieldName<I>, ResolvedField>;

type CacheEntry = { at: number; values: Record<string, ResolvedField> };
const CACHE_TTL_MS = 60_000;
const cache = new Map<IntegrationName, CacheEntry>();

function fieldEntries<I extends IntegrationName>(name: I) {
  return Object.entries(INTEGRATIONS[name].fields) as [
    FieldName<I>,
    { key: string; env: string; secret: boolean },
  ][];
}

/** Valorile rezolvate ale unei integrări: DB (decriptat) → env → undefined. */
export async function getIntegration<I extends IntegrationName>(
  name: I,
): Promise<ResolvedIntegration<I>> {
  const cached = cache.get(name);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.values as ResolvedIntegration<I>;
  }

  const fields = fieldEntries(name);
  const result = {} as Record<string, ResolvedField>;
  let rows: { key: string; value: string; encrypted: boolean }[] = [];

  const db = getDb();
  if (db) {
    try {
      rows = await db
        .select()
        .from(settings)
        .where(
          inArray(
            settings.key,
            fields.map(([, f]) => f.key),
          ),
        );
    } catch (err) {
      console.warn('[settings] Citirea din DB a eșuat, folosim env:', err);
    }
  }

  for (const [fieldName, field] of fields) {
    const row = rows.find((r) => r.key === field.key);
    let value: string | undefined;
    let source: ResolvedField['source'] = null;
    if (row) {
      const plain = row.encrypted ? decryptSecret(row.value) : row.value;
      if (plain) {
        value = plain;
        source = 'db';
      }
    }
    if (!value) {
      const fromEnv = serverEnv(field.env);
      if (fromEnv) {
        value = fromEnv;
        source = 'env';
      }
    }
    result[fieldName] = { value, source };
  }

  cache.set(name, { at: Date.now(), values: result });
  return result as ResolvedIntegration<I>;
}

export type SaveResult = { ok: true } | { ok: false; error: string };

/**
 * Salvează câmpurile unei integrări. Semantică write-only:
 * string gol = păstrează valoarea existentă; `clear` = șterge rândul.
 * Secretele NU se salvează niciodată în clar: fără cheie de criptare → eroare.
 */
export async function saveIntegration<I extends IntegrationName>(
  name: I,
  values: Partial<Record<FieldName<I>, string>>,
  clear: FieldName<I>[] = [],
): Promise<SaveResult> {
  const db = getDb();
  if (!db) {
    return { ok: false, error: 'Baza de date nu e configurată (DATABASE_URL lipsește).' };
  }

  try {
    for (const [fieldName, field] of fieldEntries(name)) {
      if (clear.includes(fieldName)) {
        await db.delete(settings).where(eq(settings.key, field.key));
        continue;
      }
      const raw = values[fieldName]?.trim();
      if (!raw) continue; // gol = neschimbat

      let stored = raw;
      if (field.secret) {
        const encrypted = encryptSecret(raw);
        if (!encrypted) {
          return {
            ok: false,
            error:
              'APP_ENCRYPTION_KEY lipsește: nu putem salva secrete în siguranță. Generează cheia cu `pnpm gen:key` și setează variabila de mediu.',
          };
        }
        stored = encrypted;
      }

      await db
        .insert(settings)
        .values({ key: field.key, value: stored, encrypted: field.secret })
        .onConflictDoUpdate({
          target: settings.key,
          set: { value: stored, encrypted: field.secret, updatedAt: new Date() },
        });
    }
    cache.delete(name);
    return { ok: true };
  } catch (err) {
    console.error('[settings] Salvarea a eșuat:', err);
    return { ok: false, error: 'Salvarea în baza de date a eșuat. Verifică conexiunea.' };
  }
}

export type MaskedField = { masked: string | null; source: 'db' | 'env' | null; secret: boolean };

/** Variantă pentru UI: valorile secrete apar mascate, niciodată întregi. */
export async function getMaskedIntegration<I extends IntegrationName>(
  name: I,
): Promise<Record<FieldName<I>, MaskedField>> {
  const resolved = await getIntegration(name);
  const result = {} as Record<string, MaskedField>;
  for (const [fieldName, field] of fieldEntries(name)) {
    const { value, source } = resolved[fieldName];
    result[fieldName] = {
      masked: value ? (field.secret ? maskSecret(value) : value) : null,
      source,
      secret: field.secret,
    };
  }
  return result as Record<FieldName<I>, MaskedField>;
}

/** Golește cache-ul (folosit în teste / după salvări în alt proces). */
export function clearSettingsCache(): void {
  cache.clear();
}

/** Adresa unde ajung mesajele din formulare: DB (admin) → env → fallback. */
export async function getContactToEmail(fallback: string): Promise<string> {
  const { toEmail } = await getIntegration('email');
  return toEmail.value || fallback;
}
