<script lang="ts" setup>
  import SectionError from './SectionError.vue';
  import HomeSection from './HomeSection.vue';
  import CardPolaroid from './CardPolaroid.vue';
  import Swiper from 'common-module/components/Swiper.vue';
  import SwiperSlide from 'common-module/components/SwiperSlide.vue';
  import SwiperNavigation from 'common-module/components/SwiperNavigation.vue';
  import useSwiper from 'common-module/composables/use-swiper';
  import type {
    AccomSelectionList,
    AccomSelectionItem,
  } from 'api/accomselection.get';

  const img = useImage();
  const config = useRuntimeConfig();

  const swiperContainer = ref<ComponentPublicInstance<HTMLElement>>();
  const key = 'acccom-selection';
  const { data: cached } = useNuxtData<AccomSelectionList>(key);
  const { data, pending, error, execute } = useLazyFetch(
    '/api/accomselection?device_origin=web',
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

  function constructSearchUrl(selectionItem: AccomSelectionItem): string {
    return `${config.public.homeUrl}/hotel/${selectionItem.cityName}?${selectionItem.search_query}`;
  }
</script>

<template>
  <HomeSection
    section-id="accom-selection-section"
    :is-loading="pending"
    v-if="pending || !!error || data?.length"
  >
    <template #title>❇️ Beragam hotel pilihan buat kamu ❇️</template>

    <SectionError v-if="!!error && !pending" @retry="execute" />
    <div class="group relative" v-if="!pending">
      <SwiperNavigation @navigate="navigate" v-if="isOverflow" />
      <Swiper ref="swiperContainer" class="pb-1">
        <SwiperSlide
          v-for="item in data"
          class="flex-[0_0_297.5px]"
          :key="`${item.id}-accom-select`"
        >
          <a :href="constructSearchUrl(item)" class="h-full w-full">
            <CardPolaroid>
              <NuxtImg
                :src="item.image || '/figure-no-image.webp'"
                :placeholder="img('/figure-no-image.webp')"
                loading="lazy"
                height="297.5"
                class="h-[297.5px] w-full object-cover"
                role="presentation"
              />

              <template #description>
                <p class="text-lg font-bold">
                  {{ item.title }}
                </p>
              </template>
            </CardPolaroid>
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
    <div v-else class="flex w-full items-center gap-4 overflow-hidden pb-1">
      <CardPolaroid v-for="i in 5" class="flex-[0_0_297.5px]">
        <div>
          <NuxtImg
            src="/figure-thumbnail-image.webp"
            class="h-full w-full object-cover"
            role="presentation"
          />
        </div>
        <template #description>
          <div class="animate-pulse">
            <div class="bg-neutral-tuna-100 mb-1 h-[20px] w-[170px] rounded" />
          </div>
        </template>
      </CardPolaroid>
    </div>
  </HomeSection>
</template>
