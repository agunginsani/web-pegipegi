<script lang="ts" setup>
  import HeaderQrPopup from './HeaderQrPopup.vue';
  import { TransitionRoot } from '@headlessui/vue';
  import usePopover from 'common-module/composables/use-popover';

  const config = useRuntimeConfig();
  defineProps<{
    light?: boolean;
  }>();

  const {
    triggerRef: qrTrigger,
    targetRef: qrTarget,
    top: qrTop,
    left: qrLeft,
    active: isQrPopupActive,
    show: qrShow,
    hide: qrHide,
  } = usePopover();
</script>

<template>
  <div
    class="relative z-40 bg-[#000] bg-opacity-10 py-2 text-sm text-white"
    :class="{
      '!bg-neutral-tuna-50 !text-neutral-tuna-300 !bg-opacity-100': light,
    }"
  >
    <div
      class="mx-auto flex w-[calc(100vw-128px)] min-w-[975px] max-w-[1366px] gap-5"
    >
      <button
        class="mr-auto flex items-center gap-1"
        @mouseenter="qrShow"
        @mouseleave="qrHide"
        ref="qrTrigger"
      >
        <NuxtImg
          :src="light ? '/icon-header-apps-gray.svg' : '/icon-header-apps.svg'"
          height="20px"
          width="20px"
          role="presentation"
        />
        <span>Download Aplikasi Pegipegi</span>
      </button>

      <a :href="`${config.public.homeUrl}/travel`" target="_blank"
        >Travel Tips</a
      >

      <a :href="`${config.public.homeUrl}/refund`" target="_blank">
        Refund &amp; Reschedule
      </a>

      <a
        :href="`${config.public.homeUrl}/help`"
        class="flex items-center gap-1"
        target="_blank"
      >
        <NuxtImg
          :src="light ? '/icon-header-help-grey.svg' : '/icon-header-help.svg'"
          height="20px"
          width="20px"
          role="presentation"
        />
        <span>Pusat bantuan</span>
      </a>
    </div>
  </div>

  <TransitionRoot
    ref="qrTarget"
    appear
    as="template"
    enter="transform transition duration-[400ms] origin-top"
    enter-from="opacity-0 scale-y-50"
    enter-to="opacity-100 scale-y-100"
    leave="transform duration-200 transition ease-in-out origin-top"
    leave-from="opacity-100 scale-y-100 "
    leave-to="opacity-0 scale-y-95 "
    :show="isQrPopupActive"
  >
    <HeaderQrPopup
      @mouseenter="qrShow"
      @mouseleave="qrHide"
      class="fixed z-40"
      :style="{
        top: `${qrTop + 8}px`,
        left: `${qrLeft}px`,
      }"
    />
  </TransitionRoot>
</template>
