# eslint-plugin-prettierx

[![License][license-badge]][license-url] [![npm Version][npm-badge]][npm-url]

Format your code with ESLint using [Prettierx](https://github.com/brodybits/prettierx), with presets for [Prettier](https://prettier.io) and [StandardJS](https://standardjs.com/) or your custom options.

- Based on ESLint or external configuration.
- Presets\* for default options.

For use with ESLint v7.15.0 as minimum, for ESLint v7.14 or lower use eslint-config-prettierx 0.14 or bellow.

Minimum NodeJS version supported: NodeJS 10.13.0 or 12.0.0 and above, as described in [brodybits/prettierx#6](https://github.com/brodybits/prettierx/issues/6)

## Note

Please see the [Changelog](CHANGELOG.md) for more info.

If you are using the [(fake) Prettier](#prettier) package, please update it.

## Setup

Install [ESLint](http://eslint.org) v6.x and the Prettierx plugin with npm or yarn:

```bash
yarn add eslint@6.8.x eslint-plugin-prettierx -D
```

Install other plugins that you need.

Now configure ESLint to make it work without conflicts between its internal rules, those of other plugins, and the prettierx settings.

1. Add `prettierx` to the "plugins" section of your configuration file (.eslintrc.js, .json, yaml, etc). You can omit the "eslint-plugin-" prefix.

2. Then, in "extends", put the configs of other plugins that you are using. Almost all plugins include configs to enable several of its rules.

3. Bellow these configs, put "plugin:prettierx/&lt;preset&gt;", where `<preset>` is the name of the preset (style) that you will use.

4. Last, add the configs provided by prettierx for the plugins that you included in the step `2`. This configs will disable rules that conflict with those plugins.

This is an example for projects using TypeScript with the @typescript-eslint parser, the @typescript-eslint plugin, the "react" plugin, and "prettierx" with the "standardx" preset:

```bash
yarn add eslint eslint-plugin-prettierx eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

Configure eslint

```js
module.exports = {
  // "root" is optional, avoids searching eslintrc upwards.
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
  },
  // the prettierx plugin already sets ecmaVersion 2018,
  // sourceType "module" and enables ecmaFeatures.jsx
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },

  plugins: [
    '@typescript-eslint',
    'react',
    // 1. Add the prettierx plugin
    'prettierx',
  ],
  extends: [
    // OPTIONAL: the eslint recommended config
    'eslint:recommended',
    // OPTIONAL: configs to enable plugin rules
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 2. prettierx settings with the "standardx" style
    'plugin:prettierx/standardx',
    // 3. add exclusions for additional plugins
    'plugin:prettierx/@typescript-eslint',
    'plugin:prettierx/react',
  ],
}
```

That's all! but you can personalize it, if you want.

See the provided [exclusions](#exlusions) later in this doc.

You don't need exclusions for 'eslint:recommended' nor for plugins that affect the layout.

### Important

The provided presets only configure the style used by prettierx and disable conflicting ESLint rules. They do _**not enable**_ rules. You must use the plugin configs for that, along with the exclusions provided by prettierx for each plugin.

## Presets

The _presets_ of eslint-plugin-prettierx are special ESLint configs that set the initial PrettierX options and disable several ESLint rules that can cause conflicts. Three are provided:

- **default**

  These are the predefined prettierx options and it is the best choice if you are migrating from prettier or prettier-eslint.

- **standardx**

  This is the StandardJS style. You can use it with the [standard](https://github.com/standard/eslint-config-standard) config from StandardJS, but it is not recommended because you will need to setup all manually.

  Note: In a future version, I will provide an customized preset for the StandardJS bundle, much like the [standardize-bundle](#bundle-presets).

- **standardize**

  This is my personal preset, a modified version of StandardJS with trailing commas in multiline format, consistent quotes in object properties, and double quotes for JSX properties that I use with my [standardize](https://www.npmjs.com/package/eslint-config-standardize) config (but it can be used with your own config).

### Differences in presets

These are the prettierx [options](#options) used for each preset:

| &nbsp;                     | Prettier 2.x | standardx   | standardize  |
| -------------------------- | ------------ | ----------- | ------------ |
| `alignObjectProperties`    | false        | false       | false        |
| `offsetTernaryExpressions` | false        | true        | true         |
| `arrowParens`              | "always"     | "avoid"     | "avoid"      |
| `bracketSpacing`           | true         | true        | true         |
| `breakBeforeElse`          | false        | false       | false        |
| `breakLongMethodChains`    | false        | false       | false        |
| `endOfLine`                | "lf"         | "lf"        | "lf"         |
| `generatorStarSpacing`     | false        | true        | true         |
| `indentChains`             | true         | true        | true         |
| `insertPragma`             | false        | -           | false        |
| `jsxBracketSameLine`       | false        | false       | false        |
| `jsxSingleQuote`           | false        | true        | false        |
| `parser`                   | "babel"      | "babel"     | "babel"      |
| `printWidth`               | 80           | 80          | 92           |
| `quoteProps`               | "as-needed"  | "as-needed" | "consistent" |
| `requirePragma`            | false        | -           | false        |
| `semi`                     | true         | false       | false        |
| `singleQuote`              | false        | true        | true         |
| `spaceBeforeFunctionParen` | false        | true        | true         |
| `tabWidth`                 | 2            | 2           | 2            |
| `trailingComma`            | "es5"        | "none"      | "es5"        |
| `useTabs`                  | false        | false       | false        |
| `yieldStarSpacing`         | false        | true        | true         |

You can override individual options through a .prettierrc(.json) or .editorconfig file or through the "`prettierx/options`" rule of your ESLint config.

### Bundle Presets

For the "[standardized](https://www.npmjs.com/package/eslint-config-standardize)" bundle, prettierx provides the special config 'plugin:prettierx/standardize-bundle', so you do not need to worry about the details.

#### Usage

```bash
yarn add eslint eslint-plugin-prettierx eslint-config-standardize -D
```

```json
{
  "plugins": ["prettierx"],
  "extends": ["standardize", "plugin:prettierx/standardize-bundle"]
}
```

##### Usage with TypeScript

```bash
yarn add eslint eslint-plugin-prettierx eslint-config-standardize @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

```json
{
  "plugins": ["@typescript-eslint", "prettierx"],
  "extends": [
    "standardize",
    "standardize/typescript",
    "plugin:prettierx/standardize-bundle",
    "plugin:prettierx/@typescript-eslint"
  ]
}
```

## Exclusions

eslint-plugin-prettierx provide exclusion rules for a few plugins:

- plugin:prettierx/@typescript-eslint for [@typescript-eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
- plugin:prettierx/babel for [eslint-plugin-babel](https://www.npmjs.com/package/eslint-plugin-babel)
- plugin:prettierx/flowtype for [eslint-plugin-flowtype](https://www.npmjs.com/package/eslint-plugin-flowtype)
- plugin:prettierx/react [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
- plugin:prettierx/standard [eslint-plugin-standard](https://www.npmjs.com/package/eslint-plugin-standard) (only the plugin)
- plugin:prettierx/unicorn [eslint-plugin-unicorn](https://www.npmjs.com/package/eslint-plugin-unicorn)
- plugin:prettierx/vue [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)

\* Plugins that do not affect the format ([node](https://www.npmjs.com/package/eslint-plugin-node), [promise](https://www.npmjs.com/package/eslint-plugin-promise), [compat](https://www.npmjs.com/package/eslint-plugin-compat), stc), does not need exclusions.

## Rules

Because the way that Prettierx works, this plugin has one only rule: `prettierx/options`, that contains all the plugin options.

```js
  "prettierx/options": [severity, options]
```

- **`severity`**

  Common severity option for ESLint rules: `0`, `1`, `2`, "off", "warn", "error".
  Use `0` or "off" to disable prettierx.

- **`options`**

  Allows override the [options](#options) defined by the [preset](#presets).

The values of a preset are used as defaults for missing options when you override the options.

The precedence of the plugin configuration:

- `prettierx/options` from your ESLint config.
- .prettierrc, if configured in the [settings](#settings).
- .editorconfig, if configured and `usePrettierrc` is used.
- Preset options.

Also, if you want to change the behavior of the plugin for certain directories, use the "overrides" property of the ESLint config.

### Settings

To fine-tune the prettierx operation, you can use the `settings` block of your eslintrc file.

This example shows the default values for the "default" preset:

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

These are the same for the "standardx" and "standardize" presets, except `usePrettierrc`, which is set to `false`.

- **`usePrettierrc`**

  Type: `boolean`, default: `true`.

  Set to `false` to ignore any [configuration file](https://prettier.io/docs/en/configuration.html).

- **`editorconfig`**

  Type: `boolean`, default: `true`

  _Note:_ This setting is valid only for `usePrettierrc: true`.

  If set to `true` and an `.editorconfig` file is in your project, Prettierx will parse it and convert its properties to the corresponding prettierx configuration.

  This configuration will be overridden by `.prettierrc`, etc. Currently, the following EditorConfig properties are supported:

  - `end_of_line`
  - `indent_style`
  - `indent_size/tab_width`
  - `max_line_length`

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

### Options

PrettierX ships with a handful of customizable format options, usable in both the CLI and API.

For the full list of options please see the [Options of PrettierX](https://github.com/brodybits/prettierx/blob/dev/docs/options.md).

These are just the _additional_ PrettierX options and its default values:

| Property                 | Default |
| ------------------------ | ------- |
| alignObjectProperties    | false   |
| arrayBracketSpacing      | false   |
| breakBeforeElse          | false   |
| breakLongMethodChains    | false   |
| computedPropertySpacing  | false   |
| cssParenSpacing          | false   |
| exportCurlySpacing       | true    |
| generatorStarSpacing     | false   |
| graphqlCurlySpacing      | true    |
| htmlVoidTags             | false   |
| importCurlySpacing       | true    |
| importFormatting         | "auto"  |
| indentChains             | true    |
| objectCurlySpacing       | true    |
| offsetTernaryExpressions | false   |
| spaceBeforeFunctionParen | false   |
| spaceInParens            | false   |
| spaceUnaryOps            | false   |
| templateCurlySpacing     | false   |
| typeAngleBracketSpacing  | false   |
| typeBracketSpacing       | false   |
| typeCurlySpacing         | true    |
| yamlBracketSpacing       | true    |
| yieldStarSpacing         | false   |

## VS Code ESLint

Install the plugin as normal, then use it with the "ESLint: Fix all auto-fixable Problems" (it is not a formatter ...yet).

- Assign a hotkey

  Open `File > Preferences > Keyboard Shortcuts` and assign a key to "ESLint: Fix all auto-fixable Problems" (`eslint.executeAutofix`).

- If you want auto-fix when saving, add `"eslint.autoFixOnSave": true` to the VS Code settings.

### Formating TypeScript

ESLint does not fix TypeScript files by default. To enable this feature, you need add the "autoFix" flag to the TS types in your VS Code settings:

```json
{
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll": true // or "source.fixAll.eslint": true
  }
}
```

### Formating Fenced Blocks

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
    "*.{js,mjs,jsx,ts,tsx}": ["eslint --fix"],
    "*.{md,json,css}": ["prettierx --write"]
  }
}
```

The last line is to format other files with prettierx, if you wish.

## Migrating

Migrating from other tools (tslint, prettier, prettier-eslint, etc).

## Understanding prettierx

Prettierx is a fork of prettier which provides a few more options which resolve some conflicts with the Standard JS tool.

## Precautions

Avoid formating rules from other plugins.

### Comment Directives

Do not use trailing comments for directives, put them to its own line.

## TODO

- [x] ~~Config for the StandardJS bundle~~
- [ ] Test

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
