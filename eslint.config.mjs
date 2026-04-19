import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    plugins: {
      import: importPlugin,
      react: pluginReact,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-require-imports': 'warn',
      'no-unexpected-multiline': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      'react/jsx-no-comment-textnodes': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  { ignores: ['**/node_modules/**', '**/.next/**', '**/out/**'] },
  { settings: { react: { version: 'detect' } } },
]);
