# Changelog of eslint-plugin-prettierx

## \[0.2.2] - 2019-02-26

### Changed

- When running from the CLI, clear cache only at the first run.
- Remove 'standardize' from "extends" in the preset 'standardize-bundle', to allow other configs override its rules before the exclusions.

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
