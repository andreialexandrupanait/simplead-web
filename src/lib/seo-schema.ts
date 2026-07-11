/**
 * Constructori JSON-LD reutilizabili pentru prop-ul `schema` din BaseLayout.
 * Toate întorc obiecte simple (fără @context — BaseLayout le pune în @graph).
 */
import type { Faq } from '@data/content';

export type Crumb = { label: string; href?: string };

/** BreadcrumbList din firimiturile vizuale (ultimul element fără URL = pagina curentă). */
export function breadcrumbLd(origin: string, crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: new URL(c.href, origin).href } : {}),
    })),
  };
}

/** FAQPage din structura Faq a site-ului ({q, body[], list?}). */
export function faqLd(faqs: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: [...f.body, ...(f.list?.map((li) => `• ${li}`) ?? [])].join(' '),
      },
    })),
  };
}

/** ItemList pentru pagini de listare (servicii, portofoliu). */
export function itemListLd(origin: string, items: { name: string; url: string }[]) {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: new URL(it.url, origin).href,
    })),
  };
}

/**
 * Product + Offer pentru un pachet cu preț FIX (politica Google: `price` doar
 * pentru prețuri reale; pachetele „de la"/„la cerere" nu emit ofertă).
 */
export function packageProductLd(
  origin: string,
  pkg: { slug: string; name: string; description?: string | null; priceCents: number; currency: string },
) {
  return {
    '@type': 'Product',
    name: pkg.name,
    ...(pkg.description ? { description: pkg.description } : {}),
    url: `${origin}/pachete#${pkg.slug}`,
    brand: { '@id': `${origin}#organization` },
    offers: {
      '@type': 'Offer',
      price: (pkg.priceCents / 100).toFixed(2),
      priceCurrency: pkg.currency.trim(),
      availability: 'https://schema.org/InStock',
      url: `${origin}/pachete#${pkg.slug}`,
      seller: { '@id': `${origin}#organization` },
    },
  };
}
