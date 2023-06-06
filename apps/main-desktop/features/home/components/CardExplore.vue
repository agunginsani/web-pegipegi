<script lang="ts" setup>
  const { homeUrl, homeAltUrl } = useRuntimeConfig().public;
  const img = useImage();

  const props = defineProps<{
    name: string;
    image: string;
    merchant: 'FLIGHT' | 'HOTEL' | 'BUS' | 'TRAIN';
    url: string;
    price: number;
    inventory?: number;
  }>();

  const merchantIcons = {
    FLIGHT: '/explores/icon-flight.svg',
    HOTEL: '/explores/icon-hotel.svg',
    BUS: '/explores/icon-bus.svg',
    TRAIN: '/explores/icon-train.svg',
  };
  const roundedPrice: number = Math.floor(props.price / 1000);
  let roundedInventory: number;
  if (props.merchant === 'HOTEL' && props.inventory) {
    roundedInventory =
      props.inventory >= 1000
        ? Math.floor(props.inventory / 1000) * 1000
        : Math.floor(props.inventory / 100) * 100;
  }
  const baseUrl = computed(() =>
    props.merchant === 'FLIGHT' || props.merchant === 'TRAIN'
      ? homeAltUrl || homeUrl
      : homeUrl
  );
</script>

<template>
  <div class="relative">
    <a
      :href="`${baseUrl}${props.url}`"
      class="group relative block w-full overflow-hidden rounded-xl"
    >
      <div class="w-full overflow-hidden pb-[50%]">
        <NuxtImg
          :alt="props.name"
          :src="props.image"
          :placeholder="img('/figure-thumbnail-image.webp')"
          loading="lazy"
          width="500"
          height="350"
          class="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] scale-100 transition duration-300 group-hover:scale-125"
        />
      </div>
      <div
        class="absolute bottom-0 left-0 h-[50%] w-full bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.7)]"
      ></div>
      <div class="text-neutral-tuna-0 absolute bottom-3 left-4">
        <div class="flex items-center gap-2">
          <NuxtImg :alt="props.merchant" :src="merchantIcons[props.merchant]" />
          <h5 class="text-xl font-bold">{{ props.name }}</h5>
        </div>
        <p v-if="props.merchant === 'HOTEL'">
          Terdapat {{ roundedInventory }}+ penginapan
        </p>
      </div>
    </a>
    <div
      class="text-neutral-tuna-0 bg-orange-inter-600 left absolute left-[-11px] top-4 rounded-lg rounded-bl-none px-3 py-1"
    >
      <div
        class="bg-orange-inter-600 absolute left-0 top-full h-4 w-3 rounded-bl-lg"
      >
        <div
          class="bg-orange-inter-700 absolute left-0 top-0 h-4 w-3 rounded-l-lg"
        ></div>
      </div>
      <p>
        Mulai dari <strong>Rp{{ roundedPrice }} ribuan</strong>
      </p>
    </div>
  </div>
</template>
