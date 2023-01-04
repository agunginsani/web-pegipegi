<script lang="ts" setup>
  import LastSearchItem, {
    History,
  } from 'home-module/components/LastSearchItem.vue';

  const histories = useCookie<Array<History> | null>('flight-search');

  function removeHistory(id: number): void {
    if (histories.value && histories.value !== null) {
      const newHistories = histories.value.filter((_, idx) => idx !== id);
      histories.value = newHistories.length > 0 ? newHistories : null;
    }
  }
</script>

<template>
  <section aria-labelledby="last-search-user" class="pb-3" v-if="histories">
    <h2 id="last-search-user" class="mb-4 px-4 text-base font-bold">
      Pencarian Terakhir
    </h2>
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
