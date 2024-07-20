import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup.html')
      },
      output: {
        dir: 'dist'
      }
    },
    assetsDir: '',  // Ensures the assets are in the root of dist directory
    outDir: 'dist',
  },
  publicDir: 'public'  // This ensures that all files in the public directory are copied to the dist directory
});

