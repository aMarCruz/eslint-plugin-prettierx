const fs = require('fs')
const path = require('path')
const getSchemaProps = require('./get-schema-props')

/**
 * @param {string} root
 */
module.exports = function makeProps (root) {
  const outFile = path.join(root, 'lib/schemas/properties.json')

  const props = getSchemaProps()
  Object.keys(props).forEach(k => {
    delete props[k].default
  })

  fs.writeFileSync(outFile, JSON.stringify(props, null, 2), 'utf8')
}
