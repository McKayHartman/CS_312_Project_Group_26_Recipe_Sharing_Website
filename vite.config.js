import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  root: 'frontend',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
  },
  build: {
    outDir: 'dist'
  }
})
