<script lang="ts" setup>
  import CardPolaroid from 'home-module/components/CardPolaroid.vue';

  const img = useImage();
  const props = defineProps<{
    image?: string;
    description?: string;
    duration?: string;
    loading?: boolean;
  }>();
</script>

<template>
  <CardPolaroid white v-if="!props.loading">
    <NuxtImg
      :src="props.image"
      :placeholder="img('/figure-thumbnail-image.webp')"
      loading="lazy"
      class="w-full object-cover"
      :alt="props.description"
    />

    <template #description>
      <div class="grid gap-2 text-sm">
        <p>
          {{ props.description }}
        </p>
        <div
          class="text-neutral-tuna-300 flex items-center gap-1 text-[10px]"
          v-if="duration"
        >
          <NuxtImg
            src="/icon-calendar-grey.svg"
            :placeholder="img('/figure-thumbnail-image.webp')"
            loading="lazy"
            width="12"
            height="12"
            class="object-cover"
            role="presentation"
          />
          <span>Periode Promo:</span>
          <strong>{{ props.duration }}</strong>
        </div>
      </div>
    </template>
  </CardPolaroid>
  <CardPolaroid white v-else>
    <NuxtImg
      src="/figure-thumbnail-image.webp"
      loading="lazy"
      height="162"
      class="h-[162px] w-full object-cover"
      role="presentation"
    />

    <template #description>
      <div class="grid animate-pulse gap-1">
        <div class="bg-neutral-tuna-50 h-4 w-3/4 rounded" />
        <div class="bg-neutral-tuna-50 h-4 w-full rounded" />
        <div class="bg-neutral-tuna-50 mb-10 h-4 w-1/2 rounded" />
        <div class="bg-neutral-tuna-50 h-4 w-1/4 rounded" />
      </div>
    </template>
  </CardPolaroid>
</template>
