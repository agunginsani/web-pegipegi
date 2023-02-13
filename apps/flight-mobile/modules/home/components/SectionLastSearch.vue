<script lang="ts" setup>
  import LastSearchItem, {
    History,
  } from 'home-module/components/LastSearchItem.vue';
  import { parse, isBefore, startOfDay } from 'date-fns';

  const histories = useCookie<Array<History> | null>('flight-search');

  onMounted(() => {
    const today = startOfDay(new Date());
    histories.value =
      histories.value?.filter((item) => {
        const departureDate = parse(
          item.departureDate,
          'dd-MM-yyyy',
          new Date()
        );
        return !isBefore(departureDate, today);
      }) || [];
  });

  function removeHistory(id: number): void {
    if (histories.value && histories.value !== null) {
      const newHistories = histories.value.filter((_, idx) => idx !== id);
      histories.value = newHistories.length > 0 ? newHistories : null;
    }
  }
</script>

<template>
  <section
    aria-labelledby="last-search-user-title"
    class="pb-3"
    v-if="!!histories && histories.length > 0"
  >
    <h2 id="last-search-user-title" class="mb-4 px-4 text-base font-bold">
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
