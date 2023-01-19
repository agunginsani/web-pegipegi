<script lang="ts" setup>
  import Swiper from './Swiper.vue';
  import SwiperItem from './SwiperItem.vue';

  const homeUrl = useRuntimeConfig().public.homeUrl || 'https://pegipegi.com';
  const popularDestinations = [
    [
      {
        text: 'Tiket Pesawat ke Makassar',
        link: 'ke-makassar',
        arrival_code: 'UPG',
        arrival_area: 'Makassar',
      },
      {
        text: 'Tiket Pesawat ke Solo',
        link: 'ke-solo',
        arrival_code: 'SOC',
        arrival_area: 'Solo',
      },
      {
        text: 'Tiket Pesawat ke Batam',
        link: 'ke-batam',
        arrival_code: 'BTH',
        arrival_area: 'Batam',
      },
      {
        text: 'Tiket Pesawat ke Palembang',
        link: 'ke-palembang',
        arrival_code: 'PLM',
        arrival_area: 'Palembang',
      },
      {
        text: 'Tiket Pesawat ke Balikpapan',
        link: 'ke-balikpapan',
        arrival_code: 'BPN',
        arrival_area: 'Balikpapan',
      },
    ],
    [
      {
        text: 'Tiket Pesawat ke Malang',
        link: 'ke-malang',
        arrival_code: 'MLG',
        arrival_area: 'Malang',
      },
      {
        text: 'Tiket Pesawat ke Kuala Lumpur',
        link: 'ke-kuala-lumpur',
        arrival_code: 'KUL',
        arrival_area: 'Kuala Lumpur',
      },
      {
        text: 'Tiket Pesawat ke Pekanbaru',
        link: 'ke-pekanbaru',
        arrival_code: 'PKU',
        arrival_area: 'Pekanbaru',
      },
      {
        text: 'Tiket Pesawat ke Pontianak',
        link: 'ke-pontianak',
        arrival_code: 'PNK',
        arrival_area: 'Pontianak',
      },
      {
        text: 'Tiket Pesawat ke Lampung',
        link: 'ke-lampung',
        arrival_code: 'TKG',
        arrival_area: 'Bandar Lampung',
      },
    ],
    [
      {
        text: 'Tiket Pesawat ke Banjarmasin',
        link: 'ke-banjarmasin',
        arrival_code: 'BDJ',
        arrival_area: 'Banjarmasin',
      },
      {
        text: 'Tiket Pesawat ke Pangkal Pinang',
        link: 'ke-pangkal-pinang',
        arrival_code: 'PGK',
        arrival_area: 'Pangkal Pinang',
      },
      {
        text: 'Tiket Pesawat ke Manado',
        link: 'ke-manado',
        arrival_code: 'MDC',
        arrival_area: 'Manado',
      },
      {
        text: 'Tiket Pesawat ke Jambi',
        link: 'ke-jambi',
        arrival_code: 'DJB',
        arrival_area: 'Jambi',
      },
      {
        text: 'Tiket Pesawat ke Bangkok',
        link: 'ke-bangkok',
        arrival_code: 'DMK',
        arrival_area: 'Bangkok',
      },
    ],
  ];
</script>

<template>
  <section class="mt-6" aria-labelledby="popular-destinations-title">
    <h2 id="popular-destinations-title" class="text-center text-base font-bold">
      Tujuan Populer
    </h2>
    <Swiper>
      <SwiperItem
        class="mt-3 flex min-w-full flex-col items-center gap-1"
        v-for="(routes, index) in popularDestinations"
        :key="index"
      >
        <NuxtLink
          class="text-neutral-tuna-300 w-fit text-sm"
          v-for="(route, index) in routes"
          :key="index"
          :to="`${homeUrl}/flight/${route.link}`"
          target="_blank"
        >
          {{ route.text }}
        </NuxtLink>
      </SwiperItem>
    </Swiper>
  </section>
</template>
