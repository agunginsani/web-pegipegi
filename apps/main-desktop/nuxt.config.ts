import { resolve } from 'path';
import { version as appVersion } from './package.json';

export default defineNuxtConfig({
  app: {
    buildAssetsDir: '/_assets/',
  },
  modules: [
    '@vueuse/nuxt',
    '@pegipegi/web-pegipegi-ui/module',
    '@nuxt/image',
    '@nuxtjs/device',
    '@nuxt/devtools',
  ],
  runtimeConfig: {
    travelblogBaseUrl: '',
    bannerBaseUrl: '',
    bannerKey: '',
    firebaseProjectId: '',
    firebaseClientEmail: '',
    firebasePrivateKey: '',
    accountBaseUrl: '',
    mainhomeBaseUrl: '',
    mainhomeSecretKey: '',
    seoBaseUrl: '',
    accomAuthUserId: '',
    accomAuthToken: '',
    accomselectionSecretKey: '',
    accomSearchBaseUrl: '',
    accomSearchApixWeb: '',
    flightBaseUrl: '',
    flightPath: '',
    trainBaseUrl: '',
    busBaseUrl: '',
    newsletterBaseUrl: '',
    public: {
      appVersion,
      homeAltUrl: '',
      homeUrl: '',
      domain: '',
      authBaseUrl: '',
      apixBaseUrl: '',
      gtmId: '',
      envMode: '',
    },
  },
  css: ['~/assets/css/global.css'],
  tailwindcss: {
    config: {
      content: [
        './pages/**/*.vue',
        './features/**/*.vue',
        './middleware/transition.global.ts',
      ],
    },
  },
  typescript: {
    shim: false,
  },
  alias: {
    api: resolve(__dirname, './server/api'),
    'common-module': resolve(__dirname, './features/common'),
    'home-module': resolve(__dirname, './features/home'),
    'search-module': resolve(__dirname, './features/search'),
    'promo-module': resolve(__dirname, './features/promo'),
  },
  nitro: {
    compressPublicAssets: true,
  },
});
