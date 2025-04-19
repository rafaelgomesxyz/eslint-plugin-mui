# no-single-child-in-grid

Why this rule?

Using Stack for a single child element is unnecessary and can lead to:

- Unintended layout issues: Stack is designed for flex/grid-based layouts, which may introduce unwanted spacing,
  alignment, or wrapping behavior when used with a single child.
- Reduced clarity: It makes the code harder to understand since Stack implies a layout structure, but only one element
  is inside.
- Performance overhead: MUI’s Stack applies CSS grid styles that aren’t needed for a single child, adding unnecessary
  computation.

wrong:

```jsx
import { Stack } from '@mui/material';

export const Component = () => {
  return (
    <Stack>
      <Typography>foo</Typography>
    </Stack>
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
