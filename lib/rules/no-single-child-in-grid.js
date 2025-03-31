module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow using Grid2 for a single child element',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: 'code',
    schema: [], // No options
  },
  create(context) {
    let importNode = null;
    let hasBoxImport = false;
    let hasGrid2Usage = false;

    const isMultipleChildrenExpression = (expression) => {
      if (expression.type !== 'CallExpression') return false;

      const callee = expression.callee;
      return (
        callee.type === 'MemberExpression' &&
        callee.property.type === 'Identifier' &&
        ['map', 'flatMap'].includes(callee.property.name)
      );
    };

    return {
      Program(node) {
        // Step 1: Track imports
        node.body.forEach((statement) => {
          if (statement.type === 'ImportDeclaration' && statement.source.value === '@mui/material') {
            const grid2Specifier = statement.specifiers.find(
              (specifier) => specifier.imported && specifier.imported.name === 'Grid2',
            );

            const boxSpecifier = statement.specifiers.find(
              (specifier) => specifier.imported && specifier.imported.name === 'Box',
            );

            if (grid2Specifier) {
              importNode = statement;
            }
            if (boxSpecifier) {
              hasBoxImport = true;
            }
          }
        });
      },

      JSXElement(node) {
        const openingElement = node.openingElement;
        if (openingElement.name.name !== 'Grid2') return;

        hasGrid2Usage = true; // Track that Grid2 is used somewhere

        // Get non-whitespace children
        const meaningfulChildren = node.children.filter(
          (child) => child.type === 'JSXElement' || (child.type === 'JSXExpressionContainer' && child.expression),
        );

        if (meaningfulChildren.length === 1) {
          const onlyChild = meaningfulChildren[0];

          if (
            onlyChild.type === 'JSXExpressionContainer' &&
            onlyChild.expression &&
            isMultipleChildrenExpression(onlyChild.expression)
          ) {
            return; // Skip if single child is an array-producing expression
          }

          context.report({
            node: openingElement,
            message: 'Using Grid2 for a single child element is unnecessary.',
            fix(fixer) {
              const sourceCode = context.getSourceCode();
              const fixes = [];

              // Step 2: Fix the import statement
              if (importNode) {
                const importText = sourceCode.getText(importNode);

                // If Box is not imported, modify the import statement
                if (!hasBoxImport) {
                  const newImportText = importText.replace('Grid2', 'Box');
                  fixes.push(fixer.replaceText(importNode, newImportText));
                }
              }

              // Step 3: Fix JSX replacement separately
              const openingTag = sourceCode.getText(openingElement);
              const closingTag = node.closingElement ? sourceCode.getText(node.closingElement) : '';

              fixes.push(fixer.replaceText(openingElement, openingTag.replace('Grid2', 'Box')));
              if (closingTag) {
                fixes.push(fixer.replaceText(node.closingElement, closingTag.replace('Grid2', 'Box')));
              }

              return fixes;
            },
          });
        }
      },

      'Program:exit'() {
        // Step 4: If Grid2 is unused after fixes, remove it from import statement
        if (importNode && !hasGrid2Usage) {
          const sourceCode = context.getSourceCode();
          const importText = sourceCode.getText(importNode);

          // Remove Grid2 from import
          const newImportText = importText
            .replace(/,\s*Grid2/, '')
            .replace(/Grid2,\s*/, '')
            .replace(/Grid2/, '');

          return context.report({
            node: importNode,
            message: 'Grid2 import is unused and can be removed.',
            fix(fixer) {
              return fixer.replaceText(importNode, newImportText);
            },
          });
        }
      },
    };
  },
};
