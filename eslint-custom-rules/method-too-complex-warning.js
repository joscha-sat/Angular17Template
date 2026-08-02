const createMethodComplexityRule = require('./create-method-complexity-rule');

module.exports = createMethodComplexityRule({
  defaultMax: 5,
  description: 'enforce maximum cyclomatic complexity for methods',
  message: "Method '{{name}}' has a complexity of {{complexity}}. Consider refactoring",
});
