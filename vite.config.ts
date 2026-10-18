import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Built for https://alexwilder-dev.github.io/sam-zenaldeen/. Asset paths are
// relative so the build also loads if the repo's path is capitalised.
export default defineConfig({
  base: './',
  plugins: [react()],
})
