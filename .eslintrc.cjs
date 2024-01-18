module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "linebreak-style": ["error", "unix"],
        "react-refresh/only-export-components": [
            "off",
            { allowConstantExport: true },
        ],
        "react/react-in-jsx-scope": "off",
        "import/no-absolute-path": "off",

        // [ '<-In an ARRAY there must be SPACES for the BRACKETS->' ]
        "array-bracket-spacing": ["error", "always"],

        // If an ARRAY has more than one ELEMENT, each one must be in a NEW LINE...
        "array-element-newline": ["error",
            {
                "ArrayExpression": "always",
                "ArrayPattern": "never",
            }
        ],
        // ...also there must be a NEW LINE for the ARRAY BRACKETS
        "array-bracket-newline": ["error", { "multiline": true }],

        // `${ "<- In a TEMPLATE's objects there must be SPACES for the CURLY BRACES->" }`
        "template-curly-spacing": ["error", "always"],

        // { '<-In OBJECTS, there must be SPACES for the CURLY BRACES->' }
        "object-curly-spacing": ["error", "always"],

        // If an OBJECT expression has at least 2 properties, there must be NEW LINES for the CURLY BRACES...
        "object-curly-newline": ["error",
            {
                "ObjectExpression": { "minProperties": 2 },
            }
        ],
        // also each PROPERTY must be in a NEW LINE
        "object-property-newline": ["error", { "allowAllPropertiesOnSameLine": false }],

        // Trailing commas
        "@typescript-eslint/comma-dangle": ["error", {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "always-multiline",
            "exports": "always-multiline",
            "functions": "never",
        }],
        
        "curly": ["error", "multi"],
        "@typescript-eslint/brace-style": ["error", "stroustrup", { "allowSingleLine": false }],    
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/space-before-function-paren": ["error", "never"],
        "@typescript-eslint/no-unused-vars": "warn",
    }
}
