import { isFounderName } from '@data/site';

/** Avatar pentru un autor: foto pentru fondator, altfel monogramă (inițială). */
export function authorAvatar(name: string): { src: string | null; monogram: string } {
  return {
    src: isFounderName(name) ? '/andrei.jpg' : null,
    monogram: (name?.trim()?.charAt(0) || 'S').toUpperCase(),
  };
}
