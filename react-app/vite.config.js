import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    // Output to repo root /dist so Vercel finds it at its default location
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    // Proxy /newsletter/ to Eleventy dev server so newsletter links + API work during dev
    proxy: {
      '/newsletter/': 'http://localhost:8081',
    },
    // Pre-transform entry files so the first browser request is fast
    warmup: {
      clientFiles: ['./src/main.jsx', './src/App.jsx', './src/pages/Home.jsx'],
    },
  },
})
