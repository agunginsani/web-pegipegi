<script lang="ts" setup>
  import PromoBanners from './PromoBanners.vue';
</script>

<template>
  <section aria-labelledby="promo-banners-user" class="pb-3">
    <div class="mb-4 flex justify-between px-4">
      <h1 id="promo-banners-user" class="text-base font-bold">Promo</h1>
      <button class="font-bold text-[#FE5000]">Lihat Semua</button>
    </div>
    <ul
      class="container-snap flex w-full snap-x snap-mandatory space-x-2 overflow-x-auto px-4"
    >
      <PromoBanners />
    </ul>
  </section>
</template>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .container-snap::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .container-snap {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
