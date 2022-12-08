<script lang="ts" setup>
  import useAirports from "home-module/composables/use-airports";
  import useSeatClasses from "home-module/composables/use-seat-classes";
  import usePromoBanners from "home-module/composables/use-promo-banners";

  const [{ data: airports }, { data: seatClasses }, { data: promos }] =
    await Promise.all([useAirports(), useSeatClasses(), usePromoBanners()]);
</script>

<template>
  <h1>Promo Banners</h1>
  <hr />
  <code>{{ promos }}</code>
  <h1>Seat Classes</h1>
  <hr />
  <code>{{ seatClasses }}</code>
  <h1>Airports</h1>
  <hr />
  <code>{{ airports }}</code>
</template>
