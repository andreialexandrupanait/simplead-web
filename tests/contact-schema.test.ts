import { describe, expect, it } from 'vitest';
import { contactSchema } from '@lib/contact-schema';

// Smoke test pe validarea partajată client/server: dacă schema se rupe, ambele
// capete (formularul React și /api/contact) se rup împreună.
const valid = {
  lastName: 'Popescu',
  firstName: 'Ana',
  email: 'ana@example.com',
  phone: '0740123456',
  message: 'Aș dori o ofertă pentru un site de prezentare.',
  consent: true as const,
};

describe('contactSchema', () => {
  it('acceptă o trimitere validă', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('respinge emailul invalid și consimțământul lipsă', () => {
    expect(contactSchema.safeParse({ ...valid, email: 'nu-e-email' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it('acceptă mesajul opțional/gol (decizie de produs: fără minim)', () => {
    expect(contactSchema.safeParse({ ...valid, message: '' }).success).toBe(true);
    const { message: _omit, ...faraMesaj } = valid;
    expect(contactSchema.safeParse(faraMesaj).success).toBe(true);
  });

  it('respinge mesajele peste plafonul anti-abuz (20000)', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'x'.repeat(20001) }).success).toBe(false);
  });

  it('respinge honeypot-ul completat (semnal de bot)', () => {
    expect(contactSchema.safeParse({ ...valid, website: 'http://spam.example' }).success).toBe(
      false,
    );
  });
});
