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
const LOGICAL_OPERATORS = new Set(['&&', '||']);

const isObject = (value) => value !== null && typeof value === 'object';

const getComplexityContribution = (currentNode) => {
  if (CONTROL_FLOW_NODE_TYPES.has(currentNode.type)) {
    return 1;
  }

  if (currentNode.type === 'SwitchCase') {
    return Number(Boolean(currentNode.test));
  }

  if (currentNode.type === 'LogicalExpression') {
    return Number(LOGICAL_OPERATORS.has(currentNode.operator));
  }

  return 0;
};

const getChildNodes = (currentNode) =>
  Object.entries(currentNode).flatMap(([propertyName, propertyValue]) => {
    if (propertyName === 'parent') {
      return [];
    }

    if (!isObject(propertyValue)) {
      return [];
    }

    if (Array.isArray(propertyValue)) {
      return propertyValue.filter(isObject);
    }

    return [propertyValue];
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

const getNodeName = (node) => {
  if (!isObject(node)) {
    return undefined;
  }

  return typeof node.name === 'string' ? node.name : undefined;
};

const getFunctionName = (functionNode) => {
  const functionName = getNodeName(functionNode.id);
  if (functionName) {
    return functionName;
  }

  const parentKey = functionNode.parent ? functionNode.parent.key : undefined;
  return getNodeName(parentKey) || 'anonymous';
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
