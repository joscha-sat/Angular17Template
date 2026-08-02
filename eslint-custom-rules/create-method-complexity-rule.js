'use strict';

const FUNCTION_NODE_TYPES = new Set(['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression']);
const CONTROL_FLOW_NODE_TYPES = new Set([
  'IfStatement',
  'ConditionalExpression',
  'WhileStatement',
  'DoWhileStatement',
  'ForStatement',
  'ForInStatement',
  'ForOfStatement',
  'CatchClause',
]);

const isObject = (value) => value !== null && typeof value === 'object';

const getComplexityContribution = (currentNode) => {
  if (CONTROL_FLOW_NODE_TYPES.has(currentNode.type)) {
    return 1;
  }

  if (currentNode.type === 'SwitchCase' && currentNode.test) {
    return 1;
  }

  if (currentNode.type === 'LogicalExpression' && ['&&', '||'].includes(currentNode.operator)) {
    return 1;
  }

  return 0;
};

const getChildNodes = (currentNode) =>
  Object.entries(currentNode).flatMap(([propertyName, propertyValue]) => {
    if (propertyName === 'parent' || propertyValue === null) {
      return [];
    }

    if (Array.isArray(propertyValue)) {
      return propertyValue.filter(isObject);
    }

    return isObject(propertyValue) ? [propertyValue] : [];
  });

const countComplexity = (functionNode) => {
  let complexity = 1;
  const nodesToVisit = [functionNode.body];

  while (nodesToVisit.length > 0) {
    const currentNode = nodesToVisit.pop();
    if (!isObject(currentNode) || FUNCTION_NODE_TYPES.has(currentNode.type)) {
      continue;
    }

    complexity += getComplexityContribution(currentNode);
    nodesToVisit.push(...getChildNodes(currentNode));
  }

  return complexity;
};

const getFunctionName = (functionNode) => {
  if (functionNode.id?.name) {
    return functionNode.id.name;
  }

  return functionNode.parent?.key?.name || 'anonymous';
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
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      complex: message,
    },
  },

  create(context) {
    const options = context.options[0] || {};
    const maximumComplexity = options.max ?? defaultMax;
    const processedNodes = new Set();

    const reportComplexity = (functionNode) => {
      const complexity = countComplexity(functionNode);
      if (complexity <= maximumComplexity) {
        return;
      }

      const reportNode = functionNode.parent?.type === 'MethodDefinition' ? functionNode.parent.key : functionNode;
      context.report({
        node: reportNode,
        messageId: 'complex',
        data: {
          name: getFunctionName(functionNode),
          complexity,
          max: maximumComplexity,
        },
      });
    };

    const reportOnce = (functionNode) => {
      const nodeId = `${functionNode.loc.start.line},${functionNode.loc.start.column}`;
      if (processedNodes.has(nodeId)) {
        return;
      }

      processedNodes.add(nodeId);
      reportComplexity(functionNode);
    };

    return {
      FunctionDeclaration: reportOnce,
      FunctionExpression(functionNode) {
        if (functionNode.parent?.type === 'MethodDefinition') {
          return;
        }

        reportOnce(functionNode);
      },
      ArrowFunctionExpression: reportOnce,
      'MethodDefinition > FunctionExpression': reportOnce,
    };
  },
});
