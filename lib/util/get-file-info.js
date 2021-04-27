/**
 * `getFileInfo` with support for more options inside the eslint config.
 *
 * @param {Prettier} prettier
 * @param {string} filePath
 * @param {PluginSettings} [options]
 */
const getFileInfo = (prettier, filePath, options) =>
  prettier.getFileInfo.sync(filePath, {
    resolveConfig: false,
    ignorePath: options.ignorePath,
    plugins: options.plugins,
    withNodeModules: options.withNodeModules,
  })

module.exports = getFileInfo
