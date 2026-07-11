import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'es2022',
    outDir: 'build/source',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    lib: {
      entry: fileURLToPath(new URL('./src/main.ts', import.meta.url)),
      formats: ['es'],
      fileName: () => 'albina-source.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: 'albina-source[extname]',
      },
    },
  },
});
