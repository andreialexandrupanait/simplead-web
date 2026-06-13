import eslintPluginAstro from 'eslint-plugin-astro';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // dist/.astro: build artefacte. design/docs: conținut, nu cod sursă.
    ignores: ['dist/', '.astro/', 'node_modules/', 'design/', 'docs/'],
  },
  // Reguli TypeScript recomandate pentru .ts/.tsx (lib server, componente React).
  ...tseslint.configs.recommended,
  // Astro: parserul plugin-ului folosește @typescript-eslint/parser pentru
  // frontmatter, deci TS-ul din blocul `---` (`!`, `as`, adnotări de tip) se
  // parsează corect. Fără el, eslint pica cu „Parsing error: Unexpected token”.
  ...eslintPluginAstro.configs.recommended,
  // React hooks pe componentele .tsx/.jsx: rules-of-hooks ca eroare (bug real),
  // exhaustive-deps ca avertisment (semnalează dependențe lipsă fără să pice build-ul).
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    rules: {
      // `_`-prefixed = intenționat neutilizat (ex. catch (_e), props destructurate).
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // Fișierele ambient .d.ts folosesc legitim `/// <reference>` (convenție Astro
    // pentru a lega tipurile generate din .astro/types.d.ts).
    files: ['**/*.d.ts'],
    rules: { '@typescript-eslint/triple-slash-reference': 'off' },
  },
);
