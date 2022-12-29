import { resolve } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
    '@nuxt/image-edge',
  ],
  runtimeConfig: {
    bannerApiKey: '',
    public: {
      homeUrl: '',
      authBaseUrl: '',
      bannerApiBaseUrl: '',
      apixBaseUrl: '',
    },
  },
  tailwindcss: {
    cssPath: '@pegipegi/web-pegipegi-ui/style',
  },
  typescript: {
    shim: false,
  },
  alias: {
    'common-module': resolve(__dirname, './modules/common'),
    'home-module': resolve(__dirname, './modules/home'),
  },
  nitro: {
    compressPublicAssets: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'id',
      },
      title: 'Tiket Pesawat Promo - Cek & Pesan Tiket Online Harga OK',
      meta: [
        { 'http-equiv': 'content-type', content: 'text/html; charset=utf-8' },
        { hid: 'robots', name: 'robots', content: 'noindex, follow' },
        { name: 'theme-color', content: '#ffdc8e' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Cek jadwal dan promo tiket pesawat murah untuk berbagai rute/maskapai di sini. Pesan tiket pesawat online mudah & OK harganya pakai Pegipegi.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'harga tiket pesawat, tiket pesawat murah, tiket pesawat, jadwal pesawat, promo tiket pesawat',
        },
        { name: 'author', content: 'PT. GO Online Destination' },

        // Open Graph
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Tiket Pesawat Promo - Cek & Pesan Tiket Online Harga OK',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.pegipegi.com/flight' },
        {
          property: 'og:image',
          content: 'https://www.pegipegi.com/flat/img/ogp-pegipegi.jpg',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Cek jadwal dan promo tiket pesawat murah untuk berbagai rute/maskapai di sini. Pesan tiket pesawat online mudah & OK harganya pakai Pegipegi.',
        },
        { property: 'og:site_name', content: 'Pegipegi' },
        { property: 'og:image:width', content: '398' },
        { property: 'og:image:height', content: '220' },
        { property: 'fb:app_id', content: '966242223397117' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@pegipegi' },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Tiket Pesawat Promo - Cek & Pesan Tiket Online Harga OK',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Cek jadwal dan promo tiket pesawat murah untuk berbagai rute/maskapai di sini. Pesan tiket pesawat online mudah & OK harganya pakai Pegipegi.',
        },
        { name: 'twitter:creator', content: '@pegipegi' },
        {
          name: 'twitter:image:src',
          content: 'https://www.pegipegi.com/flat/img/ogp-pegipegi.jpg',
        },
        { name: 'twitter:image:width', content: '398' },
        { name: 'twitter:image:height', content: '220' },
        { name: 'twitter:domain', content: 'https://www.pegipegi.com/flight' },
      ],
      link: [
        {
          rel: 'shortcut icon',
          href: 'https://www.pegipegi.com/mobile/homepage/all/img/apple-touch-icon.png',
          type: 'image/x-icon',
        },
        { rel: 'canonical', href: 'https://www.pegipegi.com/flight' },
      ],
    },
  },
});
