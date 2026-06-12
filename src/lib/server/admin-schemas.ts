import { z } from 'zod';
import type { FeatureGroup } from '../../data/packages-fallback';

const slugSchema = z
  .string()
  .trim()
  .min(2, 'Slug-ul e obligatoriu.')
  .max(120)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug-ul poate conține doar litere mici, cifre și cratime.');

/** Validare server-side pentru formularul de pachete din admin. */
export const packageFormSchema = z.object({
  name: z.string().trim().min(2, 'Numele e obligatoriu (minim 2 caractere).').max(120),
  slug: z
    .string()
    .trim()
    .min(2, 'Slug-ul e obligatoriu.')
    .max(80)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug-ul poate conține doar litere mici, cifre și cratime.'),
  kind: z.enum(['service', 'maintenance', 'addon']),
  description: z.string().trim().max(2000).default(''),
  // Preț în EUR (acceptă „480" sau „480.50"); convertit în cenți la salvare.
  price: z
    .string()
    .trim()
    .regex(/^\d+([.,]\d{1,2})?$/, 'Prețul trebuie să fie un număr (ex. 480 sau 480.50).'),
  currency: z.enum(['EUR', 'RON']),
  interval: z.enum(['one_time', 'monthly', 'yearly']),
  // Mod preț/CTA: 'fixed' (preț + Cumpără), 'from' („de la"), 'quote' (la cerere).
  pricing: z.enum(['fixed', 'from', 'quote']).default('fixed'),
  // Un beneficiu pe linie; o linie „## Titlu" începe un grup de beneficii.
  features: z.string().default(''),
  // Grupare pe /pachete (doar pentru pachetele de servicii).
  category: z.enum(['', 'web', 'grafica-marketing']).default(''),
  // Text-callout afișat pe card (ex. precizarea despre logo).
  note: z.string().trim().max(600).default(''),
  sort: z.coerce.number().int().min(0).max(9999).default(0),
  active: z.coerce.boolean().default(false),
  // OTO: pachetul oferit cu discount după cumpărare ('' = fără ofertă).
  otoPackageId: z
    .string()
    .trim()
    .regex(/^$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'OTO invalid.')
    .default(''),
  otoDiscountPercent: z.coerce.number().int().min(0).max(90).default(0),
});

export type PackageFormData = z.infer<typeof packageFormSchema>;

export function priceToCents(price: string): number {
  return Math.round(Number.parseFloat(price.replace(',', '.')) * 100);
}

export function centsToPrice(cents: number): string {
  return (cents / 100).toFixed(2).replace(/\.00$/, '');
}

export function featuresToList(features: string): string[] {
  return features
    .split('\n')
    .map((f) => f.trim())
    .filter(Boolean);
}

/**
 * Parsează textarea-ul de beneficii. O linie „## Titlu" începe un grup; liniile
 * de sub ea sunt iteme. Dacă există cel puțin un grup, întoarce `featureGroups`;
 * altfel o listă plată în `features`. (Liniile fără grup ajung în `features`.)
 */
export function parseFeaturesInput(text: string): {
  features: string[];
  featureGroups: FeatureGroup[] | null;
} {
  const groups: FeatureGroup[] = [];
  const flat: string[] = [];
  let current: FeatureGroup | null = null;
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const heading = /^##\s+(.+)$/.exec(line);
    if (heading) {
      current = { heading: heading[1].trim(), items: [] };
      groups.push(current);
    } else if (current) {
      current.items.push(line);
    } else {
      flat.push(line);
    }
  }
  const realGroups = groups.filter((g) => g.items.length > 0);
  if (realGroups.length > 0) return { features: flat, featureGroups: realGroups };
  return { features: flat, featureGroups: null };
}

/** Serializează features/featureGroups înapoi în formatul textarea („## Titlu"). */
export function featuresToInput(features: string[], featureGroups?: FeatureGroup[] | null): string {
  if (featureGroups && featureGroups.length > 0) {
    return featureGroups.map((g) => `## ${g.heading}\n${g.items.join('\n')}`).join('\n');
  }
  return features.join('\n');
}

export type RawPackageForm = {
  name: string;
  slug: string;
  kind: string;
  description: string;
  price: string;
  currency: string;
  interval: string;
  pricing: string;
  features: string;
  category: string;
  note: string;
  sort: string;
  active: string;
  otoPackageId: string;
  otoDiscountPercent: string;
};

