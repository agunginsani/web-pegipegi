<script lang="ts" setup>
  import HomeSection from './HomeSection.vue';
  import SectionError from './SectionError.vue';
  import Swiper from 'common-module/components/Swiper.vue';
  import SwiperSlide from 'common-module/components/SwiperSlide.vue';
  import SwiperNavigation from 'common-module/components/SwiperNavigation.vue';
  import useSwiper from 'common-module/composables/use-swiper';
  import type { ImportantInfoList } from 'api/informations.get';

  const img = useImage();
  const swiperContainer = ref<ComponentPublicInstance<HTMLElement>>();
  const key = 'important-info';
  const { data: cached } = useNuxtData<ImportantInfoList>(key);
  const { data, pending, error, execute } = useLazyFetch(
    '/api/informations?isActive=true',
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
  <HomeSection section-id="important-information-section" :is-loading="pending">
    <template #title>📢 Informasi penting</template>

    <SectionError v-if="!!error && !pending" @retry="execute" />
    <div class="group relative" v-if="!pending">
      <SwiperNavigation @navigate="navigate" v-if="isOverflow" />
      <Swiper ref="swiperContainer">
        <SwiperSlide
          v-for="info in data"
          class="flex-[0_0_234px]"
          :key="info.order + 'important-info'"
        >
          <a :href="info.url" class="group/slides" target="_blank">
            <NuxtImg
              :src="info.image"
              :placeholder="img('/figure-thumbnail-image.webp')"
              loading="lazy"
              class="group-hover/slides:shadow-raised h-full w-full rounded-lg object-cover transition duration-300"
              :alt="info.title"
            />
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
    <div v-else class="flex w-full items-center gap-4 overflow-hidden">
      <div
        class="h-[164px] flex-[0_0_234px] overflow-hidden rounded-lg"
        v-for="i in 5"
      >
        <NuxtImg
          src="/figure-thumbnail-image.webp"
          class="h-full w-full object-cover"
          role="presentation"
        />
      </div>
    </div>
  </HomeSection>
</template>
