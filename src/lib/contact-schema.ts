import { z } from 'zod';

/** Schema partajată de formularul React (validare client) și endpoint (validare server). */
export const contactSchema = z.object({
  lastName: z.string().min(1, 'Te rugăm să introduci numele.').max(80),
  firstName: z.string().min(1, 'Te rugăm să introduci prenumele.').max(80),
  email: z.string().email('Adresă de email invalidă.'),
  phone: z.string().min(6, 'Te rugăm să introduci un telefon.').max(40),
  // Nume firmă / CUI — opțional (persoanele fizice nu-l completează).
  company: z.string().max(120).optional().or(z.literal('')),
  // Serviciul e opțional (formularul din design nu-l cere); util pe pagina /servicii.
  service: z.string().max(60).optional().or(z.literal('')),
  // Mesaj opțional, fără minim; plafon larg doar ca protecție anti-abuz.
  message: z.string().max(20000).optional().default(''),
  // Consimțământ GDPR: obligatoriu.
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Te rugăm să accepți prelucrarea datelor.' }),
  }),
  // Honeypot anti-spam (trebuie să rămână gol).
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
