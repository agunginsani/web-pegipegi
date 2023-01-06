<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

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

  const root = ref<HTMLElement | null>(null);
  const targetRef = ref([]);
  const activeBanner = ref('');

  onMounted(() => {
    const options = {
      root: root.value,
      threshold: 0,
      rootMargin: '0px -100px 0px -100px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeBanner.value = entry.target.dataset.index;
        }
      });
    }, options);

    targetRef.value.forEach((target: HTMLElement) => observer.observe(target));
  });
</script>

<template>
  <section aria-labelledby="section-promo-title" class="pb-3">
    <div class="mb-4 flex justify-between px-4">
      <h1 id="promo-banners-user" class="text-base font-bold">Promo</h1>
      <button class="text-orange-inter-600 font-bold">Lihat Semua</button>
    </div>
    <ul
      class="no-scroll-bar flex w-full snap-x snap-mandatory space-x-2 overflow-x-auto px-4"
      ref="root"
    >
      <li
        v-for="(banner, index) in promoBanners"
        :key="banner.id"
        class="snap-center snap-always"
        ref="targetRef"
        :data-index="`banner-${index}`"
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
    <ul class="mt-2 flex justify-center gap-x-1 align-middle">
      <li
        v-for="(banner, index) in promoBanners"
        :key="banner.id"
        class="bg-neutral-tuna-300 h-1.5 w-1.5 rounded-full"
        :class="{
          'bg-orange-inter-600 w-3': activeBanner === `banner-${index}`,
          'bg-neutral-tuna-300 w-1.5': activeBanner !== `banner-${index}`,
        }"
      ></li>
    </ul>
  </section>
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
