import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project from /portfolio/, local dev from /.
const base = process.env.DEPLOY_TARGET === 'gh-pages' ? '/portfolio/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
    // The three.js chunk is large and unavoidable, but it is loaded lazily
    // after first paint, so the default 500kB warning is noise here.
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        // Rolldown wants a function here, not the old object map. It merges
        // chunks that are only ever reachable together, so three, fiber and
        // postprocessing end up as one 'three' chunk regardless of how finely
        // they are split here. That chunk is behind a dynamic import, so it
        // never blocks first paint.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (
            id.includes('/three/') ||
            id.includes('@react-three') ||
            id.includes('/postprocessing/')
          ) {
            return 'three'
          }
          return 'vendor'
        },
      },
    },
  },
})
