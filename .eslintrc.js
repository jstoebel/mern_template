module.exports = {
    "extends": ["eslint:recommended", "google"],
    "rules": {
      "max-len": ["error", 
                  {"ignoreStrings": true, "ignoreTemplateLiterals": true}
                  ],
      "require-jsdoc": ["off"],
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
      "sort-imports": ["error", {
        "ignoreCase": true,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
      }],
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true,
          "experimentalObjectRestSpread": true,
        },
    },
    "env": {
      "browser": true,
      "node": true
    },
    "plugins": ["react"]
};
