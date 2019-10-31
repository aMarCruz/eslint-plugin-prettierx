/**
 * @fileoverview Prettier formatter for ESLint
 * @author aMarCruz
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const reportDiffs = require('./util/report-diffs')
const getFileInfo = require('./util/get-file-info')
const schemas = require('./schemas')
const configs = require('./configs')
const presets = require('./configs/presets')

// -----------------------------------------------------------------------------
//  Privates
// -----------------------------------------------------------------------------

/**
 * Lazily-loaded Prettier.
 * @type {Prettier}
 */
let _prettier

/**
 * For the cli, clear cache only at the first run.
 */
let _cacheCleared = false

/**
 * Get the prdefined options for the preset in use.
 *
 * @param {Dict} settings
 */
const getDefaultSettings = settings => {
  settings = (settings && settings.prettierx) || {}
  return {
    ignorePath: settings.ignorePath || '',
    plugins: settings.plugins,
    useCache: settings.useCache !== false,
    usePrettierrc: settings.usePrettierrc !== false,
    editorconfig: settings.editorconfig !== false,
    withNodeModules: settings.withNodeModules === true,
    preset: settings.preset || '', // private
  }
}

/**
 * Get the preset options from the first item in the rule.
 *
 * @param {keyof typeof presets} name
 */
const getPresetOptions = function (name) {
  if (!name) {
    return undefined
  }
  if (!presets[name]) {
    console.log(`The preset "${name}" does not exists, using Prettier defaults.`)
  }
  return presets[name] || presets.default
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
          url: 'https://github.com/prettier/eslint-plugin-prettier#options',
        },

        fixable: 'code',
        schema: schemas,
      },

      /** @param {RuleContext} context */
      create (context) {
        const settings = getDefaultSettings(context.settings)
        const sourceCode = context.getSourceCode()
        const filepath = context.getFilename()
        const source = sourceCode.text

        if (_prettier && _prettier.clearConfigCache && !_cacheCleared) {
          console.log('Prettier: Clearing config cache ...')
          _prettier.clearConfigCache()
          _cacheCleared = true
        }

        return {
          /* eslint-disable-next-line complexity */
          'Program:exit' () {
            if (!_prettier) {
              // Prettier is expensive to load, so only load it if needed.
              // @ts-ignore
              _prettier = require('prettierx')
            }

            const prettierFileInfo = getFileInfo(_prettier, filepath, settings)

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
            if (parserBlocklist.includes(prettierFileInfo.inferredParser)) {
              prettierOptions.parser = 'babel'
            }

            // Presets has usePrettierrc=false, but the user can chage it.
            if (settings.usePrettierrc) {
              const prettierRcOptions = _prettier.resolveConfig.sync(filepath, {
                editorconfig: settings.editorconfig,
                useCache: settings.useCache,
              })
              Object.assign(prettierOptions, prettierRcOptions)
            }

            // Last, the options from the ESLint config.
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
              prettierSource = _prettier.format(source, prettierOptions)
            } catch (err) {
              if (!(err instanceof SyntaxError)) {
                throw err
              }

              /** @type {PrettierError} */
              const error = err

              let message = 'Parsing error: ' + error.message

              // Prettier's message contains a codeframe style preview of the
              // invalid code and the line/column at which the error occured.
              // ESLint shows those pieces of information elsewhere already so
              // remove them from the message
              if (error.codeFrame) {
                message = message.replace(`\n${error.codeFrame}`, '')
              }
              if (error.loc) {
                message = message.replace(/ \(\d+:\d+\)$/, '')
              }

              context.report({ message, loc: error.loc })
              return
            }

            if (source !== prettierSource) {
              reportDiffs(context, source, prettierSource)
            }
          },
        }
      },
    },
  },
}
