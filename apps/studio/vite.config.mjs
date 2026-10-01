import { defineConfig } from 'vite';
export default defineConfig({
  build: { outDir: 'web' },
  server: {
    host: '127.0.0.1',
    proxy: { '/v1': 'http://127.0.0.1:3000', '/health': 'http://127.0.0.1:3000' },
  },
});
