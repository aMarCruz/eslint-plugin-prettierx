# Changelog of eslint-plugin-prettierx

## \[0.16.0] - 2021-01-19

### Added

- Set new rule `breakLongMethodChains` to `true`.

### Changed

- Updated Readme
- Updated dependencies, prettiex 0.16.0 and ESLint 7.15 or later
- Updated TypeScript to v4.1.x

## \[0.14.0] - 2020-08-10

### Changed

- Updated internal typings
- Updated dependencies, prettiex 0.14.0 and ESLint 7.2 or later
- Updated Readme

## \[0.13.1] - 2020-08-10

### Changed

- Updated internal typings
- Updated dependencies, prettiex 0.13.1 and ESLint 7.2 or later

## \[0.12.1] - 2020-05-28

This is the last version with support for ESLint 6.x and typescript-eslint v2.x

### Added

- typescript version >= 3.2 in `peerDependencies` to allow compatibility with typescript-eslint v2.34

### Changed

- Updated README.md, now includes default for Prettier v2
- Updated dependencies
- Use "^" instead "~" in the Prettierx version of `dependencies`

## \[0.12.0] - 2020-05-15

### Added

- Support for the new PrettierX option [`breakBeforeElse`](https://github.com/brodybits/prettierx/pull/224).

### Changed

- Using prettierx v0.12.0
- Revised prettierrc.json now includes "breakBeforeElse" support.
- Updated year in the LICENSE file.
- Updated devDependencies.

## \[0.11.0] - 2019-01-27

### Changed

- Now "settings.usePrettierrc" defaults to `true` for all presets.
- Revised prettierrc.json defaults, now includes "parenSpacing" support.
- Require nodeJS 10.12 or later.
- Updated devDependencies.

### Fixed

- Value of "quoteProps" must be "as-needed" in the "standardx" preset.

### Removed

- Removed fake Prettier package, please use [aMarCruz/prettier](https://github.com/aMarCruz/prettier).
- Removed TSLint, now using ESLint as TypeScript linter.

## \[0.10.0] - 2019-11-21

### Changed

- Version of this package follows the [prettierx](https://github.com/brodybits/prettierx) version.
- Updated dependencies, including Prettierx based on Prettier 1.9.1
- ESLint minimum is v6.2.2

## \[0.5.0] - 2019-10-30

### Changed

- Update Prettierx 0.8.0, based on Prettier 1.8.0
- Update the (fake) Prettier sub-package.
- Requires minimum Node 8 and ESLint 6.0.1

### Removed

- Test with StandardJS and others.

## \[0.4.0] - 2019-06-25

### Added

- New option `quoteProps`, similar to the [quote-props](https://eslint.org/docs/rules/quote-props) option of ESLint.
- New option `parenSpacing`, which inserts many extra spaces inside parentheses.

### Changed

- The standardize preset is configured with `quoteProps: consistent`.
- Updated dependencies, using Prettierx v0.7
- Requires NodeJS v8 or later.

## \[0.3.1] - 2019-02-27

### Changed

- Update dependencies.

### Fixed

- Wrong references to "plugin:prettier" instead "plugin:prettierx"

## \[0.3.0] - 2019-02-26

### Changed

- When running from the CLI, clear cache only at the first run.
- Breaking: Remove 'standardize' from "extends" in the preset 'standardize-bundle', to allow other configs override its rules before the exclusions.

## \[0.2.1] - 2019-02-25

### Added

- Prettier exclusions for '@typescript-eslint', 'babel', 'flowtype', 'react', 'standard', 'unicorn', 'vue'.
- Add the standardize-bundle preset.
- `parserOptions` block to the presets and the bundle preset.
- Exclusion for the unicorn config: `unicorn/escape-case`

### Changed

- Runs prettierx last in the parsing, to allow ESLint fixes take precedence.
- Allows the ESLint rule `no-useless-escape`.
- Update Readme.

### Fixed

- Presets not setting its options.

### Removed

- devDependency on standard.

## \[0.1.3] - 2019-02-23

### Added

- 'no-useless-escape' to the conflicting rules, test with '\ca'.

### Fixed

- Refence to unexistent 'preset' option in the prettierx rule.

## \[0.1.2] - 2019-02-22

### Added

- Markdown-lint config.

### Fixed

- Wrong name for '@typescript-eslint/eslint-plugin'
- Erroneous link to npm in the Readme.

## \[0.1.1] - Unpublished

- Having bugs.

## \[0.1.0] - 2019-02-22

First release.
