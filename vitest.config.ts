import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Aliasuri oglindite din tsconfig.json ca testele să importe la fel ca aplicația.
const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': r('./src'),
      '@components': r('./src/components'),
      '@layouts': r('./src/layouts'),
      '@data': r('./src/data'),
      '@lib': r('./src/lib'),
      '@i18n': r('./src/i18n'),
      '@assets': r('./src/assets'),
    },
  },
  test: {
    // Utilitarele testate sunt pur Node (crypto, CSV, scheme): fără DOM.
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
