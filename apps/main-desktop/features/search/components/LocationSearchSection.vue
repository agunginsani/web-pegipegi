<script lang="ts" setup>
  const props = defineProps<{
    title?: string;
  }>();
</script>

<template>
  <div class="bg-white">
    <div
      v-if="title"
      class="flex items-center justify-between px-4 pb-1.5 pt-3.5"
    >
      <h3 class="text-neutral-tuna-800 text-base font-bold">
        {{ title }}
      </h3>
      <slot name="action" />
    </div>
    <slot />
  </div>
</template>
