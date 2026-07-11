/**
 * Semnificație statistică pentru testul A/B — modul PUR (fără I/O, testabil).
 *
 * Compară două proporții (ex. rata de lead pe varianta A vs B) printr-un
 * test z cu proporție combinată (pooled) și p-value two-tailed. Scopul e să
 * nu luăm decizii pe zgomot: uplift-ul relativ brut din /admin/experiment
 * arată „+40%" și la 3 conversii diferență, ceea ce nu înseamnă nimic.
 *
 * Fără dependențe: funcția de eroare (erf) e implementată cu aproximația
 * Abramowitz-Stegun 7.1.26 (eroare maximă ~1.5e-7 — mai mult decât suficient
 * pentru praguri de 0.05 / 0.10).
 */

export type TwoProportionResult = {
  /** Rata de conversie a variantei A (fracție 0..1). */
  rateA: number;
  /** Rata de conversie a variantei B (fracție 0..1). */
  rateB: number;
  /** Uplift relativ B vs A, în procente; null când rata A e 0. */
  lift: number | null;
  /** Scorul z al diferenței (semnul: pozitiv = B peste A). */
  zScore: number;
  /** Probabilitatea ca diferența să fie doar zgomot (two-tailed). */
  pValue: number;
  /** Semnificativ la 95% încredere (p < 0.05). */
  significant95: boolean;
  /** Semnificativ la 90% încredere (p < 0.10). */
  significant90: boolean;
};

/**
 * Funcția de eroare Gauss, aproximația Abramowitz-Stegun 7.1.26.
 * erf(-x) = -erf(x), deci calculăm pe |x| și punem semnul la final.
 */
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);

  // Coeficienții din Abramowitz & Stegun, Handbook of Mathematical Functions.
  const p = 0.3275911;
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;

  const t = 1 / (1 + p * ax);
  const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-ax * ax);
  return sign * y;
}

/** CDF-ul normalei standard: Φ(z) = (1 + erf(z/√2)) / 2. */
function normalCdf(z: number): number {
  return (1 + erf(z / Math.SQRT2)) / 2;
}

/**
 * Test z pe două proporții (pooled), two-tailed.
 *
 * @param convA conversii pe varianta A
 * @param nA    expuneri pe varianta A
 * @param convB conversii pe varianta B
 * @param nB    expuneri pe varianta B
 * @returns rezultatul testului sau null pe cazuri degenerate: expuneri zero,
 *          conversii negative sau mai mari decât expunerile, ori varianță
 *          nulă (0% sau 100% conversie pe ambele variante — nu există test).
 */
export function twoProportionTest(
  convA: number,
  nA: number,
  convB: number,
  nB: number,
): TwoProportionResult | null {
  if (!Number.isFinite(convA) || !Number.isFinite(nA) || !Number.isFinite(convB) || !Number.isFinite(nB))
    return null;
  if (nA <= 0 || nB <= 0) return null;
  if (convA < 0 || convB < 0 || convA > nA || convB > nB) return null;

  const rateA = convA / nA;
  const rateB = convB / nB;

  // Proporția combinată (ipoteza nulă: ambele variante au aceeași rată).
  const pooled = (convA + convB) / (nA + nB);
  const se = Math.sqrt(pooled * (1 - pooled) * (1 / nA + 1 / nB));
  // Varianță nulă (nicio conversie sau conversie 100% peste tot) → test nedefinit.
  if (se === 0) return null;

  const zScore = (rateB - rateA) / se;
  // Two-tailed: p = 2 · (1 − Φ(|z|)); clamp de siguranță pe erorile de aproximare.
  const pValue = Math.min(1, Math.max(0, 2 * (1 - normalCdf(Math.abs(zScore)))));

  return {
    rateA,
    rateB,
    lift: rateA > 0 ? ((rateB - rateA) / rateA) * 100 : null,
    zScore,
    pValue,
    significant95: pValue < 0.05,
    significant90: pValue < 0.1,
  };
}

/**
 * Prag minim de expuneri per variantă sub care nu afișăm verdict —
 * cu eșantioane minuscule, aproximația normală nu e de încredere și
 * orice „semnificație" e probabil noroc.
 */
export function minSampleReached(nA: number, nB: number, min = 100): boolean {
  return nA >= min && nB >= min;
}

/** Formatare scurtă a p-value-ului pentru afișare. */
export function fmtP(pValue: number): string {
  return pValue < 0.001 ? 'p<0.001' : `p=${pValue.toFixed(3)}`;
}

/**
 * Verdict în română, scurt și direct, pentru o metrică testată.
 * `test` = rezultatul twoProportionTest (null = date degenerate),
 * `minReached` = rezultatul minSampleReached pe expuneri.
 */
export function verdict(test: TwoProportionResult | null, minReached: boolean): string {
  if (!minReached || test === null) return 'Prea puține date — lasă testul să ruleze';
  if (!test.significant95) return `Diferență nesemnificativă statistic (${fmtP(test.pValue)})`;
  return test.rateB > test.rateA
    ? `B mai bun cu ≥95% încredere (${fmtP(test.pValue)})`
    : `A mai bun cu ≥95% încredere (${fmtP(test.pValue)})`;
}
