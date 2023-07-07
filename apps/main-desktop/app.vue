<script lang="ts" setup>
  const title = 'Liburan termurah cuma di Pegipegi';
  const seoDescription =
    'Juara Harga Termurah untuk pesan hotel, pesawat, kereta, bus & travel! Ada potongan harga langsung dan promo setiap hari, buktiin murahnya sekarang!';
  const seoImage = 'https://asset.pegipegi.com/image/seo/ogimage.jpg';
  const seoImageWidth = '398';
  const seoImageHeight = '220';
  const seoUrl = 'https://www.pegipegi.com/';

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
        href: seoUrl,
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
    ogUrl: seoUrl,
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
    twitterPlayer: seoUrl,
  });
</script>

<template>
  <NuxtLoadingIndicator color="#fe5000" />
  <NuxtPage />
</template>
