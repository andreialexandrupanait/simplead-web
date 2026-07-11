import { describe, expect, it } from 'vitest';
import type { AstroCookies } from 'astro';
import { AB_COOKIE, assignVariant, isBot, readVariant } from '@lib/server/ab';

describe('isBot', () => {
  it('recunoaște crawler-ele cunoscute', () => {
    expect(
      isBot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'),
    ).toBe(true);
    expect(
      isBot('Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'),
    ).toBe(true);
    expect(
      isBot('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/120.0.0.0 Safari/537.36'),
    ).toBe(true);
  });

  it('nu marchează browserele reale de desktop ca boți', () => {
    expect(
      isBot('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'),
    ).toBe(false);
    expect(
      isBot('Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0'),
    ).toBe(false);
    expect(
      isBot('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15'),
    ).toBe(false);
  });

  it('nu marchează browserele reale de mobil ca boți', () => {
    expect(
      isBot('Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36'),
    ).toBe(false);
    expect(
      isBot('Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'),
    ).toBe(false);
  });

  it('fixează pe A clienții non-browser: curl, wget, python-requests, UA gol', () => {
    // Nu sunt crawler-e de index, dar nici vizitatori reali — i-am exclude din
    // eșantion ca să nu dilueze statistica (și să nu primească Set-Cookie degeaba).
    expect(isBot('curl/8.5.0')).toBe(true);
    expect(isBot('Wget/1.21')).toBe(true);
    expect(isBot('python-requests/2.32')).toBe(true);
    expect(isBot('')).toBe(true);
    expect(isBot('   ')).toBe(true);
  });
});

describe('assignVariant', () => {
  it("întoarce doar 'a' sau 'b'", () => {
    for (let i = 0; i < 100; i++) {
      expect(['a', 'b']).toContain(assignVariant());
    }
  });

  it('pe 1000 de rulări apar ambele variante (alocarea nu e degenerată)', () => {
    const counts = { a: 0, b: 0 };
    for (let i = 0; i < 1000; i++) counts[assignVariant()]++;
    expect(counts.a).toBeGreaterThan(0);
    expect(counts.b).toBeGreaterThan(0);
    expect(counts.a + counts.b).toBe(1000);
  });
});

describe('readVariant', () => {
  /** Mock minimal de AstroCookies: doar `get`, atât folosește readVariant. */
  const cookiesWith = (value: string | undefined): AstroCookies =>
    ({ get: () => (value === undefined ? undefined : { value }) }) as unknown as AstroCookies;

  it("acceptă valorile valide 'a' și 'b'", () => {
    expect(readVariant(cookiesWith('a'))).toBe('a');
    expect(readVariant(cookiesWith('b'))).toBe('b');
  });

  it('respinge orice altă valoare cu null (realocare)', () => {
    expect(readVariant(cookiesWith('x'))).toBeNull();
    expect(readVariant(cookiesWith(''))).toBeNull();
    expect(readVariant(cookiesWith('A'))).toBeNull();
  });

  it('întoarce null când cookie-ul lipsește', () => {
    expect(readVariant(cookiesWith(undefined))).toBeNull();
  });

  it('citește implicit cookie-ul principal AB_COOKIE', () => {
    const cookies = {
      get: (name: string) => (name === AB_COOKIE ? { value: 'b' } : undefined),
    } as unknown as AstroCookies;
    expect(readVariant(cookies)).toBe('b');
    expect(readVariant(cookies, 'alt_cookie')).toBeNull();
  });
});
