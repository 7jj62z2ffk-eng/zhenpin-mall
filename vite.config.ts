import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'zhenpin-mall'

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
})
