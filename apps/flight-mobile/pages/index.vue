<script lang="ts" setup>
  import SectionSearch from 'home-module/components/SectionSearch.vue';
  import SectionLastSearch from 'home-module/components/SectionLastSearch.vue';
  import SectionPromo from 'home-module/components/SectionPromo.vue';
  import SectionInfo from 'home-module/components/SectionInfo.vue';
  import SectionCheapFlight from 'home-module/components/SectionCheapFlight.vue';
  import Swiper from 'home-module/components/Swiper.vue';
  import Navbar from 'home-module/components/Navbar.vue';
  import Footer from 'home-module/components/Footer.vue';
</script>

<template>
  <div id="body" class="flex h-screen flex-col overflow-y-auto bg-white">
    <Navbar />
    <SectionSearch />
    <SectionLastSearch />
    <SectionPromo />
    <SectionInfo />
    <SectionCheapFlight />
    <Swiper :indicated="true">
      <li v-for="(_, index) in 5" :key="index" :data-index="index">
        <div class="flex flex-col items-center justify-center">
          <h1>test 1</h1>
          <h1>test 2</h1>
          <h1>test 3</h1>
          <h1>test 4</h1>
          <h1>test 5</h1>
          <h1>test 6</h1>
        </div>
      </li>
    </Swiper>
    <Footer />
  </div>
</template>
