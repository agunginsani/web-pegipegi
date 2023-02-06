<script lang="ts" setup>
  import { Alert } from '@pegipegi/web-pegipegi-ui';
  import useSnackbar from 'common-module/composables/use-snackbar';

  const { snackbars, addSnackbar, removeSnackbar } = useSnackbar();
  const transitionClasses = {
    enterActiveClass: 'duration-300 transition-all pointer-events-none',
    leaveActiveClass: 'duration-300 transition-all pointer-events-none',
    enterFromClass: 'opacity-0 translate-y-5',
    leaveToClass: 'opacity-0 translate-y-5',
  };

  const online = useOnline();
  watch(online, (value) => {
    if (!value) {
      addSnackbar({
        color: 'negative',
        text: 'Hmm.. Yakin internetmu masih nyambung?',
      });
    } else {
      removeSnackbar({ index: 0 });
    }
  });
</script>

<template>
  <Transition v-bind="transitionClasses">
    <TransitionGroup
      v-if="snackbars.length > 0"
      v-bind="transitionClasses"
      class="fixed inset-x-0 bottom-0 flex flex-col gap-2 p-4"
      tag="div"
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
          <button class="text-sm font-bold" @click="removeSnackbar({ index })">
            Tutup
          </button>
        </template>
      </Alert>
    </TransitionGroup>
  </Transition>
</template>
