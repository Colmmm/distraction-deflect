import { defineConfig } from 'vite';
import { resolve } from 'path';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup.html'),
        background: resolve(__dirname, 'src/background.js'),
      },
      output: {
        dir: 'dist',
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      },
      plugins: [
        copy({
          targets: [
            { src: 'public/*', dest: 'dist' },
            { src: 'manifest.json', dest: 'dist' }
          ]
        })
      ]
    }
  }
});