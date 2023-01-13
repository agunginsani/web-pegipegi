<script lang="ts" setup>
  const root = ref<HTMLElement | null>(null);
  const currentSlide = ref(0);
  const lastSlide = ref(0);

  withDefaults(defineProps<{ indicated: boolean }>(), {
    indicated: false,
  });

  onMounted(() => {
    if (root.value) {
      const options = {
        root: root.value,
        threshold: 0.8,
        rootMargin: '0px',
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentSlide.value = Number(
              (entry.target as HTMLElement).dataset.index
            );
          }
        });
      }, options);

      for (const target of root.value.children) {
        observer.observe(target);
        target.classList.add(
          'snap-center',
          'snap-always',
          'w-full',
          'flex-shrink-0',
          'overflow-hidden'
        );
      }
      lastSlide.value = root.value.children.length - 1;
    }
  });

  function prevSlide() {
    root.value?.scrollBy({
      left: -100,
      behavior: 'smooth',
    });
  }

  function nextSlide() {
    root.value?.scrollBy({
      left: 100,
      behavior: 'smooth',
    });
  }
</script>

<template>
  <div class="relative w-full">
    <ul
      class="no-scroll-bar flex w-full snap-x snap-mandatory space-x-4 overflow-x-auto px-4"
      ref="root"
    >
      <slot />
    </ul>
    <div
      class="absolute top-1/2 flex w-full -translate-y-1/2 transform justify-between px-4"
      :class="{ '-mt-4': indicated, 'flex-row-reverse': currentSlide === 0 }"
    >
      <button @click="prevSlide" v-if="currentSlide !== 0">
        <NuxtImg
          class="-scale-x-100 transform"
          src="/icon-chevron-right-grey.svg"
          alt="icon-prev"
          width="28"
          height="28"
        />
      </button>
      <button @click="nextSlide" v-if="currentSlide !== lastSlide">
        <NuxtImg
          src="/icon-chevron-right-grey.svg"
          alt="icon-next"
          width="28"
          height="28"
        />
      </button>
    </div>
    <ul v-if="indicated" class="mt-4 flex items-center justify-center gap-x-1">
      <li
        v-for="(_, index) in lastSlide + 1"
        :key="`dot-${index}`"
        class="bg-neutral-tuna-300 h-2 w-2 rounded-full"
        :class="{
          'bg-orange-inter-600': currentSlide === index,
        }"
      ></li>
    </ul>
  </div>
</template>

<style scoped>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scroll-bar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scroll-bar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
  }
</style>
