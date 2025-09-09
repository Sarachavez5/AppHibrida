import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['@capacitor/core']
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Variables disponibles globalmente si es necesario
      }
    }
  },
  optimizeDeps: {
    include: ['@capacitor/core']
  }
});
