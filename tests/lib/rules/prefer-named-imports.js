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
  ],

  invalid: [
    {
      code: `import CloseIcon from '@mui/icons-material/Close';`,
      output: `import { Close } from '@mui/icons-material';`,
      errors: [{ message: "Use named imports for MUI icons instead of default imports." }],
    },
    {
      code: `import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';`,
      output: `import { ChevronLeft } from '@mui/icons-material';`,
      errors: [{ message: "Use named imports for MUI icons instead of default imports." }],
    },
    {
      code: `import ChevronRightIcon from '@mui/icons-material/ChevronRight';`,
      output: `import { ChevronRight } from '@mui/icons-material';`,
      errors: [{ message: "Use named imports for MUI icons instead of default imports." }],
    },
  ],
});