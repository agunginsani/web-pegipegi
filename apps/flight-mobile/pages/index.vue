<script lang="ts" setup>
  import SectionSearch from "home-module/components/SectionSearch.vue";
  import Navbar from "home-module/components/Navbar.vue";
</script>

<template>
  <div id="body" class="h-screen overflow-y-auto flex flex-col bg-white">
    <Navbar />
    <SectionSearch />

    <footer class="mt-auto">footer</footer>
  </div>
</template>
