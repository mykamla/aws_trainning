import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Local / preview: root. Adjust base if deploying under a subpath.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
