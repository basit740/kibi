import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      dashboard: '/src/Dashboard',
      landingPage: '/src/LandingPage',
      auth: '/src/Auth',
      styling: '/src/styling',
      store: '/src/store',
      services: '/src/services',
      utils: '/src/utils',
      images: '/public/images'
    },
  },
})
