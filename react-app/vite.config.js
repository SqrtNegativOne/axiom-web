import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    // Proxy /newsletter/ to Eleventy dev server so newsletter links + API work during dev
    proxy: {
      '/newsletter/': 'http://localhost:8081',
    },
  },
})
