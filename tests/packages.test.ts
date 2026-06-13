import { describe, expect, it } from 'vitest';
import { canBuy, formatPrice } from '@lib/server/packages';
import { fallbackPackages, type DisplayPackage } from '@data/packages-fallback';

const bySlug = (slug: string): DisplayPackage => {
  const p = fallbackPackages.find((x) => x.slug === slug);
  if (!p) throw new Error(`pachet lipsă în fallback: ${slug}`);
  return p;
};

describe('servicii la preț fix (fix-service)', () => {
  it('catalogul de fallback conține lucrări punctuale', () => {
    const fixes = fallbackPackages.filter((p) => p.kind === 'fix-service');
    expect(fixes.length).toBeGreaterThanOrEqual(3);
    expect(fixes.every((p) => p.priceCents > 0)).toBe(true);
  });

  it('canBuy permite cumpărarea doar pe preț fix + Stripe gata', () => {
    const fixed = bySlug('configurare-email-pro'); // pricing: 'fixed'
    const from = bySlug('optimizare-viteza'); // pricing: 'from'
    expect(canBuy(fixed, true)).toBe(true);
    expect(canBuy(fixed, false)).toBe(false); // fără Stripe → doar „Cere ofertă"
    expect(canBuy(from, true)).toBe(false); // „de la" → niciodată checkout direct
  });

  it('formatPrice prefixează „de la" pe pricing:from', () => {
    expect(formatPrice(bySlug('optimizare-viteza'))).toMatch(/^de la /);
    expect(formatPrice(bySlug('configurare-email-pro'))).not.toMatch(/^de la /);
  });
});
