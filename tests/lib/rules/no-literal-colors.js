/**
 * @fileoverview Tests for `no-literal-colors` rule
 * @author rkristelijn
 */

'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-literal-colors');

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
});

ruleTester.run('no-literal-colors', rule, {
    valid: [
        {
            code: `
        var Header = (
          <Box
            sx={{
              color: 'primary.main',
            }}
          />
        );
      `,
        },
        {
            code: `
        var Header = (
          <Box
            sx={{
              backgroundColor: '#FFF',
            }}
          />
        );
      `,
        },
    ],

    invalid: [
        {
            code: `
        var Header = (
          <Box
            sx={{
              color: '#FFF',
            }}
          />
        );
      `,
            errors: [
                {
                    messageId: 'noLiteralColors',
                    data: {
                        value: '#FFF',
                    },
                },
            ],
        },
        {
            code: `
        var Header = (
          <Box
            sx={{
              color: '#123456',
            }}
          />
        );
      `,
            errors: [
                {
                    messageId: 'noLiteralColors',
                    data: {
                        value: '#123456',
                    },
                },
            ],
        },
    ],
});