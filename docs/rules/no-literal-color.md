# disallow literal color values in MUI `sx` prop (no-literal-colors)

This rule disallows the use of literal color values in the `sx` prop of MUI components. Instead, it encourages the use of theme-based color values.

## Rule Details

This rule checks all color property definitions inside of an `sx` attribute and verifies that no literal color values are used.

Examples of **incorrect** code for this rule:

```js
const Header = (
  <Box
    sx={{
      color: '#FFF',
    }}
  />
);
```

Examples of **correct** code for this rule:

```js
const Header = (
  <Box
    sx={{
      color: 'primary.main',
    }}
  />
);
```

## Options

This rule does not have any options.

## When Not To Use It

If you want to allow literal color values in the `sx` prop, then it's safe to disable this rule.