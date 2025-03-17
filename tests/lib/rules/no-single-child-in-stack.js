const rule = require('../../../lib/rules/no-single-child-in-stack');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('no-single-child-in-grid', rule, {
  valid: [
    {
      code: `
        import { Stack } from '@mui/material';

        export const Component = () => {
          return (
            <Stack>
              <Typography>foo</Typography>
              <Typography>bar</Typography>
            </Stack>
          );
        };
      `,
    },
    {
      code: `
        import { Box } from '@mui/material';

        export const Component = () => {
          return (
            <Box>
              <Typography>foo</Typography>
            </Box>
          );
        };
      `,
    },
  ],
  invalid: [
    {
      code: `
        import { Stack } from '@mui/material';

        export const Component = () => {
          return (
            <Stack>
              <Typography>foo</Typography>
            </Stack>
          );
        };
      `,
      errors: [{ message: 'Using Stack for a single child element is unnecessary.' }],
      output: `
        import { Box } from '@mui/material';

        export const Component = () => {
          return (
            <Box>
              <Typography>foo</Typography>
            </Box>
          );
        };
      `,
    },
  ],
});
