/**
 * @fileoverview Prettier formatter for ESLint
 * @author aMarCruz
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const fs = require('fs')
const path = require('path')

const reportDiffs = require('./util/report-diffs')
const getFileInfo = require('./util/get-file-info')
const getSettings = require('./util/get-settings')

const configs = require('./configs')
const presets = require('./configs/presets')

/**
 * The properties has no `default` values. This is to allow granular changes
 * via comments. Otherwise, properties *not included* in the comment are reset
 * to its defaults.
 * Ex: /* eslint prettierx/options:[1,{printWidth:200}] *\/ will change
 * only the value of `printWidth`.
 *
 * The Prettier schema is in // http://json.schemastore.org/prettierrc
 */
const properties = require('./schemas/properties.json')

// -----------------------------------------------------------------------------
//  Privates
// -----------------------------------------------------------------------------

/**
 * Lazily-loaded Prettier.
 * @type {Prettier}
 */
let prettier

/**
 * Get the preset options from the first item in the rule.
 *
 * @param {keyof typeof presets} name
 */
const getPresetOptions = name => {
  if (!name) {
    return undefined
  }
  if (!presets[name]) {
    console.log(`The preset "${name}" does not exists, using Prettier defaults.`)
  }
  return presets[name]
}

/**
 * Given a filepath, get the nearest path that is a regular file.
 * The filepath provided by eslint may be a virtual filepath rather than a file
 * on disk. This attempts to transform a virtual path into an on-disk path
 * @param {string} filepath
 * @returns {string}
 */
const getOnDiskFilepath = filepath => {
  try {
    if (fs.statSync(filepath).isFile()) {
      return filepath
    }
  } catch (err) {
    // https://github.com/eslint/eslint/issues/11989
    if (err.code === 'ENOTDIR') {
      return getOnDiskFilepath(path.dirname(filepath))
    }
  }

  return filepath
}

// -----------------------------------------------------------------------------
// Plugin Definition
// -----------------------------------------------------------------------------

module.exports = {
  configs,

  rules: {
    options: {
      meta: {
        type: 'layout',

        docs: {
          description: 'enforce consistency with an opinionated format',
          category: 'Stylistic Issues',
          recommended: true,
          url: 'https://github.com/brodybits/prettierx#additional-prettierx-options',
        },

        fixable: 'code',
        schema: [
          {
            type: 'object',
            properties,
            additionalProperties: true,
          },
        ],
      },

      /** @param {RuleContext} context */
      create (context) {
        const settings = getSettings(context.settings)
        const sourceCode = context.getSourceCode()
        const filepath = context.getFilename()

        // Processors that extract content from a file, such as the markdown
        // plugin extracting fenced code blocks may choose to specify virtual
        // file paths. If this is the case then we need to resolve prettier
        // config and file info using the on-disk path instead of the virtual
        // path.
        // See https://github.com/eslint/eslint/issues/11989 for ideas around
        // being able to get this value directly from eslint in the future.
        const onDiskFilepath = getOnDiskFilepath(filepath)
        const source = sourceCode.text

        return {
          /* eslint-disable-next-line complexity */
          'Program:exit' () {
            if (!prettier) {
              // Prettier is expensive to load, so only load it if needed.
              // @ts-ignore
              prettier = require('prettierx')
            }

            const prettierFileInfo = getFileInfo(prettier, onDiskFilepath, settings)

            // Skip if file is ignored using a .prettierignore file
            if (prettierFileInfo.ignored) {
              return
            }

            // ESLint suppports processors that let you extract and lint JS
            // fragments within a non-JS language. In the cases where prettier
            // supports the same language as a processor, we want to process
            // the provided source code as javascript (as ESLint provides the
            // rules with fragments of JS) instead of guessing the parser
            // based off the filename. Otherwise, for instance, on a .md file we
            // end up trying to run prettier over a fragment of JS using the
            // markdown parser, which throws an error.
            // If we can't infer the parser from from the filename, either
            // because no filename was provided or because there is no parser
            // found for the filename, use javascript.
            // This is added to the options first, so that
            // prettierRcOptions and presetOptions can still override
            // the parser.
            //
            // `parserBlocklist` should contain the list of prettier parser
            // names for file types where:
            // * Prettier supports parsing the file type
            // * There is an ESLint processor that extracts JavaScript snippets
            //   from the file type.
            const parserBlocklist = [null, 'graphql', 'markdown', 'html']

            // First, the low priority options in the chain
            /** @type {*} */
            const prettierOptions = Object.assign({}, getPresetOptions(settings.preset))

            // May allow the preset override the parser?
            if (
              filepath === onDiskFilepath &&
              parserBlocklist.includes(prettierFileInfo.inferredParser)
            ) {
              // Prettier v1.16.0 renamed the `babylon` parser to `babel`
              prettierOptions.parser = 'babel'
            }

            // Now override the preset with the prettierrc options
            if (settings.usePrettierrc) {
              const prettierRcOptions = prettier.resolveConfig.sync(onDiskFilepath, {
                editorconfig: settings.editorconfig,
                useCache: settings.useCache,
              })
              Object.assign(prettierOptions, prettierRcOptions)
            }

            // Last, the options from the ESLint config (eslintrc and/or comments)
            if (context.options[0]) {
              Object.assign(prettierOptions, context.options[0])
            }

            prettierOptions.filepath = filepath

            // prettier.format() may throw a SyntaxError if it cannot parse the
            // source code it is given. Ususally for JS files this isn't a
            // problem as ESLint will report invalid syntax before trying to
            // pass it to the prettier plugin. However this might be a problem
            // for non-JS languages that are handled by a plugin. Notably Vue
            // files throw an error if they contain unclosed elements, such as
            // `<template><div></template>. In this case report an error at the
            // point at which parsing failed.
            let prettierSource
            try {
              prettierSource = prettier.format(source, prettierOptions)

              if (source !== prettierSource) {
                reportDiffs(context, source, prettierSource)
              }
            } catch (err) {
              if (!(err instanceof SyntaxError)) {
                throw err
              }

              let message = 'Parsing error: ' + err.message

              // Prettier's message contains a codeframe style preview of the
              // invalid code and the line/column at which the error occured.
              // ESLint shows those pieces of information elsewhere already so
              // remove them from the message
              if (err.codeFrame) {
                message = message.replace(`\n${err.codeFrame}`, '')
              }
              if (err.loc) {
                message = message.replace(/ \(\d+:\d+\)$/, '')
              }

              context.report({ message, loc: err.loc })
            }
          },
        }
      },
    },
  },
}
