const rule = require('../../../lib/rules/no-single-child-in-stack');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('no-single-child-in-stack', rule, {
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
    {
      code: `
        import { Stack, Box } from '@mui/material';

        export const Component = () => {
          return (
            <Stack>
              {['a', 'b', 'c'].map((letter) => (
                <Box key={letter}>{letter}</Box>
              ))}
            </Stack>
          );
        };
      `,
    },
    {
      code: `
        import { Stack, Box } from '@mui/material';

        export const Component = () => {
          const items = ['a', 'b', 'c', 'd'];

          return (
            <Stack>
              {items.filter(item => item !== 'c').map((item) => (
                <Box key={item}>{item}</Box>
              ))}
            </Stack>
          );
        };
      `,
    },
    {
      code: `
        import { Stack, Box } from '@mui/material';

        export const Component = () => {
          return (
            <Stack>
              {Array.from(['a', 'b', 'c']).map((item) => (
                <Box key={item}>{item}</Box>
              ))}
            </Stack>
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
