'use strict';

const isAngularComponentFile = (filename) => filename.endsWith('.component.ts');

const isCommentLine = (line) => {
  const trimmedLine = line.trim();
  return (
    trimmedLine.startsWith('//') ||
    trimmedLine.startsWith('/*') ||
    trimmedLine.startsWith('*') ||
    trimmedLine.endsWith('*/')
  );
};

const countSourceLines = (lines, skipBlankLines, skipComments) => {
  let countedLines = lines;

  if (skipBlankLines) {
    countedLines = countedLines.filter((line) => line.trim() !== '');
  }

  if (skipComments) {
    countedLines = countedLines.filter((line) => !isCommentLine(line));
  }

  return countedLines.length;
};

const getRuleOptions = (context, defaultMax) => {
  const options = context.options[0] || {};
  return {
    maximumLineCount: options.max ?? defaultMax,
    skipBlankLines: options.skipBlankLines ?? false,
    skipComments: options.skipComments ?? false,
  };
};

const reportExceededLineCount = (context, node, lineCount, maximumLineCount) => {
  context.report({
    node,
    messageId: 'exceed',
    data: {
      count: lineCount,
      max: maximumLineCount,
    },
  });
};

module.exports = ({ defaultMax, description, message }) => ({
  meta: {
    type: 'suggestion',
    docs: {
      description,
      category: 'Best Practices',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            minimum: 0,
          },
          skipBlankLines: {
            type: 'boolean',
          },
          skipComments: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      exceed: message,
    },
  },

  create(context) {
    const sourceCode = context.sourceCode;
    const { maximumLineCount, skipBlankLines, skipComments } = getRuleOptions(context, defaultMax);

    return {
      Program(node) {
        if (!isAngularComponentFile(context.filename)) {
          return;
        }

        const lineCount = countSourceLines(sourceCode.lines, skipBlankLines, skipComments);
        if (lineCount <= maximumLineCount) {
          return;
        }

        reportExceededLineCount(context, node, lineCount, maximumLineCount);
      },
    };
  },
});
