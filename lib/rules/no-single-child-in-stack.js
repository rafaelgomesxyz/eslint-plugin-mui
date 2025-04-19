module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow using Stack for a single child element',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: 'code',
    schema: [], // No options
  },
  create(context) {
    let importNode = null;
    let hasBoxImport = false;
    let hasStackUsage = false;

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
            const stackSpecifier = statement.specifiers.find(
              (specifier) => specifier.imported && specifier.imported.name === 'Stack',
            );

            const boxSpecifier = statement.specifiers.find(
              (specifier) => specifier.imported && specifier.imported.name === 'Box',
            );

            if (stackSpecifier) {
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
        if (openingElement.name.name !== 'Stack') return;

        hasStackUsage = true; // Track that Stack is used somewhere

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
            return; // Skip if the child is .map() or .flatMap() call
          }

          context.report({
            node: openingElement,
            message: 'Using Stack for a single child element is unnecessary.',
            fix(fixer) {
              const sourceCode = context.getSourceCode();
              const fixes = [];

              // Step 2: Fix the import statement
              if (importNode) {
                const importText = sourceCode.getText(importNode);

                if (!hasBoxImport) {
                  const newImportText = importText.replace('Stack', 'Box');
                  fixes.push(fixer.replaceText(importNode, newImportText));
                }
              }

              // Step 3: Fix JSX replacement separately
              const openingTag = sourceCode.getText(openingElement);
              const closingTag = node.closingElement ? sourceCode.getText(node.closingElement) : '';

              fixes.push(fixer.replaceText(openingElement, openingTag.replace('Stack', 'Box')));
              if (closingTag) {
                fixes.push(fixer.replaceText(node.closingElement, closingTag.replace('Stack', 'Box')));
              }

              return fixes;
            },
          });
        }
      },

      'Program:exit'() {
        // Step 4: If Stack is unused after fixes, remove it from import statement
        if (importNode && !hasStackUsage) {
          const sourceCode = context.getSourceCode();
          const importText = sourceCode.getText(importNode);

          const newImportText = importText
            .replace(/,\s*Stack/, '')
            .replace(/Stack,\s*/, '')
            .replace(/Stack/, '');

          return context.report({
            node: importNode,
            message: 'Stack import is unused and can be removed.',
            fix(fixer) {
              return fixer.replaceText(importNode, newImportText);
            },
          });
        }
      },
    };
  },
};
