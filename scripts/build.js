const getProjectRoot = require('./get-project-root')
const makeDefaults = require('./make-defaults')
const makeProps = require('./make-props')
const makeRules = require('./make-rules')

const root = getProjectRoot()

makeDefaults(root)
makeProps(root)
makeRules(root)

console.log('Done.')
