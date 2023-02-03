<script lang="ts">
  import { defineComponent, ref, onMounted, watch } from 'vue';
  import {
    useSwipe,
    onClickOutside,
    TransitionPresets,
    useTransition,
    useResizeObserver,
  } from '@vueuse/core';

  defineComponent({
    name: 'PBottomSheet',
    inheritAttrs: false,
  });
</script>

<script lang="ts" setup>
  type BottomSheetProps = {
    modelValue?: boolean;
    persistent?: boolean;
  };

  type BottomSheetEmits = {
    (e: 'update:modelValue', value: boolean): void;
  };

  const props = withDefaults(defineProps<BottomSheetProps>(), {
    modelValue: false,
    persistent: false,
  });

  const emit = defineEmits<BottomSheetEmits>();
  const swiperRef = ref<HTMLElement | null>(null);
  const contentRef = ref<HTMLElement | null>(null);
  const bottomSheetRef = ref<HTMLElement | null>(null);
  const overlayOpacity = ref(0);
  const bottomSheetBottomPosition = ref(-2000); // default bottom sheet location when hidden
  const bottomSheetSwipeBottomPosition = ref(bottomSheetBottomPosition.value);
  const windowRef = ref<HTMLElement | null>(null);
  const bars = reactive({
    locationbar: false,
    menubar: false,
    toolbar: false,
    height: 0,
  });
  // const bodyHeight = ref(0)

  onMounted(() => {
    windowRef.value = document.documentElement;

    bars.locationbar = window.locationbar.visible;
    bars.menubar = window.menubar.visible;
    bars.toolbar = window.toolbar.visible;
  });
  useResizeObserver(windowRef, () => {
    // bodyHeight.value = windowRef.value?.clientHeight ?? 0

    bars.locationbar = window.locationbar.visible;
    bars.menubar = window.menubar.visible;
    bars.toolbar = window.toolbar.visible;
  });

  useResizeObserver(contentRef, () => {
    let contentHeight = 0;
    let bodyHeight = 0;

    bars.height = document.documentElement.clientHeight;
    bodyHeight = document.documentElement.clientHeight;
    if (contentRef.value) {
      contentHeight = contentRef.value.clientHeight;
    }

    if (contentHeight >= (93 / 100) * bodyHeight) {
      bottomSheetBottomPosition.value = bodyHeight * -1;
    } else {
      bottomSheetBottomPosition.value = bodyHeight * -2 + contentHeight + 40;
    }
  });

  const { isSwiping, lengthY } = useSwipe(swiperRef, {
    onSwipe() {
      const length = bottomSheetBottomPosition.value + lengthY.value;
      bottomSheetSwipeBottomPosition.value = length;
    },
    onSwipeEnd() {
      const length = bottomSheetBottomPosition.value + lengthY.value;
      let tmpLength = length;
      let tmpStaticBtmY = bottomSheetBottomPosition.value;
      let contentHeight = 0;
      let closingPrecentage = 0;

      // calculate precentage of closing bottom sheet
      if (length < 0) tmpLength = length * -1;
      if (bottomSheetBottomPosition.value < 0)
        tmpStaticBtmY = bottomSheetBottomPosition.value * -1;
      if (contentRef.value) contentHeight = contentRef.value.clientHeight;

      // bottom sheet will close when user swipe > 90% from content width
      closingPrecentage = (90 / 100) * contentHeight;

      // close bottom sheets when swipe down + swipe end
      if (tmpLength > tmpStaticBtmY + closingPrecentage) {
        bottomSheetSwipeBottomPosition.value = -2000;
        emit('update:modelValue', false);
      } else
        bottomSheetSwipeBottomPosition.value = bottomSheetBottomPosition.value;
    },
    threshold: 0,
  });

  const opacityTransition = useTransition(overlayOpacity, {
    duration: 500,
    transition: TransitionPresets.easeOutCirc,
  });

  const bottomPositionTransition = useTransition(
    bottomSheetSwipeBottomPosition,
    {
      duration: 1,
    }
  );

  onClickOutside(bottomSheetRef, () => {
    if (props.persistent || opacityTransition.value < 1) return;
    document.documentElement.style.overflow = 'visible';
    emit('update:modelValue', false);
  });

  onMounted(() => {
    if (props.modelValue) {
      document.documentElement.style.overflow = 'hidden';
      overlayOpacity.value = 1;
    }
  });

  watch(bottomSheetBottomPosition, (val) => {
    bottomSheetSwipeBottomPosition.value = val;
  });

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        document.documentElement.style.overflow = 'hidden';
        overlayOpacity.value = 1;
        bottomSheetSwipeBottomPosition.value = bottomSheetBottomPosition.value;
      } else {
        document.documentElement.style.overflow = 'visible';
        overlayOpacity.value = 0;
        bottomSheetSwipeBottomPosition.value =
          bottomSheetBottomPosition.value * 2;
      }
    }
  );
</script>

<template>
  <div class="fixed left-0 top-0 z-50 w-full">
    <!-- overlay -->
    <div
      v-if="!(opacityTransition === 0 && !modelValue)"
      :style="{
        opacity: opacityTransition,
      }"
      class="fixed h-[100vh] w-[inherit] bg-[rgba(0,0,0,0.2)]"
    />
    <!-- bottom sheet -->
    <div
      v-if="!(opacityTransition === 0 && !modelValue)"
      ref="bottomSheetRef"
      :style="{
        bottom: `${bottomPositionTransition}px`,
        opacity: modelValue ? 1 : opacityTransition,
      }"
      :class="[
        'bg-neutral-tuna-0 fixed bottom-0 h-[200vh] w-[inherit]',
        'rounded-t-[20px] pt-6',
        isSwiping ? '' : 'transition-all duration-500',
      ]"
      :aria-modal="modelValue"
      role="dialog"
      v-bind="$attrs"
    >
      <div
        v-if="!props.persistent"
        ref="swiperRef"
        class="absolute left-0 top-2 flex h-16 w-full -translate-y-5 justify-center pb-2"
      >
        <div class="bg-neutral-tuna-200 h-1 w-12 translate-y-5 rounded-full" />
      </div>

      <div ref="contentRef" class="pb-2">
        <p>{{ bars }}</p>
        <slot />
      </div>
    </div>
  </div>
</template>
