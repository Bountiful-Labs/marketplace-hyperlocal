import baseConfig from '@repo/eslint-config/eslint.config.js';

export default [
  {
    ignores: [
      'next-env.d.ts',
      '.next/**',
      '.turbo/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
    ],
  },

  ...baseConfig,

  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
  },
];
