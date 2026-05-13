/**
 * @fileoverview Custom ESLint rules for Angular projects
 */

import componentMaxLinesWarning from './component-max-lines-warning.js';
import componentMaxLinesError from './component-max-lines-error.js';
import methodTooComplexWarning from './method-too-complex-warning.js';
import methodTooComplexError from './method-too-complex-error.js';

const customRules = {
  rules: {
    'component-max-lines-warning': componentMaxLinesWarning,
    'component-max-lines-error': componentMaxLinesError,
    'method-too-complex-warning': methodTooComplexWarning,
    'method-too-complex-error': methodTooComplexError,
  },
};

export default customRules;
