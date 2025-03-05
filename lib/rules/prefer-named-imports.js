module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce named imports for MUI icons",
      recommended: true,
    },
    fixable: "code",
    messages: {
      useNamedImport: "Use named imports for MUI icons instead of default imports.",
    },
    schema: [],
  },
  create(context) {
    // Store mappings of old default import names to new named imports
    const iconFixes = new Map();

    return {
      ImportDeclaration(node) {
        if (node.source.value.startsWith("@mui/icons-material/")) {
          node.specifiers.forEach((specifier) => {
            if (specifier.type === "ImportDefaultSpecifier") {
              const oldName = specifier.local.name; // Example: "AddIcon"
              const newName = oldName.replace(/Icon$/, ""); // Converts "AddIcon" → "Add"

              // Store the name mapping for later JSX replacement
              iconFixes.set(oldName, newName);

              context.report({
                node: specifier,
                messageId: "useNamedImport",
                fix(fixer) {
                  return [
                    // Fix the import to use named imports
                    fixer.replaceText(specifier, `{ ${newName} }`),
                    // Ensure the import path is '@mui/icons-material'
                    fixer.replaceText(node.source, "'@mui/icons-material'")
                  ];
                },
              });
            }
          });
        }
      },

      // Check all JSX elements and update references
      JSXIdentifier(node) {
        if (iconFixes.has(node.name)) {
          const newName = iconFixes.get(node.name);

          context.report({
            node,
            message: `Replace <${node.name} /> with <${newName} />`,
            fix(fixer) {
              return fixer.replaceText(node, newName);
            },
          });
        }
      },
    };
  },
};