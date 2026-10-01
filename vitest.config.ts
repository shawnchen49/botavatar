import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['packages/**/*.test.ts', 'apps/**/*.test.ts', 'tests/**/*.test.mjs'],
    environment: 'node',
    restoreMocks: true,
    clearMocks: true,
  },
});
