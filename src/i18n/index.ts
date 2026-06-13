import { ro } from './ro';
import { en } from './en';
import type { UiStrings } from './ro';

export type Locale = 'ro' | 'en';
export const defaultLocale: Locale = 'ro';
export const locales: Locale[] = ['ro', 'en'];

const dictionaries: Record<Locale, UiStrings> = { ro, en };

/** Întoarce dicționarul de stringuri pentru un locale. */
export function getStrings(locale: Locale = defaultLocale): UiStrings {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** Helper `t` legat de un locale: `const t = useTranslations('ro')`. */
export function useTranslations(locale: Locale = defaultLocale): UiStrings {
  return getStrings(locale);
}

/** Extrage locale-ul dintr-un segment/valoare (fallback la implicit). */
export function resolveLocale(current: string | undefined): Locale {
  return current === 'en' ? 'en' : 'ro';
}

/**
 * Locale derivat din pathname, fără să atingă `Accept-Language`. Pe paginile
 * prerandate, `Astro.currentLocale` citește `Astro.request.headers` (avertisment
 * la build); pentru rutarea noastră (`prefixDefaultLocale: false`) prefixul din
 * URL e sursa corectă: `/en/...` → en, restul → ro (implicit).
 */
export function localeFromPath(pathname: string): Locale {
  return resolveLocale(pathname.split('/')[1]);
}

export type { UiStrings };
