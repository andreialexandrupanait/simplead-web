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

/** Extrage locale-ul din Astro.currentLocale (fallback la implicit). */
export function resolveLocale(current: string | undefined): Locale {
  return current === 'en' ? 'en' : 'ro';
}

export type { UiStrings };
