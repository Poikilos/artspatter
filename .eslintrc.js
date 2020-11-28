module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: [
    'react',
  ],
  rules: {
    // windows linebreaks when not in production environment
    // as per vitorbal's Augus 24, 2016 answer on
    // <https://stackoverflow.com/questions/39114446/how-can-i-write-a-eslint-rule-for-linebreak-style-changing-depending-on-windo>
    // edited by mikemaccana October 18, 2017.
    "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"]
    // usage:
    // NODE_ENV=prod node_modules/.bin/eslint src/test.js
    // NODE_ENV=dev node_modules/.bin/eslint src/test.js
  },
};
