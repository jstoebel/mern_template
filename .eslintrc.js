module.exports = {
    "extends": ["eslint:recommended", "google"],
    "parserOptions": {
        "ecmaVersion": 6
    },
    
    "rules": {
      "max-len": ["error", {"ignoreStrings": true}]
    },

    "parserOptions": {
        "sourceType": "module",
    },
    "env": {
      "browser": true,
      "node": true
    }
};
