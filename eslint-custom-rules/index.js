/**
 * @fileoverview Custom ESLint rules for Angular projects
 */

"use strict";

module.exports = {
  rules: {
    "component-max-lines-warning": require("./component-max-lines-warning"),
    "component-max-lines-error": require("./component-max-lines-error"),
  },
};
