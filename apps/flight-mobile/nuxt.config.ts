import { resolve } from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    ["@pinia/nuxt", { autoImports: ["defineStore"] }],
  ],
  runtimeConfig: {
    bannerApiKey: "",
    public: {
      authBaseUrl: "",
      bannerApiBaseUrl: "",
      apixBaseUrl: "",
    },
  },
  tailwindcss: {
    cssPath: "@pegipegi/web-pegipegi-ui/style",
  },
  typescript: {
    shim: false,
  },
  alias: {
    "common-module": resolve(__dirname, "./modules/common"),
    "home-module": resolve(__dirname, "./modules/home"),
  },
});
