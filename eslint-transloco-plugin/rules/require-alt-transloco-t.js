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
        // Find the alt attribute
        const altAttr = node.attributes?.find((attr) => attr.name === 'alt');

        if (altAttr && altAttr.value && altAttr.value.type === 'Text') {
          const altText = altAttr.value.value?.trim();

          // Skip empty alt attributes (intentionally decorative)
          if (!altText) return;

          // Skip if it's just a placeholder or very short
          if (altText.length < 3) return;

          // Skip if it looks like a filename or URL
          if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(altText)) return;

          // Skip if it contains only numbers/symbols
          if (/^[\d\s\-\+\*\/\=\.\,\;\:\!\?]+$/.test(altText)) return;

          // Skip if it's already using transloco
          if (
            altText.includes('| transloco') ||
            altText.includes('|transloco')
          ) {
            return;
          }

          // Report the violation
          context.report({
            node: altAttr,
            message: `Alt text "${altText}" should be piped in transloco.`,
          });
        }
      },
    };
  },
};
