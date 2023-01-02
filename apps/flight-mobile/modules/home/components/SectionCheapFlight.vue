<script lang="ts" setup>
  import cheapFlightList from 'home-module/enums/cheap-flight-list.js';
  import CheapFlight from 'home-module/components/CheapFlight.vue';
</script>

<template>
  <section aria-labelledby="cheap-flight" class="pb-3">
    <h1 id="cheap-flight" class="mb-4 px-4 text-base font-bold">
      Penerbangan Lokal Murah
    </h1>
    <ul class="flex w-full space-x-[10px] overflow-x-auto px-4">
      <CheapFlight
        v-for="flight in cheapFlightList"
        :flight="flight"
        :key="flight.city"
      />
    </ul>
  </section>
</template>
