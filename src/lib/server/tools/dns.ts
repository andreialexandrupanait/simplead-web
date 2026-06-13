import { Resolver } from 'node:dns/promises';

/**
 * Wrappere peste DNS cu timeout dur și erori normalizate: o căutare fără
 * rezultat (ENOTFOUND/ENODATA) întoarce listă goală, NU aruncă — instrumentele
 * dau un verdict, nu un 500. Folosim un Resolver dedicat ca să nu depindem de
 * starea globală.
 */
const TIMEOUT_MS = 5000;

function withTimeout<T>(p: Promise<T>, fallback: T): Promise<T> {
  return Promise.race([
    p.catch(() => fallback),
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), TIMEOUT_MS)),
  ]);
}

function resolver(): Resolver {
  const r = new Resolver({ timeout: TIMEOUT_MS, tries: 2 });
  return r;
}

export function resolveMx(domain: string): Promise<{ exchange: string; priority: number }[]> {
  return withTimeout(resolver().resolveMx(domain), []);
}

/** TXT: fiecare înregistrare e o listă de „chunks" pe care îi unim. */
export async function resolveTxt(domain: string): Promise<string[]> {
  const records = await withTimeout(resolver().resolveTxt(domain), [] as string[][]);
  return records.map((chunks) => chunks.join(''));
}

export function resolve4(domain: string): Promise<string[]> {
  return withTimeout(resolver().resolve4(domain), []);
}

export function resolve6(domain: string): Promise<string[]> {
  return withTimeout(resolver().resolve6(domain), []);
}

export function resolveNs(domain: string): Promise<string[]> {
  return withTimeout(resolver().resolveNs(domain), []);
}

export function resolveCname(domain: string): Promise<string[]> {
  return withTimeout(resolver().resolveCname(domain), []);
}
