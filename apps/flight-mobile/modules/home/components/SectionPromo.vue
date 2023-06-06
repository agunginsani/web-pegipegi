<script lang="ts" setup>
  import { PromosResponse } from 'api/promos.get';
  import useProfile from 'common-module/composables/use-profile';

  /* -------------------------------------------------------------------------- */
  /*                               Data fetching.                               */
  /* -------------------------------------------------------------------------- */
  const key = 'promos-response';
  const { data: cached } = useNuxtData<PromosResponse>(key);
  const { deviceBrowser, deviceId, deviceModel, userEmail, userId } =
    useProfile();
  const { data, error } = await useFetch('/api/promos', {
    key,
    lazy: !!cached.value,
    query: { deviceBrowser, deviceId, deviceModel, userEmail, userId },
    default: () => cached.value?.data ?? null,
    transform: (data) => data.data,
  });
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                           Intersection observer.                           */
  /* -------------------------------------------------------------------------- */
  const listRef = ref<HTMLLIElement | null>(null);
  const listItemRef = ref<Array<HTMLLIElement>>([]);
  const activeBannerIndex = ref('');

  const observer = ref<IntersectionObserver | null>(null);

  async function onReload() {
    window.location.reload();
  }

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
  /* -------------------------------------------------------------------------- */

  const homeUrl = useRuntimeConfig().public.homeUrl;
</script>

<template>
  <section aria-labelledby="section-promo-title" class="pb-3">
    <div class="mb-4 flex items-center justify-between px-4">
      <h2 id="promo-banners-user" class="text-base font-bold">Promo</h2>
      <a
        class="text-sm font-bold"
        :class="{
          'text-neutral-tuna-200 pointer-events-none': error,
          'text-orange-inter-600': !error,
        }"
        :href="`${homeUrl}/promo-list?tag=pesawat`"
      >
        Lihat Semua
      </a>
    </div>

    <ul
      class="no-scroll-bar flex w-full snap-x snap-mandatory space-x-2 overflow-x-auto"
      ref="listRef"
    >
      <li class="min-w-[250px]"></li>
      <li
        v-if="error"
        class="flex h-[138px] w-[250px] shrink-0 snap-center flex-col items-center justify-center text-center"
      >
        <p class="mb-1 font-bold">Maaf ada sedikit gangguan</p>
        <p class="mb-5 text-sm">Cek koneksi internetmu dan coba lagi ya</p>
        <button
          class="text-orange-inter-600 flex w-fit items-center text-sm font-bold"
          @click="onReload"
        >
          <NuxtImg
            src="/icon-refresh.svg"
            width="20"
            height="20"
            class="mr-1"
          />
          <p>Muat Ulang</p>
        </button>
      </li>
      <li
        v-else-if="data"
        v-for="(banner, index) in data"
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
            loading="lazy"
          />
        </NuxtLink>
      </li>
      <li class="min-w-[250px]"></li>
    </ul>
    <!-- -------------------------------------------------------------------------- -->
    <!--                                   Bullets.                                 -->
    <!-- -------------------------------------------------------------------------- -->
    <ul class="mt-2 flex justify-center gap-x-1 align-middle">
      <li
        v-for="(banner, index) in data"
        :key="banner.id"
        :class="[
          'bg-neutral-tuna-300 h-1.5 rounded-full transition-all duration-100',
          activeBannerIndex === `${index}`
            ? 'bg-orange-inter-600 w-3'
            : 'bg-neutral-tuna-300 w-1.5',
        ]"
      />
    </ul>
    <!-- -------------------------------------------------------------------------- -->
  </section>
</template>
