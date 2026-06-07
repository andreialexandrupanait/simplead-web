import { z } from 'zod';

/** Schema partajată de formularul React (validare client) și endpoint (validare server). */
export const contactSchema = z.object({
  name: z.string().min(2, 'Te rugăm să introduci numele.').max(100),
  email: z.string().email('Adresă de email invalidă.'),
  phone: z.string().max(40).optional().or(z.literal('')),
  // Serviciul e opțional (formularul din design nu-l cere); util pe pagina /servicii.
  service: z.string().max(60).optional().or(z.literal('')),
  message: z.string().min(10, 'Spune-ne pe scurt ce ai nevoie (min. 10 caractere).').max(5000),
  // Consimțământ GDPR — obligatoriu.
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Te rugăm să accepți prelucrarea datelor.' }),
  }),
  // Honeypot anti-spam (trebuie să rămână gol).
  company: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
