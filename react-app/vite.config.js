import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Serve root /data folder as static files during dev
function serveDataFolder() {
  const dataDir = path.resolve(__dirname, '..', 'data')
  return {
    name: 'serve-data-folder',
    configureServer(server) {
      server.middlewares.use('/data', (req, res, next) => {
        // Let Vite's static middleware handle it by rewriting to the actual file
        const filePath = path.join(dataDir, decodeURIComponent(req.url))
        import('fs').then(fs => {
          if (fs.existsSync(filePath)) {
            res.setHeader('Access-Control-Allow-Origin', '*')
            server.middlewares.handle(
              Object.assign(req, { url: '/@fs/' + filePath.replace(/\\/g, '/') }),
              res,
              next
            )
          } else {
            next()
          }
        })
      })
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), serveDataFolder()],
  build: {
    // Output to repo root /dist so Vercel finds it at its default location
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    // Allow serving files from the root data/ folder during dev
    fs: {
      allow: ['..'],
    },
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
