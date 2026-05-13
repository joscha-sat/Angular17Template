export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require transloco pipe for text content in templates',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
  },
  create(context) {
    return {
      // Visit text nodes in Angular templates
      Text(node) {
        // Skip if the text is empty or just whitespace
        const text = node.value?.trim();
        if (!text) return;

        // Skip if the text is too short (likely just punctuation or single characters)
        if (text.length < 2) return;

        // Skip if the text contains only numbers, symbols, or common non-translatable content
        if (/^[\d\s\-\+\*\/\=\.\,\;\:\!\?\(\)\[\]\{\}\<\>]+$/.test(text))
          return;

        // Skip if it looks like a variable/expression (contains common programming patterns)
        if (
          text.includes('{{') ||
          text.includes('}}') ||
          text.includes('[') ||
          text.includes(']')
        )
          return;

        // Skip if it's a common CSS class or attribute pattern
        if (/^(class|style|id|ng-|mat-)[a-zA-Z-]+$/.test(text)) return;

        // Skip if it's a common HTML attribute value
        if (/^(https?:\/\/|\/|\.\.\/|#)[\w\-\.\/\?=&%]+$/.test(text)) return;

        // Skip if it's a single word that's likely a technical term
        if (/^[a-zA-Z]+$/.test(text) && text.length < 4) return;

        // Check if this text node is inside an element with transloco or translate directives
        let parent = node.parent;
        while (parent) {
          if (parent.type === 'Element') {
            // Check for transloco attributes
            if (
              parent.attributes?.some(
                (attr) =>
                  attr.name === 'transloco' ||
                  attr.name === 'translate' ||
                  attr.name?.startsWith('translate'),
              )
            ) {
              return;
            }
            // Skip title tags as they're usually not translated in the HTML head
            if (parent.name === 'title') {
              return;
            }
            // Skip mat-icon elements as they use icon names, not translatable text
            if (parent.name === 'mat-icon') {
              return;
            }
          }
          parent = parent.parent;
        }

        // Check if the text is already inside a transloco pipe
        const parentContainer = node.parent;
        if (
          parentContainer &&
          parentContainer.type === 'Container' &&
          parentContainer.name?.name === 'pipe' &&
          parentContainer.name?.callee?.name === 'transloco'
        ) {
          return;
        }

        // Report the violation
        context.report({
          node,
          message: `"${text}" should be piped in transloco.`,
        });
      },
    };
  },
};
