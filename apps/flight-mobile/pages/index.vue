<script lang="ts" setup>
  import SectionSearch from 'home-module/components/SectionSearch.vue';
  import SectionLastSearch from 'home-module/components/SectionLastSearch.vue';
  import SectionPromo from 'home-module/components/SectionPromo.vue';
  import SectionImportantInfo from '~~/modules/home/components/SectionImportantInfo.vue';
  import SectionCheapFlight from 'home-module/components/SectionCheapFlight.vue';
  import SectionSeo from 'home-module/components/SectionSeo.vue';
  import Navbar from 'home-module/components/Navbar.vue';
  import Footer from 'home-module/components/Footer.vue';
  import useFirebase from 'common-module/composables/use-firebase';

  useHead({
    meta: [{ hid: 'robots', name: 'robots', content: 'index, follow' }],
  });

  const { track } = useFirebase();
  onMounted(() => {
    track('open_screen', {
      screen_name: 'FlightHome',
    });
  });

  const searchUrl = useLocalStorage('flight-mweb.search-url', null);
  searchUrl.value = null;
</script>

<template>
  <div id="homepage" class="flex h-screen flex-col overflow-y-auto bg-white">
    <Navbar />
    <SectionSearch />
    <SectionLastSearch />
    <SectionPromo />
    <SectionImportantInfo />
    <SectionCheapFlight />
    <SectionSeo />
    <Footer />
  </div>
</template>
