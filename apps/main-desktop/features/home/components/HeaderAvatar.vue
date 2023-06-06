<script lang="ts" setup>
  const props = defineProps<{
    picture?: string;
    name?: string;
  }>();

  const initial = computed(() => {
    if (!props.name) return '';
    return props.name
      .split(/\s+/g)
      .map((str) => str[0].toUpperCase())
      .slice(0, 2)
      .join('');
  });
</script>

<template>
  <div class="h-8 w-8 overflow-hidden rounded-full">
    <NuxtImg
      v-if="props.picture"
      :src="props.picture"
      width="34px"
      height="34px"
      role="presentation"
    />
    <div
      v-else
      class="bg-orange-inter-50 text-orange-inter-600 flex h-full w-full items-center justify-center"
    >
      {{ initial }}
    </div>
  </div>
</template>
