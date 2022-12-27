/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./**/@pegipegi/pegipegi-web-ui/**/*.js', './app.vue'],
  presets: [require('@pegipegi/pegipegi-web-ui/tailwind-preset')],
};
