import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Two pages: the portfolio and the City Insight case study (/city-insight/).
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        cityInsight: resolve(import.meta.dirname, 'city-insight/index.html'),
      },
    },
  },
})
