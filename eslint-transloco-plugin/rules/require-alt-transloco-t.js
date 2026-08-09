const ALT_TEXT_SKIP_CHECKS = [
  (altText) => altText.length < 3,
  (altText) => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(altText),
  (altText) => /^[\d\s\-\+\*\/\=\.\,\;\:\!\?]+$/.test(altText),
  (altText) => altText.includes('| transloco') || altText.includes('|transloco'),
];

const getTextAltValue = (attribute) => {
  if (attribute?.value?.type !== 'Text') {
    return undefined;
  }

  return attribute.value.value?.trim();
};

const shouldReportAltText = (altText) => {
  if (!altText) {
    return false;
  }

  return !ALT_TEXT_SKIP_CHECKS.some((skipCheck) => skipCheck(altText));
};

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require alt attribute to use transloco for img elements',
      category: 'Accessibility',
      recommended: true,
    },
    fixable: null,
    schema: [],
  },
  create(context) {
    return {
      // Visit img elements in templates
      'Element[name="img"]'(node) {
        const altAttr = node.attributes?.find((attr) => attr.name === 'alt');
        const altText = getTextAltValue(altAttr);

        if (!shouldReportAltText(altText)) {
          return;
        }

        context.report({
          node: altAttr,
          message: `Alt text "${altText}" should be piped in transloco.`,
        });
      },
    };
  },
};
