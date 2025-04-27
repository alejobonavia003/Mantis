import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/dist', // Ruta relativa al directorio del backend
    emptyOutDir: true, // Limpiar el directorio antes de cada build
    sourcemap: false, // Opcional: desactivar sourcemaps para producción
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  base: '/' // Asegurar que las rutas sean absolutas
});