<script lang="ts" setup>
  import Snackbar from 'common-module/components/Snackbar.vue';
  import ModalMaintenance from 'common-module/components/ModalMaintenance.vue';
  import useProfile from 'common-module/composables/use-profile';
  import useAuth from 'common-module/composables/use-auth';

  const title = `Tiket Pesawat Promo - Cek & Pesan Tiket Online Harga OK`;
  const seoDescription = `Cek jadwal dan promo tiket pesawat murah untuk berbagai rute/maskapai di sini. Pesan tiket pesawat online mudah & OK harganya pakai Pegipegi.`;
  const seoImage = `https://www.pegipegi.com/flat/img/ogp-pegipegi.jpg`;
  const seoImageWidth = '398';
  const seoImageHeight = '220';

  useHead({
    title,
    htmlAttrs: {
      lang: 'id',
    },
    link: [
      {
        rel: 'shortcut icon',
        href: 'https://www.pegipegi.com/mobile/homepage/all/img/apple-touch-icon.png',
        type: 'image/x-icon',
      },
      {
        rel: 'canonical',
        href: 'https://www.pegipegi.com/flight',
      },
    ],
  });

  useServerSeoMeta({
    contentType: 'text/html; charset=utf-8',
    robots: 'noindex, follow',
    themeColor: '#ffdc8e',
    description: seoDescription,
    author: 'PT. GO Online Destination',
    ogTitle: title,
    ogType: 'website',
    ogUrl: 'https://www.pegipegi.com/flight',
    ogImage: seoImage,
    ogDescription: seoDescription,
    ogSiteName: 'Pegipegi',
    ogImageWidth: seoImageWidth,
    ogImageHeight: seoImageHeight,
    fbAppId: '966242223397117',
    twitterCard: 'summary_large_image',
    twitterSite: 'pegipegi',
    twitterTitle: title,
    twitterDescription: seoDescription,
    twitterCreator: '@pegipegi',
    twitterImage: seoImage,
    twitterPlayerWidth: seoImageWidth,
    twitterPlayerHeight: seoImageHeight,
    twitterPlayer: 'https://www.pegipegi.com/flight',
  });

  useAuth();

  const { initiateProfile } = useProfile();
  await initiateProfile();
</script>

<template>
  <NuxtLoadingIndicator color="#fe5000" />
  <NuxtPage />
  <div id="portal-1" class="relative z-30" />
  <div id="portal-2" class="relative z-40" />
  <div id="portal-3" class="relative z-50" />
  <div id="portal-4" class="z-60 relative">
    <ModalMaintenance />
    <Snackbar />
  </div>
</template>
