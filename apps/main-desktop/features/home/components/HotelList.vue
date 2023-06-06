<script lang="ts" setup>
  import HotelCard from 'common-module/components/HotelCard.vue';
  import SectionError from './SectionError.vue';
  import ChipFilters from 'common-module/components/ChipFilters.vue';
  import type { FilterOptions } from 'common-module/components/ChipFilters.vue';
  import SwiperNavigation from 'common-module/components/SwiperNavigation.vue';
  import Swiper from 'common-module/components/Swiper.vue';
  import SwiperSlide from 'common-module/components/SwiperSlide.vue';
  import useSwiper from 'common-module/composables/use-swiper';
  import type { HotelDealsDetail } from 'api/hotel-deals.get';
  import type {
    HotelDealsItem,
    HotelInfo,
    HotelDealsItemsRequest,
  } from 'api/hotel-deals-items.get';
  import toLeadingZero from 'common-module/utils/to-leading-zero';
  import { format } from 'date-fns';

  const props = defineProps<{
    isFiltersLoading: boolean;
    dealsDetail: HotelDealsDetail;
    dealsItem: HotelDealsItem;
  }>();
  const emits = defineEmits<{
    (e: 'filter', payload: HotelDealsItem): void;
    (e: 'overflow', payload: boolean): void;
  }>();
  const config = useRuntimeConfig();

  //#region swiper initialization
  const swiperContainer = ref<ComponentPublicInstance<HTMLElement>>();
  const hotelCards = ref<Array<HotelInfo>>([]);
  const hotelPending = ref<boolean>(true);
  const hotelError = ref<boolean>(false);

  const { isOverflow, navigate } = useSwiper({
    el: swiperContainer,
    isLooped: true,
    spaceBetween: 16,
    slidesData: hotelCards,
    pending: hotelPending,
  });
  watch(isOverflow, () => {
    emits('overflow', isOverflow.value);
  });
  //#endregion

  //#region filter setup & changes
  const activeFilter = ref<FilterOptions>({ label: '', value: '' });
  const firstSelection = computed<FilterOptions>(() => {
    if (!props.dealsDetail?.labels[0]) return { label: '', value: '' };
    const firstItem = props.dealsDetail.labels[0];
    return { label: firstItem.labelName, value: firstItem.labelCd };
  });
  const cityOptions = computed<Array<FilterOptions>>(() =>
    props.dealsDetail.labels.map((val) => ({
      label: val.labelName,
      value: val.labelCd,
    }))
  );
  watch(
    () => props.dealsDetail,
    () => {
      activeFilter.value = firstSelection.value;
    }
  );
  watch(
    () => props.dealsItem,
    (newVal) => {
      hotelCards.value = newVal.hotelCards;
      if (hotelCards.value) hotelPending.value = false;
    }
  );

  async function onFilterSelected(e: FilterOptions) {
    if (activeFilter.value.value === e.value && !hotelError.value) return;

    activeFilter.value = e;
    hotelPending.value = true;
    hotelError.value = false;

    const today = new Date();
    const fetchParams: HotelDealsItemsRequest = {
      room: 1,
      night: 1,
      adultNumMax: 2,
      stayDay: `${today.getFullYear()}-${toLeadingZero(
        today.getMonth() + 1
      )}-${toLeadingZero(today.getDate())}`,
      device_origin: 'web',
      quickFilterIds: props.dealsDetail.quickFilterId,
      flashSaleFlags: props.dealsDetail.isFlashSale,
      labelCds: activeFilter.value.value,
      labelNames: activeFilter.value.label,
    };

    try {
      const response = await $fetch('/api/hotel-deals-items', {
        params: fetchParams,
      });

      emits('filter', response[0]);
    } catch (e) {
      hotelError.value = true;
      console.error(e);
    }

    hotelPending.value = false;
  }
  //#endregion

  function toCleanNumbers(str: string): number {
    return Number(str.replace(/[^\d]+/g, ''));
  }

  function generateHotelUrl(hotel: HotelInfo): string {
    const query: any = {
      stayDay: format(new Date(), 'yyyy-MM-dd'),
      night: 1,
      room: 1,
      adultNumMax: 2,
      priceBefore: toCleanNumbers(hotel.discountedPriceNet),
    };
    const params = new URLSearchParams();
    Object.keys(query).forEach((el) => {
      params.append(el, query[el].toString());
    });
    return `${config.public.homeUrl}/hotel/${hotel.cityName}/${hotel.id}?${params}`;
  }

  onMounted(() => {
    activeFilter.value = firstSelection.value;
  });
</script>

<template>
  <ChipFilters
    class="mb-5"
    :options="cityOptions"
    :model-value="activeFilter"
    @update:model-value="onFilterSelected"
    :is-loading="isFiltersLoading"
    :expand-info="{
      maximumFilters: props.dealsDetail.maxLabelLimit,
      expandLabel: 'Lihat Kota Lainnya',
      expandPlaceholder: 'Cari Kota',
    }"
  />

  <div v-if="hotelPending" class="w-full overflow-hidden">
    <div class="flex items-center gap-4">
      <HotelCard v-for="i in 6" :loading="true" class="flex-[0_0_196px]" />
    </div>
  </div>
  <template v-else>
    <SectionError v-if="hotelError" @retry="onFilterSelected(activeFilter)" />
    <div
      v-else-if="hotelCards.length === 0"
      class="h-[324px] w-full pt-[100px] text-center"
    >
      <strong
        class="mb-1 text-[21px]"
        v-html="props.dealsItem.soldOutWording.title"
      />
      <p class="mb-3">{{ props.dealsItem.soldOutWording.subtitle }}</p>
    </div>
    <div class="group relative pb-1" v-else>
      <SwiperNavigation @navigate="navigate" v-if="isOverflow" />
      <Swiper ref="swiperContainer" class="pb-1">
        <SwiperSlide v-for="hotel in hotelCards" class="flex-[0_0_196px]">
          <a :href="generateHotelUrl(hotel)" target="_blank" rel="noopener">
            <HotelCard
              :image="hotel.picture"
              :name="hotel.name"
              :star="Number(hotel.grade)"
              :discount="toCleanNumbers(hotel.discountPercentageNet)"
              :original-price="toCleanNumbers(hotel.crossedPriceNet)"
              :location="`${hotel.areaName}, ${hotel.cityName}`"
              :price="toCleanNumbers(hotel.discountedPriceNet)"
            />
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
  </template>
</template>
