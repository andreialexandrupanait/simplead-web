import { z } from 'zod';

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
  // Un beneficiu pe linie.
  features: z.string().default(''),
  sort: z.coerce.number().int().min(0).max(9999).default(0),
  active: z.coerce.boolean().default(false),
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

export type RawPackageForm = {
  name: string;
  slug: string;
  kind: string;
  description: string;
  price: string;
  currency: string;
  interval: string;
  features: string;
  sort: string;
  active: string;
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
    features: String(form.get('features') ?? ''),
    sort: String(form.get('sort') ?? '0'),
    active: form.get('active') ? 'true' : '',
  };
  const parsed = packageFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors, raw };
  }
  return { ok: true, data: parsed.data };
}
