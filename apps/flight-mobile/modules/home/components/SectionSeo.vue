<script lang="ts" setup>
  import SectionUsp from './SectionUsp.vue';
  import SectionPopularDestinations from './SectionPopularDestinations.vue';
  import SectionPopularRoutes from './SectionPopularRoutes.vue';
  import SectionMeta from './SectionMeta.vue';
  import SectionAirlines from './SectionAirlines.vue';
</script>

<template>
  <section class="my-6">
    <section-usp />
    <section-popular-destinations />
    <section-popular-routes />
    <section-meta />
    <section-airlines />
  </section>
</template>
