// Reference: https://eslint.vuejs.org/user-guide/
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    // 'plugin:vue/vue3-recommended',
    'plugin:vue/recommended', // Vue.js 2.x
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "brace-style": ["error"],
    "camelcase": ["error"],
    "curly": ["error", "multi-line", "consistent"],
    "dot-notation": ["error"],
    "eqeqeq": ["warn", "always", {"null": "ignore"}],
    "func-call-spacing": ["error", "never"],
    "indent": ["error", 2],
    "key-spacing": ["error", { "beforeColon": false }],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "no-trailing-spaces": ["error"],
    "no-unreachable": ["error"],
    "no-var": ["error"],
    "object-curly-spacing": ["error", "always"],
    "one-var-declaration-per-line": ["error", "always"],
    "space-before-blocks": ["error"],
    "space-infix-ops": ["error"],
    "space-unary-ops": ["error"],
    "spaced-comment": ["error", "always"],
  }
}
