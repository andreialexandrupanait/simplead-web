/**
 * Citire de secrete la RUNTIME, nu la build.
 *
 * `import.meta.env.*` e inline-uit de Vite la build; imaginea de producție se
 * construiește FĂRĂ secrete (vin din environment-ul containerului sau din DB),
 * deci valorile inline-uite ar rămâne permanent goale. De aceea citim întâi
 * `process.env` (runtime) și abia apoi `import.meta.env` (acoperă `pnpm dev`
 * local, unde Vite încarcă `.env` doar în import.meta.env).
 */
export function serverEnv(name: string): string | undefined {
  const fromProcess = typeof process !== 'undefined' ? process.env?.[name] : undefined;
  const fromMeta = (import.meta.env as Record<string, string | undefined>)[name];
  const value = (fromProcess ?? fromMeta)?.trim();
  return value ? value : undefined;
}
