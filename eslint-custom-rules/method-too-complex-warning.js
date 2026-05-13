/**
 * @fileoverview Rule to enforce maximum cyclomatic complexity for methods
 */

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce maximum cyclomatic complexity for methods',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      complex:
        "Method '{{name}}' has a complexity of {{complexity}}. Consider refactoring",
    },
  },

  create(context) {
    const option = context.options[0] || {};
    const max = option.max || 5;

    // Simple function to count complexity
    function countComplexity(node) {
      let complexity = 1; // Base complexity

      // Count the number of certain node types in the function body
      const countNodes = (obj) => {
        if (!obj || typeof obj !== 'object') return;

        // Don't traverse into nested functions
        if (
          obj.type === 'FunctionDeclaration' ||
          obj.type === 'FunctionExpression' ||
          obj.type === 'ArrowFunctionExpression'
        ) {
          return;
        }

        // Increment complexity for control flow statements
        if (
          obj.type === 'IfStatement' ||
          obj.type === 'ConditionalExpression' ||
          obj.type === 'WhileStatement' ||
          obj.type === 'DoWhileStatement' ||
          obj.type === 'ForStatement' ||
          obj.type === 'ForInStatement' ||
          obj.type === 'ForOfStatement' ||
          obj.type === 'CatchClause'
        ) {
          complexity++;
        }

        // Increment for switch cases (except default)
        if (obj.type === 'SwitchCase' && obj.test) {
          complexity++;
        }

        // Increment for logical expressions
        if (
          obj.type === 'LogicalExpression' &&
          (obj.operator === '&&' || obj.operator === '||')
        ) {
          complexity++;
        }

        // Recursively check all properties
        Object.keys(obj).forEach((key) => {
          if (key !== 'parent' && obj[key] !== null) {
            if (Array.isArray(obj[key])) {
              obj[key].forEach(countNodes);
            } else if (typeof obj[key] === 'object') {
              countNodes(obj[key]);
            }
          }
        });
      };

      // Start counting from the function body
      if (node.body) {
        countNodes(node.body);
      }

      return complexity;
    }

    // Check function/method complexity
    function checkComplexity(node) {
      const complexity = countComplexity(node);

      if (complexity > max) {
        let name = 'anonymous';
        if (node.id && node.id.name) {
          name = node.id.name;
        } else if (node.parent && node.parent.key && node.parent.key.name) {
          name = node.parent.key.name;
        }

        // For class methods, report on the method name instead of the entire function
        if (node.parent && node.parent.type === 'MethodDefinition') {
          context.report({
            node: node.parent.key,
            messageId: 'complex',
            data: {
              name,
              complexity,
              max,
            },
          });
        } else {
          context.report({
            node,
            messageId: 'complex',
            data: {
              name,
              complexity,
              max,
            },
          });
        }
      }
    }

    // Track processed nodes to avoid duplicates
    const processedNodes = new Set();

    function checkComplexityOnce(node) {
      // Create a unique ID for the node based on its location
      const nodeId = `${node.loc.start.line},${node.loc.start.column}`;

      // Skip if we've already processed this node
      if (processedNodes.has(nodeId)) {
        return;
      }

      processedNodes.add(nodeId);
      checkComplexity(node);
    }

    return {
      FunctionDeclaration: checkComplexityOnce,
      FunctionExpression(node) {
        // Skip function expressions that are part of method definitions
        // to avoid duplicate warnings
        if (node.parent && node.parent.type === 'MethodDefinition') {
          return;
        }
        checkComplexityOnce(node);
      },
      ArrowFunctionExpression: checkComplexityOnce,

      // For class methods
      'MethodDefinition > FunctionExpression': checkComplexityOnce,
    };
  },
};
