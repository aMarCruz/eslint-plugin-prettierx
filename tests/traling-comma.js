/* eslint-disable no-unused-vars, node/no-unsupported-features/es-syntax */
/* eslint comma-dangle: [2, 'always-multiline'] */
// @ts-nocheck
/*
  Prettier trailigComma:es5 is quivalent to
  comma-dangle: [2, {
    arrays: 'always-multiline'
    objects: 'always-multiline',
    importa: 'always-multiline',
    exports: 'always-multiline',
    functions: 'never'
  } and
*/
import { writeFile, writeFileSync } from 'fs'
import {
  basename,
  dirname,
  extname,
  format,
  isAbsolute,
  normalize,
  parse,
  relative,
  resolve,
} from 'path'

var a

a = {
  a: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  b: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
}

a = ['a', 'b', 'c']
a = [
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
  'cccccccccccccccccccccccccccccccccccccccccccccccccccccc',
]

a = function (x, y) {}
a = function (
  xxxxxxxxxxxxxxxxxxxxxxxxxx,
  yyyyyyyyyyyyyyyyyyyyyyyyyy,
  zzzzzzzzzzzzzzzzzzzzzzzzzz
) {
  //
}
