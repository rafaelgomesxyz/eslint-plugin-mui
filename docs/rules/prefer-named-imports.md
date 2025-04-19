# Enforce named imports for MUI icons (prefer-named-imports)

This rule enforces the use of named imports for MUI icons instead of default imports.

## Rule Details

This rule aims to ensure that MUI icons are imported using named imports to improve consistency and readability.

Examples of **incorrect** code for this rule:

```js
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
const MyComponent = () => (
  <>
    <CloseIcon />
    <ChevronLeftIcon />
  </>
);
```

Examples of **correct** code for this rule:

```js
import { Close, ChevronLeft } from '@mui/icons-material';
const MyComponent = () => (
  <>
    <Close />
    <ChevronLeft />
  </>
);
```

## Options

This rule does not have any options.

## When Not To Use It

If you prefer to use default imports for MUI icons, you can disable this rule.
