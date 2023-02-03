<script lang="ts" setup>
  import { BottomSheet, Button } from '@pegipegi/web-pegipegi-ui';

  const { homeUrl } = useRuntimeConfig().public;
  const { data: isMaintenance, refresh: fetch } = await useFetch(
    '/api/maintenance-status',
    {
      immediate: false,
    }
  );
  onMounted(() => fetch());
</script>

<template>
  <BottomSheet :model-value="isMaintenance ?? false" persistent>
    <div class="p-4 text-center">
      <NuxtImg
        src="/figure-maintenance.webp"
        height="300"
        alt="Maintenance"
        class="mb-6 h-32 w-full object-contain"
      />

      <h2 class="text-xl font-bold">Waduh... Lagi perbaikan, nih</h2>

      <p class="mb-4">Cek lagi nanti setelah selesai upgrade, yah.</p>

      <a :href="homeUrl">
        <Button block>Ke Halaman Utama</Button>
      </a>
    </div>
  </BottomSheet>
</template>
