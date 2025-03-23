import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import angularEslint from "@angular-eslint/eslint-plugin";
import angularEslintTemplate from "@angular-eslint/eslint-plugin-template";
import templateParser from "@angular-eslint/template-parser";

export default defineConfig([
  {
    files: ["**/*.ts"],
    ignores: ["**/*.spec.ts"],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        project: ["tsconfig.app.json"],
        sourceType: "module",
        ecmaVersion: 2022
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "@angular-eslint": angularEslint,
      js: js,
    },
    rules: {
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
    }
  },
  {
    files: ["**/*.spec.ts"],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.jasmine,
        ...globals.es2021
      },
      parserOptions: {
        project: ["tsconfig.spec.json"],
        sourceType: "module",
        ecmaVersion: 2022
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "@angular-eslint": angularEslint,
      js: js,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...angularEslint.configs.recommended.rules,

      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  {
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
    }
  },
  {
    ignores: ["projects/**/*", "node_modules/**/*", "dist/**/*", ".angular/**/*"]
  }
]);
