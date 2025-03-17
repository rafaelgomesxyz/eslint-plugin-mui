# Disallow renaming of Grid2 in imports (no-grid-alias)

This rule disallows the renaming of `Grid2` in imports and ensures that all usages of the alias are updated to `Grid2`.

## Rule Details

This rule checks for any renaming of `Grid2` in import statements and updates all usages of the alias to `Grid2`.

Examples of **incorrect** code for this rule:

```jsx
import { Avatar, Grid2 as Grid, TextField, Typography } from '@mui/material';

export const MyComponent = () => {
  return <Grid />;
};
```

Examples of correct code for this rule:

```jsx
import { Avatar, Grid2, TextField, Typography } from '@mui/material';

export const MyComponent = () => {
  return <Grid2 />;
};
```

Options This rule does not have any options.

When Not To Use It If you want to allow renaming of Grid2 in imports, then it's safe to disable this rule.

## More information

https://mui.com/material-ui/migration/upgrade-to-grid-v2
