
// http://json.schemastore.org/prettierrc
const prettier = require('./prettier.json')

// https://github.com/brodybits/prettierx
const prettierx = require('./prettierx.json')

const properties = Object.assign(
  {},
  prettier,
  prettierx
)

module.exports = [
  {
    type: 'object',
    properties,
    additionalProperties: false,
  },
]
