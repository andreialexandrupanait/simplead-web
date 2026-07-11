import { describe, expect, it } from 'vitest';
import { breadcrumbLd, faqLd, itemListLd, packageProductLd } from '@lib/seo-schema';

const ORIGIN = 'https://simplead.ro';

describe('breadcrumbLd', () => {
  const crumbs = [
    { label: 'Acasă', href: '/' },
    { label: 'Servicii', href: '/servicii' },
    { label: 'UX/UI & Web Design' }, // pagina curentă, fără link
  ];
  const ld = breadcrumbLd(ORIGIN, crumbs);

  it('construiește un BreadcrumbList cu pozițiile 1..n', () => {
    expect(ld['@type']).toBe('BreadcrumbList');
    expect(ld.itemListElement.map((el: { position: number }) => el.position)).toEqual([1, 2, 3]);
  });

  it('lasă ultimul element (pagina curentă) fără `item`', () => {
    const last = ld.itemListElement.at(-1)!;
    expect(last.name).toBe('UX/UI & Web Design');
    expect(last).not.toHaveProperty('item');
  });

  it('transformă href-urile relative în URL-uri absolute pe origin', () => {
    expect(ld.itemListElement[0].item).toBe('https://simplead.ro/');
    expect(ld.itemListElement[1].item).toBe('https://simplead.ro/servicii');
  });
});

describe('faqLd', () => {
  it('mapează {q, body[]} pe perechi Question/Answer', () => {
    const ld = faqLd([{ q: 'Cât durează?', body: ['Depinde de proiect.', 'De obicei 4-6 săptămâni.'] }]);
    expect(ld['@type']).toBe('FAQPage');
    expect(ld.mainEntity).toHaveLength(1);
    expect(ld.mainEntity[0]['@type']).toBe('Question');
    expect(ld.mainEntity[0].name).toBe('Cât durează?');
    expect(ld.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
    expect(ld.mainEntity[0].acceptedAnswer.text).toBe('Depinde de proiect. De obicei 4-6 săptămâni.');
  });

  it('include list-ul opțional în text, cu bullet-uri', () => {
    const ld = faqLd([{ q: 'Ce include?', body: ['Pachetul include:'], list: ['design', 'implementare'] }]);
    expect(ld.mainEntity[0].acceptedAnswer.text).toBe('Pachetul include: • design • implementare');
  });
});

describe('itemListLd', () => {
  it('construiește ItemList cu poziții și URL-uri absolute', () => {
    const ld = itemListLd(ORIGIN, [
      { name: 'Web design', url: '/servicii/ux-ui-web-design' },
      { name: 'SEO', url: '/servicii/seo' },
    ]);
    expect(ld['@type']).toBe('ItemList');
    expect(ld.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Web design', url: 'https://simplead.ro/servicii/ux-ui-web-design' },
      { '@type': 'ListItem', position: 2, name: 'SEO', url: 'https://simplead.ro/servicii/seo' },
    ]);
  });
});

describe('packageProductLd', () => {
  const pkg = {
    slug: 'start',
    name: 'Pachet Start',
    description: 'Site de prezentare.',
    priceCents: 149900,
    currency: ' EUR ',
  };
  const ld = packageProductLd(ORIGIN, pkg);

  it('formatează prețul cu 2 zecimale din cenți', () => {
    expect(ld.offers.price).toBe('1499.00');
  });

  it('preia priceCurrency din pkg.currency cu trim', () => {
    expect(ld.offers.priceCurrency).toBe('EUR');
  });

  it('marchează oferta ca InStock, cu URL ancorat pe slug', () => {
    expect(ld.offers.availability).toBe('https://schema.org/InStock');
    expect(ld.offers['@type']).toBe('Offer');
    expect(ld.url).toBe('https://simplead.ro/pachete#start');
    expect(ld.offers.url).toBe('https://simplead.ro/pachete#start');
  });

  it('include descrierea doar când există', () => {
    expect(ld.description).toBe('Site de prezentare.');
    const fara = packageProductLd(ORIGIN, { ...pkg, description: null });
    expect(fara).not.toHaveProperty('description');
  });
});
