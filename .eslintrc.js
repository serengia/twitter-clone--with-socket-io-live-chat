module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "linebreak-style": ["error", "windows"],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "req|res|next",
        varsIgnorePattern: "useEffect",
      },
    ],
    "no-console": "off",
    "func-names": "off",
    "object-curly-newline": "off",
    "comma-dangle": "off",
    "consistent-return": "off",
    "prefer-destructuring": "off",
    "no-underscore-dangle": "off",
    "arrow-body-style": "off",
    "implicit-arrow-linebreak": "off",
    "no-trailing-spaces": "off",
    "prefer-arrow-callback": "off",
  },
};
