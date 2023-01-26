<script lang="ts" setup>
  import SectionSearch from 'home-module/components/SectionSearch.vue';
  import SectionLastSearch from 'home-module/components/SectionLastSearch.vue';
  import SectionPromo from 'home-module/components/SectionPromo.vue';
  import SectionInfo from 'home-module/components/SectionInfo.vue';
  import SectionCheapFlight from 'home-module/components/SectionCheapFlight.vue';
  import SectionSeo from 'home-module/components/SectionSeo.vue';
  import Navbar from 'home-module/components/Navbar.vue';
  import Footer from 'home-module/components/Footer.vue';
  import useFirebase from 'common-module/composables/use-firebase';

  const { track } = useFirebase();
  onMounted(() => {
    track('open_screen', {
      screen_name: 'FlightHome',
    });
  });
</script>

<template>
  <div id="homepage" class="flex h-screen flex-col overflow-y-auto bg-white">
    <Navbar />
    <SectionSearch />
    <SectionLastSearch />
    <SectionPromo />
    <SectionInfo />
    <SectionCheapFlight />
    <SectionSeo />
    <Footer />
  </div>
</template>
