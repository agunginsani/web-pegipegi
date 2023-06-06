<script lang="ts" setup>
  import HomeSection from './HomeSection.vue';
  import SectionError from './SectionError.vue';
  import CardPolaroid from './CardPolaroid.vue';
  import Swiper from 'common-module/components/Swiper.vue';
  import SwiperSlide from 'common-module/components/SwiperSlide.vue';
  import SwiperNavigation from 'common-module/components/SwiperNavigation.vue';
  import useSwiper from 'common-module/composables/use-swiper';
  import type { TravelBlogList } from 'api/travelblog.get';

  const config = useRuntimeConfig();
  const swiperContainer = ref<ComponentPublicInstance<HTMLElement>>();
  const key = 'travel-blog';
  const { data: cached } = useNuxtData<TravelBlogList>(key);
  const { data, pending, error, execute } = await useLazyFetch(
    '/api/travelblog',
    {
      key,
      default: () => cached.value,
      immediate: false,
    }
  );
  onBeforeMount(() => execute());
  const { isOverflow, navigate } = useSwiper({
    el: swiperContainer,
    isLooped: true,
    spaceBetween: 16,
    slidesData: data,
    pending,
  });
</script>

<template>
  <HomeSection
    section-id="travel-blog-section"
    :href="{ link: `${config.public.homeUrl}/travel`, label: 'Lihat semua' }"
    :is-loading="pending"
  >
    <template #title>💡 Travel Blog</template>

    <SectionError v-if="!!error && !pending" @retry="execute" />
    <div class="group relative" v-else-if="!pending">
      <SwiperNavigation @navigate="navigate" v-if="isOverflow" />
      <Swiper ref="swiperContainer" class="pb-1">
        <SwiperSlide
          v-for="blog in data"
          class="flex-[0_0_234px]"
          :key="blog.title + 'travel'"
        >
          <a :href="blog.url_detail" class="h-full w-full" target="_blank">
            <CardPolaroid>
              <NuxtImg
                :src="blog.image"
                height="164"
                loading="lazy"
                class="w-full object-cover"
                :alt="blog.title"
              />

              <template #description>
                <p class="line-clamp-2 text-sm">
                  {{ blog.title }}
                </p>
                <div
                  class="bg-blue-scooter-100 text-blue-scooter-700 mt-1 w-fit rounded px-2 py-0.5 text-[10px] font-bold"
                >
                  {{ blog.categoryName }}
                </div>
              </template>
            </CardPolaroid>
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
    <div v-else class="flex w-full items-center gap-4 overflow-hidden pb-1">
      <CardPolaroid v-for="i in 5" class="flex-[0_0_234px]">
        <div>
          <NuxtImg
            src="/figure-thumbnail-image.webp"
            class="h-full w-full object-cover"
            role="presentation"
          />
        </div>
        <template #description>
          <div class="animate-pulse">
            <div class="bg-neutral-tuna-100 mb-1 h-3 w-[165px] rounded" />
            <div class="bg-neutral-tuna-100 mb-1 h-2 w-[101px] rounded-sm" />
            <div class="bg-neutral-tuna-100 mb-1 h-4 w-16 rounded" />
          </div>
        </template>
      </CardPolaroid>
    </div>
  </HomeSection>
</template>
