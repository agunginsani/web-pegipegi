<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

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

  const listRef = ref<HTMLLIElement | null>(null);
  const listItemRef = ref<Array<HTMLLIElement>>([]);
  const activeBannerIndex = ref('');

  const observer = ref<IntersectionObserver | null>(null);

  onMounted(() => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = (entry.target as HTMLLIElement).dataset.index;
            if (index) activeBannerIndex.value = index;
          }
        });
      },
      { root: listRef.value, threshold: 1 }
    );
  });

  watch([listItemRef, observer], ([ref, observer]) => {
    ref.forEach((target: HTMLLIElement) => observer?.observe(target));
  });

  onBeforeUnmount(() => {
    observer.value?.disconnect();
  });
</script>

<template>
  <section aria-labelledby="section-promo-title" class="pb-3">
    <div class="mb-4 flex justify-between px-4">
      <h2 id="promo-banners-user" class="text-base font-bold">Promo</h2>
      <button class="text-orange-inter-600 font-bold">Lihat Semua</button>
    </div>
    <div class="">
      <ul
        class="no-scroll-bar flex w-full snap-x snap-mandatory space-x-2 overflow-x-auto"
        ref="listRef"
      >
        <li class="min-w-[312px]" />
        <li
          v-for="(banner, index) in banners"
          :key="banner.id"
          :data-index="`${index}`"
          class="shrink-0 snap-center"
          ref="listItemRef"
        >
          <div class="overflow-hidden rounded-xl">
            <NuxtImg :src="banner.image" alt="" width="312" height="156" />
          </div>
        </li>
        <li class="min-w-[312px]" />
      </ul>
    </div>
    <ul class="mt-2 flex justify-center gap-x-1 align-middle">
      <li
        v-for="(banner, index) in banners"
        :key="banner.id"
        :class="[
          'bg-neutral-tuna-300 h-1.5 w-1.5 rounded-full',
          activeBannerIndex === `${index}`
            ? 'bg-orange-inter-600 w-3'
            : 'bg-neutral-tuna-300 w-1.5',
        ]"
      />
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
