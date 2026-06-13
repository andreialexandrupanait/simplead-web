import { z } from 'zod';

/**
 * Schema partajată pentru tichetele de suport: validare client (formularul
 * /suport) și server (/api/ticket). Categoriile și prioritățile sunt text liber
 * validat aici — o categorie nouă = o linie aici, fără migrație.
 */

export const ticketCategories = [
  { value: 'site-down', label: 'Site picat / erori' },
  { value: 'email-spam', label: 'Email ajunge în spam' },
  { value: 'optimizare-viteza', label: 'Optimizare viteză' },
  { value: 'securitate-malware', label: 'Securitate / malware' },
  { value: 'migrare', label: 'Migrare site / hosting' },
  { value: 'altele', label: 'Altele' },
] as const;

export const ticketCategoryValues = [
  'site-down',
  'email-spam',
  'optimizare-viteza',
  'securitate-malware',
  'migrare',
  'altele',
] as const;

export const ticketPriorities = [
  { value: 'scazuta', label: 'Scăzută' },
  { value: 'normala', label: 'Normală' },
  { value: 'ridicata', label: 'Ridicată' },
  { value: 'urgenta', label: 'Urgentă' },
] as const;

export const ticketPriorityValues = ['scazuta', 'normala', 'ridicata', 'urgenta'] as const;

/** Etichetă lizibilă pentru o categorie (fallback pe valoarea brută). */
export function ticketCategoryLabel(value: string): string {
  return ticketCategories.find((c) => c.value === value)?.label ?? value;
}

export const ticketSchema = z.object({
  name: z.string().trim().min(2, 'Te rugăm să introduci numele.').max(120),
  email: z.string().trim().email('Adresă de email invalidă.').max(200),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  category: z.enum(ticketCategoryValues).default('altele'),
  // URL-ul site-ului (opțional, acceptăm și „example.com" fără protocol).
  siteUrl: z.string().trim().max(300).optional().or(z.literal('')),
  priority: z.enum(ticketPriorityValues).default('normala'),
  message: z.string().trim().min(10, 'Descrie pe scurt problema (min. 10 caractere).').max(5000),
  // Leagă tichetul de o lucrare la preț fix (din /servicii-rapide).
  packageSlug: z.string().trim().max(120).optional().or(z.literal('')),
  // Consimțământ GDPR: obligatoriu.
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Te rugăm să accepți prelucrarea datelor.' }),
  }),
  // Honeypot anti-spam (trebuie să rămână gol).
  website: z.string().max(0).optional().or(z.literal('')),
});

export type TicketInput = z.infer<typeof ticketSchema>;
