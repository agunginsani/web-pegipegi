<script lang="ts" setup>
  import SectionLastSearch from 'home-module/components/SectionLastSearch.vue';
  import SectionSearch from 'home-module/components/SectionSearch.vue';
  import SectionCheapFlight from 'home-module/components/SectionCheapFlight.vue';
  import Navbar from 'home-module/components/Navbar.vue';
  import Footer from 'home-module/components/Footer.vue';
  import SectionPromo from 'home-module/home/components/SectionPromo.vue';
</script>

<template>
  <div id="body" class="flex h-screen flex-col overflow-y-auto bg-white">
    <Navbar />
    <SectionSearch />
    <SectionLastSearch />
    <SectionPromo />
    <SectionCheapFlight />
    <Footer />
  </div>
</template>
