import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/sustainable-society-humanities/',
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  }
})
