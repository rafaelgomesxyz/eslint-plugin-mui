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

    return {
      Program(node) {
        // Step 1: Track imports
        node.body.forEach((statement) => {
          if (statement.type === 'ImportDeclaration' && statement.source.value === '@mui/material') {
            const StackSpecifier = statement.specifiers.find(
              (specifier) => specifier.imported && specifier.imported.name === 'Stack',
            );

            const boxSpecifier = statement.specifiers.find(
              (specifier) => specifier.imported && specifier.imported.name === 'Box',
            );

            if (StackSpecifier) {
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
          context.report({
            node: openingElement,
            message: 'Using Stack for a single child element is unnecessary.',
            fix(fixer) {
              const sourceCode = context.getSourceCode();
              const fixes = [];

              // Step 2: Fix the import statement
              if (importNode) {
                const importText = sourceCode.getText(importNode);

                // If Box is not imported, modify the import statement
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

          // Remove Stack from import
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
