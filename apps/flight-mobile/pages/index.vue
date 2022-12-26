<script lang="ts" setup>
  import SectionSearch from "home-module/components/SectionSearch.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="bg-gradient-to-b from-[#ffdc8e] via-[#ffc09f] to-white">
      <header class="bg-white">
        <h1>Cari Tiket Pesawat</h1>
      </header>

      <main>
        <SectionSearch />
      </main>
    </div>

    <footer class="mt-auto">footer</footer>
  </div>
</template>
