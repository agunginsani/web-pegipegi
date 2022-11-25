// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // css: ['@pegipegi/web-pegipegi-ui/component-style'],
  modules: [
    "@nuxtjs/tailwindcss",
    ["@pinia/nuxt", { autoImports: ["defineStore"] }],
  ],
  runtimeConfig: {
    public: {
      cloudRunBaseUrl: "",
      bannerBaseUrl: "",
    },
  },
  tailwindcss: {
    cssPath: "@pegipegi/web-pegipegi-ui/style",
  },
});
