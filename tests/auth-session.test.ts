import { beforeAll, describe, expect, it } from 'vitest';
import {
  REMEMBER_TTL_S,
  createSessionToken,
  getSessionPayload,
  verifySessionToken,
} from '@lib/server/auth';

// serverEnv citește process.env la runtime, deci e suficient să setăm secretul.
beforeAll(() => {
  process.env.SESSION_SECRET = 'b'.repeat(64);
});

describe('token de sesiune', () => {
  it('face roundtrip cu sub + email', () => {
    const token = createSessionToken({ sub: 'user-123', email: 'a@simplead.ro' });
    expect(token).toBeTruthy();
    expect(verifySessionToken(token!)).toBe(true);
    const payload = getSessionPayload(token!);
    expect(payload).toEqual({ sub: 'user-123', email: 'a@simplead.ro' });
  });

  it('acceptă sub-ul de bootstrap „admin"', () => {
    const token = createSessionToken({ sub: 'admin' });
    expect(getSessionPayload(token!)?.sub).toBe('admin');
  });

  it('respinge un token cu semnătură manipulată', () => {
    const token = createSessionToken({ sub: 'x' })!;
    const tampered = token.slice(0, -2) + 'AA';
    expect(verifySessionToken(tampered)).toBe(false);
    expect(getSessionPayload(tampered)).toBeNull();
  });

  it('respinge un token expirat', () => {
    const token = createSessionToken({ sub: 'x', ttlS: -10 })!;
    expect(verifySessionToken(token)).toBe(false);
  });

  it('respinge token gol / lipsă', () => {
    expect(verifySessionToken(undefined)).toBe(false);
    expect(getSessionPayload('')).toBeNull();
  });

  it('remember-ul are 30 de zile', () => {
    expect(REMEMBER_TTL_S).toBe(30 * 24 * 60 * 60);
  });
});
