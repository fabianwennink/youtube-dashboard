module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "react-app",
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-no-bind": ["error", {
            "allowArrowFunctions": true,
            "allowBind": false,
            "ignoreRefs": true
        }],
        "react/no-did-update-set-state": "error",
        "react/no-unknown-property": "error",
        "react/no-unused-prop-types": "error",
        "react/react-in-jsx-scope": "error",
        "react/prop-types": "off",

        // Non-react
        "quotes": ["warn", "single"],
        "max-len": ["warn", { "code": 140 }],
        "default-case": "error",
        "no-var": "error",
        "prefer-const": "warn",
        "no-unused-vars": "warn"
    }
};
