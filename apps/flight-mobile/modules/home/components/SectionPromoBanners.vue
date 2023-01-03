<script lang="ts" setup>
  import PromoBanners from './PromoBanners.vue';
</script>

<template>
  <section aria-labelledby="promo-banners-user" class="pb-3">
    <div class="mb-4 flex justify-between px-4">
      <h1 id="promo-banners-user" class="text-base font-bold">Promo</h1>
      <button class="font-bold text-[#FE5000]">Lihat Semua</button>
    </div>
    <PromoBanners />
  </section>
</template>
