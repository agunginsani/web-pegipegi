<script lang="ts" setup>
  import PromoBanners from './PromoBanners.vue';

  const promoBanners = ref([
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=312&h=156&q=80',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=312&h=156&q=80',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=312&h=156&q=80',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=312&h=156&q=80',
    },
  ]);
</script>

<template>
  <section aria-labelledby="promo-banners-user" class="pb-3">
    <div class="mb-4 flex justify-between px-4">
      <h1 id="promo-banners-user" class="text-base font-bold">Promo</h1>
      <button class="font-bold text-[#FE5000]">Lihat Semua</button>
    </div>
    <ul
      class="no-scroll-bar flex w-full snap-x snap-mandatory space-x-2 overflow-x-auto px-4"
    >
      <PromoBanners
        v-for="banner in promoBanners"
        :key="banner.id"
        :banner="banner"
      />
    </ul>
    <ul class="mt-2 flex justify-center gap-x-1 align-middle">
      <li
        v-for="banner in promoBanners"
        :key="banner.id"
        class="bg-neutral-tuna-300 h-1.5 w-1.5 rounded-full"
      ></li>
    </ul>
  </section>
</template>

<style scoped>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scroll-bar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scroll-bar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
  }
</style>
