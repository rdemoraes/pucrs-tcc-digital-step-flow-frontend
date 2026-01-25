// Try to load react-refresh plugin, but make it optional for environments without dependencies
let reactRefreshPlugin = null
try {
  reactRefreshPlugin = require('eslint-plugin-react-refresh')
} catch (e) {
  // Plugin not available (e.g., in MegaLinter environment)
}

const config = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'postcss.config.js', 'tailwind.config.js', 'vitest.config.ts', 'src/vite-env.d.ts'],
  parser: '@typescript-eslint/parser',
  plugins: reactRefreshPlugin ? ['react-refresh'] : [],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
}

// Only add react-refresh rule if plugin is available
if (reactRefreshPlugin) {
  config.rules['react-refresh/only-export-components'] = [
    'warn',
    { allowConstantExport: true },
  ]
}

module.exports = config

