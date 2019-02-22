# eslint-plugin-prettierx

[![License][license-badge]][license-url]
[![npm Version][npm-badge]][npm-url]

Format your code with ESLint using [Prettierx](https://github.com/brodybits/prettierx), with presets for [Prettier](https://prettier.io) and [StandardJS](https://standardjs.com/) or your custom options.

- Based on ESLint or external configuration.
- Presets\* for default options.

\* I'm using "preset" instead "config" because these set default prettierx options, in addition to ESLint rules.

| NOTE                                                      |
| --------------------------------------------------------- |
| This doc is very **WIP**, I have few time this days to it |

## Setup

Install [ESLint](http://eslint.org) v5.x and the Prettierx plugin with npm or yarn:

```bash
yarn add eslint eslint-plugin-prettierx -D
```

Install [@typescript-eslint/plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin), if you are using TypeScript (the parser is included with it):

```bash
yarn add @typescript-eslint/plugin -D
```

**Note:** I'm using ESLint 5.12 and 5.13, other versions must work, but I'm not fully sure.

Add `prettierx` to the "plugins" section of your configuration file (.eslintrc.js, .json, yaml, etc). You can omit the "eslint-plugin-" prefix.

This is an example in json for projects using TypeScript and the "standardize" preset:

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "env": {
    "es6": true,
    "node": true
  },

  "plugins": ["@typescript-eslint", "prettierx"],
  "extends": ["plugin:prettierx/standardize"]
}
```

That is all! but you can personalize it, if you want.

| **IMPORTANT:**                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The only precaution you should take is not to set rules that conflict with those of prettierx. A symptom of this is when two errors are shown at the same time or when correcting one another is shown. The provided presets override the conflicting rules of ESLint, but take care of other plugins. Generally, their "recommended" config does not establish rules for layout. |
| If you are using a lot of plugins, it is recommended that you use [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to filter out conflicting rules ...I know it is verbose.\*                                                                                                                 |

\* [eslint-config-standardize](https://www.npmjs.com/package/eslint-config-standardize) is WIP.

## Rules

Because the way that Prettierx works, this plugin has one only rule: `prettierx/options`, that contains all the plugin options.

```js
  'prettierx/options': [severity, preset, options]
```

- **`severity`**

  Common severity option for ESLint rules: `0`, `1`, `2`, "off", "warn", "error". The last turns prettierx off.

- **`preset`**

  One of the provided [presets](#presets): "default" (default), "standardx", "standardize".

  This is required if `options` is used.

- **`options`**

  Use the options object to override the preset [options](#options).

The precedence of the plugin configuration:

- `prettierx/options` from your ESLint config.
- .prettierrc, if configured in the [settings](#settings).
- .editorconfig, if configured and `usePrettierrc` is used.
- Preset options.

### Settings

To fine-tune, you can use the `settings` block of your ESLint file.

This is an example in json using the default values:

```json
{
  "settings": {
    "prettierx": {
      "usePrettierrc": false,
      "editorconfig": true,
      "ignorePath": ".prettierignore",
      "useCache": true,
      "withNodeModules": false
    }
  }
}
```

- **`usePrettierrc`**

  Type: `boolean`, default: `false`

  Set to `true` to look for a configuration file, if `false` the plugin or default settings will be used.

- **`editorconfig`**

  Type: `boolean`, default: `true`

  _Note:_ This setting is valid only for `usePrettierrc: true`.

  If set to `true` and an `.editorconfig` file is in your project, Prettierx will parse it and convert its properties to the corresponding prettierx configuration.

  This configuration will be overridden by `.prettierrc`, etc. Currently, the following EditorConfig properties are supported:

  - end_of_line
  - indent_style
  - indent_size/tab_width
  - max_line_length

- **`ignorePath`**

  Type: `string`, default: ".prettierignore"

  Path to a file containing patterns that describe files to ignore.

- **`withNodeModules`**

  Type: `boolean`, default: `false`

  Prettierx will ignore files located in `node_modules` directory. Use this flag to change the default behavior.

- **`useCache`**

  Type: `boolean`, default: `true`

  If set to `false`, all caching will be bypassed.

  Use `false` only for test the settings, leave the default for normal use.

## Presets

The presets allow you to set the initial values for the options.

It is recommended that you establish one, as each preset is responsible for overriding the conflicting ESLint rules (please see the FAQ).

If you want to configure prettierx by means of a file .prettierrc or .editorconfig, use the "default" preset or any other with the setting `usePrettierrc: true`.

In any case, you can use the "prettierx/options" rule, that has precedence over other options.

Three presets are provided:

- **default**

  These are the predefined prettierx options and it is the best choice if you are migrating from prettier or prettier-eslint.

- **standardx**

  Este es el estilo StandardJS, pero personalizable, como lo hace [standardx](https://github.com/standard/standardx).

  _This preset set `settings.prettierx.usePrettierrc` = `false`_

- **standardize**

  This is my favorite, a modified version of StandardJS with trailing commas (es5) and double quotes for JSX properties.

  _This preset set `settings.prettierx.usePrettierrc` = `false`_

The value options of the preset are used as defaults for missing rules when you override one or more options.

Although you can omit the presets and obtain the same values as the "default", it is not recommended because they disable some ESLint rules that can cause conflicts.

If you want to change the behavior of the plugin for certain directories, use the "overrides" property of the ESLint config.

## Supported Options

All allowed, but not all makes sense.

### Prettier Options

| Property             | Type    | Default    | Notes                                                                                                        |
| -------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| `printWidth`         | integer | 80         | Specify the line length that the printer will wrap on.                                                       |
| `tabWidth`           | integer | 2          | Specify the number of spaces per indentation-level.                                                          |
| `useTabs`            | boolean | false      | Indent lines with tabs instead of spaces.                                                                    |
| `semi`               | boolean | true       | Print semicolons at the ends of statements.                                                                  |
| `singleQuote`        | boolean | false      | Use single quotes instead of double quotes.                                                                  |
| `jsxSingleQuote`     | boolean | false      | Use single quotes instead of double quotes in JSX.                                                           |
| `trailingComma`      | enum    | "none"     | (none, es5, all) Print trailing commas wherever possible when multi-line.                                    |
| `bracketSpacing`     | boolean | true       | Print spaces between brackets in object literals.                                                            |
| `jsxBracketSameLine` | boolean | false      | Put the `>` of a multi-line JSX element at the end of the last line instead of being alone on the next line. |
| `arrowParens`        | enum    | "avoid"    | (avoid, always) Include parentheses around a sole arrow function parameter.                                  |
| `parser`             | string  | "babel"    | Specify which parser to use. Yo can also pass an already `require`d parser.                                  |
| `requirePragma`      | boolean | false      | Restrict to only format files that contain a special comment (`@prettier` or `@format`).                     |
| `insertPragma`       | boolean | false      | Insert a special `@format` marker at the top of files that have been formatted.                              |
| `proseWrap`          | enum    | "preserve" | (always, never, preserve) For markdown, use "never" if you want to rely on editor/viewer soft wrapping.      |

### Prettierx Extensions

| Property                   | Type    | Default | Notes                                                                                                                      |
| -------------------------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `alignObjectProperties`    | boolean | false   | Align colons in multiline object literals (not applied with any of the JSON parsers).                                      |
| `spaceBeforeFunctionParen` | boolean | false   | Put a space before function parenthesis.                                                                                   |
| `generatorStarSpacing`     | boolean | false   | Add spaces around the star (\*) in generator functions.                                                                    |
| `yieldStarSpacing`         | boolean | false   | Add spaces around the star (\*) in `yield` expressions.                                                                    |
| `alignTernaryLines`        | boolean | true    | Align ternary lines in case of multiline ternery term (Should be disabled for consistency with ESLint/StandardJS behavior. |
| `indentChains`             | boolean | true    | Print indents at the start of chained calls.                                                                               |

## VS Code ESLint

Install the plugin as normal, then use it with the "ESLint: Fix all auto-fixanle Problems" (it is not a formatter ...yet).

- Assign a hotkey

  Open `File > Preferences > Keyboard Shortcuts` and assign a key to "ESLint: Fix all auto-fixable Problems" (`eslint.executeAutofix`).

- If you want auto-fix when saving, in the VS Code settings set "eslint.autoFixOnSave" to `true`.

### Fix TypeScript

ESLint does not fix TypeScript files by default. To enable this feature you need the following config in the VS Code settings:

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true }
  ]
}
```

### Fix Fenced Blocks

To fix JS or TS blocks in markdown or HTML, try [eslint-plugin-markdown](https://www.npmjs.com/package/eslint-plugin-markdown) and [eslint-plugin-html](https://www.npmjs.com/package/eslint-plugin-html).

## As a git hook

(The easy way)

Install [lint-staged](https://github.com/okonet/lint-staged) along with [husky](https://github.com/typicode/husky)

```bash
yarn add lint-staged husky --dev
```

and add this config to your package.json

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "git add"],
    "*.{md,json,css}": ["prettierx --write", "git add"]
  }
}
```

The last line is to format other files with prettierx, if you wish.

## Migrating

Migrating from other tools (tslint, prettier, prettier-eslint, etc).

## Uderstanding Prettierx

## Precautions

Avoid formating rules from other plugins.

### Comment Directives

Do not use trailing comments for directives, put them to its own line.

## FAQ

## Known Issues

## TODO

- [ ] Better integration with eslint-config-standardize
- [ ] Test
- [ ] Enhance this doc
- [ ] Many other things

## License

The [MIT](LICENSE) License, &copy; 2019, Alberto Martínez

Parts of this plugin were taken from tools from [Prettier](https://github.com/prettier/prettier) under the MIT license.

[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://github.com/aMarCruz/eslint-plugin-standardize/blob/master/LICENSE
[npm-badge]: https://img.shields.io/npm/v/eslint-plugin-standardize.svg
[npm-url]: https://www.npmjs.com/package/eslint-plugin-standardize
