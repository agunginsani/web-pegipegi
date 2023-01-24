<script lang="ts" setup>
  import Swiper from './Swiper.vue';
  import SwiperItem from './SwiperItem.vue';
  import popularRoutes from '../enums/popular-routes';

  const { homeUrl } = useRuntimeConfig().public;
  if (homeUrl === undefined)
    throw new Error('`process.env.HOME_URL` is not defined');
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
