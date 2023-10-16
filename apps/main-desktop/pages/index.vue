<script lang="ts" setup>
  import Header from 'home-module/components/Header.vue';
  import SearchForm from 'search-module/components/SearchForm.vue';
  import SectionPromo from 'home-module/components/SectionPromo.vue';
  import SectionHotelDeals from 'home-module/components/SectionHotelDeals.vue';
  import SectionExplore from 'home-module/components/SectionExplore.vue';
  import SectionAccomSelection from 'home-module/components/SectionAccomSelection.vue';
  import SectionTravelBlog from 'home-module/components/SectionTravelBlog.vue';
  import SectionImportantInfo from 'home-module/components/SectionImportantInfo.vue';
  import NewsletterSubscribe from 'home-module/components/NewsletterSubscribe.vue';
  import Snackbar from 'common-module/components/Snackbar.vue';
  import SectionSeo from 'home-module/components/SectionSeo.vue';
  import Footer from 'common-module/components/Footer.vue';
  import ModalGeneric from 'common-module/components/ModalGeneric.vue';

  const config = useRuntimeConfig();
</script>

<template>
  <div class="w-full">
    <Header />
    <main
      class="mx-auto grid w-[calc(100vw-128px)] min-w-[975px] max-w-[1366px] gap-4 pb-6"
    >
      <SearchForm />
      <SectionPromo />
      <SectionHotelDeals />
      <SectionExplore />
      <a
        :href="`https://www.pegipegi.com/promo/juara_harga_termurah`"
        class="w-full overflow-hidden rounded-xl"
        target="_blank"
      >
        <NuxtImg
          class="w-full"
          src="/figure-long-banner-v3.webp"
          alt="Juara Harga Termurah"
        />
      </a>
      <SectionAccomSelection />
      <SectionTravelBlog />
      <SectionImportantInfo />
      <NuxtImg
        class="w-full rounded-xl"
        src="/figure-download-banner.webp"
        alt="Download Aplikasi Pegipegi"
      />
      <NewsletterSubscribe />
      <SectionSeo />
    </main>
    <Footer />
    <Snackbar />
    <ModalGeneric />
  </div>
</template>
