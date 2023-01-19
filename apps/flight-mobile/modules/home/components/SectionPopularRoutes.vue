<script lang="ts" setup>
  import Swiper from './Swiper.vue';
  import SwiperItem from './SwiperItem.vue';

  const homeUrl = useRuntimeConfig().public.homeUrl || 'https://pegipegi.com';
  const popularRoutes = [
    [
      {
        text: 'Tiket Pesawat dari Jakarta ke Bali',
        link: 'dari-jakarta-ke-bali',
        departure_code: 'CGK',
        departure_area: 'Jakarta',
        arrival_code: 'DPS',
        arrival_area: 'Bali / Denpasar',
      },
      {
        text: 'Tiket Pesawat dari Jakarta ke Yogyakarta',
        link: 'dari-jakarta-ke-yogyakarta',
        departure_code: 'CGK',
        departure_area: 'Jakarta',
        arrival_code: 'JOG',
        arrival_area: 'Yogyakarta',
      },
      {
        text: 'Tiket Pesawat dari Jakarta ke Medan',
        link: 'dari-jakarta-ke-medan',
        departure_code: 'CGK',
        departure_area: 'Jakarta',
        arrival_code: 'KNO',
        arrival_area: 'Medan',
      },
      {
        text: 'Tiket Pesawat dari Jakarta ke Surabaya',
        link: 'dari-jakarta-ke-surabaya',
        departure_code: 'CGK',
        departure_area: 'Jakarta',
        arrival_code: 'SUB',
        arrival_area: 'Surabaya',
      },
      {
        text: 'Tiket Pesawat dari Jakarta ke Padang',
        link: 'dari-jakarta-ke-padang',
        departure_code: 'CGK',
        departure_area: 'Jakarta',
        arrival_code: 'PDG',
        arrival_area: 'Padang',
      },
    ],
    [
      {
        text: 'Tiket Pesawat dari Surabaya ke Bali',
        link: 'dari-surabaya-ke-bali',
        departure_code: 'SUB',
        departure_area: 'Surabaya',
        arrival_code: 'DPS',
        arrival_area: 'Bali / Denpasar',
      },
      {
        text: 'Tiket Pesawat dari Jakarta ke Singapura',
        link: 'dari-jakarta-ke-singapura',
        departure_code: 'CGK',
        departure_area: 'Jakarta',
        arrival_code: 'SIN',
        arrival_area: 'Singapura',
      },
      {
        text: 'Tiket Pesawat dari Jakarta ke Solo',
        link: 'dari-jakarta-ke-solo',
        departure_code: 'CGK',
        departure_area: 'Jakarta',
        arrival_code: 'SOC',
        arrival_area: 'Solo',
      },
      {
        text: 'Tiket Pesawat dari Jakarta ke Semarang',
        link: 'dari-jakarta-ke-semarang',
        departure_code: 'CGK',
        departure_area: 'Jakarta',
        arrival_code: 'SRG',
        arrival_area: 'Semarang',
      },
      {
        text: 'Tiket Pesawat dari Medan ke Jakarta',
        link: 'dari-medan-ke-jakarta',
        departure_code: 'KNO',
        departure_area: 'Medan',
        arrival_code: 'CGK',
        arrival_area: 'Jakarta',
      },
    ],
    [
      {
        text: 'Tiket Pesawat dari Bali ke Jakarta',
        link: 'dari-bali-ke-jakarta',
        departure_code: 'DPS',
        departure_area: 'Bali / Denpasar',
        arrival_code: 'CGK',
        arrival_area: 'Jakarta',
      },
      {
        text: 'Tiket Pesawat dari Jakarta ke Lombok',
        link: 'dari-jakarta-ke-lombok',
        departure_code: 'CGK',
        departure_area: 'Jakarta',
        arrival_code: 'LOP',
        arrival_area: 'Lombok, Mataram',
      },
      {
        text: 'Tiket Pesawat dari Yogyakarta ke Jakarta',
        link: 'dari-yogyakarta-ke-jakarta',
        departure_code: 'JOG',
        departure_area: 'Yogyakarta',
        arrival_code: 'CGK',
        arrival_area: 'Jakarta',
      },
      {
        text: 'Tiket Pesawat dari Surabaya ke Jakarta',
        link: 'dari-surabaya-ke-jakarta',
        departure_code: 'SUB',
        departure_area: 'Surabaya',
        arrival_code: 'CGK',
        arrival_area: 'Jakarta',
      },
      {
        text: 'Tiket Pesawat dari Bandung ke Bali',
        link: 'dari-bandung-ke-bali',
        departure_code: 'BDO',
        departure_area: 'Bandung',
        arrival_code: 'DPS',
        arrival_area: 'Bali / Denpasar',
      },
    ],
  ];
</script>

<template>
  <section class="mt-6" aria-labelledby="popular-routes-title">
    <h2 id="popular-routes-title" class="text-center text-base font-bold">
      Rute Populer
    </h2>
    <Swiper>
      <SwiperItem
        class="mt-3 flex min-w-full flex-col gap-1"
        v-for="(routes, index) in popularRoutes"
        :key="index"
      >
        <NuxtLink
          class="text-neutral-tuna-300 mx-auto w-fit text-sm"
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
