import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Quan trọng: Đổi tên folder output thành 'build' để khớp với Vercel
  },
});