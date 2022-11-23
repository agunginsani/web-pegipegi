// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    cssPath: "@pegipegi/pegipegi-web-ui/style",
  },
});
