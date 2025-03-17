/**
 * This order is loosely based on Concentric CSS.
 *
 * @see https://github.com/brandon-rhodes/Concentric-CSS
 */
module.exports = [
  'all',

  /**
   * Position
   */
  'position',
  'zIndex',
  'top',
  'right',
  'bottom',
  'left',
  'float',
  'clear',

  /**
   * Display
   */
  'display',
  'displayPrint',
  'displayRaw',
  'visibility',
  'backfaceVisibility',

  /**
   * Flexbox
   */
  'flex',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'flexFlow',
  'flexDirection',
  'flexWrap',

  /**
   * Grid
   */
  'grid',
  'gridTemplate',
  'gridTemplateRows',
  'gridTemplateColumns',
  'gridTemplateAreas',
  'gridAutoRows',
  'gridAutoColumns',
  'gridAutoFlow',
  'gridArea',
  'gridRow',
  'gridRowStart',
  'gridRowEnd',
  'gridColumn',
  'gridColumnStart',
  'gridColumnEnd',
  'gap',
  'rowGap',
  'columnGap',

  /**
   * Columns
   */
  'columns',
  'columnWidth',
  'columnCount',
  'columnRule',
  'columnRuleWidth',
  'columnRuleStyle',
  'columnRuleColor',
  'columnFill',
  'columnSpan',

  /**
   * Box Alignment
   */
  'justifyContent',
  'justifyItems',
  'justifySelf',
  'alignContent',
  'alignItems',
  'alignSelf',
  'order',
  'verticalAlign',

  /**
   * Box Layout
   */
  'isolation',
  'boxSizing',
  'width',
  'minWidth',
  'maxWidth',
  'height',
  'minHeight',
  'maxHeight',
  'overflow',
  'overflowX',
  'overflowY',
  'resize',

  /**
   * Box Margin and Padding
   *
   * The `*x` and `*y` properties are ordered as `yx`, against the convention `xy`. This is because, when using `margin` or `padding` with two values, they are a shorthand for `[top-bottom] [right-left]` (or `[y] [x]`), therefore it makes more sense for `y` to come before `x`. This also makes it easier to read the properties. For example, the `*x` and `*y` equivalents for `margin: '8px 4px'` are:
   *
   * {
   *   marginX: '4px',
   *   marginY: '8px',
   * }
   *
   * {
   *   marginY: '8px',
   *   marginX: '4px',
   * }
   *
   * The latter is clearly easier to read as the original value.
   */
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'my',
  'mx',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginY',
  'marginX',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'py',
  'px',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingY',
  'paddingX',

  /**
   * Box Decorations
   */
  'boxDecorationBreak',
  'boxShadow',
  'outline',
  'outlineWidth',
  'outlineStyle',
  'outlineColor',
  'outlineOffset',
  'border',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borderWidth',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderStyle',
  'borderTopStyle',
  'borderRightStyle',
  'borderBottomStyle',
  'borderLeftStyle',
  'borderColor',
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomRightRadius',
  'borderBottomLeftRadius',
  'borderImage',
  'borderImageSource',
  'borderImageSlice',
  'borderImageWidth',
  'borderImageOutset',
  'borderImageRepeat',
  'background',
  'backgroundColor',
  'backgroundImage',
  'backgroundPosition',
  'backgroundSize',
  'backgroundRepeat',
  'backgroundOrigin',
  'backgroundClip',
  'backgroundAttachment',
  'backgroundBlendMode',
  'mixBlendMode',
  'bgcolor',
  'color',
  'opacity',

  /**
   * Images
   */
  'imageRendering',
  'clipPath',
  'filter',
  'mask',
  'maskType',
  'objectFit',
  'objectPosition',

  /**
   * Lists
   */
  'listStyle',
  'listStyleType',
  'listStylePosition',
  'listStyleImage',

  /**
   * Tables
   */
  'tableLayout',
  'borderCollapse',
  'borderSpacing',
  'emptyCells',
  'captionSide',

  /**
   * Box Transformations and Animations
   */
  'pointerEvents',
  'cursor',
  'perspective',
  'perspectiveOrigin',
  'transform',
  'transformOrigin',
  'transformStyle',
  'transition',
  'transitionProperty',
  'transitionDuration',
  'transitionTimingFunction',
  'transitionDelay',
  'animation',
  'animationName',
  'animationDuration',
  'animationTimingFunction',
  'animationDelay',
  'animationIterationCount',
  'animationDirection',
  'animationFillMode',
  'animationPlayState',

  /**
   * Text Alignment
   */
  'direction',
  'unicodeBidi',
  'writingMode',
  'textOrientation',
  'textAlign',
  'textAlignLast',
  'textJustify',
  'textIndent',
  'tabSize',

  /**
   * Text Layout
   */
  'lineHeight',
  'lineBreak',
  'wordSpacing',
  'wordBreak',
  'letterSpacing',
  'whiteSpace',
  'textOverflow',
  'overflowWrap',
  'wordWrap',

  /**
   * Text Decorations
   */
  'textShadow',
  'textDecoration',
  'textDecorationLine',
  'textDecorationColor',
  'textDecorationStyle',
  'textUnderlinePosition',
  'caretColor',

  /**
   * Text Transformations
   */
  'userSelect',
  'textTransform',
  'textCombineUpright',
  'hangingPunctuation',
  'hyphens',
  'quotes',

  /**
   * Font
   */
  'typography',
  'font',
  'fontStyle',
  'fontVariant',
  'fontVariantAlternates',
  'fontVariantCaps',
  'fontVariantEastAsian',
  'fontVariantLigatures',
  'fontVariantNumeric',
  'fontVariantPosition',
  'fontWeight',
  'fontSize',
  'fontSizeAdjust',
  'fontFamily',
  'fontFeatureSettings',
  'fontLanguageOverride',
  'fontKerning',
  'fontStretch',
  'fontSynthesis',

  /**
   * Content
   */
  'counterReset',
  'counterIncrement',
  'content',

  /**
   * Misc
   */
  'breakAfter',
  'breakBefore',
  'breakInside',
  'orphans',
  'scrollBehavior',
  'widows',
];
