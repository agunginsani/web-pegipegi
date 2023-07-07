export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/devtools',
    '@pegipegi/web-pegipegi-ui/module',
  ],
  typescript: {
    shim: false,
  },
  tailwindcss: {
    config: {
      content: ['./pages/**/*.vue', './features/**/*.vue', './app.vue'],
    },
  },
});
