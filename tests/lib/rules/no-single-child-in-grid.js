const rule = require('../../../lib/rules/no-single-child-in-grid');
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
        import { Grid2 } from '@mui/material';

        export const Component = () => {
          return (
            <Grid2>
              <Typography>foo</Typography>
              <Typography>bar</Typography>
            </Grid2>
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
        import { Grid2 } from '@mui/material';

        export const Component = () => {
          return (
            <Grid2>
              <Typography>foo</Typography>
            </Grid2>
          );
        };
      `,
      errors: [{ message: 'Using Grid2 for a single child element is unnecessary.' }],
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
