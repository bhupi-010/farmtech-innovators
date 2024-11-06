// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11', 'Chrome > 49', 'Firefox > 78'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime', 'core-js/features/string/replace-all'],
      modernPolyfills: true,
    }),
  ],
});