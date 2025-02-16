import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // optional, if your app is served from a subpath
  server: {
    historyApiFallback: true, // For local dev if you face issues
  }
})
