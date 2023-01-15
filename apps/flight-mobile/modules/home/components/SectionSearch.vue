<script lang="ts" setup>
  import SearchForm from 'home-module/components/SearchForm.vue';
</script>

<template>
  <main class="relative p-4 pt-[170px]">
    <div
      class="absolute inset-x-0 -top-16 h-[500px] w-full bg-gradient-to-b from-[#ffdc8e] via-[#ffc09f] to-white"
    />

    <NuxtImg
      src="/figure-search-hero.svg"
      class="absolute left-1/2 top-[-36px] w-[calc(100%-20px)] max-w-[400px] -translate-x-1/2"
      alt="Naik Pesawat"
      format="webp"
      fetchpriority="high"
      loading="eager"
      height="310"
      preload
    />

    <SearchForm />
  </main>
</template>
