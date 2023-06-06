import { resolve } from 'path';
import { version as appVersion } from './package.json';

const script = [];
if (process.env.ENV_MODE === 'production') {
  script.push({
    hid: 'new-relic',
    id: 'new-relic',
    src: 'https://new-assets.s3.ap-southeast-1.amazonaws.com/scripts/new-relic-revamp/main-desktop-web.js',
  });
}

export default defineNuxtConfig({
  app: {
    buildAssetsDir: '/_assets/',
    head: {
      script,
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@pegipegi/web-pegipegi-ui/module',
    '@nuxt/image-edge',
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
    appVersion,
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
      homeAltUrl: '',
      homeUrl: '',
      domain: '',
      authBaseUrl: '',
      apixBaseUrl: '',
      gtmId: '',
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
