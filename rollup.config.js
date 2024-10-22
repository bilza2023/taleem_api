import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';
import css from 'rollup-plugin-css-only';  // Add this line

export default {
  input: 'src/client/pages/home.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      preprocess: preprocess(),
      compilerOptions: {
        dev: true
      },
      // Add this to extract CSS
      emitCss: true
    }),
    // Add the CSS plugin
    css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    terser()
  ]
};