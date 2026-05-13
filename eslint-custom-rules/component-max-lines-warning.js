/**
 * @fileoverview Rule to enforce maximum line count for Angular component files (warning threshold)
 */

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce maximum line count for Angular component files (warning threshold)",
      category: "Best Practices",
      recommended: false,
    },
    schema: [
      {
        type: "object",
        properties: {
          max: {
            type: "integer",
            minimum: 0,
          },
          skipBlankLines: {
            type: "boolean",
          },
          skipComments: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      exceed: "File has too many lines ({{count}}). Warning threshold is {{max}}.",
    },
  },

  create(context) {
    const sourceCode = context.sourceCode;
    const option = context.options[0] || {};
    const max = option.max || 300;
    const skipBlankLines = option.skipBlankLines || false;
    const skipComments = option.skipComments || false;

    // Check if the file is an Angular component
    const isAngularComponent = (filename) => {
      return filename.endsWith('.component.ts');
    };

    return {
      Program: function checkLineCount(node) {
        const filename = context.filename;

        // Only apply this rule to Angular component files
        if (!isAngularComponent(filename)) {
          return;
        }

        let lines = sourceCode.lines;

        if (skipBlankLines) {
          lines = lines.filter(line => line.trim() !== "");
        }

        if (skipComments) {
          // This is a simplified approach - a more robust solution would
          // use the AST to identify comment nodes
          lines = lines.filter(line => {
            const trimmedLine = line.trim();
            return !(
              trimmedLine.startsWith("//") ||
              trimmedLine.startsWith("/*") ||
              trimmedLine.startsWith("*") ||
              trimmedLine.endsWith("*/")
            );
          });
        }

        const lineCount = lines.length;

        if (lineCount > max) {
          context.report({
            node,
            messageId: "exceed",
            data: {
              count: lineCount,
              max: max,
            }
          });
        }
      },
    };
  },
};
