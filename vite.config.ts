import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: {
        buildMode: true,
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./testsSetup.tsx'],
  },
});
