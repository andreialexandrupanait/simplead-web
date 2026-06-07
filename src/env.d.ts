/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly SITE_URL?: string;
  readonly GA4_ID?: string;
  readonly GTM_ID?: string;
  readonly CLARITY_ID?: string;
  readonly RESEND_API_KEY?: string;
  readonly CONTACT_TO_EMAIL?: string;
  readonly CONTACT_FROM_EMAIL?: string;
  readonly CALCOM_LINK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
