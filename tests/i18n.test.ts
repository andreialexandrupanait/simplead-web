import { describe, expect, it } from 'vitest';
import { getStrings, resolveLocale } from '@i18n/index';

describe('resolveLocale', () => {
  it('recunoaște „en”, restul cade pe „ro” (implicit)', () => {
    expect(resolveLocale('en')).toBe('en');
    expect(resolveLocale('ro')).toBe('ro');
    expect(resolveLocale(undefined)).toBe('ro');
    expect(resolveLocale('de')).toBe('ro');
  });
});

describe('getStrings', () => {
  it('întoarce un dicționar pentru fiecare locale, cu fallback pe implicit', () => {
    expect(getStrings('ro')).toBeTypeOf('object');
    expect(getStrings('en')).toBeTypeOf('object');
    expect(getStrings()).toBe(getStrings('ro'));
  });
});
