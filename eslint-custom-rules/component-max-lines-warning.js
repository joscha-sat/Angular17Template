const createComponentMaxLinesRule = require('./create-component-max-lines-rule');

module.exports = createComponentMaxLinesRule({
  defaultMax: 300,
  description: 'enforce maximum line count for Angular component files (warning threshold)',
  message: 'File has too many lines ({{count}}). Warning threshold is {{max}}.',
});
