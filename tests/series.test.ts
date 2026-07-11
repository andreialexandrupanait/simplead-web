import { describe, expect, it } from 'vitest';
import { fillDaily, sumSeries, trendPct } from '@lib/server/series';

const NOW = new Date('2026-07-11T09:00:00.000Z');

describe('fillDaily', () => {
  it('întoarce exact `days` puncte, terminând cu ziua `now`', () => {
    const s = fillDaily([], 7, NOW);
    expect(s).toHaveLength(7);
    expect(s[6].date).toBe('2026-07-11');
    expect(s[0].date).toBe('2026-07-05');
    expect(s.every((p) => p.value === 0)).toBe(true);
  });

  it('bucketează valori pe ziua corectă și le însumează', () => {
    const s = fillDaily(
      [
        { date: '2026-07-11T08:00:00Z', value: 100 },
        { date: '2026-07-11T20:00:00Z', value: 50 },
        { date: '2026-07-09T00:00:00Z', value: 30 },
      ],
      7,
      NOW,
    );
    expect(s[6].value).toBe(150); // 11 iul
    expect(s[4].value).toBe(30); // 9 iul
    expect(s[5].value).toBe(0); // 10 iul
  });

  it('folosește value=1 implicit (numărare de evenimente)', () => {
    const s = fillDaily([{ date: NOW }, { date: NOW }], 3, NOW);
    expect(s[2].value).toBe(2);
  });

  it('ignoră datele din afara ferestrei', () => {
    const s = fillDaily([{ date: '2026-01-01T00:00:00Z', value: 999 }], 7, NOW);
    expect(sumSeries(s)).toBe(0);
  });
});

describe('trendPct', () => {
  it('calculează delta procentuală între cele două jumătăți', () => {
    // Fereastra de 6 zile: 07-06..07-11. Vechi = 06/07/08, nou = 09/10/11.
    const points = fillDaily(
      [
        { date: '2026-07-07T00:00:00Z', value: 10 }, // jumătatea veche
        { date: '2026-07-10T00:00:00Z', value: 20 }, // jumătatea nouă
      ],
      6,
      NOW,
    );
    expect(trendPct(points, 3)).toBe(100); // 20 vs 10 → +100%
  });

  it('întoarce null când perioada anterioară e 0 și cea nouă nu', () => {
    const points = fillDaily([{ date: NOW, value: 5 }], 6, NOW);
    expect(trendPct(points, 3)).toBeNull();
  });

  it('întoarce null când nu sunt destule puncte', () => {
    expect(trendPct(fillDaily([], 4, NOW), 3)).toBeNull();
  });
});
