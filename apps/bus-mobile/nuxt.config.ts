export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: "@pegipegi/web-pegipegi-ui/style",
  },
  typescript: {
    shim: false,
  },
});
