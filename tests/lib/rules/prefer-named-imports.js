/**
 * @fileoverview Tests for `prefer-named-imports` rule
 */

'use strict';

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/prefer-named-imports');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
});

ruleTester.run('prefer-named-imports', rule, {
  valid: [
    {
      code: `import { Close } from '@mui/icons-material';`,
    },
    {
      code: `import { ChevronLeft, ChevronRight } from '@mui/icons-material';`,
    },
    {
      code: `import SomethingElse from 'some-other-library';`, // Should be valid
    },
    {
      code: `
import { Add } from '@mui/icons-material';
const MyComponent = () => <Add />;
      `, // JSX usage is already correct
    },
  ],

  invalid: [
    {
      code: `
import CloseIcon from '@mui/icons-material/Close';
const MyComponent = () => <CloseIcon />;
      `,
      output: `
import { Close } from '@mui/icons-material';
const MyComponent = () => <Close />;
      `,
      errors: [
        { message: "Use named imports for MUI icons instead of default imports." },
        { message: "Replace <CloseIcon /> with <Close />" },
      ],
    },
    {
      code: `
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
const MyComponent = () => <ChevronLeftIcon />;
      `,
      output: `
import { ChevronLeft } from '@mui/icons-material';
const MyComponent = () => <ChevronLeft />;
      `,
      errors: [
        { message: "Use named imports for MUI icons instead of default imports." },
        { message: "Replace <ChevronLeftIcon /> with <ChevronLeft />" },
      ],
    },
    {
      code: `
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const MyComponent = () => <ChevronRightIcon />;
      `,
      output: `
import { ChevronRight } from '@mui/icons-material';
const MyComponent = () => <ChevronRight />;
      `,
      errors: [
        { message: "Use named imports for MUI icons instead of default imports." },
        { message: "Replace <ChevronRightIcon /> with <ChevronRight />" },
      ],
    },
    {
      code: `
import AddIcon from '@mui/icons-material/Add';
const MyComponent = () => <AddIcon />;
      `,
      output: `
import { Add } from '@mui/icons-material';
const MyComponent = () => <Add />;
      `,
      errors: [
        { message: "Use named imports for MUI icons instead of default imports." },
        { message: "Replace <AddIcon /> with <Add />" },
      ],
    },
    {
      code: `
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';`,
      output: `
import { PersonOutlineOutlined, Settings, HelpOutline } from '@mui/icons-material';
`,
      errors: [
        { message: "Use named imports for MUI icons instead of default imports." },
      ],
    },
  ],
});
