#!/usr/bin/env node
/* eslint-disable import/no-nodejs-modules */

const path = require('path')
const eslint = require('eslint')

const DEFAULT_EXTENSIONS = ['.js', '.jsx', '.mjs', '.ts', '.tsx']

/**
 * Get the ESLint configuration.
 * @param {string} filename
 */
function getConfig (filename) {
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

if (!args.length || args.includes('-h') || args.includes('--help')) {
  console.log(`
  Usage: ${path.relative('.', __filename)} js-file-path
  `)
} else {
  const config = getConfig(args[0])
  console.log(JSON.stringify(config, null, 2))
}
