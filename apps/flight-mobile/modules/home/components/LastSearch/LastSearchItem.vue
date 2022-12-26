<script lang="ts" setup>
  import { PropType } from 'vue';
  import { format, parse } from 'date-fns';

  type History = {
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

  const props = defineProps({
    history: {
      type: Object as PropType<History>,
      default() {
        return {};
      },
    },
  });

  const flightType = computed(() => {
    return props.history.returnDate === null ? 'oneway' : 'roundtrip';
  });

  const flightDate = computed(() => {
    let dates = '';
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

    if (props.history.returnDate) {
      dates = `${departureDate} - ${returnDate}`;
    } else {
      dates = `${departureDate}`;
    }

    return dates;
  });

  const totalPassenger = computed(() => {
    const total =
      props.history.paxAdult + props.history.paxChild + props.history.paxInfant;
    return `${total} Penumpang`;
  });
</script>

<template>
  <div
    class="border-neutral-tuna-100 min-w-[280px] rounded-xl border px-4 py-3"
  >
    <div class="flex justify-between">
      <div
        class="flex space-x-[4px] overflow-hidden whitespace-nowrap pr-1 text-sm font-bold"
      >
        <span>{{ history.from.city }}</span>
        <NuxtImg :src="`/icon-arrow-${flightType}.svg`" :alt="flightType" />
        <span class="truncate">{{ history.to.city }}</span>
      </div>
      <button>
        <NuxtImg src="/icon-close.svg" alt="close" />
      </button>
    </div>
    <div class="text-neutral-tuna-300 text-sm leading-5">
      <p class="truncate">{{ flightDate }}</p>
      <p class="truncate">{{ totalPassenger }} | {{ history.seatClass }}</p>
    </div>
  </div>
</template>
