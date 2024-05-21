module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': 0,
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-param-reassign': 'off',
    'for-direction': 'off',
  },
};
