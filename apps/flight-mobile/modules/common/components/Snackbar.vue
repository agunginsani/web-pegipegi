<script lang="ts" setup>
  import { Alert } from '@pegipegi/web-pegipegi-ui';
  import useSnackbar from 'common-module/composables/use-snackbar';

  const { snackbars, dismissSnackbar } = useSnackbar();
</script>

<template>
  <div class="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-2 p-4">
    <TransitionGroup
      enter-active-class="duration-300 transition-all pointer-events-none"
      leave-active-class="duration-300 transition-all pointer-events-none"
      enter-from-class="opacity-0 translate-y-5"
      leave-to-class="opacity-0 translate-y-5"
    >
      <Alert
        v-for="(item, index) in snackbars"
        :color="item.color"
        :key="`snackbar-${index}`"
      >
        <template #icon v-if="item.icon">
          <NuxtImg :src="item.icon" />
        </template>
        <template #default>
          <p class="text-sm">{{ item.text }}</p>
        </template>
        <template #action v-if="item.dismissible">
          <button class="text-sm font-bold" @click="dismissSnackbar({ index })">
            Tutup
          </button>
        </template>
      </Alert>
    </TransitionGroup>
  </div>
</template>
