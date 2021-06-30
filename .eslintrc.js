module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/prettier',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    chrome: 'readonly',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        printWidth: 140, // 每行代码长度
        tabWidth: 2, // tab 宽度
        useTabs: false, // 是否使用 tab 进行缩进
        singleQuote: true, // 是否使用单引号
        semi: true, // 声明结尾是否使用分号
        trailingComma: 'es5', // 尾随逗号（默认none）
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
  },
};
