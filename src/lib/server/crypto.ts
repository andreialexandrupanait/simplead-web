import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from 'node:crypto';
import { serverEnv } from './env';

const KEY_ENV = 'APP_ENCRYPTION_KEY';
let warnedMissingKey = false;

/** Cheia master AES-256 (64 caractere hex = 32 bytes) sau null dacă lipsește/e malformată. */
export function getEncryptionKey(): Buffer | null {
  const hex = serverEnv(KEY_ENV);
  if (!hex || !/^[0-9a-fA-F]{64}$/.test(hex)) {
    if (!warnedMissingKey) {
      console.warn(
        `[crypto] ${KEY_ENV} lipsește sau nu are 64 caractere hex: secretele nu pot fi salvate în DB. Generează una cu \`pnpm gen:key\`.`,
      );
      warnedMissingKey = true;
    }
    return null;
  }
  return Buffer.from(hex, 'hex');
}

/** Criptează un secret: `v1:<iv b64>:<ciphertext b64>:<authTag b64>`. */
export function encryptSecret(plain: string): string | null {
  const key = getEncryptionKey();
  if (!key) return null;
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString('base64')}:${ciphertext.toString('base64')}:${tag.toString('base64')}`;
}

/** Decriptează un blob `v1:...`. Nu aruncă niciodată: orice problemă → null. */
export function decryptSecret(blob: string): string | null {
  try {
    const key = getEncryptionKey();
    if (!key) return null;
    const [version, ivB64, ctB64, tagB64] = blob.split(':');
    if (version !== 'v1' || !ivB64 || !ctB64 || !tagB64) return null;
    const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(ivB64, 'base64'));
    decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
    const plain = Buffer.concat([decipher.update(Buffer.from(ctB64, 'base64')), decipher.final()]);
    return plain.toString('utf8');
  } catch {
    return null;
  }
}

/** Mascare pentru UI: nu trimitem niciodată secretul întreg în HTML. */
export function maskSecret(plain: string): string {
  if (plain.length < 8) return '(setat)';
  return `•••• ${plain.slice(-4)}`;
}

const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;

/** Hash de parolă: `scrypt:<salt b64>:<hash b64>`. Pentru `pnpm gen:key --password`. */
export function scryptHash(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 32, { N: SCRYPT_N, r: SCRYPT_R, p: SCRYPT_P });
  return `scrypt:${salt.toString('base64')}:${hash.toString('base64')}`;
}

/** Verificare în timp constant a parolei față de hash-ul `scrypt:...`. */
export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [scheme, saltB64, hashB64] = stored.split(':');
    if (scheme !== 'scrypt' || !saltB64 || !hashB64) return false;
    const expected = Buffer.from(hashB64, 'base64');
    const actual = scryptSync(password, Buffer.from(saltB64, 'base64'), expected.length, {
      N: SCRYPT_N,
      r: SCRYPT_R,
      p: SCRYPT_P,
    });
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

/** Comparație de string-uri în timp constant (pentru email/parole plaintext). */
export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) {
    // Consumă totuși timp comparabil ca să nu scurgă lungimea.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}
