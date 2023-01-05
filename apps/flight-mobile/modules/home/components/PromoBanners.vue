<script lang="ts" setup>
  import { ref } from 'vue';
  import { useIntersectionObserver } from '@vueuse/core';

  const promoBanners = ref([
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
  const root = ref(null);
  const target = ref(null);
  const isVisible = ref(false);
  console.log(root);
  console.log(target);

  useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      isVisible.value = isIntersecting;
      console.log('Hello');
    },
    { root }
  );
</script>

<template>
  <ul
    class="no-scroll-bar flex w-full snap-x snap-mandatory space-x-2 overflow-x-auto px-4"
    ref="root"
  >
    <li class="snap-center snap-always">
      <div
        class="relative min-w-[312px] flex-shrink-0 overflow-hidden rounded-xl"
      >
        <NuxtImg
          ref="target"
          src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=312&h=156&q=80"
          alt="promo-banner"
          width="312"
          height="156"
        />
      </div>
    </li>
    <li class="snap-center snap-always">
      <div
        class="relative min-w-[312px] flex-shrink-0 overflow-hidden rounded-xl"
      >
        <NuxtImg
          ref="target"
          src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=312&h=156&q=80"
          alt="promo-banner"
          width="312"
          height="156"
        />
      </div>
    </li>
    <li class="snap-center snap-always">
      <div
        class="relative min-w-[312px] flex-shrink-0 overflow-hidden rounded-xl"
      >
        <NuxtImg
          ref="target"
          src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=312&h=156&q=80"
          alt="promo-banner"
          width="312"
          height="156"
        />
      </div>
    </li>
  </ul>

  <ul class="mt-2 flex justify-center gap-x-1 align-middle">
    <li
      v-for="banner in promoBanners"
      :key="banner.id"
      :class="[
        isVisible
          ? 'bg-orange-inter-600 h-1.5 w-3 rounded-full'
          : 'bg-neutral-tuna-300 h-1.5 w-1.5 rounded-full',
      ]"
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
