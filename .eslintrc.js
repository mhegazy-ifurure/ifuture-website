const { rules } = require('eslint-config-prettier');
const { endOfLine } = require('./.prettierrc');

module.exports = {
  root: true,
  extends: ['plugin:@next/next/recommended', '@payloadcms'],
  ignorePatterns: ['**/payload-types.ts'],
  plugins: ['prettier'],
  rules: {
    endOfLine: 'auto',
  },
  // eslint-disable-next-line prettier/prettier
};
