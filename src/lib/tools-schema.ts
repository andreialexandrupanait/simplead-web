import { z } from 'zod';

/**
 * Scheme partajate pentru instrumentele gratuite (/instrumente). Validarea
 * de input e prima linie de apărare: pe domenii (verificator email, inspector
 * DNS) acceptăm doar un nume de domeniu curat; pe scanner acceptăm doar
 * http/https. Gardarea anti-SSRF (rezolvare DNS + IP-uri private) stă în
 * `lib/server/tools/ssrf-guard.ts` și se aplică înainte de orice fetch.
 */

const DOMAIN_RE = /^(?=.{1,253}$)([a-z0-9](-?[a-z0-9])*\.)+[a-z]{2,}$/;

/** Normalizează intrarea la un nume de domeniu (acceptă și URL-uri sau „www."). */
export const domainSchema = z
  .string()
  .trim()
  .min(3, 'Introdu un domeniu (ex: exemplu.ro).')
  .max(253)
  .transform((raw) => {
    let host = raw.trim().toLowerCase();
    // Scoate protocolul, calea și portul dacă userul a lipit un URL întreg.
    host = host
      .replace(/^[a-z]+:\/\//, '')
      .replace(/[/?#].*$/, '')
      .replace(/:\d+$/, '');
    host = host.replace(/^www\./, '');
    return host;
  })
  .refine((host) => DOMAIN_RE.test(host), 'Domeniul nu pare valid (ex: exemplu.ro).');

/** Input pentru scanner: orice string care devine un URL http/https valid. */
export const urlToolSchema = z
  .string()
  .trim()
  .min(3, 'Introdu adresa site-ului (ex: exemplu.ro).')
  .max(2048);

/** „Trimite-mi raportul pe email": captură de lead din instrument. */
export const leadReportSchema = z.object({
  email: z.string().trim().email('Adresă de email invalidă.').max(200),
  tool: z.string().trim().max(60),
  target: z.string().trim().max(253),
  // Honeypot anti-spam.
  website: z.string().max(0).optional().or(z.literal('')),
});
