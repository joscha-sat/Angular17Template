import { defineConfig } from 'eslint/config';
import deslint from '@deslint/eslint-plugin';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import angularEslint from '@angular-eslint/eslint-plugin';
import angularEslintTemplate from '@angular-eslint/eslint-plugin-template';
import templateParser from '@angular-eslint/template-parser';
import angular from 'angular-eslint';
import aiGuard from 'eslint-plugin-ai-guard';
import rxjsX from 'eslint-plugin-rxjs-x';
import customRules from './eslint-custom-rules/index.js';
import translocoPlugin from './eslint-transloco-plugin/index.js';
import oxlint from 'eslint-plugin-oxlint';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';

// Extract common browser globals for better maintainability
const browserGlobals = {
  ...globals.browser,
  ...globals.es2021,
};

// Common parser options
const appParserOptions = {
  sourceType: 'module',
  ecmaVersion: 2022,
};

const aiGuardConfig = {
  plugins: { 'ai-guard': aiGuard },
  rules: { ...aiGuard.configs.recommended.rules },
};

// Reusable rules for TypeScript files (updated)
const tsRules = {
  ...js.configs.recommended.rules,
  ...tseslint.configs.recommended.rules,
  ...angular.configs.tsRecommended[1].rules,
  ...rxjsX.configs.recommended.rules,
  ...unicorn.configs.recommended.rules,

  // Basic JavaScript rules from reference
  'arrow-body-style': 'error',
  complexity: [
    'error',
    {
      max: 20,
    },
  ],
  curly: ['error', 'all'],
  'default-case': 'error',
  eqeqeq: 'error',
  'max-lines': ['error', 1000],
  'no-duplicate-imports': 'error',
  'no-extra-bind': 'error',
  'no-labels': 'error',
  'no-new-func': 'error',
  'no-param-reassign': 'error',
  'no-return-await': 'error',
  'no-sequences': 'error',
  'no-template-curly-in-string': 'error',
  'no-void': 'error',
  'prefer-object-spread': 'error',
  'prefer-template': 'error',
  'space-in-parens': ['error', 'never'],
  yoda: 'error',
  'no-console': 'warn',

  // Existing rules
  'no-unused-vars': 'off',
  'rxjs-x/no-implicit-any-catch': 'off',
  'rxjs-x/no-async-subscribe': 'error',
  'rxjs-x/no-unbound-methods': 'error',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
  '@angular-eslint/directive-selector': [
    'error',
    { type: 'attribute', prefix: 'app', style: 'camelCase' },
  ],
  '@angular-eslint/component-selector': [
    'error',
    { type: 'element', prefix: 'app', style: 'kebab-case' },
  ],

  // Angular-specific rules from reference
  '@angular-eslint/no-forward-ref': 'error',
  '@angular-eslint/prefer-output-readonly': 'error',
  '@angular-eslint/use-lifecycle-interface': 'error',
  '@angular-eslint/no-input-rename': 'error',
  '@angular-eslint/no-output-rename': 'error',
  '@angular-eslint/no-lifecycle-call': 'error',
  '@angular-eslint/contextual-lifecycle': 'error',
  '@angular-eslint/no-pipe-impure': 'warn',
  '@angular-eslint/prefer-standalone': 'warn',
  '@angular-eslint/no-output-on-prefix': 'error',
  '@angular-eslint/prefer-signals': 'error',
  '@angular-eslint/use-pipe-transform-interface': 'error',
  '@angular-eslint/use-component-view-encapsulation': 'error',
  '@angular-eslint/no-input-prefix': [
    'error',
    { prefixes: ['on', 'btn', 'app', 'cmp'] },
  ],
  '@angular-eslint/use-injectable-provided-in': 'error',
  '@angular-eslint/no-empty-lifecycle-method': 'error',
  '@angular-eslint/no-async-lifecycle-method': 'error',
  '@angular-eslint/component-class-suffix': [
    'error',
    { suffixes: ['Component', 'Page', 'Dialog'] },
  ],
  '@angular-eslint/directive-class-suffix': [
    'error',
    { suffixes: ['Directive'] },
  ],
  // Good Practices
  '@angular-eslint/no-output-native': 'error',
  '@angular-eslint/no-queries-metadata-property': 'error',
  '@angular-eslint/no-inputs-metadata-property': 'error',
  '@angular-eslint/no-outputs-metadata-property': 'error',
  '@angular-eslint/prefer-output-emitter-ref': 'warn',

  // Optional but Useful
  '@angular-eslint/relative-url-prefix': 'error',
  '@angular-eslint/require-lifecycle-on-prototype': 'error',
  '@angular-eslint/no-attribute-decorator': 'warn',
  '@angular-eslint/sort-lifecycle-methods': 'warn',
  '@angular-eslint/no-developer-preview': 'error',
  '@angular-eslint/no-experimental': 'error',

  // New Signals-related rules
  '@angular-eslint/no-uncalled-signals': 'error',
  '@angular-eslint/prefer-signal-model': 'warn',
  'sonarjs/todo-tag': 'warn',

  // Additional recommended rules you might want to add:
  '@angular-eslint/sort-keys-in-type-decorator': 'warn',
  '@angular-eslint/consistent-component-styles': 'warn',
  '@angular-eslint/component-max-inline-declarations': [
    'warn',
    { template: 5, styles: 3 },
  ],
  '@typescript-eslint/explicit-module-boundary-types': 'error',
  '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  '@typescript-eslint/no-require-imports': 'error',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
  '@typescript-eslint/prefer-readonly': 'error',
  '@typescript-eslint/unbound-method': [
    'error',
    {
      ignoreStatic: true,
    },
  ],
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-non-null-assertion': 'warn',
  '@typescript-eslint/no-unsafe-assignment': 'warn',
  '@typescript-eslint/no-unsafe-call': 'warn',
  '@typescript-eslint/no-unsafe-member-access': 'warn',
  '@typescript-eslint/await-thenable': 'warn',
  '@typescript-eslint/no-misused-promises': 'warn',
  '@typescript-eslint/no-unnecessary-condition': 'warn',
  '@typescript-eslint/typedef': [
    'warn',
    {
      arrayDestructuring: true,
      arrowParameter: true,
      memberVariableDeclaration: true,
      objectDestructuring: true,
      parameter: true,
      propertyDeclaration: true,
      variableDeclaration: true,
      variableDeclarationIgnoreFunction: true,
    },
  ],
  '@typescript-eslint/explicit-function-return-type': [
    'warn',
    {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
    },
  ],
  'custom-rules/component-max-lines-warning': [
    'warn',
    {
      max: 300, // Warning threshold
      skipBlankLines: false,
      skipComments: false,
    },
  ],
  'custom-rules/component-max-lines-error': [
    'error',
    {
      max: 400, // Error threshold
      skipBlankLines: false,
      skipComments: false,
    },
  ],
  'custom-rules/method-too-complex-warning': [
    'warn',
    {
      max: 5,
    },
  ],
  'custom-rules/method-too-complex-error': [
    'error',
    {
      max: 9,
    },
  ],
};

