module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow renaming of Grid2 in imports and update usages',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    let aliasName = null; // Store the alias name if found

    return {
      ImportDeclaration(node) {
        node.specifiers.forEach((specifier) => {
          if (
            specifier.type === 'ImportSpecifier' &&
            specifier.imported.name === 'Grid2' &&
            specifier.local.name !== 'Grid2'
          ) {
            aliasName = specifier.local.name; // Store the alias (e.g., "Grid")

            context.report({
              node: specifier,
              message: "Renaming 'Grid2' is not allowed.",
              fix(fixer) {
                return fixer.replaceText(specifier, 'Grid2'); // Ensure alias is removed first
              },
            });
          }
        });
      },

      // Run AFTER all ImportDeclaration fixes are applied
      'Program:exit'(programNode) {
        if (!aliasName) return; // Skip if no alias was found

        const sourceCode = context.getSourceCode();
        const lines = sourceCode.getText(programNode).split('\n'); // Get file content as lines

        // Process each line, replacing only outside of import statements
        const updatedLines = lines.map((line) => {
          if (line.trimStart().startsWith('import ')) {
            return line; // Skip import statements
          }
          return line.replace(new RegExp(`\\b${aliasName}\\b`, 'g'), 'Grid2'); // Replace <Grid> with <Grid2>
        });

        const updatedText = updatedLines.join('\n');

        if (sourceCode.getText(programNode) !== updatedText) {
          context.report({
            node: programNode,
            message: 'Replaced all <Grid> with <Grid2>',
            fix(fixer) {
              return fixer.replaceTextRange([0, sourceCode.getText().length], updatedText);
            },
          });
        }
      },
    };
  },
};
