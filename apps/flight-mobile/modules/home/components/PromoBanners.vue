<script lang="ts" setup>
  import { ref } from 'vue';

  const banners = ref([
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=312&h=156&q=80',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=312&h=156&q=80',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=312&h=156&q=80',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=312&h=156&q=80',
    },
  ]);

  const root = ref<Element | null>(null);
  const targetRef = ref([]);

  const isActive = ref(false);

  const options = {
    root: root.value,
    threshold: 0,
    rootMargin: '-100px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
    });
  }, options);

  console.log(observer);

  if (targetRef instanceof Array) {
    targetRef.map((target: HTMLElement) => console.log(target));
  }
</script>

<template>
  <ul
    class="no-scroll-bar flex w-full snap-x snap-mandatory space-x-2 overflow-x-auto border-2 border-dashed px-4"
    ref="root"
  >
    <li
      v-for="banner in banners"
      :key="banner.id"
      class="snap-center snap-always"
      ref="targetRef"
    >
      <div
        class="relative min-w-[312px] flex-shrink-0 overflow-hidden rounded-xl"
      >
        <NuxtImg
          src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=312&h=156&q=80"
          alt="promo-banner"
          width="312"
          height="156"
        />
      </div>
    </li>
  </ul>
  {{ isActive }}
  <ul class="mt-2 flex justify-center gap-x-1 align-middle">
    <li
      v-for="banner in promoBanners"
      :key="banner.id"
      class="bg-neutral-tuna-300 h-1.5 w-1.5 rounded-full"
      :class="{ 'bg-orange-inter-600 h-1.5 w-3 rounded-full': isActive }"
    ></li>
  </ul>
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
