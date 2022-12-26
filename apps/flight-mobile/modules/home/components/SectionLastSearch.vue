<script lang="ts" setup>
  import LastSearchItem from 'home-module/components/LastSearch/LastSearchItem.vue';

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
</script>

<template>
  <section aria-labelledby="last-search-user" class="px-4 py-3">
    <h1 id="last-search-user" class="mb-3 text-base font-bold">
      Pencarian Terakhir
    </h1>
    <div class="flex w-full space-x-[8px] overflow-x-auto">
      <template v-for="history in histories">
        <LastSearchItem :history="history" />
      </template>
    </div>
  </section>
</template>
