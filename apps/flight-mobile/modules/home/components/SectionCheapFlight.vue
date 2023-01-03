<script lang="ts" setup>
  import cheapFlightList from 'home-module/enums/cheap-flight-list';
  import CheapFlightItem from 'home-module/components/CheapFlightItem.vue';
</script>

<template>
  <section aria-labelledby="cheap-flight" class="pb-3">
    <h2 id="cheap-flight" class="mb-4 px-4 text-base font-bold">
      Penerbangan Lokal Murah
    </h2>
    <ul class="flex w-full space-x-[10px] overflow-x-auto px-4">
      <CheapFlightItem
        v-for="flight in cheapFlightList"
        :flight="flight"
        :key="flight.city"
      />
    </ul>
  </section>
</template>
