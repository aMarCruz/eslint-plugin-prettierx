const deepClone = require('@jsbits/deep-clone')
const schemaObject = require('prettier/schema.json')
const settingsProps = require('../lib/schemas/settings.json')

const ignoredProps = Object.keys(settingsProps).concat([
  'cursorOffset',
  'filepath',
  'rangeEnd',
  'rangeStart',
])

const { properties } = schemaObject.definitions.optionsDefinition

/**
 * @type {typeof properties}
 */
const props = {}
Object.keys(properties)
  .filter(p => !ignoredProps.includes(p))
  .sort()
  .forEach(p => {
    props[p] = properties[p]
  })

module.exports = () => deepClone(props)
