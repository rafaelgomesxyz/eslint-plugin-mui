/**
 * @fileoverview Rule to require MUI `sx` keys to be sorted
 * @author rafaelgomesxyz
 */

'use strict';

const astUtils = require('../utils/ast-utils');
const defaultOrder = require('../orders/default');

/**
 * Gets the property name of the given `Property` node.
 *
 * - If the property's key is an `Identifier` node, this returns the key's name whether it's a computed property or not.
 * - If the property has a static name, this returns the static name.
 * - Otherwise, this returns `null`.
 *
 * @param {ASTNode} node The `Property` node to get.
 *
 * @returns {string | null} The property name or `null`.
 *
 * @private
 */
function getPropertyName(node) {
	const staticName = astUtils.getStaticPropertyName(node);

	if (staticName !== null) {
		return staticName;
	}

	return node.key.name || null;
}

/**
 * Functions which check that the given 2 names are in specific order.
 *
 * @private
 */
const isValidOrders = {
	asc(a, b) {
		return a <= b;
	},

	desc(a, b) {
		return isValidOrders.asc(b, a);
	},

	custom(a, b, order) {
		const aIndex = order.indexOf(a);
		const bIndex = order.indexOf(b);

		if (aIndex === -1 && bIndex === -1) {
			return isValidOrders.asc(a, b);
		}

		if (aIndex === -1) {
			return false;
		}

		if (bIndex === -1) {
			return true;
		}

		if (aIndex > -1 && bIndex > -1) {
			return aIndex < bIndex;
		}

		return true;
	},
};

module.exports = {
	meta: {
		type: 'suggestion',
		fixable: 'code',
		docs: {
			description: 'require MUI `sx` keys to be sorted',
			category: 'Stylistic Issues',
			recommended: false,
			url: 'https://github.com/rafaelgomesxyz/eslint-plugin-mui/tree/main/docs/rules/sort-sx-keys.md',
		},
		schema: [
			{
				enum: ['asc', 'desc', 'custom'],
			},
			{
				type: 'array',
			},
		],
		messages: {
			sortSxKeys:
				"Expected object keys to be in order. '{{thisName}}' should be before '{{prevName}}'.",
		},
	},

	create(context) {
		// Parse options
		const sortMethod = context.options[0] || 'custom';
		const order = context.options[1] || defaultOrder;
		const isValidOrder = isValidOrders[sortMethod];

		// If the object is inside of an `sx` attribute
		let isInSx = false;

		// The stack to save the previous property's name for each object literals
		let stack = null;

		return {
			JSXAttribute(node) {
				isInSx = !!node.name && node.name.name === 'sx';
			},

			'JSXAttribute:exit'() {
				isInSx = false;
			},

			ObjectExpression() {
				if (!isInSx) {
					return;
				}

				stack = {
					upper: stack,
					prevName: null,
					prevNode: null,
				};
			},

			'ObjectExpression:exit'() {
				stack = stack && stack.upper;
			},

			SpreadElement(node) {
				if (!stack || node.parent.type !== 'ObjectExpression') {
					return;
				}

				stack.prevName = null;
				stack.prevNode = null;
			},

			Property(node) {
				if (!stack || node.parent.type === 'ObjectPattern') {
					return;
				}

				const prevName = stack.prevName;
				const prevNode = stack.prevNode;
				const thisName = getPropertyName(node);

				if (thisName !== null) {
					stack.prevName = thisName;
					stack.prevNode = node;
				}

				if (prevName === null || thisName === null) {
					return;
				}

				if (!isValidOrder(prevName, thisName, order)) {
					context.report({
						node,
						loc: node.key.loc,
						messageId: 'sortSxKeys',
						data: {
							prevName,
							thisName,
						},

						fix(fixer) {
							const fixes = [];
							const sourceCode = context.getSourceCode();

							const moveProperty = (fromNode, toNode) => {
								const prevText = sourceCode.getText(fromNode);
								const thisComments = sourceCode.getCommentsBefore(fromNode);

								for (const thisComment of thisComments) {
									fixes.push(
										fixer.insertTextBefore(toNode, sourceCode.getText(thisComment) + '\n')
									);
									fixes.push(fixer.remove(thisComment));
								}

								fixes.push(fixer.replaceText(toNode, prevText));
							};

							moveProperty(node, prevNode);
							moveProperty(prevNode, node);

							return fixes;
						},
					});
				}
			},
		};
	},
};
