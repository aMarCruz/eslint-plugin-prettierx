#!/usr/bin/env node
// @ts-check
const fs = require('fs')
const path = require('path')
const prettier = require('prettierx')

const presetName = process.argv[2] || 'default'
const installing = process.argv[3] === '1'

if (/^-(h|H|-help)$/.test(presetName)) {
  const execFile = path.relative('.', process.argv[1])
  console.warn(`Usage: ${execFile.replace(/\.\w+$/, '')} preset-name`)
  return 1
}

/**
 * Returns the relative filename
 * @param {string} fullpath
 */
const relative = fullpath => path.relative('.', fullpath)

/**
 * Print a message to the user
 * @param {string} errText
 * @param {Error} [err]
 */
const showError = (errText, err) => {
  const lines = ['', ...errText.split('\n'), '']

  lines.forEach(s => console.error(s))
  if (err && err.stack) {
    const stack = err.stack
      .split(/[\n\r]+/)
      .map(s => (s.startsWith('    at ') ? s.substr(3) : ''))
      .filter(Boolean)

    console.error(stack.join('\n'))
    console.error()
  }
}

/**
 * Create the prettier configuration file (js or jason). If one already exists,
 * add the extension "bak" to it. If a bak already exists, it prints a warning
 * and returns a fault code.
 *
 * @param {string} filepath
 * @param {object} conf
 * @param {string} [currentfile] existing prettierrc file
 */
const createRcFile = (filepath, conf, currentfile) => {
  //
  const isJs = filepath.endsWith('.js')
  const text = `${isJs ? 'module.exports=' : ''}${JSON.stringify(conf)}`
  const data = prettier.format(text, { ...conf, filepath })

  let exitCode = 0

  if (fs.existsSync(currentfile)) {
    const bakfile = currentfile + '.bak'

    if (fs.existsSync(bakfile)) {
      filepath = relative(filepath)
      currentfile = relative(currentfile)
      throw new Error(
        `Both ${filepath} and ${currentfile}.bak already exists.\n` +
          `Please delete the .bak file.\n` +
          `The new configuration has NOT been written.`
      )
    }

    try {
      fs.renameSync(currentfile, bakfile)
    } catch (err) {
      throw new Error(`Cannot rename ${currentfile} to ${bakfile}: ${err.message}`, err)
    }
  }

  if (!exitCode) {
    try {
      fs.writeFileSync(filepath, data, 'utf8')
      //
    } catch (err) {
      filepath = relative(filepath)
      throw new Error(`Can't create ${filepath}: ${err.message || err}`, err)
    }
  }

  return exitCode
}

const checkConfig = (config, pluginPath) => {
  const conf = prettier.resolveConfig.sync(path.resolve('index.js'), { config })
  const defaults = require(path.join(pluginPath, 'defaults'))

  // can't get this
  delete conf.overrides

  // eslint-disable-next-line no-prototype-builtins
  const errors = Object.keys(conf).filter(k => !defaults.hasOwnProperty(k))

  if (errors.length) {
    config = relative(config)
    showError(
      `Your PrettierX config (${config}) has the following,\n` +
        `unknown options: "${errors.join('", "')}"`
    )
  }
}

/**
 * Reuse old prettierrc filename or create a new (json format)
 * @param {string} oldRcFile
 */
const getRcFilename = oldRcFile =>
  oldRcFile && /\.js(on)?$/.test(oldRcFile) ? oldRcFile : path.resolve('.prettierrc.json')

/**
 * Allows test this file out of node_modules/.bin
 */
const getPluginRoot = () => {
  try {
    return path.dirname(require.resolve('eslint-plugin-prettierx'))
  } catch {
    const root = process.cwd()
    if (fs.existsSync(path.resolve(root, 'lib/configs/presets.js'))) {
      return root
    }
  }
  throw new Error('Cannot found the eslint-plugin-prettierx folder')
}

// =============================================================================
//  M A I N
// =============================================================================

const makeConf = () => {
  const srcRoot = path.join(getPluginRoot(), 'lib/configs')

  const presets = require(path.join(srcRoot, 'presets'))
  const preset = presets[presetName]

  if (!preset) {
    throw new Error(
      `Unknown preset "${presetName}"\n` +
        `Must be one of "${Object.keys(presets).join('", "')}"`
    )
  }

  const oldRcFile = prettier.resolveConfigFile.sync(path.resolve('index.js'))
  const newRcFile = getRcFilename(oldRcFile)

  if (installing && oldRcFile) {
    checkConfig(oldRcFile, srcRoot)
  } else {
    createRcFile(newRcFile, preset, oldRcFile)
  }
}

try {
  makeConf()
} catch (err) {
  process.exitCode = 1
  showError(err.message, err)
}
