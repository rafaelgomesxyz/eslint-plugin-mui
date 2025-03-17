# no-single-child-in-grid

Why this rule?

Using Grid2 for a single child element is unnecessary and can lead to:

- Unintended layout issues: Grid2 is designed for flex/grid-based layouts, which may introduce unwanted spacing,
  alignment, or wrapping behavior when used with a single child.
- Reduced clarity: It makes the code harder to understand since Grid2 implies a layout structure, but only one element
  is inside.
- Performance overhead: MUI’s Grid2 applies CSS grid styles that aren’t needed for a single child, adding unnecessary
  computation.

wrong:

```jsx
import { Grid2 } from '@mui/material';

export const Component = () => {
  return (
    <Grid2>
      <Typography>foo</Typography>
    </Grid2>
  );
};
```

right:

```jsx
import { Box } from '@mui/material';

export const Component = () => {
  return (
    <Box>
      <Typography>foo</Typography>
    </Box>
  );
};
```