/** Parsează FormData în obiectul așteptat de schema (cu erori per câmp). */
export function parsePackageForm(
  form: FormData,
):
  | { ok: true; data: PackageFormData }
  | { ok: false; errors: Record<string, string[]>; raw: RawPackageForm } {
  const raw = {
    name: String(form.get('name') ?? ''),
    slug: String(form.get('slug') ?? ''),
    kind: String(form.get('kind') ?? 'service'),
    description: String(form.get('description') ?? ''),
    price: String(form.get('price') ?? ''),
    currency: String(form.get('currency') ?? 'EUR'),
    interval: String(form.get('interval') ?? 'one_time'),
    pricing: String(form.get('pricing') ?? 'fixed'),
    features: String(form.get('features') ?? ''),
    category: String(form.get('category') ?? ''),
    note: String(form.get('note') ?? ''),
    sort: String(form.get('sort') ?? '0'),
    active: form.get('active') ? 'true' : '',
    otoPackageId: String(form.get('otoPackageId') ?? ''),
    otoDiscountPercent: String(form.get('otoDiscountPercent') ?? '0'),
  };
  const parsed = packageFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors, raw };
  }
  return { ok: true, data: parsed.data };
}

/** Categoriile de servicii pentru proiectele de portofoliu (text liber în DB,
 * validat aici: o categorie nouă = o linie aici, nu o migrație). */
export const projectServices = [
  'Marketing',
  'Grafică',
  'Web Design',
  'Mentenanță',
  'Branding',
  'Foto-Video',
  'Social Media',
] as const;

const tagsField = z
  .string()
  .default('')
  .transform((s) =>
    s
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
  );

/** Validare pentru formularul de articole de blog din admin. */
export const postFormSchema = z.object({
  title: z.string().trim().min(2, 'Titlul e obligatoriu (minim 2 caractere).').max(180),
  slug: slugSchema,
  description: z
    .string()
    .trim()
    .max(300, 'Descrierea poate avea maxim 300 de caractere.')
    .default(''),
  body: z.string().default(''),
  author: z.string().trim().max(80).default('Andrei Panait'),
  tags: tagsField,
  cover: z.string().trim().max(500).default(''),
  status: z.enum(['draft', 'published']),
  publishedAt: z.string().trim().default(''),
  seoTitle: z.string().trim().max(180).default(''),
  seoDescription: z.string().trim().max(300).default(''),
});

export type PostFormData = z.infer<typeof postFormSchema>;

export type RawPostForm = Record<keyof PostFormData, string>;

export function parsePostForm(
  form: FormData,
):
  | { ok: true; data: PostFormData }
  | { ok: false; errors: Record<string, string[]>; raw: RawPostForm } {
  const raw: RawPostForm = {
    title: String(form.get('title') ?? ''),
    slug: String(form.get('slug') ?? ''),
    description: String(form.get('description') ?? ''),
    body: String(form.get('body') ?? ''),
    author: String(form.get('author') ?? 'Andrei Panait'),
    tags: String(form.get('tags') ?? ''),
    cover: String(form.get('cover') ?? ''),
    status: String(form.get('status') ?? 'draft'),
    publishedAt: String(form.get('publishedAt') ?? ''),
    seoTitle: String(form.get('seoTitle') ?? ''),
    seoDescription: String(form.get('seoDescription') ?? ''),
  };
  const parsed = postFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors, raw };
  }
  return { ok: true, data: parsed.data };
}

/** Validare pentru formularul de proiecte de portofoliu din admin. */
export const projectFormSchema = z.object({
  title: z.string().trim().min(2, 'Titlul e obligatoriu (minim 2 caractere).').max(180),
  slug: slugSchema,
  client: z.string().trim().max(120).default(''),
  service: z.enum(projectServices),
  summary: z.string().trim().max(300, 'Rezumatul poate avea maxim 300 de caractere.').default(''),
  challenge: z.string().trim().max(2000).default(''),
  solution: z.string().trim().max(2000).default(''),
  result: z.string().trim().max(2000).default(''),
  body: z.string().default(''),
  cover: z.string().trim().max(500).default(''),
  sort: z.coerce.number().int().min(0).max(9999).default(99),
  status: z.enum(['draft', 'published']),
  seoTitle: z.string().trim().max(180).default(''),
  seoDescription: z.string().trim().max(300).default(''),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

export type RawProjectForm = Record<keyof ProjectFormData, string>;

export function parseProjectForm(
  form: FormData,
):
  | { ok: true; data: ProjectFormData }
  | { ok: false; errors: Record<string, string[]>; raw: RawProjectForm } {
  const raw: RawProjectForm = {
    title: String(form.get('title') ?? ''),
    slug: String(form.get('slug') ?? ''),
    client: String(form.get('client') ?? ''),
    service: String(form.get('service') ?? 'Marketing'),
    summary: String(form.get('summary') ?? ''),
    challenge: String(form.get('challenge') ?? ''),
    solution: String(form.get('solution') ?? ''),
    result: String(form.get('result') ?? ''),
    body: String(form.get('body') ?? ''),
    cover: String(form.get('cover') ?? ''),
    sort: String(form.get('sort') ?? '99'),
    status: String(form.get('status') ?? 'draft'),
    seoTitle: String(form.get('seoTitle') ?? ''),
    seoDescription: String(form.get('seoDescription') ?? ''),
  };
  const parsed = projectFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors, raw };
  }
  return { ok: true, data: parsed.data };
}

/** Slug dintr-un titlu (sugestie în UI; serverul re-validează oricum). */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}
