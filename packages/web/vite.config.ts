import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: parseInt(process.env.PORT) || 3000,
    host: '0.0.0.0',
  },
  build: {
    sourcemap: true,
  },
  plugins: [react(), tsconfigPaths()],
});
