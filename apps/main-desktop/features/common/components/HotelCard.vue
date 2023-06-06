<script lang="ts" setup>
  import toCurrency from 'common-module/utils/to-currency';

  const img = useImage();

  defineProps<{
    image?: string;
    name?: string;
    star?: number;
    location?: string;
    discount?: number;
    originalPrice?: string | number;
    price?: string | number;
    save?: number;
    loading?: boolean;
  }>();
</script>

<template>
  <div
    class="shadow-skim flex h-auto w-full flex-col items-center overflow-hidden rounded-lg bg-white"
  >
    <template v-if="!loading">
      <NuxtImg
        class="h-[132px] w-full bg-cover"
        :src="image || '/figure-no-image.webp'"
        :placeholder="img('/figure-no-image.webp')"
        loading="lazy"
        :alt="name"
      />
      <div
        class="flex h-auto min-h-[168px] w-full flex-col justify-between gap-4 p-2"
      >
        <div>
          <h3 class="text-neutral-tuna-800 text-sm font-bold">
            {{ name }}
          </h3>
          <NuxtImg
            v-for="n in star"
            :key="n"
            src="/icon-star.svg"
            class="inline-flex gap-[1.7px]"
            width="14"
            height="14"
            :alt="`${n} Star`"
          />
          <p class="text-neutral-tuna-300 text-xs">{{ location }}</p>
        </div>
        <div class="place-content-end items-end">
          <div class="flex gap-2">
            <span
              v-if="originalPrice"
              class="text-neutral-tuna-300 text-[10px] line-through"
            >
              {{ toCurrency(Number(originalPrice), 'Rp') }}
            </span>
            <span
              v-if="discount"
              class="bg-red-flower-700 rounded px-1 text-xs font-bold text-white"
            >
              {{ discount }}%
            </span>
          </div>
          <p v-if="save" class="text-yellow-candle-400 text-xs font-bold">
            {{ `+Save ${save}%` }}
          </p>
          <p class="text-orange-inter-600 text-base font-bold">
            {{ toCurrency(Number(price), 'Rp') }}
          </p>
        </div>
      </div>
    </template>
    <template v-else>
      <NuxtImg
        class="h-[132px] w-full bg-cover"
        src="/figure-thumbnail-image.webp"
        :placeholder="img('/figure-thumbnail-image.webp')"
        alt="Loading"
      />
      <div
        class="flex h-auto min-h-[168px] w-full flex-col justify-between gap-4 p-2"
      >
        <div>
          <div class="bg-neutral-tuna-50 mb-1 h-5 w-full rounded-[4px]" />
          <div class="bg-neutral-tuna-50 mb-1 h-3 w-28 rounded-[4px]" />
          <div class="bg-neutral-tuna-50 mb-1 h-4 w-16 rounded-[4px]" />
        </div>
        <div class="place-content-end items-end">
          <div class="bg-neutral-tuna-50 mb-1 h-5 w-14 rounded-[4px]" />
          <div class="bg-neutral-tuna-50 mb-1 h-4 w-28 rounded-[4px]" />
        </div>
      </div>
    </template>
  </div>
</template>
