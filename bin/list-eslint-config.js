#!/usr/bin/env node
// @ts-check

/**
 * There's a bug in 'arrow-parens' rule?
 * The explicit `{requireForBlockBody:false}` standardize options does not work
 * in this file, nut strange...
 * `node bin/list-eslint-config.js ./bin/list-eslint-config.js` seems correct.
 *
 * Update: This issue was fixed in ESLint 6.0.1
 */
/* es-(no-needed)-lint arrow-parens:[2,'as-needed'] */

const path = require('path')
const eslint = require('eslint')

const DEFAULT_EXTENSIONS = ['.js', '.jsx', '.mjs', '.ts', '.tsx']

/**
 * Get the ESLint configuration.
 * @param {string} filename
 */
function getConfig (filename) {
  if (!filename) {
    throw new TypeError('You must supply a filename.')
  }

  const filepath = path.resolve(filename)

  try {
    const cliEngine = new eslint.CLIEngine({
      extensions: DEFAULT_EXTENSIONS,
    })

    return cliEngine.getConfigForFile(filepath)
  } catch (error) {
    // is this noisy? Try setting options.disableLog to false
    console.error(`Cannot get config for "${filepath}"\n${error.message}`)
    process.exitCode = 1
  }

  return {}
}

const args = process.argv.slice(2)

const popOption = opt => {
  const idx = args.indexOf(opt)
  return idx > -1 && args.splice(idx, 1)[0]
}

if (!args.length || args.includes('-h') || args.includes('--help')) {
  console.log(`
  Usage: ${path.relative('.', __filename)} [options] js-filename

  List the ESLint settings used with 'js-filename'.

  Note: 'js-filename' can be absolute or relative to the current folder.

  options:
    -J, --json   Ourput as .json (forces '-no-color', default is 'console.dir')
    --no-color   Output with no colors
  `)
} else {
  const nocolor = popOption('--no-color')
  const asJson = popOption('-J') || popOption('--json')
  // console.dir({ nocolor, asJson, args })
  const config = getConfig(args[0])

  if (asJson) {
    console.log(JSON.stringify(config, null, 2))
  } else {
    console.dir(config, { colors: !nocolor, depth: 8 })
  }
}
