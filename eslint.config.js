import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  // linting files
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,ts,tsx,vue}']
  },

  // ignored
  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/node_modules/**',
    '**/*.min.js',
    '**/package-lock.json'
  ]),

  // common
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },

  // base JS
  js.configs.recommended,

  // Vue rules
  ...pluginVue.configs['flat/recommended'],

  // Prettier
  skipFormatting,

  // common custom rules
  {
    rules: {
      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': 'error',
      'vue/attribute-hyphenation': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-v-html': 'off',

      // JavaScript rules
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-debugger': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-duplicate-imports': 'error'
    }
  },

  // for Vue
  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style']
        }
      ],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': 'off'
    }
  }
  // for TS
  // {
  //   files: ['**/*.ts', '**/*.tsx'],
  //   languageOptions: {
  //     parser: await import('@typescript-eslint/parser'),
  //     parserOptions: {
  //       project: './tsconfig.json'
  //     }
  //   },
  //   plugins: {
  //     '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default
  //   },
  //   rules: {
  //     '@typescript-eslint/no-unused-vars': 'warn',
  //     '@typescript-eslint/no-explicit-any': 'warn',
  //     '@typescript-eslint/explicit-function-return-type': 'off'
  //   }
  // }
])
