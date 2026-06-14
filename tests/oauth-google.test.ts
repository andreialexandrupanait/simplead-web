import { beforeAll, describe, expect, it } from 'vitest';
import { getAllowedDomain, isAllowedProfile } from '@lib/server/oauth-google';

beforeAll(() => {
  delete process.env.GOOGLE_ALLOWED_DOMAIN; // folosim default-ul
});

const profile = (over: Partial<Parameters<typeof isAllowedProfile>[0]> = {}) => ({
  sub: '1',
  email: 'cineva@simplead.ro',
  emailVerified: true,
  ...over,
});

describe('Google OAuth — control acces pe domeniu', () => {
  it('domeniul default e simplead.ro', () => {
    expect(getAllowedDomain()).toBe('simplead.ro');
  });

  it('acceptă un cont @simplead.ro verificat', () => {
    expect(isAllowedProfile(profile())).toBe(true);
  });

  it('acceptă pe baza claim-ului hd chiar dacă emailul are alt sufix', () => {
    expect(isAllowedProfile(profile({ email: 'x@altceva.com', hd: 'simplead.ro' }))).toBe(true);
  });

  it('respinge alt domeniu', () => {
    expect(isAllowedProfile(profile({ email: 'x@gmail.com' }))).toBe(false);
  });

  it('respinge emailul neverificat', () => {
    expect(isAllowedProfile(profile({ emailVerified: false }))).toBe(false);
  });
});
