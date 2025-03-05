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
    return {
      ImportDeclaration(node) {
        // Controleer of het een MUI icon import is met een specifiek pad
        if (node.source.value.startsWith("@mui/icons-material/")) {
          node.specifiers.forEach((specifier) => {
            if (specifier.type === "ImportDefaultSpecifier") {
              // Haal de icon naam uit de import path en verwijder de 'Icon' postfix
              const iconName = node.source.value.split("/").pop().replace(/Icon$/, "");

              context.report({
                node: specifier,
                messageId: "useNamedImport",
                fix(fixer) {
                  return [
                    // Vervang de default import door een named import
                    fixer.replaceText(specifier, `{ ${iconName} }`),
                    // Corrigeer het import pad naar '@mui/icons-material'
                    fixer.replaceText(node.source, "'@mui/icons-material'")
                  ];
                },
              });
            }
          });
        }
      },
    };
  },
};