<script lang="ts" setup>
  import LastSearchItem from 'home-module/components/LastSearchItem.vue';

  // TODO: get from cookies
  const histories = ref([
    {
      from: { airport: 'CGK', city: 'Jakarta' },
      to: { airport: 'DPS', city: 'Bali / Denpasar' },
      departureDate: '25-12-2022',
      returnDate: null,
      paxAdult: 1,
      paxChild: 0,
      paxInfant: 0,
      isNoTransit: false,
      seatClass: 'ECONOMY',
    },
    {
      from: { airport: 'DPS', city: 'Bali / Denpasar' },
      to: { airport: 'CGK', city: 'Jakarta' },
      departureDate: '25-12-2022',
      returnDate: '27-12-2022',
      paxAdult: 1,
      paxChild: 0,
      paxInfant: 0,
      isNoTransit: false,
      seatClass: 'ECONOMY',
    },
    {
      from: { airport: 'DPS', city: 'Bali / Denpasar' },
      to: { airport: 'CGK', city: 'Jakarta' },
      departureDate: '25-12-2022',
      returnDate: null,
      paxAdult: 1,
      paxChild: 0,
      paxInfant: 0,
      isNoTransit: false,
      seatClass: 'ECONOMY',
    },
  ]);

  // TODO: handle max 5 history and remove if date expired
</script>

<template>
  <section aria-labelledby="last-search-user" class="py-3">
    <h1 id="last-search-user" class="mb-4 px-4 text-base font-bold">
      Pencarian Terakhir
    </h1>
    <ul class="flex w-full space-x-2 overflow-x-auto px-4">
      <LastSearchItem v-for="history in histories" :history="history" />
    </ul>
  </section>
</template>
