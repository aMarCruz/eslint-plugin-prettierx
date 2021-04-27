const fs = require('fs')
const path = require('path')
const prettierConf = require('eslint-config-prettier')

/**
 * @param {string} root
 */
module.exports = function makeRules (root) {
  const outFile = path.join(root, 'lib/configs/rules.json')

  const rulesArr = [
    ...Object.keys(prettierConf.rules),
    'arrow-body-style',
    'prefer-arrow-callback',
  ]

  const rulesToDisable = rulesArr
    .map(r => (r.includes('/') ? 'zzz' + r : r))
    .sort()
    .map(r => (r.includes('/') ? r.slice(3) : r))
    .reduce((o, r) => {
      o[r] = 'off'
      return o
    }, {})

  fs.writeFileSync(outFile, JSON.stringify(rulesToDisable, null, 2), 'utf8')
}
