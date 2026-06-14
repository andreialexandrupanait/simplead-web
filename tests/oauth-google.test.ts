import { describe, expect, it } from 'vitest';
import { isAllowedProfile } from '@lib/server/oauth-google';

const DOMAIN = 'simplead.ro';

const profile = (over: Partial<Parameters<typeof isAllowedProfile>[0]> = {}) => ({
  sub: '1',
  email: 'cineva@simplead.ro',
  emailVerified: true,
  ...over,
});

describe('Google OAuth — control acces pe domeniu', () => {
  it('acceptă un cont @simplead.ro verificat', () => {
    expect(isAllowedProfile(profile(), DOMAIN)).toBe(true);
  });

  it('acceptă pe baza claim-ului hd chiar dacă emailul are alt sufix', () => {
    expect(isAllowedProfile(profile({ email: 'x@altceva.com', hd: 'simplead.ro' }), DOMAIN)).toBe(
      true,
    );
  });

  it('respinge alt domeniu', () => {
    expect(isAllowedProfile(profile({ email: 'x@gmail.com' }), DOMAIN)).toBe(false);
  });

  it('respinge emailul neverificat', () => {
    expect(isAllowedProfile(profile({ emailVerified: false }), DOMAIN)).toBe(false);
  });
});
