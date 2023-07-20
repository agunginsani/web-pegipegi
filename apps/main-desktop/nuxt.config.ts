import { resolve } from 'path';
import { version as appVersion } from './package.json';
import { sentryVitePlugin } from '@sentry/vite-plugin';

const envMode = process.env.NUXT_PUBLIC_ENV_MODE;

export default defineNuxtConfig({
  app: {
    buildAssetsDir: '/_assets/',
  },
  sourcemap: { client: true },
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
  vite: {
    build: {
      sourcemap: 'hidden',
    },
    plugins: [
      sentryVitePlugin({
        url: 'https://sentry.pegipegi.com',
        org: 'pegipegi',
        release: {
          name: appVersion,
          deploy: envMode === undefined ? undefined : { env: envMode },
        },
        disable: process.env.NODE_ENV !== 'production',
        project: 'web-pegipegi-main-desktop',
        authToken:
          '703e790fc2fb40c594455f9ca0ef40330cf48bc10c394fe194bb1d3d598dc8d9',
        sourcemaps: {
          assets: ['.nuxt/dist/**'],
        },
      }),
    ],
  },
});
