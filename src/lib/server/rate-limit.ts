/**
 * Rate-limit simplu in-memory (per proces), același model ca în `api/newsletter.ts`
 * și `auth.ts`: o fereastră glisantă cu un plafon de cereri per cheie (de regulă IP).
 * Se resetează la restart — suficient pentru a descuraja abuzul pe rutele publice.
 *
 * Util nou, de sine stătător: NU înlocuiește implementările existente, ci e folosit
 * de rutele noi (instrumentele gratuite).
 */
export interface RateLimiter {
  /** Înregistrează o cerere pentru `key` și întoarce `true` dacă e permisă. */
  allow(key: string): boolean;
}

export function createRateLimiter({
  windowMs,
  max,
}: {
  windowMs: number;
  max: number;
}): RateLimiter {
  const hits = new Map<string, { count: number; resetAt: number }>();
  return {
    allow(key: string): boolean {
      const now = Date.now();
      const entry = hits.get(key);
      if (!entry || entry.resetAt < now) {
        hits.set(key, { count: 1, resetAt: now + windowMs });
        return true;
      }
      entry.count += 1;
      return entry.count <= max;
    },
  };
}
