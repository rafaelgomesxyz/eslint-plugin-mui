# eslint-plugin-mui

Custom ESLint rules for MUI.

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
    'mui/sort-sx-keys': 'warn',
    'mui/prefer-named-imports': 'warn',
    'mui/no-literal-colors': 'warn',
    'mui/no-grid-alias': 'warn',
    'mui/no-single-child-in-grid': 'warn',
    'mui/no-single-child-in-stack': 'warn'
  },
]
```

## Supported Rules

- [sort-sx-keys](https://github.com/rafaelgomesxyz/eslint-plugin-mui/tree/main/docs/rules/sort-sx-keys.md)
- [prefer-named-imports](https://github.com/rafaelgomesxyz/eslint-plugin-mui/tree/main/docs/rules/prefer-named-imports.md)
- [no-literal-color](https://github.com/rafaelgomesxyz/eslint-plugin-mui/tree/main/docs/rules/no-literal-color.md)
- [no-grid-alias](https://github.com/rafaelgomesxyz/eslint-plugin-mui/tree/main/docs/rules/no-grid-alias.md)
- [no-single-child-in-grid](https://github.com/rafaelgomesxyz/eslint-plugin-mui/tree/main/docs/rules/no-single-child-in-grid.md)
- [no-single-child-in-stack](https://github.com/rafaelgomesxyz/eslint-plugin-mui/tree/main/docs/rules/no-single-child-in-stack.md)

## Credits

This plugin is based on eslint-plugin-sort-keys-fix (https://github.com/leo-buneev/eslint-plugin-sort-keys-fix).

## Contributors

- [Ensar025](https://github.com/Ensar025)
- [rafaelgomesxyz](https://github.com/rafaelgomesxyz)
- [rkristelijn](https://github.com/rkristelijn)
