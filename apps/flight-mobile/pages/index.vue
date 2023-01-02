<script lang="ts" setup>
  import SectionLastSearch from 'home-module/components/SectionLastSearch.vue';
  import SectionSearch from 'home-module/components/SectionSearch.vue';
  import Navbar from 'home-module/components/Navbar.vue';
  import Footer from 'home-module/components/Footer.vue';
</script>

<template>
  <div id="body" class="flex h-screen flex-col overflow-y-auto bg-white">
    <Navbar />
    <SectionSearch />
    <SectionLastSearch />
    <Footer />
  </div>
</template>
