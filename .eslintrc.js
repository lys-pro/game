/*
 * @Author: 李延送
 * @Date: 2022-06-15 17:35:20
 * @LastEditTime: 2022-06-17 14:08:33
 * @Description: Do not edit
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    '@typescript-eslint/no-var-requires': 0
  }
}
