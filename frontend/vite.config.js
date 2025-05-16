// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      // only match paths that start with /student/
      '/student/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // if your backend expects e.g. /login instead of /student/login:
        // rewrite: (path) => path.replace(/^\/student/, '')
      },
      '/course/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/teacher/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    },
    // still keep the SPA fallback so that any other unknown paths
    // serve index.html and let React Router handle them
    historyApiFallback: true,
  },
  plugins: [ react() ],
})
