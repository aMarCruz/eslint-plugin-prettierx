const prettierPresets = require('./presets')
const eslintRules = require('./eslint-rules')

const specialRules = {
  default: {
  },
  standardize: {
  },
  standardx: {
  },
}

/**
 * @typedef {object} Preset
 * @prop {Dict} settings
 * @prop {Dict} rules
 */
/**
 * @type {Dict<Preset>}
 */
const _presets = {}

module.exports = Object.keys(prettierPresets).reduce((presets, name) => {
  // First the rules
  const rules = Object.assign(
    { 'prettierx/options': 'error' },
    eslintRules,
    specialRules[name]
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
}, _presets)
