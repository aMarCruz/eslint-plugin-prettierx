# Fake Prettier

This package allows to use [Prettierx](https://www.npmjs.com/package/prettierx) instead [Prettier](https://www.npmjs.com/package/prettier) for packages that not supports Prettierx.

Good examples are [prettier-eslint](https://www.npmjs.com/package/prettier-eslint) and the [VS Code Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension.

## Setup

You need install Prettierx first, then this package:

```sh
mkdir prettier
cp ./node_modules/eslint-config-standardize/prettier/* prettier/
yarn add prettierx -D && yarn add ./prettier
```

## License

The MIT license.