// Configuration for TypeScript files (excluding spec files entirely) (modified with rxjs-x plugin)
const tsFilesConfig = {
  files: ['**/*.ts'],
  ignores: ['**/*.spec.ts', '**/*.routes.ts', '**/*main.ts'],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ...appParserOptions,
      projectService: true,
    },
    globals: browserGlobals,
  },
  processor: angular.processInlineTemplates,
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    '@angular-eslint': angularEslint,
    js: js,
    'rxjs-x': rxjsX,
    unicorn,
    'custom-rules': customRules,
  },
  rules: tsRules,
};

const tsParserSupportConfig = {
  files: ['**/*.routes.ts', '**/*main.ts'],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ...appParserOptions,
      projectService: true,
    },
    globals: browserGlobals,
  },
};

// Rules for HTML templates
const htmlTemplateRules = {
  ...angular.configs.templateRecommended[1].rules,
  ...angular.configs.templateAccessibility[1].rules,
  ...Object.fromEntries(
    Object.entries(translocoPlugin.rules).map(([ruleName]) => [
      `angular-transloco/${ruleName}`,
      'error',
    ]),
  ),
  'sonarjs/todo-tag': 'warn',
};
// Config for Angular HTML templates
const htmlTemplateFilesConfig = {
  files: ['**/*.html'],
  languageOptions: {
    parser: templateParser,
  },
  plugins: {
    '@angular-eslint/template': angularEslintTemplate,
    'angular-transloco': translocoPlugin,
  },
  rules: htmlTemplateRules,
};

