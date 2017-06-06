module.exports = {
    "extends": ["eslint:recommended", "google"],
    "rules": {
      "max-len": ["error", 
                  {"ignoreStrings": true, "ignoreTemplateLiterals": true}
                  ],
      "require-jsdoc": ["off"],
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error"
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        },
    },
    "env": {
      "browser": true,
      "node": true
    },
    "plugins": ["react"]
};
