import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Andrei Panait'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    service: z.enum([
      'Marketing',
      'Grafică',
      'Web Design',
      'Mentenanță',
      'Branding',
      'Foto-Video',
      'Social Media',
    ]),
    summary: z.string(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    result: z.string().optional(),
    cover: z.string().optional(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, portfolio };
