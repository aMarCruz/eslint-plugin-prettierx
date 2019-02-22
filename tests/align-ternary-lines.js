/* eslint-disable comma-dangle, no-unused-vars */
/* eslint "indent": ["error", 2, {
    "SwitchCase": 1,
    "VariableDeclarator": 1,
    "outerIIFEBody": 1,
    "MemberExpression": 1,
    "FunctionDeclaration": { "parameters": 1, "body": 1 },
    "FunctionExpression": { "parameters": 1, "body": 1 },
    "CallExpression": { "arguments": 1 },
    "ArrayExpression": 1,
    "ObjectExpression": 1,
    "ImportDeclaration": 1,
    "flatTernaryExpressions": false,
    "ignoreComments": false
  }] */
const testingValue = [1, 2, 3, 4, 5]
const resultValue = Date.now()

const Foo =
  testingValue[0] === resultValue
    ? resultValue
    : testingValue[1] === resultValue
      ? testingValue
        ? 1
        : 0
      : testingValue[2] === resultValue
        ? resultValue
        : 0

const bar =
  testingValue[0] === 1
    ? {
      foo: 1
    }
    : resultValue
      ? {
        bar: 1
      }
      : 0

const isSpace = false
const dress = isSpace ? {
  spaceSuit: 3,
  oxygenCylinders: 6
} : {
  shirts: 3,
  paints: 3
}
