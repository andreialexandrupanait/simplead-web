import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CLIENTS_DIR,
  contentTypeFor,
  isHtml,
  isValidSlug,
  previewUrl,
  resolveInVersion,
  slugifySegment,
  versionDir,
} from '@lib/server/client-previews';

describe('slugifySegment', () => {
  it('normalizează la un slug stabil, fără sufix de timp', () => {
    expect(slugifySegment('Beauty Pack Lipozomal')).toBe('beauty-pack-lipozomal');
    // Rulat de două ori dă același rezultat — slug-ul ajunge în linkul clientului.
    expect(slugifySegment('Beauty Pack')).toBe(slugifySegment('Beauty Pack'));
  });

  it('transliterează diacriticele românești', () => {
    expect(slugifySegment('Cabinet Stomatologic Iași')).toBe('cabinet-stomatologic-iasi');
    expect(slugifySegment('Mentenanță & Găzduire')).toBe('mentenanta-gazduire');
  });

  it('colapsează separatorii și taie cratimele de la capete', () => {
    expect(slugifySegment('  --Oferta / 2026--  ')).toBe('oferta-2026');
  });

  it('nu lasă niciodată separatori de cale sau puncte în slug', () => {
    expect(slugifySegment('../../etc/passwd')).toBe('etc-passwd');
    expect(slugifySegment('..')).toBe('');
    expect(slugifySegment('.')).toBe('');
  });

  it('taie la 60 de caractere fără să lase cratimă finală', () => {
    const out = slugifySegment('a'.repeat(80));
    expect(out).toHaveLength(60);
    expect(out.endsWith('-')).toBe(false);
  });
});

describe('isValidSlug', () => {
  it('acceptă slug-urile produse de slugifySegment', () => {
    expect(isValidSlug('liposomals')).toBe(true);
    expect(isValidSlug('v2')).toBe(true);
    expect(isValidSlug('beauty-pack-2026')).toBe(true);
  });

  it('respinge tot ce ar putea ieși din folder sau schimba semantica de cale', () => {
    for (const bad of [
      '',
      '.',
      '..',
      '../x',
      'a/b',
      'a\\b',
      'a.b',
      'A',
      '-x',
      'ș',
      'a'.repeat(61),
    ]) {
      expect(isValidSlug(bad), bad).toBe(false);
    }
  });
});

describe('resolveInVersion', () => {
  const base = path.join(CLIENTS_DIR, 'liposomals', 'v2');

  it('rezolvă fișiere în interiorul folderului versiunii', () => {
    expect(resolveInVersion('liposomals', 'v2', 'index.html')).toBe(path.join(base, 'index.html'));
    expect(resolveInVersion('liposomals', 'v2', 'assets/hero.webp')).toBe(
      path.join(base, 'assets', 'hero.webp'),
    );
  });

  it('blochează ieșirea din folder (path traversal)', () => {
    expect(resolveInVersion('liposomals', 'v2', '../v1/index.html')).toBeNull();
    expect(resolveInVersion('liposomals', 'v2', '../../../etc/passwd')).toBeNull();
    expect(resolveInVersion('liposomals', 'v2', 'a/../../../../etc/passwd')).toBeNull();
    expect(resolveInVersion('liposomals', 'v2', '/etc/passwd')).toBeNull();
  });

  it('respinge slug-uri invalide înainte de orice join', () => {
    expect(resolveInVersion('..', 'v2', 'index.html')).toBeNull();
    expect(resolveInVersion('liposomals', '..', 'index.html')).toBeNull();
    expect(resolveInVersion('lipo/somals', 'v2', 'index.html')).toBeNull();
  });

  it('nu confundă un folder cu prefix comun cu unul din interior', () => {
    // `liposomals-vechi` începe cu textul lui `liposomals`, dar e alt client.
    const sibling = resolveInVersion('liposomals', 'v2', '../../liposomals-vechi/v1/index.html');
    expect(sibling).toBeNull();
  });

  it('versionDir întoarce exact folderul versiunii', () => {
    expect(versionDir('liposomals', 'v2')).toBe(base);
    expect(versionDir('..', 'v2')).toBeNull();
  });
});

describe('contentTypeFor', () => {
  it('acoperă tipurile de care are nevoie un landing page', () => {
    expect(contentTypeFor('index.html')).toBe('text/html; charset=utf-8');
    expect(contentTypeFor('style.CSS')).toBe('text/css; charset=utf-8');
    expect(contentTypeFor('hero.webp')).toBe('image/webp');
    expect(contentTypeFor('font.woff2')).toBe('font/woff2');
  });

  it('respinge extensiile din afara allowlist-ului', () => {
    for (const bad of ['x.php', 'x.sh', 'x', 'x.env', '.htaccess']) {
      expect(contentTypeFor(bad), bad).toBeNull();
    }
  });

  it('isHtml recunoaște doar .html', () => {
    expect(isHtml('a.html')).toBe(true);
    expect(isHtml('A.HTML')).toBe(true);
    expect(isHtml('a.htm')).toBe(false);
  });
});

describe('previewUrl', () => {
  it('include slash final, ca să rezolve corect căile relative din HTML', () => {
    expect(previewUrl('liposomals')).toMatch(/\/liposomals\/$/);
    expect(previewUrl('liposomals', 'v2')).toMatch(/\/liposomals\/v2\/$/);
  });
});
