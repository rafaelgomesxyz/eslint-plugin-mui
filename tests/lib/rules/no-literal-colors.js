/**
 * @fileoverview Tests for `no-literal-colors` rule
 * @autor rkristelijn
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
              backgroundColor: 'primary.main',
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
            value: '#fff',
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
    {
      code: `
        var Header = (
          <Box
            sx={{
              color: 'red',
            }}
          />
        );
      `,
      errors: [
        {
          messageId: 'noLiteralColors',
          data: {
            value: 'red',
          },
        },
      ],
    },
    {
      code: `
        var Header = (
          <Box
            sx={{
              color: 'black',
            }}
          />
        );
      `,
      errors: [
        {
          messageId: 'noLiteralColors',
          data: {
            value: 'black',
          },
        },
      ],
    },
    {
      code: `
        var Header = (
          <Box
            sx={{
              color: 'aliceblue',
            }}
          />
        );
      `,
      errors: [
        {
          messageId: 'noLiteralColors',
          data: {
            value: 'aliceblue',
          },
        },
      ],
    },
  ],
});
