# eslint-plugin-mui

Custom ESLint rules for MUI. 

> Note: This is a fork of [eslint-plugin-mui](https://github.com/rafaelgomesxyz/eslint-plugin-mui) that seems to be not being worked on.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm install eslint --save-dev
```

Next, install `@rkristelijn/eslint-plugin-mui`:

```sh
npm install @rkristelijn/eslint-plugin-mui --save-dev
```

## Usage

Add `mui` to the plugins section of your `eslint.config.cjs` configuration file.

```ts
const muiPlugin = require('eslint-plugin-mui');

module.exports = [
	plugins: {
    mui: muiPlugin,
  },
	rules: {
      // adding the recommended rules
      'mui/sort-sx-keys': 'warn',
      'mui/prefer-named-imports': 'warn',
      'mui/no-literal-colors': 'warn',
    },
]


## Supported Rules

- [sort-sx-keys](https://github.com/rkristelijn/eslint-plugin-mui/tree/main/docs/rules/sort-sx-keys.md)
- [prefer-named-imports](https://github.com/rkristelijn/eslint-plugin-mui/tree/main/docs/rules/prefer-named-imports.md)
- [no-literal-color](https://github.com/rkristelijn/eslint-plugin-mui/tree/main/docs/rules/no-literal-color.md)

## Credits

This plugin is based on eslint-plugin-sort-keys-fix (https://github.com/leo-buneev/eslint-plugin-sort-keys-fix).

## Contributors

- [rkristelijn](https://github.com/rkristelijn)
- [rafaelgomesxyz](https://github.com/rafaelgomesxyz) (original author)

