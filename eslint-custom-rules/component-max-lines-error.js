const createComponentMaxLinesRule = require('./create-component-max-lines-rule');

module.exports = createComponentMaxLinesRule({
  defaultMax: 400,
  description: 'enforce maximum line count for Angular component files (error threshold)',
  message: 'File has too many lines ({{count}}). Maximum allowed is {{max}}.',
});
