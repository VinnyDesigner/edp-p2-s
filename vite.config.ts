import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'router-vendor': ['react-router-dom'],
          'motion-vendor': ['framer-motion'],
          'icons-vendor': ['lucide-react'],
        },
      },
    },
  },
})
