<script lang="ts" setup>
  import Swiper from './Swiper.vue';
  import SwiperItem from './SwiperItem.vue';
  import uspContents from '../enums/usp-contents';
</script>

<template>
  <section class="text-neutral-tuna-800" aria-labelledby="usp-title">
    <h2 id="usp-title" class="text-center text-base font-bold">
      Kenapa Pegipegi?
    </h2>
    <Swiper>
      <SwiperItem
        class="border-neutral-tuna-100 mt-3 flex min-w-full flex-col items-center justify-center gap-1 border-b-[1px]"
        v-for="(content, index) in uspContents"
        :key="index"
      >
        <NuxtImg
          :src="content.imageUrl"
          width="200"
          height="200"
          :alt="content.title"
          class="my-3 h-[140px] w-[140px]"
          loading="lazy"
        />
        <h2 class="mb-2 text-sm font-bold">
          {{ content.title }}
        </h2>
        <p class="mb-4 text-center text-sm">{{ content.text }}</p>
      </SwiperItem>
    </Swiper>
  </section>
</template>
