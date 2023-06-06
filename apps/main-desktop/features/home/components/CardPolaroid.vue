<script lang="ts" setup>
  const props = defineProps<{ shadowed?: boolean; white?: boolean }>();
</script>

<template>
  <div
    class="bg-neutral-tuna-50 hover:bg-neutral-tuna-0 hover:shadow-lifted overflow-hidden rounded-xl transition duration-300"
    :class="{
      '!bg-neutral-tuna-0 shadow-lifted hover:shadow-raised': props.white,
    }"
  >
    <div class="relative block overflow-hidden rounded-xl">
      <slot />
      <div
        v-if="props.shadowed"
        class="absolute bottom-0 left-0 h-[50%] w-full bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.7)]"
      ></div>
    </div>
    <div class="px-4 py-2">
      <slot name="description" />
    </div>
  </div>
</template>
