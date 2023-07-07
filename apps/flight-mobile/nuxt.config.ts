import { resolve } from 'path';
import { version as appVersion } from './package.json';
import { sentryVitePlugin } from '@sentry/vite-plugin';

const envMode = process.env.NUXT_PUBLIC_ENV_MODE;

export default defineNuxtConfig({
  app: {
    baseURL: '/flight/',
    buildAssetsDir: '/_assets/',
  },
  sourcemap: { client: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    '@nuxt/image',
    '@nuxtjs/device',
    // DISCLAIMER: `nuxt-vuefire` is still in preview phase.
    // Please update once the stable version is released.
    'nuxt-vuefire',
    '@nuxt/devtools',
  ],
  runtimeConfig: {
    bannerBaseUrl: '',
    bannerKey: '',
    firebaseProjectId: '',
    accountBaseUrl: '',
    public: {
      envMode: '',
      appVersion,
      homeUrl: '',
      authBaseUrl: '',
      apixBaseUrl: '',
      apixSearchBaseUrl: '',
      supplyBaseUrl: '',
    },
  },
  image: {
    // `baseURL` type is not supported yet. Hence `any` type is used to
    // suppress TS error temporarily (https://github.com/nuxt/image/discussions/548).
    ipx: {
      maxAge: 1200,
      baseURL:
        process.env.NODE_ENV === 'development' ? '/_ipx/' : '/flight/_ipx/',
    } as any,
  },
  css: ['~/assets/css/global.css'],
  tailwindcss: {
    cssPath: '@pegipegi/web-pegipegi-ui/style',
  },
  typescript: {
    shim: false,
  },
  vuefire: {
    config: {
      apiKey: process.env.NUXT_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NUXT_FIREBASE_DATABASE_URL,
      projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_FIREBASE_APP_ID,
      measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
    },
  },
  alias: {
    api: resolve(__dirname, './server/api'),
    'common-module': resolve(__dirname, './modules/common'),
    'home-module': resolve(__dirname, './modules/home'),
  },
  nitro: {
    baseURL: '/flight/',
    compressPublicAssets: true,
  },
  vite: {
    plugins: [
      sentryVitePlugin({
        url: 'https://sentry.pegipegi.com',
        org: 'pegipegi',
        release: {
          name: appVersion,
          deploy: envMode === undefined ? undefined : { env: envMode },
        },
        project: 'web-pegipegi-flight-mobile',
        authToken:
          '703e790fc2fb40c594455f9ca0ef40330cf48bc10c394fe194bb1d3d598dc8d9',
        sourcemaps: {
          assets: ['.nuxt/dist/**'],
        },
      }),
    ],
  },
});
