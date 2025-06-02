import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import angularEslint from "@angular-eslint/eslint-plugin";
import angularEslintTemplate from "@angular-eslint/eslint-plugin-template";
import templateParser from "@angular-eslint/template-parser";
import rxjsX from 'eslint-plugin-rxjs-x';
import customRules from './eslint-custom-rules/index.js';

// Extract common browser globals for better maintainability
const browserGlobals = {
  ...globals.browser,
  ...globals.es2021
};

// Common parser options
const appParserOptions = {
  project: ["tsconfig.app.json"],
  sourceType: "module",
  ecmaVersion: 2022
};

// Reusable rules for TypeScript files (updated)
const tsRules = {
  ...js.configs.recommended.rules,
  ...tseslint.configs.recommended.rules,
  ...angularEslint.configs.recommended.rules,
  ...rxjsX.configs.recommended.rules,

  "no-unused-vars": "off",
  "rxjs-x/no-implicit-any-catch": "off",
  "@typescript-eslint/no-unused-vars": [
    "warn",
    {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      ignoreRestSiblings: true
    }
  ],
  "@angular-eslint/directive-selector": [
    "error",
    {type: "attribute", prefix: "app", style: "camelCase"},
  ],
  "@angular-eslint/component-selector": [
    "error",
    {type: "element", prefix: "app", style: "kebab-case"},
  ],
  "@typescript-eslint/no-explicit-any": "off",
  "custom-rules/component-max-lines-warning": [
    "warn",
    {
      max: 400,        // Warning threshold
      skipBlankLines: true,
      skipComments: true
    }
  ],
  "custom-rules/component-max-lines-error": [
    "error",
    {
      max: 500,        // Error threshold
      skipBlankLines: true,
      skipComments: true
    }
  ]
};

// Configuration for TypeScript files (excluding spec files entirely) (modified with rxjs-x plugin)
const tsFilesConfig = {
  files: ["**/*.ts"],
  ignores: ["**/*.spec.ts"],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ...appParserOptions,
      projectService: true,
    },
    globals: browserGlobals,
  },
  plugins: {
    "@typescript-eslint": tseslint.plugin,
    "@angular-eslint": angularEslint,
    js: js,
    "rxjs-x": rxjsX,
    "custom-rules": customRules,
  },
  rules: tsRules,
};

// Rules for HTML templates
const htmlTemplateRules = {
  ...angularEslintTemplate.configs.recommended.rules,
  ...angularEslintTemplate.configs.accessibility.rules,
};
// Config for Angular HTML templates
const htmlTemplateFilesConfig = {
  files: ["**/*.html"],
  languageOptions: {
    parser: templateParser,
  },
  plugins: {
    "@angular-eslint/template": angularEslintTemplate,
  },
  rules: htmlTemplateRules,
};

// Export updated configuration
export default defineConfig([
  tsFilesConfig,
  htmlTemplateFilesConfig,
  {
    ignores: ["projects/**/*", "node_modules/**/*", "dist/**/*", ".angular/**/*", "**/*.spec.ts"]
  }
]);
