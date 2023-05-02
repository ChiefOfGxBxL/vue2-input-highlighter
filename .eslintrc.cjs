// Reference: https://eslint.vuejs.org/user-guide/
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true
  },
  extends: [
    'eslint:recommended',
    // 'plugin:vue/vue3-recommended',
    'plugin:vue/recommended', // Vue.js 2.x
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
    "no-console": ["error"],
    "no-trailing-spaces": ["error"],
    "no-unreachable": ["error"],
    "no-var": ["error"],
    "object-curly-spacing": ["error", "always"],
    "one-var-declaration-per-line": ["error", "always"],
    "semi": ["error", "never"],
    "space-before-blocks": ["error"],
    "space-infix-ops": ["error"],
    "space-unary-ops": ["error"],
    "spaced-comment": ["error", "always"],
  }
}
