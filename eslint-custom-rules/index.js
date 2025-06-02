/**
 * @fileoverview Custom ESLint rules for Angular projects
 */

'use strict';

module.exports = {
  rules: {
    'component-max-lines-warning': require('./component-max-lines-warning'),
    'component-max-lines-error': require('./component-max-lines-error'),
    'method-too-complex-warning': require('./method-too-complex-warning'),
    'method-too-complex-error': require('./method-too-complex-error'),
  },
};