// Angular, browser, and local mock contracts intentionally use values that generic security rules cannot classify.
const intentionalFalsePositiveConfig = {
  files: [
    'openapi-ts.config.ts',
    'src/app/api/auth.service.ts',
    'src/app/other/environments/environment*.ts',
    'src/app/other/interceptors/mock.interceptor.ts',
    'src/app/shared/template-datepicker/template-datepicker.component.html',
    'src/app/shared/template-input/template-input.component.html',
  ],
  rules: {
    'deslint/form-labels': 'off',
    'deslint/no-hardcoded-localhost': 'off',
    'deslint/no-hardcoded-secrets': 'off',
    'unicorn/no-array-sort': 'off',
  },
};

// Browser API keys are public by design; keep them visible without failing the lint gate.
const intentionalPublicConfigurationConfig = {
  files: ['src/app/other/environments/environment*.ts'],
  rules: {
    'ai-guard/no-hardcoded-secret': 'warn',
  },
};

const angularNullContractConfig = {
  files: ['**/*.ts'],
  rules: {
    // Angular forms and browser APIs use null as a meaningful empty value.
    'unicorn/no-null': 'off',
  },
};

const angularBootstrapSideEffectConfig = {
  files: ['src/app/app.config.ts'],
  rules: {
    // Angular locale registration must run once when the application module loads.
    'unicorn/no-top-level-side-effects': 'off',
  },
};

const intentionalFilenameConventionConfig = {
  files: [
    'src/app/models/*.ts',
    'src/app/other/abstract-classes/BaseTable.ts',
    'src/app/other/enums/ROUTES.ts',
    'src/app/other/types/*.type.ts',
  ],
  rules: {
    // These paths follow the existing class, enum, and type-file naming convention.
    'unicorn/filename-case': 'off',
  },
};

const intentionalTodoCommentConfig = {
  files: [
    'src/app/api/auth.service.ts',
    'src/app/app.routes.ts',
    'src/app/components/customers/customer-table/customer-table.component.ts',
    'src/app/components/login/login-form/login-form.component.html',
    'src/app/components/navigation/navigation.component.html',
    'src/app/components/navigation/navigation.component.ts',
    'src/app/components/tenant/tenant-add-edit-dialog/tenant-add-edit-dialog.component.ts',
    'src/app/components/tenant/tenant-header/tenant-header.component.ts',
  ],
  rules: {
    // These TODOs document intentionally unfinished template/demo workflows.
    'sonarjs/todo-tag': 'off',
    'unicorn/single-line-block-comment-style': 'off',
  },
};

// Export updated configuration
export default defineConfig([
  sonarjs.configs.recommended,
  deslint.configs.recommended,
  aiGuardConfig,
  tsParserSupportConfig,
  tsFilesConfig,
  htmlTemplateFilesConfig,
  intentionalFalsePositiveConfig,
  intentionalPublicConfigurationConfig,
  angularNullContractConfig,
  angularBootstrapSideEffectConfig,
  intentionalFilenameConventionConfig,
  intentionalTodoCommentConfig,
  {
    ignores: [
      'projects/**/*',
      'node_modules/**/*',
      'dist/**/*',
      '**/.angular/**/*',
      'src/client/**/*',
      '**/generated/**/*',
      '**/__generated__/**/*',
      '**/*.generated.*',
      '**/*.spec.ts',
    ],
  },
  ...oxlint.buildFromOxlintConfigFile('./.oxlintrc.json'),
]);
