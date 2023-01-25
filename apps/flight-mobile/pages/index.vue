<script lang="ts" setup>
  import SectionSearch from 'home-module/components/SectionSearch.vue';
  import SectionLastSearch from 'home-module/components/SectionLastSearch.vue';
  import SectionPromo from 'home-module/components/SectionPromo.vue';
  import SectionInfo from 'home-module/components/SectionInfo.vue';
  import SectionCheapFlight from 'home-module/components/SectionCheapFlight.vue';
  import Navbar from 'home-module/components/Navbar.vue';
  import Footer from 'home-module/components/Footer.vue';

  // Firebase Analytics usage example
  import useFirebase from 'common-module/composables/use-firebase';
  const { track } = useFirebase();
  onMounted(() => {
    track('open_screen', {
      attr: 'value',
    });
  });
</script>

<template>
  <div id="body" class="flex h-screen flex-col overflow-y-auto bg-white">
    <Navbar />
    <SectionSearch />
    <SectionLastSearch />
    <SectionPromo />
    <SectionInfo />
    <SectionCheapFlight />
    <Footer />
  </div>
</template>
