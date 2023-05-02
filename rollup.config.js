// rollup.config.js
import VuePlugin from '@yfwz100/rollup-plugin-vue2'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  plugins: [
    VuePlugin(),
    resolve(),
    commonjs()
  ],
  input: './src/HighlightableInput.vue',
  output: {
    file: './dist/vue2-input-highlighter.js',
    format: 'es'
  },
};
