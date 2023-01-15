<script lang="ts" setup>
  import { Button } from '@pegipegi/web-pegipegi-ui';
  defineProps<{ searchUrl: string }>();
</script>

<template>
  <div class="z-1 relative rounded-2xl bg-white p-3">
    <slot></slot>
    <NuxtLink :to="searchUrl">
      <Button block class="mt-2">Cari Tiket Pesawat</Button>
    </NuxtLink>
  </div>
</template>
