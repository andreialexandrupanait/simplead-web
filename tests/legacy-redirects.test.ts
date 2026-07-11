import { describe, expect, it } from 'vitest';
import { resolveLegacyRedirect, normalizeLegacyPath } from '@data/legacy-redirects';

// Set reprezentativ de slug-uri de articol publicate (subset din DB).
const slugs = new Set([
  'blog-uri-de-design',
  'sfaturi-pentru-designeri',
  'bad-design-vs-good-design',
  '5-carti',
]);

const redirect = (p: string) => resolveLegacyRedirect(p, slugs);

describe('resolveLegacyRedirect', () => {
  it('mapează un articol de la rădăcină la /blog/{slug} (cu și fără trailing slash)', () => {
    expect(redirect('/blog-uri-de-design/')).toBe('/blog/blog-uri-de-design');
    expect(redirect('/bad-design-vs-good-design')).toBe('/blog/bad-design-vs-good-design');
    expect(redirect('/5-carti/')).toBe('/blog/5-carti');
  });

  it('nu redirectează un slug de rădăcină care NU e articol', () => {
    expect(redirect('/pagina-inexistenta/')).toBeNull();
  });

  it('mapează paginile vechi 1:1', () => {
    expect(redirect('/despre-noi/')).toBe('/despre');
    expect(redirect('/politica-de-confidentialitate/')).toBe('/confidentialitate');
    expect(redirect('/termeni-si-conditii/')).toBe('/termeni');
    expect(redirect('/studii-de-caz/')).toBe('/portofoliu');
    expect(redirect('/oferta-speciala/')).toBe('/pachete');
  });

  it('corectează typo-ul de portofoliu (portfoliu + slug vechi)', () => {
    expect(redirect('/portfoliu/identitate-vizuala-feaa-galati/')).toBe(
      '/portofoliu/branding-feaa-galati',
    );
  });

  it('mapează categoriile WP (RO + EN) la categoria nouă', () => {
    expect(redirect('/categorie/brand/')).toBe('/blog/category/branding');
    expect(redirect('/category/brand/')).toBe('/blog/category/branding');
    expect(redirect('/categorie/marketing/')).toBe('/blog/category/marketing-digital');
    expect(redirect('/categorie/webdesign/')).toBe('/blog/category/web-ux');
    expect(redirect('/categorie/design/')).toBe('/blog/category/grafica');
  });

  it('categoriile fără echivalent nou cad pe /blog', () => {
    expect(redirect('/categorie/resurse/')).toBe('/blog');
    expect(redirect('/categorie/uncategorized/')).toBe('/blog');
  });

  it('paginarea veche de categorie merge pe pagina 1 a categoriei (fără lanț)', () => {
    expect(redirect('/categorie/marketing/page/2/')).toBe('/blog/category/marketing-digital');
    expect(redirect('/categorie/marketing/page/1/')).toBe('/blog/category/marketing-digital');
  });

  it('mapează arhivele pe dată, autor, index vechi și feed', () => {
    expect(redirect('/2020/')).toBe('/blog');
    expect(redirect('/2020/04/')).toBe('/blog');
    expect(redirect('/2020/05/19/page/2/')).toBe('/blog');
    expect(redirect('/author/andrei/')).toBe('/blog');
    expect(redirect('/articole/')).toBe('/blog');
    expect(redirect('/articole/page/2/')).toBe('/blog/page/2');
    expect(redirect('/feed/')).toBe('/rss.xml');
  });

  it('mapează vechile pagini de portofoliu/clienți (WordPress) la /portofoliu', () => {
    expect(redirect('/portfoliu/webdesign-avocat/')).toBe('/portofoliu');
    expect(redirect('/portfoliu/brosura/')).toBe('/portofoliu');
    expect(redirect('/clienti/premium-stone/')).toBe('/portofoliu');
    expect(redirect('/clienti/')).toBe('/portofoliu');
    expect(redirect('/portfoliu/')).toBe('/portofoliu');
  });

  it('mapările specifice de portofoliu/clienți au prioritate', () => {
    expect(redirect('/clienti/blitzstudio/')).toBe('/portofoliu/identitate-blitzstudio');
    expect(redirect('/portfoliu/identitate-vizuala-feaa-galati/')).toBe(
      '/portofoliu/branding-feaa-galati',
    );
  });

  it('mapează vechile servicii WP fără a atinge paginile de serviciu noi', () => {
    expect(redirect('/servicii/mentenanta-web/')).toBe('/mentenanta');
    expect(redirect('/servicii/web-development/')).toBe('/servicii/ux-ui-web-design');
    // Rutele noi de serviciu rămân neatinse:
    expect(redirect('/servicii/grafica-publicitara')).toBeNull();
    expect(redirect('/portofoliu/branding-feaa-galati')).toBeNull();
  });

  it('nu atinge rădăcina și rutele noi valide', () => {
    expect(redirect('/')).toBeNull();
    expect(redirect('/servicii')).toBeNull();
    expect(redirect('/blog/blog-uri-de-design')).toBeNull();
  });

  it('normalizează case + trailing slash', () => {
    expect(normalizeLegacyPath('/Despre-Noi/')).toBe('/despre-noi');
    expect(normalizeLegacyPath('/')).toBe('/');
  });
});
