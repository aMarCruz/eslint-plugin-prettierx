/**
 * Static presets.
 *
 * The "default" preset is an empty object.
 * It will use the default prettierx options and the .editorconfig settings
 * if you set `settings.editorconfig: true` in your .eslintrc file.
 *
 * Both standardize & standardx include non-default options and options that
 * could be overridden by .editorconfig:
 * - end_of_line => `endOfLine`
 * - indent_style => `useTabs`
 * - indent_size / tab_width => `tabWidth`
 * - max_line_length => `printWidth`
 * - quote_type => `singleQuote`
 */
module.exports = {
  default: {},
  standardize: {
    arrowParens: 'avoid',
    endOfLine: 'lf',
    generatorStarSpacing: true,
    offsetTernaryExpressions: true,
    printWidth: 92,
    quoteProps: 'consistent',
    semi: false,
    singleQuote: true,
    spaceBeforeFunctionParen: true,
    tabWidth: 2,
    useTabs: false,
    yieldStarSpacing: true,
  },
  standardx: {
    arrowParens: 'avoid',
    endOfLine: 'lf',
    generatorStarSpacing: true,
    jsxSingleQuote: true,
    offsetTernaryExpressions: true,
    printWidth: 80,
    semi: false,
    singleQuote: true,
    spaceBeforeFunctionParen: true,
    tabWidth: 2,
    trailingComma: 'none',
    useTabs: false,
    yieldStarSpacing: true,
  },
}
