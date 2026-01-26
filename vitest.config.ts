import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    // Use node environment for unit tests in __tests__ folders within utils
    // Use jsdom for component tests (React components)
    environmentMatchGlobs: [
      ['src/utils/__tests__/**', 'node'],
      ['src/__tests__/**/*.test.tsx', 'jsdom'],
      ['src/**/__tests__/**/*.test.tsx', 'jsdom'],
      ['src/**/__tests__/**/*.test.ts', 'node'],
    ],
    // Include __tests__ folders in test discovery
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'src/**/__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

