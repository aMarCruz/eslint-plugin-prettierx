const path = require('path')
const getSchemaProps = require('./get-schema-props')
const writeFile = require('./write-file')

/**
 * @param {string} root
 */
module.exports = function makeDefaults (root) {
  const outFile = path.join(root, 'lib/configs/defaults.js')
  const outJson = {}
  const props = getSchemaProps()

  Object.keys(props)
    .sort()
    .forEach(k => {
      outJson[k] = props[k].default
    })

  writeFile(outFile, outJson, 'utf8')
}
