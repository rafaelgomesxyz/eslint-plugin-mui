const rule = require('../../../lib/rules/no-grid-alias');
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

ruleTester.run('no-grid-alias', rule, {
  valid: [
    {
      code: "import { Avatar, Grid2, TextField, Typography } from '@mui/material';",
    },
    {
      code: "import { Grid2 } from '@mui/material';",
    },
    {
      code: "import Grid2 from '@mui/material/Grid2';",
    },
  ],
  invalid: [
    {
      code: "import { Avatar, Grid2 as Grid, TextField, Typography } from '@mui/material';",
      errors: [{ message: "Renaming 'Grid2' is not allowed." }],
      output: "import { Avatar, Grid2, TextField, Typography } from '@mui/material';",
    },
    {
      code: "import { Grid2 as Grid } from '@mui/material';",
      errors: [{ message: "Renaming 'Grid2' is not allowed." }],
      output: "import { Grid2 } from '@mui/material';",
    },
  ],
});
