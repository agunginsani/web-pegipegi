<script lang="ts" setup>
  import Swiper from './Swiper.vue';
  import SwiperItem from './SwiperItem.vue';
  import airlineGroups from '../enums/airline-groups';

  const { homeUrl } = useRuntimeConfig().public;
  if (homeUrl === undefined)
    throw new Error('`process.env.HOME_URL` is not defined');
</script>

<template>
  <section class="text-neutral-tuna-800 my-6" aria-labelledby="airlines-title">
    <h2 id="airlines-title" class="text-center text-base font-bold">
      Partner Maskapai Pegipegi
    </h2>
    <Swiper indicated>
      <SwiperItem
        class="mt-[2px] flex justify-center px-3"
        v-for="(airlines, index) in airlineGroups"
        :key="index"
      >
        <div class="max-w-[230px] pb-1">
          <NuxtLink
            v-for="(airline, index) in airlines"
            :key="index"
            :to="`${homeUrl}/flight/${airline.path}`"
            target="_blank"
          >
            <NuxtImg
              :src="`airline-${airline.url}`"
              width="36px"
              height="36px"
              :alt="airline.label"
              class="shadow-lifted mr-2.5 mt-2.5 inline rounded-full p-2"
              loading="lazy"
            />
          </NuxtLink>
        </div>
      </SwiperItem>
    </Swiper>
  </section>
</template>
