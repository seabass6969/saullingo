import { svelte } from '@sveltejs/vite-plugin-svelte'
const config = {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;',
      },
    },
  },
  plugins: [svelte()]
};

export default config;
