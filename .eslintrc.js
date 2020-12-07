module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': "off",
    'no-debugger': "error",
    'eqeqeq': "off", // 不需要强制使用全等
    // 使用双引号
    "quotes": "off"
  }
}
