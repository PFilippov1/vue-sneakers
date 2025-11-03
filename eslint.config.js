import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/node_modules/**',
    '**/*.min.js',
    '**/package-lock.json',
    '**/.gitignore',
    '**/.husky/**'
  ]),

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

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  skipFormatting,

  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': 'error',
      'vue/attribute-hyphenation': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-v-html': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-debugger': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-duplicate-imports': 'error',
      'vue/no-unused-vars': 'error',
      'vue/no-unused-components': 'error',
      'vue/no-undef-components': 'error'
    }
  },

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
      'vue/max-attributes-per-line': 'off',
      'vue/no-parsing-error': 'error'
    }
  }
])
