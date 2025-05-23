import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4001,
    proxy: {
      '/auth': {target: 'http://localhost:8080', changeOrigin: true},
      '/notes': {target: 'http://localhost:8081', changeOrigin: true},
    },
  },
});