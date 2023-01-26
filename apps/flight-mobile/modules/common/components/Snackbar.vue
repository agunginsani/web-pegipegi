<script lang="ts" setup>
  import { Alert } from '@pegipegi/web-pegipegi-ui';
  import useSnackbar from 'common-module/composables/use-snackbar';

  const { snackbars, removeSnackbar } = useSnackbar();
  const transitionClasses = {
    enterActiveClass: 'duration-300 transition-all pointer-events-none',
    leaveActiveClass: 'duration-300 transition-all pointer-events-none',
    enterFromClass: 'opacity-0 translate-y-5',
    leaveToClass: 'opacity-0 translate-y-5',
  };
</script>

<template>
  <ClientOnly>
    <Teleport to="#modals">
      <Transition v-bind="transitionClasses">
        <TransitionGroup
          v-bind="transitionClasses"
          v-if="snackbars.length > 0"
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
              <button
                class="text-sm font-bold"
                @click="removeSnackbar({ index })"
              >
                Tutup
              </button>
            </template>
          </Alert>
        </TransitionGroup>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>
