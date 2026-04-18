const requireTranslocoT = require('./rules/require-transloco-t');
const requireAltTranslocoT = require('./rules/require-alt-transloco-t');

module.exports = {
  rules: {
    'require-transloco-t': requireTranslocoT,
    'require-alt-transloco-t': requireAltTranslocoT,
  },
};
