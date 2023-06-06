<script lang="ts" setup>
  import useSnackbar from 'common-module/composables/use-snackbar';
  import { TransitionRoot } from '@headlessui/vue';

  const { snackbar, dismiss } = useSnackbar();
  onMounted(() => {
    if (snackbar.value.isServerPending) {
      setTimeout(() => {
        dismiss();
      }, 3000);
    }
  });
</script>

<template>
  <TransitionRoot
    :show="snackbar.isShown"
    appear
    as="template"
    enter="transition ease duration-300 transform"
    enterFrom="translate-y-full opacity-0"
    enterTo="-translate-y-0 opacity-100"
    leave="transition ease duration-300 transform"
    leaveFrom="-translate-y-0 opacity-100"
    leaveTo="translate-y-full opacity-0"
  >
    <div
      class="bg-neutral-tuna-800 text-neutral-tuna-0 fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-6 rounded-lg px-3 py-[14px]"
    >
      <p>{{ snackbar.text }}</p>
      <button class="font-bold" @click="dismiss">Tutup</button>
    </div>
  </TransitionRoot>
</template>
