/**
 * @fileoverview Tests for `sort-sx-keys` rule
 * @author rafaelgomesxyz
 */

'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/sort-sx-keys');

const ruleTester = new RuleTester();

ruleTester.run('sort-sx-keys', rule, {
  valid: [
    {
      code: `
        var Header = (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              width: '100%',
              height: '50px',
              margin: 0,
              padding: '16px',
            }}
          />
        );
      `,
      options: [],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      code: `
        var Header = (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              width: '100%',
              height: '50px',
              margin: 0,
              padding: '16px',
              '& >*': {
                marginX: '8px',
              },
            }}
          />
        );
      `,
      options: [],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      code: `
        var Header = (
          <Box
            sx={{
              left: 0,
              right: 0,
              height: '50px',
              margin: 0,
              padding: '16px',
              position: 'absolute',
              top: 0,
              width: '100%',
            }}
          />
        );
      `,
      options: ['custom', ['left', 'right']],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      code: `
        var Header = (
          <Box
            sx={{
              height: '50px',
              left: 0,
              margin: 0,
              padding: '16px',
              position: 'absolute',
              right: 0,
              top: 0,
              width: '100%',
            }}
          />
        );
      `,
      options: ['asc'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      code: `
        var Header = (
          <Box
            sx={{
              width: '100%',
              top: 0,
              right: 0,
              position: 'absolute',
              padding: '16px',
              margin: 0,
              left: 0,
              height: '50px',
            }}
          />
        );
      `,
      options: ['desc'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],

  invalid: [
    {
      code: `
        var Header = (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50px',
              width: '100%',
              margin: 0,
              padding: '16px',
            }}
          />
        );
      `,
      output: `
        var Header = (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              width: '100%',
              height: '50px',
              margin: 0,
              padding: '16px',
            }}
          />
        );
      `,
      errors: [
        "Expected object keys to be in order. 'right' should be before 'left'.",
        "Expected object keys to be in order. 'width' should be before 'height'.",
      ],
      options: [],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      code: `
        var Header = (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              width: '100%',
              height: '50px',
              margin: 0,
              '& >*': {
                marginX: '8px',
              },
              padding: '16px',
            }}
          />
        );
      `,
      output: `
        var Header = (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              width: '100%',
              height: '50px',
              margin: 0,
              padding: '16px',
              '& >*': {
                marginX: '8px',
              },
            }}
          />
        );
      `,
      errors: ["Expected object keys to be in order. 'padding' should be before '& >*'."],
      options: [],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      code: `
        var Header = (
          <Box
            sx={{
              right: 0,
              left: 0,
              height: '50px',
              margin: 0,
              padding: '16px',
              position: 'absolute',
              top: 0,
              width: '100%',
            }}
          />
        );
      `,
      output: `
        var Header = (
          <Box
            sx={{
              left: 0,
              right: 0,
              height: '50px',
              margin: 0,
              padding: '16px',
              position: 'absolute',
              top: 0,
              width: '100%',
            }}
          />
        );
      `,
      errors: ["Expected object keys to be in order. 'left' should be before 'right'."],
      options: ['custom', ['left', 'right']],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      code: `
        var Header = (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              width: '100%',
              height: '50px',
              margin: 0,
              padding: '16px',
            }}
          />
        );
      `,
      output: `
        var Header = (
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              left: 0,
              height: '50px',
              width: '100%',
              margin: 0,
              padding: '16px',
            }}
          />
        );
      `,
      options: ['asc'],
      errors: [
        "Expected object keys to be in order. 'right' should be before 'top'.",
        "Expected object keys to be in order. 'left' should be before 'right'.",
        "Expected object keys to be in order. 'height' should be before 'width'.",
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    {
      code: `
        var Header = (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              width: '100%',
              height: '50px',
              margin: 0,
              padding: '16px',
            }}
          />
        );
      `,
      output: `
        var Header = (
          <Box
            sx={{
              top: 0,
              position: 'absolute',
              right: 0,
              width: '100%',
              left: 0,
              margin: 0,
              height: '50px',
              padding: '16px',
            }}
          />
        );
      `,
      options: ['desc'],
      errors: [
        "Expected object keys to be in order. 'top' should be before 'position'.",
        "Expected object keys to be in order. 'width' should be before 'left'.",
        "Expected object keys to be in order. 'margin' should be before 'height'.",
        "Expected object keys to be in order. 'padding' should be before 'margin'.",
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
});
