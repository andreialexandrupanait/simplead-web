/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly SITE_URL?: string;
  readonly GA4_ID?: string;
  readonly GTM_ID?: string;
  readonly CLARITY_ID?: string;
  readonly CONTACT_TO_EMAIL?: string;
  readonly CONTACT_FROM_EMAIL?: string;
  readonly CALCOM_LINK?: string;
  // Bază de date (Postgres). Lipsă = site-ul rulează fără DB, cu fallback-uri.
  readonly DATABASE_URL?: string;
  // Criptarea secretelor din admin (64 caractere hex). Generată cu `pnpm gen:key`.
  readonly APP_ENCRYPTION_KEY?: string;
  // Sesiuni admin (semnătură HMAC) + credențiale admin.
  readonly SESSION_SECRET?: string;
  readonly ADMIN_EMAIL?: string;
  readonly ADMIN_PASSWORD?: string;
  readonly ADMIN_PASSWORD_HASH?: string;
  // Nume opțional pentru adminul de bootstrap (folosit de scripts/seed-admin.mjs).
  readonly ADMIN_NAME?: string;
  // Login cu Google (OAuth). Lipsă = butonul „Continuă cu Google" e ascuns.
  readonly GOOGLE_CLIENT_ID?: string;
  readonly GOOGLE_CLIENT_SECRET?: string;
  readonly GOOGLE_ALLOWED_DOMAIN?: string;
  // Fallback-uri env pentru integrări (valorile principale se setează în /admin/integrari).
  readonly POSTMARK_SERVER_TOKEN?: string;
  readonly POSTMARK_FROM_EMAIL?: string;
  readonly STRIPE_SECRET_KEY?: string;
  readonly STRIPE_WEBHOOK_SECRET?: string;
  readonly SMARTBILL_EMAIL?: string;
  readonly SMARTBILL_TOKEN?: string;
  readonly SMARTBILL_SERIES?: string;
  readonly SMARTBILL_CIF?: string;
  readonly SMARTBILL_TAX_NAME?: string;
  readonly SMARTBILL_TAX_PERCENT?: string;
  readonly SLACK_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    isAdmin: boolean;
  }
}
