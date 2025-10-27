import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin';


export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  server: {
    port: 3000,
    open: false
  },
  build: {
    outDir: 'build',
    chunkSizeWarningLimit: 700
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    '__BUILD_TIMESTAMP__': JSON.stringify(Date.now())
  },

  //@ts-ignore
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
