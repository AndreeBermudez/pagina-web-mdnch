/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  build: {
    // Genera sourcemaps para debug en producción
    sourcemap: true,
    // Optimiza el tamaño del build
    minify: 'esbuild',
    // Configura el límite de advertencia de tamaño de chunk
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Divide el código en chunks más pequeños
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['lucide-react', 'framer-motion', 'sonner'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'query': ['@tanstack/react-query'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector', 'i18next-http-backend'],
        },
      },
    },
  },
  // Configuración para preview (simula producción local)
  preview: {
    port: 4173,
    strictPort: false,
    open: true,
  },
})
