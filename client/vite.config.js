import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure correct base path
  server: {
    historyApiFallback: true // Allow React Router navigation
  }
});
