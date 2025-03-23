import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import angularEslint from "@angular-eslint/eslint-plugin";
import angularEslintTemplate from "@angular-eslint/eslint-plugin-template";
import templateParser from "@angular-eslint/template-parser";

// Extract common globals for better maintainability
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

// Reusable rules for TypeScript files
const tsRules = {
  ...js.configs.recommended.rules,
  ...tseslint.configs.recommended.rules,
  ...angularEslint.configs.recommended.rules,

  "no-unused-vars": "off",
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
  "@typescript-eslint/no-explicit-any": "off"
};

// Configuration for TypeScript files (excluding spec files entirely)
const tsFilesConfig = {
  files: ["**/*.ts"],
  ignores: ["**/*.spec.ts"],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: appParserOptions,
    globals: browserGlobals,
  },
  plugins: {
    "@typescript-eslint": tseslint.plugin,
    "@angular-eslint": angularEslint,
    js: js,
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

// all rules exported
export default defineConfig([
  tsFilesConfig,
  htmlTemplateFilesConfig,
  {
    ignores: ["projects/**/*", "node_modules/**/*", "dist/**/*", ".angular/**/*", "**/*.spec.ts"]
  }
]);
