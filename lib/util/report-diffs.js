const { generateDifferences, showInvisibles } = require('prettier-linter-helpers')

// -----------------------------------------------------------------------------
//  Constants
// -----------------------------------------------------------------------------

const { INSERT, DELETE, REPLACE } = generateDifferences

/**
 * Enclose the name to replace in backticks if it is not quoted yet.
 * @param {string} value
 */
const _q = value => {
  if (!value) {
    return '""'
  }
  if (!/[^ ]/.test(value)) {
    return value.length === 1 ? '1 space' : `${value.length} spaces`
  }

  let q = '´'
  switch (value[0]) {
    case '`':
      q = '"'
      break
    case '"':
      q = "'"
      break
    case "'":
      q = '"'
      break
    // no default
  }
  return q + value + q
}

/**
 * Reports an "Insert ..." issue where text must be inserted.
 * @param {RuleContext} context - The ESLint rule context.
 * @param {number} offset - The source offset where to insert text.
 * @param {string} text - The text to be inserted.
 * @returns {void}
 */
const reportInsert = (context, offset, text) => {
  const end = offset
  const pos = context.getSourceCode().getLocFromIndex(offset)
  const loc = {
    start: pos,
    end: pos,
  }
  const code = showInvisibles(text)

  context.report({
    message: `Insert ${_q(code)}`,
    loc,
    fix (fixer) {
      return fixer.insertTextAfterRange([offset, end], text)
    },
  })
}

/**
 * Reports a "Delete ..." issue where text must be deleted.
 * @param {RuleContext} context - The ESLint rule context.
 * @param {number} offset - The source offset where to delete text.
 * @param {string} text - The text to be deleted.
 * @returns {void}
 */
const reportDelete = (context, offset, text) => {
  const end = offset + text.length
  const loc = {
    start: context.getSourceCode().getLocFromIndex(offset),
    end: context.getSourceCode().getLocFromIndex(end),
  }
  const code = showInvisibles(text)

  context.report({
    message: `Delete ${_q(code)}`,
    loc,
    fix (fixer) {
      return fixer.removeRange([offset, end])
    },
  })
}

/**
 * Reports a "Replace ... with ..." issue where text must be replaced.
 * @param {RuleContext} context - The ESLint rule context.
 * @param {number} offset - The source offset where to replace deleted text
 *    with inserted text.
 * @param {string} deleteText - The text to be deleted.
 * @param {string} insertText - The text to be inserted.
 * @returns {void}
 */
const reportReplace = (context, offset, deleteText, insertText) => {
  const end = offset + deleteText.length
  const loc = {
    start: context.getSourceCode().getLocFromIndex(offset),
    end: context.getSourceCode().getLocFromIndex(end),
  }
  const insertCode = showInvisibles(insertText)
  const deleteCode = showInvisibles(deleteText)

  context.report({
    message: `Replace ${_q(deleteCode)} with ${_q(insertCode)}`,
    loc,
    fix (fixer) {
      return fixer.replaceTextRange([offset, end], insertText)
    },
  })
}

/**
 * Send a report of failing rules to ESLint
 * @param {RuleContext} context Rule context
 * @param {string} source Original code
 * @param {string} prettierSource Formatted code
 */
const reportDiffs = (context, source, prettierSource) => {
  const differences = generateDifferences(source, prettierSource)

  differences.forEach(difference => {
    switch (difference.operation) {
      case INSERT:
        reportInsert(context, difference.offset, difference.insertText)
        break
      case DELETE:
        reportDelete(context, difference.offset, difference.deleteText)
        break
      case REPLACE:
        reportReplace(
          context,
          difference.offset,
          difference.deleteText,
          difference.insertText
        )
        break
      // no default
    }
  })
}

module.exports = reportDiffs
