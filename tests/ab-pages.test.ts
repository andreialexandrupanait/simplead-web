import { describe, expect, it } from 'vitest';
import { hasV2, stripV2, v2Path } from '@data/ab-pages';

describe('hasV2', () => {
  it('acoperă toate paginile finale cu design nou', () => {
    for (const path of [
      '/',
      '/despre',
      '/servicii',
      '/pachete',
      '/blog',
      '/contact',
      '/mentenanta',
      '/intrebari-frecvente',
      '/portofoliu',
      '/suport',
    ]) {
      expect(hasV2(path), `${path} ar trebui să aibă v2`).toBe(true);
    }
  });

  it('acoperă paginile de detaliu servicii și portofoliu', () => {
    expect(hasV2('/servicii/ux-ui-web-design')).toBe(true);
    expect(hasV2('/portofoliu/orice-slug')).toBe(true);
  });

  it('nu rescrie articolele de blog, legal, admin și restul site-ului', () => {
    for (const path of ['/blog/un-articol', '/termeni', '/admin', '/cere-suport', '/resurse']) {
      expect(hasV2(path), `${path} NU ar trebui să aibă v2`).toBe(false);
    }
  });

  it('exclude slug-urile legacy de servicii (redirecționate 301 din config)', () => {
    for (const path of [
      '/servicii/marketing',
      '/servicii/web-design',
      '/servicii/grafica',
      '/servicii/mentenanta',
      '/servicii/mentenanta-website',
    ]) {
      expect(hasV2(path), `${path} e legacy și NU ar trebui să aibă v2`).toBe(false);
    }
  });
});

describe('v2Path', () => {
  it('mapează rădăcina la /v2 (fără slash final)', () => {
    expect(v2Path('/')).toBe('/v2');
  });

  it('prefixează restul rutelor cu /v2', () => {
    expect(v2Path('/despre')).toBe('/v2/despre');
  });
});

describe('stripV2', () => {
  it('elimină prefixul /v2 și întoarce calea publică', () => {
    expect(stripV2('/v2')).toBe('/');
    expect(stripV2('/v2/despre')).toBe('/despre');
  });

  it('lasă neatinse căile fără prefix', () => {
    expect(stripV2('/despre')).toBe('/despre');
  });

  it('nu taie greșit căi care doar încep cu textul „/v2"', () => {
    expect(stripV2('/v2x')).toBe('/v2x');
  });
});
