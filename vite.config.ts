import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths let the build work from any GitHub Pages repository
  // name. Routing uses HashRouter, so the page itself is always index.html.
  base: './',
  server: {
    port: 3000,
    strictPort: true,
  },
})
