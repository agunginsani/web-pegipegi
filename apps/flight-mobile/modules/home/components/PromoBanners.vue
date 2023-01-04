<script lang="ts" setup>
  type Banner = {
    id: number;
    image: string;
  };

  const props = defineProps<{ banner: Banner }>();
</script>

<template>
  <li class="snap-center snap-always">
    <div
      class="relative min-w-[312px] flex-shrink-0 overflow-hidden rounded-xl"
    >
      <NuxtImg
        :src="banner.image"
        alt="promo-banner"
        width="312"
        height="156"
      />
    </div>
  </li>
</template>
