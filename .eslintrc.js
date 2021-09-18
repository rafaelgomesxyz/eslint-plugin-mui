'use strict';

module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:eslint-plugin/recommended', 'plugin:node/recommended'],
	overrides: [
		{
			files: ['tests/**/*.js'],
			env: {
				mocha: true,
			},
		},
	],
};
