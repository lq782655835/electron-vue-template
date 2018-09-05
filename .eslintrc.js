module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    "space-before-function-paren": ["error", "never"],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    // 4 space for tab
    'indent': [2, 4, { SwitchCase: 1 }],
    // no space in function name for perttier
    'space-before-function-paren': ['error', 'never'],
    // allow promise no error
    "prefer-promise-reject-errors": 0
  }
}
