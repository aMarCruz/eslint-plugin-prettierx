const rules = require('./rules.json')
const prettierPresets = require('./presets')

/**
 * @type {Presets}
 */
const configs = {}

/**
 * PrettierX defaults, standardize, standardx
 */
Object.keys(prettierPresets).forEach(preset => {
  //
  const prettierRules = prettierPresets[preset]

  const settings =
    preset === 'default'
      ? undefined
      : {
        settings: {
          prettierx: { preset },
        },
      }

  configs[preset] = {
    ...settings,
    rules: { 'prettierx/options': ['warn', prettierRules], ...rules },
  }
})

// /**
//  * Rules only
//  */
// configs.rulesoff = {
//   rules: { ...rules },
// }

/**
 * @type {Presets}
 */
module.exports = configs
