<script lang="ts" setup>
  import HomeSection from './HomeSection.vue';
  import SectionError from './SectionError.vue';
  import ChipFilters from 'common-module/components/ChipFilters.vue';
  import type { FilterOptions } from 'common-module/components/ChipFilters.vue';
  import useSSO from 'common-module/composables/use-sso';
  import Swiper from 'common-module/components/Swiper.vue';
  import SwiperSlide from 'common-module/components/SwiperSlide.vue';
  import SwiperNavigation from 'common-module/components/SwiperNavigation.vue';
  import useSwiper from 'common-module/composables/use-swiper';
  import forceDesktopUrl from 'promo-module/utils/force-desktop-url';
  import type { BannerList, BannerRequestParams } from 'api/promo.get';
  import type { TagList } from 'api/promo-tag.get';

  const config = useRuntimeConfig();
  const img = useImage();

  const activeTag = ref<FilterOptions>({ label: '', value: '' });
  const tagKey = 'promo-tag';
  const { data: cachedTag } = useNuxtData<TagList>(tagKey);
  const { data: tagData, pending: tagPending } = await useLazyFetch(
    '/api/promo-tag',
    {
      key: tagKey,
      default: () => cachedTag.value,
      onResponse({ response }) {
        if (!response._data?.length) return;
        const res = response._data as unknown as TagList;
        activeTag.value = res[0].id
          ? { value: res[0].id.toString(), label: res[0].name }
          : { label: '', value: '' };
      },
    }
  );

  const tagOptions = computed<Array<FilterOptions>>(() => {
    if (!tagData.value) return [];
    return tagData.value?.map((val) => ({
      label: val.name,
      value: val.id ? val.id.toString() : '',
    }));
  });

  const { custInfo, deviceId, isLoggedIn } = useSSO();
  const swiperContainer = ref<ComponentPublicInstance<HTMLElement>>();
  const key = 'promo';
  const { data: cached } = useNuxtData<BannerList>(key);
  const promoParams = computed(() => {
    const params: BannerRequestParams = {
      device_id: deviceId.value,
      device_origin: 'web',
    };
    if (isLoggedIn.value && custInfo.value) {
      params.email = custInfo.value.userEmail;
      params.member_id = custInfo.value.userId;
    }
    if (activeTag.value.value) params.tag = activeTag.value.value;
    return params;
  });
  const { data, pending, error, execute } = await useLazyFetch('/api/promo', {
    key,
    default: () => cached.value,
    params: promoParams,
  });

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
    section-id="promo-section"
    :href="{
      link: `${config.public.homeUrl}/promo`,
      label: 'Lihat semua promo',
    }"
    icon="/icon-section-promo.svg"
  >
    <template #title>Promo Pegipegi</template>

    <ChipFilters
      class="mb-5"
      :options="tagOptions"
      v-model="activeTag"
      :is-loading="tagPending"
    />

    <template v-if="!pending">
      <SectionError v-if="!!error" @retry="execute" />
      <div
        v-else-if="!data?.length"
        class="h-[324px] w-full pt-[100px] text-center"
      >
        <strong class="mb-1 text-[21px]"> Yah, promo udah abis 🙏 </strong>
        <p class="mb-3">
          Coba cek promo lainnya, atau balik ke sini lagi besok yaa.
        </p>
      </div>
      <div v-else class="group relative">
        <SwiperNavigation @navigate="navigate" v-if="isOverflow" />
        <Swiper ref="swiperContainer">
          <SwiperSlide
            v-for="promo in data"
            class="flex-[0_0_320px]"
            :key="`${promo.id}-promo`"
          >
            <a
              :href="forceDesktopUrl(promo.url)"
              class="group/slides"
              target="_blank"
            >
              <NuxtImg
                :src="promo.image"
                :placeholder="img('/figure-thumbnail-image.webp')"
                loading="lazy"
                class="group-hover/slides:shadow-raised h-full w-full rounded-lg object-cover transition duration-300"
                :alt="promo.name"
              />
            </a>
          </SwiperSlide>
        </Swiper>
      </div>
    </template>
    <div v-else class="flex w-full items-center gap-4 overflow-hidden">
      <div
        class="h-[176px] flex-[0_0_320px] overflow-hidden rounded-lg"
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
