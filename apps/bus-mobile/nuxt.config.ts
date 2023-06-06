export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/devtools'],
  tailwindcss: {
    cssPath: '@pegipegi/web-pegipegi-ui/style',
  },
  typescript: {
    shim: false,
  },
});
