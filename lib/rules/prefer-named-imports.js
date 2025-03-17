/**
 * @fileoverview Rule to avoid default imports for MUI icons
 * @author rkristelijn
 */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce named imports for MUI icons',
      recommended: true,
      url: 'https://github.com/rkristelijn/eslint-plugin-mui/tree/main/docs/rules/prefer-named-imports.md',
    },
    fixable: 'code',
    messages: {
      useNamedImport: 'Use named imports for MUI icons instead of default imports.',
      replaceJsx: 'Replace <{{ oldName }} /> with <{{ newName }} />',
    },
    schema: [],
  },

  create(context) {
    const iconFixes = new Map(); // Store mappings for JSX replacements
    const namedImports = new Set(); // Store unique named imports
    const importNodes = new Set(); // Track import declaration nodes to remove

    return {
      ImportDeclaration(node) {
        if (node.source.value.startsWith('@mui/icons-material/')) {
          node.specifiers.forEach((specifier) => {
            if (specifier.type === 'ImportDefaultSpecifier') {
              const oldName = specifier.local.name;
              const newName = oldName.replace(/Icon$/, ''); // Convert "CloseIcon" → "Close"

              // Store JSX mapping
              iconFixes.set(oldName, newName);
              namedImports.add(newName);
              importNodes.add(node); // Mark for deletion
            }
          });
        }
      },

      JSXIdentifier(node) {
        if (!iconFixes.has(node.name)) return;

        const newName = iconFixes.get(node.name);

        // Ensure the identifier is actually part of a JSXOpeningElement or JSXExpressionContainer
        if (
          node.parent.type === 'JSXOpeningElement' ||
          (node.parent.type === 'JSXExpressionContainer' && node.parent.parent.type === 'JSXAttribute')
        ) {
          context.report({
            node,
            messageId: 'replaceJsx',
            data: { oldName: node.name, newName },
            fix(fixer) {
              return fixer.replaceText(node, newName);
            },
          });
        }
      },

      'Program:exit'(programNode) {
        if (namedImports.size > 0) {
          const sourceCode = context.getSourceCode();

          // Find the first and last import node to remove
          const importArray = Array.from(importNodes);
          const firstImport = importArray[0];
          const lastImport = importArray[importArray.length - 1];

          if (!firstImport || !lastImport) return;

          // Determine the full range to remove (from first import start to last import end)
          const start = firstImport.range[0];
          let end = lastImport.range[1];

          // Check if there's an extra newline after the last import and remove it
          const afterLastToken = sourceCode.getTokenAfter(lastImport, { includeComments: true });
          if (afterLastToken && afterLastToken.loc.start.line > lastImport.loc.end.line) {
            end = afterLastToken.range[0];
          }

          // Generate the new, cleaned-up import statement, considering the indentation

          // const importStatement = `import { ${[...namedImports].join(', ')} } from '@mui/icons-material';\n`;
          // Fix: Respect indentation of the first import
          const indentation = sourceCode.getText(firstImport).match(/^\s*/)[0];
          const importStatement = `${indentation}import { ${[...namedImports].join(', ')} } from '@mui/icons-material';\n`;

          context.report({
            node: programNode,
            messageId: 'useNamedImport',
            fix(fixer) {
              return [
                // Remove the entire range of old imports **at once**
                fixer.removeRange([start, end]),

                // Insert the new import statement at the correct position
                // fixer.insertTextBefore(programNode.body[0], importStatement),
                fixer.insertTextBeforeRange([start, start], importStatement),
              ];
            },
          });
        }
      },
    };
  },
};
