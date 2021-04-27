const fs = require('fs')
const prettier = require('prettier')

const UNDEF = '·¬_ö¿@·«UNDEF»·@¡ö_¬·'
const reRep = new RegExp(`['"]${UNDEF}['"]`, 'g')

/**
 * @param {string} key
 * @param {*} value
 */
const repFn = (key, value) => (value === undefined ? UNDEF : value)

/**
 * Convert object to string. Warning with `undefined` values.
 * @param {string} file
 * @param {object} data
 */
const jsonStr = (file, data) => {
  const isJS = file.endsWith('.js')

  return isJS ? 'module.exports=' + JSON.stringify(data, repFn) : JSON.stringify(data)
}

/**
 * Save the data to a JS or JSON file, formatted with pretierx
 * @param {string} filepath
 * @param {Record<string,*>} data
 */
const writeFile = async (filepath, data) => {
  const rootOpts = await prettier.resolveConfig(filepath, {
    editorconfig: true,
    useCache: true,
  })

  const options = { ...rootOpts, filepath }
  const dataStr = prettier.format(jsonStr(filepath, data), options)

  fs.writeFileSync(filepath, dataStr.replace(reRep, 'undefined'), 'utf8')
}

module.exports = writeFile
