const eslintRules = require('eslint-config-prettier').rules
const typescript = require('eslint-config-prettier/@typescript-eslint')
const babel = require('eslint-config-prettier/babel')
const flowtype = require('eslint-config-prettier/flowtype')
const react = require('eslint-config-prettier/react')
const standard = require('eslint-config-prettier/standard')
const unicorn = require('eslint-config-prettier/unicorn')
const vue = require('eslint-config-prettier/vue')
const prettierPresets = require('./presets')

// not included in eslint-config-prettier
Object.assign(unicorn.rules, { 'unicorn/escape-case': 0 })

/**
 * @typedef {object} Preset
 * @prop {Dict} parserOptions
 * @prop {Dict} settings
 * @prop {Dict} rules
 * @prop {any[]} [extends]
 * @prop {any[]} [plugins]
 */
/**
 * @type {Dict<Preset>}
 */
const configs = {}

Object.keys(prettierPresets).reduce((presets, name) => {
  // First the rules
  const rules = Object.assign(
    { 'prettierx/options': ['error', prettierPresets[name]] },
    eslintRules
  )

  // Finish this preset
  presets[name] = {
    parserOptions: {
      ecmaVersion: 2018,
      ecmaFeatures: {
        jsx: true,
      },
      sourceType: 'module',
    },
    settings: {
      prettierx: {
        preset: name,
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
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  settings: {
    prettierx: {
      preset: 'standardize',
      bundle: true,
      usePrettierrc: false,
    },
  },
  rules: Object.assign(
    { 'prettierx/options': ['warn', prettierPresets.standardize] },
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
