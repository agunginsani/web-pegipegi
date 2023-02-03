<script lang="ts" setup>
  import { Banner } from '@pegipegi/web-pegipegi-ui';

  type BannerProperty = {
    color: 'info' | 'warning' | 'negative';
    class: string;
  };

  const { data } = useFetch('/api/adhoc');

  const bannerProperty = computed<BannerProperty>(() => {
    if (data.value?.message.toLowerCase() === 'warning') {
      return {
        color: 'warning',
        class: 'bg-yellow-candle-300',
      };
    }
    if (data.value?.message.toLowerCase() === 'danger') {
      return {
        color: 'negative',
        class: 'bg-red-flower-700',
      };
    }
    return {
      color: 'info',
      class: 'bg-blue-dodger-600',
    };
  });
</script>

<template>
  <div class="relative" v-if="data">
    <div
      class="overflow-hidden rounded-t-2xl pt-1"
      :class="[bannerProperty.class]"
    >
      <Banner :color="bannerProperty.color">
        <template #icon>
          <NuxtImg src="/icon-pegipegi.svg" width="24" height="24" />
        </template>
        <template #description>
          <p>{{ data?.message }}</p>
        </template>
        <template #action />
      </Banner>
    </div>
    <div :class="[bannerProperty.class, 'absolute top-full h-8 w-full']" />
  </div>
</template>
