<script lang="ts" setup>
  import { parse, format } from 'date-fns';
  import useSearchForm from 'home-module/composables/use-search-form';

  export type History = {
    from: { airport: string; city: string };
    to: { airport: string; city: string };
    departureDate: string;
    returnDate: string | null;
    paxAdult: number;
    paxChild: number;
    paxInfant: number;
    isNoTransit: boolean;
    seatClass: string;
  };

  type DeleteEmits = {
    (e: 'delete', id: number): void;
  };

  defineEmits<DeleteEmits>();

  const props = defineProps<{
    history: History;
    index: number;
  }>();

  const homeUrl = useRuntimeConfig().public.homeUrl || 'https://pegipegi.com';

  const flightUrl = computed(() => {
    const baseUrl = `${homeUrl}/flight/search-result/departure?`;
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(props.history)) {
      if (value === null) {
        continue;
      }
      const hasAirport = value?.hasOwnProperty('airport');
      const newValue = hasAirport ? Object.values(value)[0] : value;
      const newKey = /^pax/.test(key) ? key.slice(3).toLowerCase() : key;
      params.append(newKey, newValue);
    }
    return baseUrl + params;
  });

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

  const { seatClass } = useSearchForm();
  const seatClassText = computed(
    () =>
      seatClass.find((item) => item.code === props.history.seatClass)
        ?.displayName
  );
</script>

<template>
  <li
    class="border-neutral-tuna-100 relative min-w-[280px] rounded-xl border bg-white px-4 py-3"
  >
    <a :href="flightUrl">
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
          @click.stop.prevent="$emit('delete', index)"
        >
          <NuxtImg src="/icon-close.svg" alt="Remove" width="12" height="12" />
        </button>
      </div>
      <span class="text-neutral-tuna-300 text-sm leading-5">
        <p class="truncate">{{ flightDate }}</p>
        <p class="truncate">{{ totalPassenger }} | {{ seatClassText }}</p>
      </span>
    </a>
  </li>
</template>
