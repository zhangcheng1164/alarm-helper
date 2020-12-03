module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  settings: {
    // 没有这个resolver， import的时候不识别ts文件
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    // 对应的包是 eslint-config-airbnb-base
    'airbnb-base',
    // 对应的包是 @typescript-eslint/eslint-plugin
    // 这个配置的含义是 到@typescript-eslint这个plugin里面去找recommended这个 config， @typescript-eslint这个plugin会导出configs，
    // 里面包含有多个config，recommended是其中之一，可以查看它的index.js
    'plugin:@typescript-eslint/recommended',
    // 对应的包是 eslint-plugin-prettier
    // 这个寻找的逻辑和上面一致，它的作用是将prettier整合为eslint的一部分
    'plugin:prettier/recommended',
    // 对应的包是 eslint-config-prettier
    // 这个的查找逻辑与上面不同，不是从plugin中导出，而是直接是一个config， eslint-config-prettier，这个包下面会有@typescript-eslint相关文件
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-useless-constructor': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-console': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
}
