import { describe, expect, it } from 'vitest';
import { slugify } from '@lib/slug';

describe('slugify', () => {
  it('coboară la lowercase și înlocuiește spațiile cu cratime', () => {
    expect(slugify('Salut Lume')).toBe('salut-lume');
  });

  it('transliterează diacriticele românești în ascii', () => {
    expect(slugify('Grafică și mentenanță')).toBe('grafica-si-mentenanta');
    expect(slugify('Înțelegere ușoară')).toBe('intelegere-usoara');
  });

  it('colapsează separatorii multipli și taie cratimele de la capete', () => {
    expect(slugify('  Hello --- World!  ')).toBe('hello-world');
  });

  it('întoarce „x” pentru intrări goale sau fără caractere valide', () => {
    expect(slugify('')).toBe('x');
    expect(slugify('!!!')).toBe('x');
    // @ts-expect-error — verificăm robustețea la null (guard `s ?? ''`).
    expect(slugify(null)).toBe('x');
  });
});
