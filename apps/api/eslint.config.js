import baseConfig from '@repo/eslint-config/eslint.config.js';

export default [
  ...baseConfig,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    ignores: ['dist', 'build', 'node_modules'],
  },
];
