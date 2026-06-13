import { describe, expect, it } from 'vitest';
import {
  findMaintenanceAddon,
  findMaintenanceBase,
  maintenanceAddons,
  maintenanceBase,
} from '@lib/maintenance-plans';

describe('catalog mentenanță', () => {
  it('găsește pachetul de bază după slug', () => {
    expect(findMaintenanceBase('mentenanta-standard')?.price).toBe(75);
    expect(findMaintenanceBase('inexistent')).toBeUndefined();
  });

  it('găsește add-on-ul după slug', () => {
    expect(findMaintenanceAddon('addon-seo')?.price).toBe(150);
    expect(findMaintenanceAddon('inexistent')).toBeUndefined();
  });

  it('are slug-uri unice și prețuri pozitive (integritatea sursei de adevăr)', () => {
    const all = [...maintenanceBase, ...maintenanceAddons];
    const slugs = all.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(all.every((p) => p.price > 0)).toBe(true);
  });
});
