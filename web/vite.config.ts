import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', 'VITE_');
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@widgets': resolve(__dirname, 'src/widgets'),
        '@features': resolve(__dirname, 'src/features'),
        '@entities': resolve(__dirname, 'src/entities'),
        '@shared': resolve(__dirname, 'src/shared'),
      },
    },
    server: {
      host: true,
      port: Number(env.VITE_WEB_PORT) || 5173,
    },
  };
});
