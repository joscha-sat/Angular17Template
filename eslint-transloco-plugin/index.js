import requireTranslocoT from './rules/require-transloco-t.js';
import requireAltTranslocoT from './rules/require-alt-transloco-t.js';

const translocoRules = {
  rules: {
    'require-transloco-t': requireTranslocoT,
    'require-alt-transloco-t': requireAltTranslocoT,
  },
};

export default translocoRules;
