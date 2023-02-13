<script lang="ts" setup>
  import toCurrency from 'home-module/utils/to-currency';

  type Flight = {
    city: string;
    image: string;
    price: number;
    link: string;
  };

  const props = defineProps<{ flight: Flight }>();

  const homeUrl = useRuntimeConfig().public.homeUrl || 'https://pegipegi.com';

  const flightPrice = computed(() => toCurrency(props.flight.price, 'Rp'));
</script>

<template>
  <li class="relative h-full min-w-[120px]">
    <a :href="`${homeUrl}/flight/${flight.link}`">
      <NuxtImg
        :src="flight.image"
        width="200"
        height="200"
        fit="cover"
        :alt="flight.city"
        class="rounded"
        loading="lazy"
      />
      <div
        class="absolute top-0 left-0 flex h-full w-full flex-col justify-between rounded bg-gradient-to-t from-current py-[10px] px-[12px]"
      >
        <p class="text-xs text-white">
          Pesawat Ke <br />
          <span class="text-sm font-bold">{{ flight.city }}</span>
        </p>
        <p class="truncate text-xs text-white">
          Mulai dari <br />
          <span class="text-yellow-candle-400 text-sm font-bold">
            {{ flightPrice }}
          </span>
        </p>
      </div>
    </a>
  </li>
</template>
