/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'vue/max-len': 'off',
    'no-restricted-syntax': 'off',
    'no-promise-executor-return': 'off',
    'no-await-in-loop': 'off',
  },
};
