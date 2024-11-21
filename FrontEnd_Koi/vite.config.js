import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'rc-util/es/raf',
        'rc-menu',
        'rc-trigger',
        'rc-util/es/Portal',
        'rc-util/es/Dom/contains',
        'rc-util/es/ref',
        'rc-util/es/Dom/addEventListener',
        'rc-util/es/Dom/scrollIntoView',
        'rc-util/es/Dom/focus',
        'rc-util/es/KeyCode',
        'rc-util/es/hooks/useMergedState',
        'rc-util/es/hooks/useCacheErrors'
      ]    }
  },
  plugins: [react()],
})
