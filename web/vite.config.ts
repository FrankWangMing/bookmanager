import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  server: {
    port: 8888
  },
  plugins: [react(), tsconfigPaths()],
  build: {
    assetsDir: 'assets',
    outDir: 'dist'
  }
})
