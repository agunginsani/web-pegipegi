/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    './app.vue',
    './node_modules/@pegipegi/pegipegi-web-ui/dist/**/*.{vue,js,ts,jsx,tsx}',
  ],
  presets: [require('@pegipegi/pegipegi-web-ui/tailwind-preset')],
};
