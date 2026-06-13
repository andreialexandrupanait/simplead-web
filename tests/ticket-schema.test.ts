import { describe, expect, it } from 'vitest';
import { ticketSchema, ticketCategoryLabel } from '@lib/ticket-schema';

const valid = {
  name: 'Ana Pop',
  email: 'ana@example.com',
  category: 'site-down',
  priority: 'ridicata',
  message: 'Site-ul nu se mai încarcă de azi dimineață.',
  consent: true as const,
};

describe('ticketSchema', () => {
  it('acceptă un tichet valid', () => {
    expect(ticketSchema.safeParse(valid).success).toBe(true);
  });

  it('aplică valorile implicite pentru categorie și prioritate', () => {
    const parsed = ticketSchema.parse({
      name: 'Ion',
      email: 'ion@example.com',
      message: 'Am nevoie de ajutor cu emailul.',
      consent: true,
    });
    expect(parsed.category).toBe('altele');
    expect(parsed.priority).toBe('normala');
  });

  it('respinge email invalid, mesaj prea scurt și consimțământ lipsă', () => {
    expect(ticketSchema.safeParse({ ...valid, email: 'nope' }).success).toBe(false);
    expect(ticketSchema.safeParse({ ...valid, message: 'scurt' }).success).toBe(false);
    expect(ticketSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it('respinge categorie necunoscută și honeypot completat', () => {
    expect(ticketSchema.safeParse({ ...valid, category: 'inexistent' }).success).toBe(false);
    expect(ticketSchema.safeParse({ ...valid, website: 'http://spam' }).success).toBe(false);
  });
});

describe('ticketCategoryLabel', () => {
  it('întoarce eticheta lizibilă, cu fallback pe valoarea brută', () => {
    expect(ticketCategoryLabel('email-spam')).toBe('Email ajunge în spam');
    expect(ticketCategoryLabel('necunoscut')).toBe('necunoscut');
  });
});
