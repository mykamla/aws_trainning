import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages: https://mykamla.github.io/aws_trainning/
export default defineConfig({
  plugins: [react()],
  base: '/aws_trainning/',
})
