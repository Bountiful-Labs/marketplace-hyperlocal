import baseConfig from '@repo/eslint-config/eslint.config.js';

export default [
  ...baseConfig,
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    ignores: ['.next', 'dist', 'build', 'node_modules'],
  },
];
