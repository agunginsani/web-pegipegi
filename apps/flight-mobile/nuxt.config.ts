import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: '@pegipegi/tailwind-preset/style',
  },
});
