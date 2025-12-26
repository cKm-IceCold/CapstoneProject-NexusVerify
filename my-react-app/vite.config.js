import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api_estate': {
        target: 'https://api.estateintel.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api_estate/, ''),
        secure: false,
      },
    },
  },
})
