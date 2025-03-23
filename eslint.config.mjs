import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import angularEslint from "@angular-eslint/eslint-plugin";
import angularEslintTemplate from "@angular-eslint/eslint-plugin-template";
import templateParser from "@angular-eslint/template-parser";

export default defineConfig([
  {
    // TypeScript files config (.ts) - app, library or project code
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      globals: globals.browser,
      parserOptions: {
        project: ["tsconfig.app.json", "tsconfig.spec.json"],
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "@angular-eslint": angularEslint,
      "js": js,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...angularEslint.configs.recommended.rules,

      // Match your existing angular-eslint config:
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off"
    },
  },
  {
    // HTML Template files configuration
    files: ["**/*.html"],
    languageOptions: {
      parser: templateParser,
    },
    plugins: {
      "@angular-eslint/template": angularEslintTemplate,
    },
    rules: {
      ...angularEslintTemplate.configs.recommended.rules,
      ...angularEslintTemplate.configs.accessibility.rules,
    },
  },

  // Optional: You may again ignore the projects folder explicitly or other folders you don't need:
  {
    ignores: ["projects/**/*", "node_modules/**/*", "dist/**/*"],
  },
]);
