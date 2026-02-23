import { defineConfig } from 'vite';

export default defineConfig({
  base: '/dami-ui/',
  server: {
    port: 5173,
    open: true
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  }
});