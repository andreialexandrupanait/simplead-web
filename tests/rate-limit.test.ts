import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRateLimiter } from '@lib/server/rate-limit';

describe('createRateLimiter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('permite până la `max` cereri și le blochează pe următoarele', () => {
    const rl = createRateLimiter({ windowMs: 60_000, max: 3 });
    expect(rl.allow('ip')).toBe(true);
    expect(rl.allow('ip')).toBe(true);
    expect(rl.allow('ip')).toBe(true);
    expect(rl.allow('ip')).toBe(false);
  });

  it('numără separat fiecare cheie (IP)', () => {
    const rl = createRateLimiter({ windowMs: 60_000, max: 1 });
    expect(rl.allow('a')).toBe(true);
    expect(rl.allow('b')).toBe(true);
    expect(rl.allow('a')).toBe(false);
  });

  it('resetează plafonul după expirarea ferestrei', () => {
    const rl = createRateLimiter({ windowMs: 60_000, max: 1 });
    expect(rl.allow('ip')).toBe(true);
    expect(rl.allow('ip')).toBe(false);
    vi.advanceTimersByTime(60_001);
    expect(rl.allow('ip')).toBe(true);
  });
});
