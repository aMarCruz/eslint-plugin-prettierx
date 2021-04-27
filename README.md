# eslint-plugin-prettierx

[![License][license-badge]][license-url] [![npm Version][npm-badge]][npm-url]

[ESLint](http://eslint.org) plugin to format your code with [PrettierX](https://github.com/brodybits/prettierx).

- Based on the ESLint configuration and/or external prettierrc config file.
- Include PrettierX presets for [StandardJS](https://standardjs.com/) and [Standardize](https://www.npmjs.com/package/eslint-config-standardize).
- Each PrettierX option can be overwritten without affecting the rest.

**Requirements:**

- ESLint 7 or later
- NodeJS 10.13 or 12, or as required by ESLint

## <span style="color:red">IMPORTANT</span>

Since v0.18.0, eslint-plugin-prettierx does **not include** separate groups of rules for the plugins it supports, which are now included in the presets.

As far as `prettierx/standardize-bundle`\* is concerned, the new version of [eslint-config-standardize](https://www.npmjs.com/package/eslint-config-standardize) includes PrettierX, so the bundle is no longer necessary and has also been removed.

> \* Do not confuse the "standardize" preset with the "standardize-bundle". The former is a generic version focused on PrettierX and designed to be used with other plugins, while "standardize-bundle" was intended to be used as a complement of eslint-config-standardize.

Please see the [Changelog](CHANGELOG.md) for info about other changes.

## Setup

Install [ESLint](http://eslint.org) and the PrettierX plugin.

```bash
yarn add -D eslint eslint-plugin-prettierx
```

Install other plugins that you need.

Add "prettierx" to the `plugins` array of your `.eslintrc` file (.js, .json, .yaml, etc). You can omit the "eslint-plugin-" prefix.

Then, add to `extends` the configurations of other plugins that you are using, and bellow these, put "plugin:prettierx/&lt;preset&gt;", where `<preset>` is the name of the preset you want to use.

## Presets

The _presets_ of eslint-plugin-prettierx are special ESLint configurations that set the initial PrettierX options and disable various conflicting rules, both from ESLint and from other well-known [plugins](#supported_plugins). Three are provided:

- **default**

  These are the predefined prettierx options and it is the best choice if you are migrating from prettier or prettier-eslint.

- **standardx**

  This one mimics the StandardJS style. You can use it with the [eslint-config-standard](https://github.com/standard/eslint-config-standard), if you wish.

- **standardize**

  This is the preset that my team and I use, a modified version of StandardJS with trailing commas in multiline format, consistent quotes in object properties, and double quotes for JSX properties. Our full configuration, that already include this preset is in [eslint-config-standardize](https://github.com/aMarCruz/eslint-config-standardize) and [@quitsmx/eslint-config](https://github.com/quitsmx/eslint-config).

The provided presets only configure the style used by PrettierX, they do _**not enable**_ rules. You must use your own plugin configurations for that.

### Supported Plugins

eslint-plugin-prettierx include support for a few plugins:

- plugin:prettierx/@typescript-eslint for [@typescript-eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
- plugin:prettierx/babel for [eslint-plugin-babel](https://www.npmjs.com/package/eslint-plugin-babel)
- plugin:prettierx/flowtype for [eslint-plugin-flowtype](https://www.npmjs.com/package/eslint-plugin-flowtype)
- plugin:prettierx/react [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
- plugin:prettierx/standard [eslint-plugin-standard](https://www.npmjs.com/package/eslint-plugin-standard) (only the plugin)
- plugin:prettierx/unicorn [eslint-plugin-unicorn](https://www.npmjs.com/package/eslint-plugin-unicorn)
- plugin:prettierx/vue [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)

\* Plugins that do not affect the format ([node](https://www.npmjs.com/package/eslint-plugin-node), [promise](https://www.npmjs.com/package/eslint-plugin-promise), [compat](https://www.npmjs.com/package/eslint-plugin-compat), etc), does not conflict with PrettierX.

## Example

This is an example for projects based on TypeScript and React, with the "standardize" preset:

```bash
yarn add -D typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react
```

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "env": {
    "browser": true,
    "es2020": true
  },
  "plugins": ["@typescript-eslint", "react", "prettierx"],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettierx/standardize"
  ]
}
```

This .prettierrc.json file mirrors the "standardize" preset and can be used by the prettiex cli and other tools such as the [Prettier extension for VS Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

If you are using any Prettier tool, it is recommended that you use the Prettier package from [aMarCruz/prettier](https://github.com/aMarCruz/prettier) to avoid conflicts.

```json
{
  "arrowParens": "avoid",
  "generatorStarSpacing": true,
  "offsetTernaryExpressions": true,
  "printWidth": 92,
  "quoteProps": "consistent",
  "semi": false,
  "singleQuote": true,
  "spaceBeforeFunctionParen": true,
  "yieldStarSpacing": true
}
```

You can generate this file with the "prettierx-init" utility, provided by this plugin, from the command line.

```bash
npx prettierx-init standardize
```

NOTE:

The "default" preset generates an empty .prettierrc.json, which is fine and tells prettierx to use the default options, unless you overwrite one or more with ESLint. See [precedence](#precedence).

## Rules

Due to the way it works, this plugin has only one rule: `prettierx/options`, that contains all the prettierx options.

```js
  "prettierx/options": [severity, options],
```

- **`severity`**

  Common severity option for ESLint rules: `0`, `1`, `2`, "off", "warn", "error".
  Use `0` or "off" to disable prettierx.

- **`options`**

  Allows override the [options](#options) defined by the [preset](#presets) (you can also use a .prettierrc file for that).

### Options

PrettierX ships with a handful of customizable format options, usable in both the CLI and API.

These are the Prettier/PrettierX options and its default values, along with the values overridden by each preset:

| Property                    | default       | standardx | standardize    |
| --------------------------- | ------------- | --------- | -------------- |
| `alignObjectProperties`     | `false`       |           |                |
| `arrayBracketSpacing`       | `false`       |           |                |
| `arrowParens`               | `"always"`    | `"avoid"` | `"avoid"`      |
| `breakBeforeElse`           | `false`       |           |                |
| `breakLongMethodChains`     | `false`       |           |                |
| `computedPropertySpacing`   | `false`       |           |                |
| `cssParenSpacing`           | `false`       |           |                |
| `endOfLine`                 | `"lf"`        |           |                |
| `exportCurlySpacing`        | `true`        |           |                |
| `generatorStarSpacing`      | `false`       | `true`    | `true`         |
| `graphqlCurlySpacing`       | `true`        |           |                |
| `htmlVoidTags`              | `false`       |           |                |
| `htmlWhitespaceSensitivity` | `"css"`       |           |                |
| `importCurlySpacing`        | `true`        |           |                |
| `importFormatting`          | `"auto"`      |           |                |
| `indentChains`              | `true`        |           |                |
| `insertPragma`              | `false`       |           |                |
| `jsxBracketSameLine`        | `false`       |           |                |
| `jsxSingleQuote`            | `false`       | `true`    |                |
| `objectCurlySpacing`        | `true`        |           |                |
| `offsetTernaryExpressions`  | `false`       | `true`    | `true`         |
| `printWidth`                | `80`          |           | `92`           |
| `proseWrap`                 | `"preserve"`  |           |                |
| `quoteProps`                | `"as-needed"` |           | `"consistent"` |
| `requirePragma`             | `false`       |           |                |
| `semi`                      | `true`        | `false`   | `false`        |
| `singleQuote`               | `false`       | `true`    | `true`         |
| `spaceBeforeFunctionParen`  | `false`       | `true`    | `true`         |
| `spaceInParens`             | `false`       |           |                |
| `spaceUnaryOps`             | `false`       |           |                |
| `tabWidth`                  | `2`           |           |                |
| `templateCurlySpacing`      | `false`       |           |                |
| `trailingComma`             | `"es5"`       | `"none"`  |                |
| `typeAngleBracketSpacing`   | `false`       |           |                |
| `typeBracketSpacing`        | `false`       |           |                |
| `typeCurlySpacing`          | `true`        |           |                |
| `useTabs`                   | `false`       |           |                |
| `vueIndentScriptAndStyle`   | `false`       |           |                |
| `yamlBracketSpacing`        | `true`        |           |                |
| `yieldStarSpacing`          | `false`       | `true`    | `true`         |

To learn more about these options please see the [Options of PrettierX](https://github.com/brodybits/prettierx/blob/dev/docs/options.md).

### Precedence

The precedence of the plugin configuration is, from low to high:

- PrettierX defaults.
- Preset options, if any.
- .editorconfig, if both `editorconfig` and `usePrettierrc` is `true`.
- .prettierrc, if `usePrettierrc` is `true`.
- `prettierx/options` from your ESLint config.
- ESLint comments in source files.

Also, if you want to change the behavior of the plugin for certain directories, use the "overrides" property of the ESLint or Prettier config.

### Settings

To fine-tune the prettierx operation, you can use the `settings` block of your .eslintrc file.

This .eslintrc.json shows the default values:

```json
{
  "settings": {
    "prettierx": {
      "usePrettierrc": true,
      "editorconfig": false,
      "ignorePath": ".prettierignore",
      "pluginSearchDirs": [],
      "plugins": [],
      "withNodeModules": false,
      "useCache": true
    }
  }
}
```

These are the same for all the presets.

- **`usePrettierrc`**

  Type: `boolean`, default: `true`.

  Set to `false` to ignore any [configuration file](https://prettier.io/docs/en/configuration.html).

- **`editorconfig`**

  Type: `boolean`, default: `false`

  _Note:_ This setting is valid only when `usePrettierrc` is `true`.

  If set to `true` and there's an `.editorconfig` file in the project, PrettierX will parse it and convert its properties to the corresponding PrettierX settings.

  This configuration will be overridden by `.prettierrc`. Currently, the following EditorConfig properties are supported:

  | EditorConfig            | PrettierX     |
  | ----------------------- | ------------- |
  | `end_of_line`           | `endOfLine`   |
  | `indent_style`          | `useTabs`     |
  | `indent_size/tab_width` | `tabWidth`    |
  | `max_line_length`       | `printWidth`  |
  | `quote_type`            | `singleQuote` |

- **`ignorePath`**

  Type: `string`, default: ".prettierignore"

  Path to a file containing patterns that describe files to ignore.

- **`pluginSearchDirs`**

  Type: `string`, default: `[]`

  Custom directories that contains prettier plugins in the node_modules subdirectory.

  Overrides default behavior when plugins are searched relatively to the location of Prettier.

- **`plugins`**

  Type: `string`, default: `[]`

  Array of plugins names to use.

- **`withNodeModules`**

  Type: `boolean`, default: `false`

  PrettierX will ignore files located in `node_modules` directory. Set this flag to `true` to change the default behavior.

- **`useCache`**

  Type: `boolean`, default: `true`

  If set to `false`, all caching will be bypassed.

  Use `false` only for test the settings, leave the default for normal use.

## VS Code ESLint

If you want to use this plugin with the ESLint and Prettier extensions of VS Code:

1. Install ESLint, eslint-plugin-prettierx, and the aMarCruz/prettier.

   ```bash
   yarn add -D eslint eslint-plugin-prettierx aMarCruz/prettier
   ```

2. Enable the plugin in the VS Code settings to format the desired file types.

```jsonc
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.format.enable": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  }
}
```

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
    "*.{js,mjs,jsx,ts,tsx}": ["eslint --fix"],
    "*.{html,md,json,scss}": ["prettierx --write"]
  }
}
```

The last line is to format other files with prettierx, if you wish.

## Can I use this plugin without a Preset?

Yes and No.

Any of the configurations offered by this plugin disables the rules that conflict with PrettierX. Using them with PrettierX disabled doesn't make sense.

Anyway, if you are using PrettierX separately (or a fake Prettier) I recommend that you add `"plugin:prettierx/default"` to the ESLint `extends` and keep the PrettierX settings in a separate ".prettierrc" file.

.eslintrc.json

```json
{
  "plugins": ["prettierx"],
  "extends": ["plugin:prettierx/default"]
}
```

Then, generate a .prettierrc.json file with the desired preset settings:

```bash
yarn prettier-init standardize
```

## Support my Work

I'm a full-stack developer with more than 20 year of experience and I try to share most of my work for free and help others, but this takes a significant amount of time and effort so, if you like my work, please consider...

[<img src="https://amarcruz.github.io/images/kofi_blue.png" height="36" title="Support Me on Ko-fi" />][kofi-url]

Of course, feedback, PRs, and stars are also welcome 🙃

Thanks for your support!

## License

The [MIT](LICENSE) License, &copy; 2019, Alberto Martínez

Parts of this plugin were taken from tools from [Prettier](https://github.com/prettier/prettier) under the MIT license.

[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://github.com/aMarCruz/eslint-plugin-prettierx/blob/master/LICENSE
[npm-badge]: https://img.shields.io/npm/v/eslint-plugin-prettierx.svg
[npm-url]: https://www.npmjs.com/package/eslint-plugin-prettierx
[kofi-url]: https://ko-fi.com/C0C7LF7I
