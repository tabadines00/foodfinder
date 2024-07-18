
import fs from 'fs';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
let configObj = {}
if(process.env.NODE_ENV === "development") {
  console.log("--- RUNNING IN DEVELOPMENT ---")
  configObj = {
                plugins: [react()],
                server: {
                  /*
                    https: {
                        key: fs.readFileSync('./localhost+2-key.pem'),
                        cert: fs.readFileSync('./localhost+2.pem'),
                    },
                    */
                  define: {
                    'process.env': process.env // This makes process.env available, but you need to ensure environment variables are populated correctly.
                  }
                }
              }
} else {
  // No https key or cert, https is handled by CloudFront
  console.log("--- RUNNING IN PRODUCTION ---")
  configObj = {
                plugins: [react()],
                server: {
                  define: {
                    'process.env': process.env // This makes process.env available, but you need to ensure environment variables are populated correctly.
                  }
                }
              }
}
export default defineConfig(configObj)
