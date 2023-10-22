import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: "../..",
  css: {
    preprocessorOptions: {
      css: {
        // Import your CSS file
        include: ['./src/index.css'],
      },
    },
  },

})
