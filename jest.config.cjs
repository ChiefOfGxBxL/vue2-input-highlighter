module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  moduleFileExtensions: [
    'js',
    'cjs',
    'json',
    'vue'
  ],
  transform: {
    ".*\\.(js)$": "babel-jest",
    ".*\\.(vue)$": "vue-jest"
  },
  transformIgnorePatterns: ['/node_modules/(?!@vue/vue-test-utils)']
}
