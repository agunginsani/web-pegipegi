<script lang="ts" setup>
  import LocationSearch from 'home-module/components/LocationSearch.vue';
  import LocationSearchItem from 'home-module/components/LocationSearchItem.vue';
  import useAirports from 'home-module/composables/use-airports';
  import useSnackbar from 'common-module/composables/use-snackbar';
  import useSearchForm, {
    SearchFormValue,
    SearchFormItemValue,
  } from 'home-module/composables/use-search-form';
  import useLocationTracker from 'home-module/composables/use-location-tracker';

  type ResultItem = {
    title: string;
    description: string;
    type: string;
    value: SearchFormItemValue;
    icon: string;
  };

  const router = useRouter();
  const route = useRoute();
  const {
    filteredAirports,
    keyword,
    deboundedKeyword,
    popularAirports,
    isLoading,
  } = await useAirports();
  const lastSearch = useLocalStorage<Array<ResultItem>>(
    'flight-mweb.last-location-search',
    []
  );

  definePageMeta({
    middleware(to) {
      const { searchForm } = useSearchForm();
      if (!searchForm.origin.value) {
        return navigateTo('/');
      }

      if (!['origin', 'destination'].includes(String(to.query.type))) {
        return navigateTo('/select-location?type=origin');
      }
    },
  });

  useServerSeoMeta({ robots: 'noindex, nofollow' });

  // lazy load results
  const body = ref<Window | null>(null);
  const { arrivedState } = useScroll(body, {
    offset: { bottom: 100 },
  });
  const renderedCount = ref(50);
  const renderedResult = computed(() =>
    filteredAirports.value?.slice(0, renderedCount.value)
  );

  onMounted(() => {
    body.value = window;
  });

  watch(filteredAirports, () => {
    if (deboundedKeyword.value) renderedCount.value = 50;
  });

  watch(
    () => arrivedState.bottom,
    (value) => {
      if (value && filteredAirports.value) {
        renderedCount.value =
          renderedCount.value +
          (filteredAirports.value.length - renderedCount.value < 50
            ? filteredAirports.value.length
            : 50);
      }
    }
  );

  // event handlers
  const { searchForm, setSearchForm } = useSearchForm();
  const { addSnackbar } = useSnackbar();
  const { onKeyDown, track } = useLocationTracker({
    keyword,
    resultCount: computed(() => renderedResult.value?.length || 0),
  });

  function onSelect(selectedItem: ResultItem) {
    const payload: Partial<SearchFormValue> = {};
    payload[route.query.type as 'origin' | 'destination'] = selectedItem.value;

    if (
      payload.origin?.value !== searchForm.destination.value &&
      payload.destination?.value !== searchForm.origin.value
    ) {
      setSearchForm(payload);
      lastSearch.value = [
        selectedItem,
        ...lastSearch.value.filter(
          (item) => item.value.value !== selectedItem.value.value
        ),
      ].slice(0, 5);
    } else {
      addSnackbar({
        text: 'Kota asal dan kota tujuan tidak boleh sama',
        color: 'negative',
      });
    }

    track('Click Autocomplete Result');
    router.go(-1);
  }

  function onBack() {
    track('Cancel Search');
    router.go(-1);
  }

  function onDeleteLastSearch() {
    lastSearch.value = [];
  }
</script>

<template>
  <LocationSearch v-model="keyword" @back="onBack" @keydown="onKeyDown">
    <template v-if="!deboundedKeyword">
      <template v-if="lastSearch.length > 0">
        <div class="flex py-2 px-4">
          <h2 class="font-bold">Pencarian Terakhir</h2>
          <button
            class="text-orange-inter-600 ml-auto text-sm font-bold"
            @click="onDeleteLastSearch"
          >
            Hapus Semua
          </button>
        </div>
        <ul>
          <LocationSearchItem
            v-for="item in lastSearch"
            :title="item.title"
            :description="item.description"
            :type="item.type"
            :icon="item.icon"
            :key="`last-search-${item.value.value}`"
            @select="onSelect(item)"
          />
        </ul>
      </template>

      <div class="flex py-2 px-4">
        <h2 class="font-bold">Destinasi Populer</h2>
      </div>
      <ul v-if="popularAirports?.length === 0">
        <LocationSearchItem loading />
        <LocationSearchItem loading />
        <LocationSearchItem loading />
      </ul>
      <ul v-else>
        <LocationSearchItem
          v-for="item in popularAirports"
          :title="item.title"
          :description="item.description"
          :type="item.type"
          :icon="item.icon"
          :key="`popular-${item.value.value}`"
          @select="onSelect(item)"
        />
      </ul>
    </template>

    <template v-else>
      <ul v-if="isLoading">
        <LocationSearchItem loading />
        <LocationSearchItem loading />
        <LocationSearchItem loading />
      </ul>

      <div
        v-else-if="filteredAirports?.length === 0"
        class="flex flex-col items-center py-10 px-5 text-center"
      >
        <NuxtImg
          src="/figure-error.svg"
          class="mb-2"
          width="250"
          height="250"
        />
        <h2 class="mb-1 text-xl font-bold">Waduh... Gak Ada Hasilnya Nih</h2>
        <p>
          Sepertinya kata kunci yang kamu cari belum pas. Coba cari yang lain,
          ya!
        </p>
      </div>

      <ul v-else>
        <LocationSearchItem
          v-for="item in renderedResult"
          :title="item.title"
          :description="item.description"
          :type="item.type"
          :icon="item.icon"
          :key="`result-${item.value.value}`"
          :keyword="deboundedKeyword"
          @select="onSelect(item)"
        />
      </ul>
    </template>
  </LocationSearch>
</template>
