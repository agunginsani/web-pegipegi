<script lang="ts" setup>
  import SearchForm from "home-module/components/SearchForm/index.vue";
</script>

<template>
  <section aria-labelledby="search-form" class="relative p-4 pt-[200px]">
    <NuxtImg
      src="/figure-search-hero.svg"
      class="absolute left-0 top-0 w-full"
      alt="Naik Pesawat"
    />
    <SearchForm />
  </section>
</template>
