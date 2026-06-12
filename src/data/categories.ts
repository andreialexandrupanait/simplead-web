/**
 * Categoriile articolelor de blog. Listă fixă (ca projectServices): o categorie
 * nouă = o linie aici, nu o migrație. Editabilă de Andrei.
 */
export const postCategories = [
  'Neuromarketing',
  'Branding',
  'Marketing digital',
  'Web & UX',
  'Grafică',
] as const;

export type PostCategory = (typeof postCategories)[number];
