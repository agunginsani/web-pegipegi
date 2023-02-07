<script lang="ts" setup>
  import { Banner } from '@pegipegi/web-pegipegi-ui';

  type BannerProperty =
    | {
        color: 'info' | 'warning' | 'negative';
        class: string;
        icon: string;
      }
    | undefined;

  const { data } = useFetch('/api/adhoc');

  const bannerProperty = computed<BannerProperty>(() => {
    if (!data.value) return;
    if (data.value.type === 'WARNING') {
      return {
        color: 'warning',
        class: 'bg-yellow-candle-300',
        icon: 'icon-pegipegi-black.svg',
      };
    }
    if (data.value.type === 'DANGER') {
      return {
        color: 'negative',
        class: 'bg-red-flower-700',
        icon: 'icon-pegipegi.svg',
      };
    }
    return {
      color: 'info',
      class: 'bg-blue-dodger-600',
      icon: 'icon-pegipegi.svg',
    };
  });
</script>

<template>
  <div class="relative" v-if="data && bannerProperty">
    <div
      class="overflow-hidden rounded-t-2xl pt-1"
      :class="[bannerProperty.class]"
    >
      <Banner :color="bannerProperty.color">
        <template #icon>
          <NuxtImg
            class="bg-clip-content fill-black"
            :src="bannerProperty.icon"
            width="24"
            height="24"
          />
        </template>
        <template #description>
          <p>{{ data.message }}</p>
        </template>
        <template #action />
      </Banner>
    </div>
    <div :class="[bannerProperty.class, 'absolute top-full h-8 w-full']" />
  </div>
</template>
