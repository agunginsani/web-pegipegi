<script lang="ts" setup>
  import Swiper from './Swiper.vue';
  import SwiperItem from './SwiperItem.vue';
  import popularDestinations from '../enums/popular-destinations';

  const { homeUrl } = useRuntimeConfig().public;
  if (homeUrl === undefined)
    throw new Error('`process.env.HOME_URL` is not defined');
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
        >
          {{ route.text }}
        </NuxtLink>
      </SwiperItem>
    </Swiper>
  </section>
</template>
