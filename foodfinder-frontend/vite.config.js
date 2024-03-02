import fs from 'fs';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./localhost+2-key.pem'),
      cert: fs.readFileSync('./localhost+2.pem'),
    },
    define: {
      'process.env': process.env // This makes process.env available, but you need to ensure environment variables are populated correctly.
    }
  }
})
