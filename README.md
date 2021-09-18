# eslint-plugin-mui

Custom ESLint rules for MUI

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm install eslint --save-dev
```

Next, install `eslint-plugin-mui`:

```sh
npm install eslint-plugin-mui --save-dev
```

## Usage

Add `mui` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
	"plugins": ["mui"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
	"rules": {
		"mui/rule-name": 2
	}
}
```

## Supported Rules

- [sort-sx-keys](https://github.com/rafaelgomesxyz/eslint-plugin-mui/tree/main/docs/rules/sort-sx-keys.md)
