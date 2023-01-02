<script lang="ts" setup>
  import LastSearchItem, {
    History,
  } from 'home-module/components/LastSearchItem.vue';

  const histories = useCookie<Array<History>>('flight-search');
  histories.value = histories.value || [];

  function removeHistory(id: number): void {
    if (histories.value && histories.value !== null) {
      histories.value = histories.value.filter((_, idx) => idx !== id);
    }
  }
</script>

<template>
  <section aria-labelledby="last-search-user" class="pb-3">
    <h1 id="last-search-user" class="mb-4 px-4 text-base font-bold">
      Pencarian Terakhir
    </h1>
    <ul class="flex flex-row space-x-2 overflow-x-auto px-4">
      <LastSearchItem
        v-for="(history, index) in histories"
        :key="`history-${index}`"
        :history="history"
        :index="index"
        @delete="removeHistory($event)"
      />
    </ul>
  </section>
</template>
