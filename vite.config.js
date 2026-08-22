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
    rollupOptions: {
      output: {
        // Rolldown wants a function here, not the old object map.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('/three/')) return 'three'
          if (id.includes('@react-three') || id.includes('postprocessing')) return 'r3f'
          if (id.includes('/gsap/') || id.includes('@gsap/')) return 'gsap'
          return 'vendor'
        },
      },
    },
  },
})
