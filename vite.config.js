import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: process.env.VERCEL ? '/' : '/community-resource-navigator/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Local dev: forward API calls to the Express server in server/index.js
      // so the frontend and backend behave like one app, just like they will
      // on Vercel once api/chat.js takes over as a serverless function.
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
})
