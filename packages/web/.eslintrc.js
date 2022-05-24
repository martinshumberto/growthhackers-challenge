module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  ecmaFeatures: {
    jsx: true,
  },
};
