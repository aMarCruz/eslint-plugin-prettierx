const eslintRules = require('eslint-config-prettier').rules
const typescript = require('eslint-config-prettier/@typescript-eslint')
const babel = require('eslint-config-prettier/babel')
const flowtype = require('eslint-config-prettier/flowtype')
const react = require('eslint-config-prettier/react')
const standard = require('eslint-config-prettier/standard')
const unicorn = require('eslint-config-prettier/unicorn')
const vue = require('eslint-config-prettier/vue')
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

/**
 * Preset for bundles
 */
configs['standardize-bundle'] = {
  settings: {
    prettierx: {
      preset: 'standardize-bundle',
      usePrettierrc: false,
    },
  },
  rules: Object.assign(
    { 'prettierx/options': ['error', prettierPresets.standardize] },
    eslintRules,
    react.rules,
    standard.rules,
    unicorn.rules
  ),
}

/**
 * Exclusions
 */
Object.assign(configs, {
  '@typescript-eslint': typescript,
  babel,
  flowtype,
  react,
  standard,
  unicorn,
  vue,
})

module.exports = configs
