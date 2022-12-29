<script lang="ts" setup>
  import SearchForm from 'home-module/components/SearchForm.vue';
</script>

<template>
  <main aria-labelledby="search-form" class="relative p-4 pt-[180px]">
    <div
      class="absolute inset-x-0 -top-16 h-[500px] w-full bg-gradient-to-b from-[#ffdc8e] via-[#ffc09f] to-white"
    />

    <NuxtImg
      src="/figure-search-hero.svg"
      class="absolute left-0 top-[-48px] w-full"
      alt="Naik Pesawat"
    />

    <SearchForm />
  </main>
</template>
