<script lang="ts" setup>
  import ChipFiltersSearch from 'common-module/components/ChipFiltersSearch.vue';
  import Swiper from 'common-module/components/Swiper.vue';
  import SwiperSlide from 'common-module/components/SwiperSlide.vue';
  import SwiperNavigation from 'common-module/components/SwiperNavigation.vue';
  import useSwiper from 'common-module/composables/use-swiper';
  export type FilterOptions = { label: string; value: string };

  type FilterProps = {
    options: Array<FilterOptions>;
    modelValue: FilterOptions;
    isLoading: boolean;
    expandInfo?: {
      maximumFilters: number;
      expandLabel: string;
      expandPlaceholder: string;
    };
  };
  type BannerFiltersEmits = {
    (e: 'update:modelValue', payload: FilterOptions): void;
  };
  const props = defineProps<FilterProps>();
  const emit = defineEmits<BannerFiltersEmits>();

  //#region options selections & transforms
  const filterOptions = ref<Array<FilterOptions>>([]);
  const isFilterTrimmed = computed(() => {
    if (!props.expandInfo) return false;
    return props.expandInfo.maximumFilters < props.options.length;
  });
  function setFilters(newFilters: Array<FilterOptions>) {
    if (!isFilterTrimmed.value) filterOptions.value = newFilters;
    else
      filterOptions.value = newFilters.slice(
        0,
        props.expandInfo?.maximumFilters
      );
  }
  setFilters(props.options);
  watch(
    () => props.options,
    (newVal) => setFilters(newVal)
  );
  function onSearchSelected(e: FilterOptions) {
    if (filterOptions.value.findIndex((val) => val.value === e.value) < 0) {
      filterOptions.value.unshift({ value: e.value, label: e.label });
      filterOptions.value.pop();
    }
    emit('update:modelValue', e);
  }
  //#endregion

  //#region swiper initialization & behaviors
  const isLoading = ref<boolean>(false);
  isLoading.value = props.isLoading;
  watch(
    () => props.isLoading,
    (newVal) => (isLoading.value = newVal)
  );
  const swiperContainer = ref<ComponentPublicInstance<HTMLElement>>();
  const { isOverflow, navigate, centerTarget } = useSwiper({
    el: swiperContainer,
    isLooped: false,
    spaceBetween: 16,
    slidesData: filterOptions,
    pending: isLoading,
  });
  watch(
    () => props.modelValue,
    (newVal) => {
      const selectedIdx = props.options.findIndex(
        (val) => newVal.value === val.value
      );
      if (selectedIdx === -1) return;
      centerTarget(selectedIdx);
    }
  );
  //#endregion
</script>

<template>
  <div class="flex items-center gap-4">
    <ChipFiltersSearch
      v-if="props.expandInfo && !isLoading"
      :options="props.options"
      :model-value="props.modelValue"
      :expand-label="props.expandInfo.expandLabel"
      :search-placeholder="props.expandInfo.expandPlaceholder"
      @update:model-value="onSearchSelected"
    />
    <div class="group relative" v-if="!isLoading">
      <SwiperNavigation @navigate="navigate" v-if="isOverflow" />
      <Swiper ref="swiperContainer" class="!gap-2">
        <SwiperSlide v-for="option in filterOptions">
          <button
            class="border-neutral-tuna-100 bg-neutral-tuna-0 hover:bg-neutral-tuna-25 rounded-full border px-3 py-2 text-sm transition duration-300"
            :class="{
              '!bg-orange-inter-50 border-orange-inter-600 text-orange-inter-600':
                option.value === props.modelValue.value,
            }"
            @click="emit('update:modelValue', option)"
          >
            {{ option.label }}
          </button>
        </SwiperSlide>
      </Swiper>
    </div>
    <div v-else class="flex animate-pulse items-center gap-2">
      <div class="bg-neutral-tuna-50 h-9 w-[111px] rounded-2xl" />
      <div class="bg-neutral-tuna-50 h-9 w-[88px] rounded-2xl" />
      <div class="bg-neutral-tuna-50 h-9 w-[129px] rounded-2xl" />
      <div class="bg-neutral-tuna-50 h-9 w-[91px] rounded-2xl" />
      <div class="bg-neutral-tuna-50 h-9 w-[91px] rounded-2xl" />
    </div>
  </div>
</template>
