import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // During local dev, run the /api function separately (see README)
      // and point this at it, or use `vercel dev` to serve both together.
    },
  },
});