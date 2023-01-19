<script lang="ts" setup>
  const root = ref<HTMLElement | null>(null);
  const observer = ref<IntersectionObserver | null>(null);
  const currentSlide = ref(0);
  const lastSlide = ref(0);
  const index = ref(0);
  const id = Math.random();

  withDefaults(defineProps<{ indicated?: boolean }>(), {
    indicated: false,
  });

  onMounted(() => {
    if (root.value) {
      const options = {
        root: root.value,
        threshold: 0.8,
        rootMargin: '0px',
      };

      observer.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentSlide.value = Number(
              (entry.target as HTMLElement).dataset.index
            );
          }
        });
      }, options);

      for (const target of root.value.children) {
        observer.value.observe(target);
        (target as HTMLElement).dataset.index = index.value.toString();
        index.value = index.value + 1;
      }
      lastSlide.value = root.value.children.length - 1;
    }
  });

  onBeforeUnmount(() => {
    observer.value?.disconnect();
  });

  function onPreviousClick() {
    root.value?.scrollBy({
      left: -100,
      behavior: 'smooth',
    });
  }

  function onNextClick() {
    root.value?.scrollBy({
      left: 100,
      behavior: 'smooth',
    });
  }
</script>

<template>
  <div class="relative">
    <ul
      class="no-scroll-bar flex w-full snap-x snap-mandatory space-x-4 overflow-x-auto px-4"
      ref="root"
    >
      <slot />
    </ul>

    <button
      @click="onPreviousClick"
      v-if="currentSlide !== 0"
      class="absolute left-4 -translate-y-1/2 transform"
      :class="indicated ? 'top-[calc(50%-12px)]' : 'top-1/2'"
      aria-label="Previous"
    >
      <NuxtImg
        class="-scale-x-100 transform"
        src="/icon-chevron-right-grey.svg"
        alt="icon-previous"
        width="28"
        height="28"
      />
    </button>
    <button
      @click="onNextClick"
      v-if="currentSlide !== lastSlide"
      class="absolute right-4 -translate-y-1/2 transform"
      :class="indicated ? 'top-[calc(50%-12px)]' : 'top-1/2'"
      aria-label="Next"
    >
      <NuxtImg
        src="/icon-chevron-right-grey.svg"
        alt="icon-next"
        width="28"
        height="28"
      />
    </button>
    <ul v-if="indicated" class="mt-4 flex items-center justify-center gap-x-1">
      <li
        v-for="(_, index) in lastSlide + 1"
        :key="`dot-${id}-${index}`"
        class="bg-neutral-tuna-300 h-2 w-2 rounded-full"
        :class="{
          'bg-orange-inter-600': currentSlide === index,
        }"
      ></li>
    </ul>
  </div>
</template>
