<script lang="ts" setup>
  import usePromoBanners from 'home-module/composables/use-fetch-promo-banners';

  const { data: banners } = await usePromoBanners();

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
    ref.forEach((target) => observer?.observe(target));
  });

  onUnmounted(() => {
    observer.value?.disconnect();
  });
</script>

<template>
  <section aria-labelledby="section-promo-title" class="pb-3">
    <div class="mb-4 flex justify-between px-4">
      <h2 id="promo-banners-user" class="text-base font-bold">Promo</h2>
      <button class="text-orange-inter-600 font-bold">Lihat Semua</button>
    </div>
    <ul
      class="no-scroll-bar flex w-full snap-x snap-mandatory space-x-2 overflow-x-auto"
      ref="listRef"
    >
      <li class="min-w-[250px]"></li>
      <li
        v-for="(banner, index) in banners?.data"
        :key="banner.id"
        :data-index="index"
        class="shrink-0 snap-center"
        ref="listItemRef"
      >
        <NuxtLink :to="banner.url" external>
          <NuxtImg
            :src="banner.image"
            :alt="banner.description"
            class="h-[138px] overflow-hidden rounded-xl"
            width="250"
            height="138"
          />
        </NuxtLink>
      </li>
      <li class="min-w-[250px]"></li>
    </ul>
    <ul class="mt-2 flex justify-center gap-x-1 align-middle">
      <li
        v-for="(banner, index) in banners?.data"
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
