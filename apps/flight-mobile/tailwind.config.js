/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    './**/@pegipegi/web-pegipegi-ui/**/*.js',
    './pages/**/*.vue',
    './modules/**/*.vue',
    './middleware/transition.global.ts',
  ],
  presets: [require('@pegipegi/web-pegipegi-ui/tailwind-config')],
  variants: ['responsive', 'group-hover', 'hover', 'focus', 'active'],
};
