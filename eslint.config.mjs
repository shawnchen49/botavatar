import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { boundariesPlugin } from './scripts/eslint-boundaries.mjs';

export default tseslint.config(
  {
    ignores: [
      'docs/draft/**',
      '.pnpm-store/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/web/**',
      '**/generated/**',
      'coverage/**',
      'output/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  js.configs.recommended,
  { files: ['**/*.mjs'], languageOptions: { globals: globals.node } },
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
    },
  },
  {
    files: ['apps/**/*.ts', 'apps/**/*.tsx', 'packages/**/*.ts'],
    plugins: { architecture: boundariesPlugin },
    rules: { 'architecture/imports': 'error' },
  },
  {
    files: ['packages/core/src/**/*.ts', 'packages/renderer-svg/src/**/*.ts'],
    ignores: ['**/*.test.ts'],
    rules: {
      'no-restricted-globals': [
        'error',
        'process',
        'fetch',
        'window',
        'document',
        'Date',
        'performance',
        'crypto',
        'console',
      ],
      'no-restricted-properties': [
        'error',
        { object: 'Math', property: 'random', message: 'Use the seeded Core selection pipeline.' },
      ],
    },
  },
);
