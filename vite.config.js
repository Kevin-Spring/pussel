import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@lib': path.resolve(__dirname, 'src/styles/lib'),
      '@base': path.resolve(__dirname, 'src/styles/base'),
      '@extends': path.resolve(__dirname, 'src/styles/extends'),
      '@utilities': path.resolve(__dirname, 'src/styles/utilities'),
      '@blocks': path.resolve(__dirname, 'src/styles/blocks'),
      '@layouts': path.resolve(__dirname, 'src/styles/layouts'),
    },
  },
});