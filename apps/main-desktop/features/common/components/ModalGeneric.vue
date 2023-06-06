<script lang="ts" setup>
  import { TransitionRoot } from '@headlessui/vue';
  import useGenericModal from 'common-module/composables/use-generic-modal';

  const { isShown, accepted, warnInfo, dismiss } = useGenericModal();
</script>

<template>
  <TransitionRoot
    :show="isShown"
    appear
    as="template"
    enter="transition ease duration-300 transform"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition ease duration-300 transform"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div class="fixed left-0 top-0 z-30 h-screen w-screen">
      <div
        class="fixed h-full w-full cursor-pointer bg-[#000] opacity-40"
        @click="dismiss"
      />
      <div
        class="max-h-[calc(100vh - 16px)] bg-neutral-tuna-0 shadow-raised fixed left-1/2 top-1/2 w-[419px] -translate-x-1/2 -translate-y-1/2 rounded-2xl px-8 py-7 text-center"
      >
        <div class="mb-7">
          <NuxtImg
            class="mx-auto mb-4 max-w-[277px] object-contain"
            :src="warnInfo.figure"
            role="presentation"
          />
          <h2 class="text-[21px] font-bold">{{ warnInfo.title }}</h2>
          <p>{{ warnInfo.description }}</p>
        </div>

        <button
          class="bg-orange-inter-600 text-neutral-tuna-0 w-full rounded-3xl p-3 font-bold"
          @click="accepted"
        >
          {{ warnInfo.actionText }}
        </button>
      </div>
    </div>
  </TransitionRoot>
</template>
