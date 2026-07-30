import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // '@/data/portfolioData' 처럼 절대경로로 import 할 수 있게 해준다.
      // 상대경로('../../data/...')가 깊어질 때 리팩터링이 훨씬 쉬워진다.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
