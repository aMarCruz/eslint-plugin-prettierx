const settingsSchema = require('../schemas/settings.json')

/**
 * Get the predefined options for the preset in use.
 *
 * @param {Dict} settings
 * @returns {PluginSettings}
 */
const getSettings = settings => {
  const defaults = {}

  Object.keys(settingsSchema).forEach(k => {
    defaults[k] = settingsSchema[k].default
  })

  settings = settings && settings.prettierx
  if (settings) {
    Object.assign(defaults, settings)
  }

  return defaults
}

module.exports = getSettings
