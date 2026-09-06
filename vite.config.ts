import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  // Allow isolated verification runs to use a fresh cache directory when the
  // host cannot safely recycle node_modules/.vite between browser sessions.
  cacheDir: process.env.VITE_CACHE_DIR ?? 'node_modules/.vite',
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
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
