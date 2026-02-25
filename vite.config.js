import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three'],
          'three-ecosystem': ['@react-three/fiber', '@react-three/drei'],
          'framer-vendor': ['framer-motion', 'framer-motion-3d'],
          'lenis-vendor': ['lenis/react']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Suppress warnings for expected 3D math chunks
  }
})
