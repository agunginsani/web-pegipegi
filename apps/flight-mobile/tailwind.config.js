/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    './app.vue',
    './node_modules/@pegipegi/ui/dist/**/*.{vue,js,ts,jsx,tsx}',
  ],
  presets: [require('@pegipegi/tailwind-preset')],
};
