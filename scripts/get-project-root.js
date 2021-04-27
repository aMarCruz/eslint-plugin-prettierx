const fs = require('fs')
const path = require('path')

/**
 * Determinates if there's a valid package.json in a folder
 *
 * @param {string} pkgPath Path to check out.
 * @returns {boolean}
 */
const isValidPackage = pkgPath => {
  const pkgname = path.join(pkgPath, 'package.json')

  // Check the name & version if package.json exists.
  if (fs.existsSync(pkgname)) {
    try {
      const { name, version } = require(pkgname)
      if (name && version) {
        return true
      }
    } catch {
      //
    }
  }

  return false
}

/**
 * Returns the directory of the project.
 * The current or first parent with a package.json.
 *
 * Packages with a missing `name` or `version` are ignored.
 *
 * @param {string} [pkgPath=.] Initial directory to search, defaults to `process.cwd()`.
 * @returns {string} The package version, or an empty string if it could not be found.
 * @since 1.0.0
 */
const getProjectRoot = pkgPath => {
  // Start with the current working directory, with normalized slashes
  pkgPath = (pkgPath ? path.resolve(pkgPath) : process.cwd()).replace(/\\/g, '/')

  while (~pkgPath.indexOf('/')) {
    // Try to get the version, the package may not contain one.
    if (isValidPackage(pkgPath)) {
      return pkgPath
    }

    // package.json not found or does not contains version, move up
    pkgPath = pkgPath.replace(/\/[^/]*$/, '')
  }

  throw new Error('Cannot determinate the project root.')
}

module.exports = getProjectRoot
