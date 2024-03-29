import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      exclude: /(^icon-)|(\.webp$)/i,
      jpg: {
        quality: 50,
      },
      png: {
        quality: 50,
      },
    }),
  ],
  build: {
    outDir: 'docs',
  },
  esbuild: {
    legalComments: 'none',
  },
  base: '/',
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, './src'),
      "@components": path.resolve(__dirname, './src/components'),
    }
  }
})
