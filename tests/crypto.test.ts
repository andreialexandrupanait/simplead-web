import { beforeAll, describe, expect, it } from 'vitest';
import {
  decryptSecret,
  encryptSecret,
  maskSecret,
  safeEqual,
  scryptHash,
  verifyPassword,
} from '@lib/server/crypto';

// `serverEnv` citește process.env la runtime (vezi src/lib/server/env.ts), deci
// e suficient să setăm cheia înainte de primul apel de criptare.
beforeAll(() => {
  process.env.APP_ENCRYPTION_KEY = 'a'.repeat(64);
});

describe('encrypt/decrypt (AES-256-GCM)', () => {
  it('face roundtrip pe un secret', () => {
    const blob = encryptSecret('token-secret-123');
    expect(blob).toMatch(/^v1:/);
    expect(decryptSecret(blob!)).toBe('token-secret-123');
  });

  it('produce ciphertext diferit la fiecare apel (IV aleator)', () => {
    expect(encryptSecret('x')).not.toBe(encryptSecret('x'));
  });

  it('întoarce null pe blob manipulat, în loc să arunce', () => {
    const blob = encryptSecret('plată')!;
    const tampered = blob.slice(0, -4) + 'AAAA';
    expect(decryptSecret(tampered)).toBeNull();
    expect(decryptSecret('aiurea')).toBeNull();
  });
});

describe('hash de parolă (scrypt)', () => {
  it('verifică parola corectă și o respinge pe cea greșită', () => {
    const stored = scryptHash('parola-buna');
    expect(stored).toMatch(/^scrypt:/);
    expect(verifyPassword('parola-buna', stored)).toBe(true);
    expect(verifyPassword('parola-gresita', stored)).toBe(false);
  });

  it('nu aruncă pe hash malformat', () => {
    expect(verifyPassword('x', 'format-invalid')).toBe(false);
  });
});

describe('safeEqual & maskSecret', () => {
  it('compară string-uri în timp constant', () => {
    expect(safeEqual('abc', 'abc')).toBe(true);
    expect(safeEqual('abc', 'abd')).toBe(false);
    expect(safeEqual('abc', 'abcd')).toBe(false);
  });

  it('maschează secretul păstrând ultimele 4 caractere', () => {
    expect(maskSecret('sk_live_1234')).toBe('•••• 1234');
    expect(maskSecret('scurt')).toBe('(setat)');
  });
});
