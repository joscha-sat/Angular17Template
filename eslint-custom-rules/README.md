# Custom ESLint Rules for Angular

This directory contains custom ESLint rules for Angular projects.

## Rules

### component-max-lines-warning

This rule enforces a maximum line count for Angular component files with a warning threshold.

- **Rule ID**: `custom-rules/component-max-lines-warning`
- **Default Threshold**: 400 lines
- **Severity**: Warning

### component-max-lines-error

This rule enforces a maximum line count for Angular component files with an error threshold.

- **Rule ID**: `custom-rules/component-max-lines-error`
- **Default Threshold**: 500 lines
- **Severity**: Error

## Configuration

These rules are configured in the project's `eslint.config.mjs` file:

```javascript
// In eslint.config.mjs
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
```

## Options

Both rules support the following options:

- `max` (number): The maximum number of lines allowed in a file. Default is 400 for the warning rule and 500 for the error rule.
- `skipBlankLines` (boolean): Whether to ignore blank lines when counting. Default is `false`.
- `skipComments` (boolean): Whether to ignore comments when counting. Default is `false`.

## Purpose

These rules help maintain code quality by encouraging smaller, more manageable components. Large components can be difficult to understand, test, and maintain. By enforcing a maximum line count, we encourage developers to break down large components into smaller, more focused ones.
