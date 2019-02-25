const eslintRules = require('eslint-config-prettier')
const prettierPresets = require('./presets')

/**
 * @typedef {object} Preset
 * @prop {Dict} settings
 * @prop {Dict} rules
 */
/**
 * @type {Dict<Preset>}
 */
const configs = {}

Object.keys(prettierPresets).reduce((presets, name) => {
  // First the rules
  const rules = Object.assign(
    { 'prettierx/options': 'error' },
    eslintRules
  )

  // Finish this preset
  presets[name] = {
    settings: {
      prettierx: {
        preset: name,
        usePrettierrc: name === 'default',
      },
    },
    rules,
  }

  return presets
}, configs)

Object.assign(configs, {
  '@typescript-eslint': require('eslint-config-prettier/@typescript-eslint'),
  babel: require('eslint-config-prettier/babel'),
  flowtype: require('eslint-config-prettier/flowtype'),
  react: require('eslint-config-prettier/react'),
  typescript: require('eslint-config-prettier/@typescript-eslint'),
  standard: require('eslint-config-prettier/standard'),
  unicorn: require('eslint-config-prettier/unicorn'),
  vue: require('eslint-config-prettier/vue'),
})

module.exports = configs
