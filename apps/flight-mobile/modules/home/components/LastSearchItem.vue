<script lang="ts" setup>
  import { format, parse } from 'date-fns';
  import { History } from 'home-module/types/last-search-types';

  const props = defineProps<{ history: History }>();

  const flightType = computed(() => {
    return props.history.returnDate === null ? 'oneway' : 'roundtrip';
  });

  const flightDate = computed(() => {
    const departureDate = format(
      parse(props.history.departureDate, 'd-MM-yyyy', new Date()),
      'd MMM yyyy'
    );
    const returnDate = props.history.returnDate
      ? format(
          parse(props.history.returnDate, 'd-MM-yyyy', new Date()),
          'd MMM yyyy'
        )
      : '';

    return props.history.returnDate
      ? `${departureDate} - ${returnDate}`
      : departureDate;
  });

  const totalPassenger = computed(() => {
    const total =
      props.history.paxAdult + props.history.paxChild + props.history.paxInfant;
    return `${total} Penumpang`;
  });
</script>

<template>
  <li
    class="border-neutral-tuna-100 relative min-w-[280px] rounded-xl border bg-white px-4 py-3"
  >
    <div class="flex justify-between">
      <div
        class="flex space-x-1 overflow-hidden whitespace-nowrap pr-4 text-sm font-bold leading-5"
      >
        <span>{{ history.from.city }}</span>
        <NuxtImg
          :src="`/icon-arrow-${flightType}.svg`"
          :alt="flightType"
          width="16"
          height="16"
        />
        <span class="truncate">{{ history.to.city }}</span>
      </div>
      <button
        class="absolute right-1 top-1 flex h-9 w-9 items-center justify-center"
      >
        <NuxtImg src="/icon-close.svg" alt="close" width="12" height="12" />
      </button>
    </div>
    <span class="text-neutral-tuna-300 text-sm leading-5">
      <p class="truncate">{{ flightDate }}</p>
      <p class="truncate">{{ totalPassenger }} | {{ history.seatClass }}</p>
    </span>
  </li>
</template>
