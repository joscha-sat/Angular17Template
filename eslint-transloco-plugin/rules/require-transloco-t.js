const TEXT_SKIP_CHECKS = [
  (text) => text.length < 2,
  (text) => /^[\d\s\-\+\*\/\=\.\,\;\:\!\?\(\)\[\]\{\}\<\>]+$/.test(text),
  (text) => text.includes('{{') || text.includes('}}') || text.includes('[') || text.includes(']'),
  (text) => /^(class|style|id|ng-|mat-)[a-zA-Z-]+$/.test(text),
  (text) => /^(https?:\/\/|\/|\.\.\/|#)[\w\-\.\/\?=&%]+$/.test(text),
  (text) => /^[a-zA-Z]+$/.test(text) && text.length < 4,
];

const TRANSLATION_ATTRIBUTE_NAMES = new Set(['transloco', 'translate']);
const NON_TRANSLATABLE_ELEMENT_NAMES = new Set(['title', 'mat-icon']);

const getNodeProperty = (node, propertyName) => {
  if (!node) {
    return undefined;
  }

  return node[propertyName];
};

const getReportableText = (node) => {
  const text = node.value?.trim();
  if (!text || TEXT_SKIP_CHECKS.some((skipCheck) => skipCheck(text))) {
    return undefined;
  }

  return text;
};

const isTranslationAttribute = (attribute) =>
  TRANSLATION_ATTRIBUTE_NAMES.has(attribute.name) || attribute.name?.startsWith('translate');

const hasTranslationAttribute = (element) =>
  element.attributes?.some(isTranslationAttribute) ?? false;

const shouldSkipElement = (element) => {
  if (element.type !== 'Element') {
    return false;
  }

  return hasTranslationAttribute(element) || NON_TRANSLATABLE_ELEMENT_NAMES.has(element.name);
};

const isInsideTranslatableElement = (node) => {
  let parent = node.parent;
  while (parent) {
    if (shouldSkipElement(parent)) {
      return true;
    }

    parent = parent.parent;
  }

  return false;
};

const isTranslocoPipeContainer = (parent) => {
  if (getNodeProperty(parent, 'type') !== 'Container') {
    return false;
  }

  const pipeName = getNodeProperty(getNodeProperty(parent, 'name'), 'name');
  if (pipeName !== 'pipe') {
    return false;
  }

  const callee = getNodeProperty(getNodeProperty(parent, 'name'), 'callee');
  return getNodeProperty(callee, 'name') === 'transloco';
};

module.exports = {
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
        const text = getReportableText(node);
        if (!text) {
          return;
        }

        if (isInsideTranslatableElement(node)) {
          return;
        }

        if (isTranslocoPipeContainer(node.parent)) {
          return;
        }

        context.report({
          node,
          message: `"${text}" should be piped in transloco.`,
        });
      },
    };
  },
};
