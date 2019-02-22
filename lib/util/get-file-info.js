/**
 * getFileInfo with support for more options inside the eslint config.
 *
 * @param {Prettier} prettier
 * @param {string} filePath
 * @param {import('prettier').FileInfoOptions} [options]
 */
const getFileInfo = function (prettier, filePath, options) {
  options = options || {}

  return prettier.getFileInfo.sync(filePath, {
    ignorePath: options.ignorePath == null ? '.prettierignore' : options.ignorePath,
    plugins: options.plugins,
    withNodeModules: options.withNodeModules === true,
  })
}

module.exports = getFileInfo
