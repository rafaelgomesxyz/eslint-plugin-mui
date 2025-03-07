/**
 * @fileoverview Rule to disallow literal color values in MUI `sx` prop
 * @author rkristelijn
 */

'use strict';

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'disallow literal color values in MUI `sx` prop',
            category: 'Best Practices',
            recommended: false,
            url: 'https://github.com/rafaelgomesxyz/eslint-plugin-mui/tree/main/docs/rules/no-literal-colors.md',
        },
        schema: [],
        messages: {
            noLiteralColors: "Literal color value '{{value}}' is not allowed in 'sx' prop.",
        },
    },

    create(context) {
        // If the object is inside of an `sx` attribute
        let isInSx = false;

        return {
            JSXAttribute(node) {
                isInSx = !!node.name && node.name.name === 'sx';
            },

            'JSXAttribute:exit'() {
                isInSx = false;
            },

            Property(node) {
                if (!isInSx || node.key.name !== 'color') {
                    return;
                }

                if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
                    const colorValue = node.value.value;
                    if (/^#[0-9A-F]{3,6}$/i.test(colorValue)) {
                        context.report({
                            node: node.value,
                            messageId: 'noLiteralColors',
                            data: {
                                value: colorValue,
                            },
                        });
                    }
                }
            },
        };
    },
};