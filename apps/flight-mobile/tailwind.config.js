/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ["./**/@pegipegi/web-pegipegi-ui/**/*.js", "./pages/**/*.vue"],
  presets: [require("@pegipegi/web-pegipegi-ui/tailwind-config")],
};
