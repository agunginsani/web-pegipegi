<script lang="ts" setup>
  import LocationSearch from 'home-module/components/LocationSearch.vue';
  import LocationSearchItem from 'home-module/components/LocationSearchItem.vue';
  import useAirports from 'home-module/composables/use-airports';
  import useSnackbar from 'common-module/composables/use-snackbar';
  import useSearchForm, {
    SearchFormValue,
    SearchFormItemValue,
  } from 'home-module/composables/use-search-form';
  import useFirebase from 'common-module/composables/use-firebase';

  type ResultItem = {
    title: string;
    description: string;
    type: string;
    value: SearchFormItemValue;
    icon: string;
  };

  type ScreenData = {
    itemNum: number;
    errorType: string;
  };

  const router = useRouter();
  const route = useRoute();

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

  const { airports, initiateAirports } = useAirports();
  await initiateAirports();

  // popular groups & last location search
  const lastSearch = useLocalStorage<Array<ResultItem>>(
    'flight-mweb.last-location-search',
    []
  );
  const popularGroups = computed(() =>
    airports
      .filter((item) => item.group.toLowerCase() === 'populer')
      .map((item) => ({
        title: `${item.area_name}, ${item.country_name}`,
        description: `${item.airport_code} - ${item.airport_name}`,
        type: `${item.type[0].toUpperCase()}${item.type
          .slice(1)
          .toLowerCase()}`,
        icon:
          item.type === 'KOTA'
            ? '/icon-location-city.svg'
            : '/icon-location-airport.svg',
        value: {
          label: `${item.area_name} (${item.airport_code})`,
          value: item.airport_code,
        },
      }))
  );

  // search location
  const keyword = ref('');
  const results = ref<Array<ResultItem>>([]);
  const screenData = ref<ScreenData>({
    itemNum: 0,
    errorType: '',
  });
  const keywordCode = ref('');

  watchDebounced(
    keyword,
    () => {
      if (keyword.value) {
        const tempResult: Array<ResultItem> = [];
        const key = keyword.value.toLowerCase();

        // for loop is used for performance reason
        for (let i = 0; i < airports.length; i++) {
          const item = airports[i];
          const string =
            item.airport_name.toLowerCase() +
            '|' +
            item.airport_code.toLowerCase() +
            '|' +
            item.country_name.toLowerCase() +
            '|' +
            item.area_name.toLowerCase();

          if (string.includes(key))
            tempResult.push({
              title: `${item.area_name}, ${item.country_name}`,
              description: `${item.airport_code} - ${item.airport_name}`,
              type: `${item.type[0].toUpperCase()}${item.type
                .slice(1)
                .toLowerCase()}`,
              icon:
                item.type === 'KOTA'
                  ? '/icon-location-city.svg'
                  : '/icon-location-airport.svg',
              value: {
                label: `${item.area_name} (${item.airport_code})`,
                value: item.airport_code,
              },
            });
        }
        results.value = tempResult;
        renderedCount.value =
          renderedCount.value +
          (tempResult.length - renderedCount.value < 50
            ? tempResult.length
            : 50);

        if (keywordCode.value !== 'Backspace') {
          screenData.value.errorType = keyword.value;
          screenData.value.itemNum = renderedResult.value.length;
        }
      } else {
        results.value = [];
        triggerLogTracking('Delete All Keyword', true);
      }
    },
    { debounce: 200 }
  );

  // lazy load results
  const renderedCount = ref(0);
  const renderedResult = computed(() =>
    results.value.slice(0, renderedCount.value)
  );

  const body = ref<Window | null>(null);
  const { arrivedState } = useScroll(body, {
    offset: { bottom: 100 },
  });
  watch(
    () => arrivedState.bottom,
    (value) => {
      if (value) {
        renderedCount.value =
          renderedCount.value +
          (results.value.length - renderedCount.value < 50
            ? results.value.length
            : 50);
      }
    }
  );
  onMounted(() => {
    body.value = window;
  });

  // event handlers
  const { searchForm, setSearchForm } = useSearchForm();
  const { addSnackbar } = useSnackbar();
  const { track } = useFirebase();

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

    if (keyword.value.length > 0) {
      triggerLogTracking('Click Autocomplete Result');
    }

    onBack();
  }

  function onBack(withButton = false) {
    if (keywordCode.value && withButton) {
      triggerLogTracking('Cancel Search', true);
    }
    router.go(-1);
  }

  function onDeleteLastSearch() {
    lastSearch.value = [];
  }

  function onKeyDown(event: Event) {
    const evt = event as KeyboardEvent;
    keywordCode.value = evt.code;
  }

  function triggerLogTracking(
    triggerType: string,
    isDeleteAll: boolean = false
  ) {
    const itemNum: number = isDeleteAll
      ? screenData.value.itemNum
      : renderedResult.value.length;
    const errorType: string = isDeleteAll
      ? screenData.value.errorType
      : keyword.value;
    const trackingData: Object = {
      screen_name: 'FlightHomeAutoComplete',
      trigger_type: triggerType,
      item_num: itemNum > 0 ? itemNum : undefined,
      error_type: errorType.length > 0 ? errorType : undefined,
    };

    track('trigger_log', trackingData);

    screenData.value = {
      itemNum: 0,
      errorType: '',
    };
  }
</script>

<template>
  <LocationSearch v-model="keyword" @back="onBack(true)" @keydown="onKeyDown">
    <template v-if="!keyword">
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
            :keyword="keyword"
            @select="onSelect(item)"
          />
        </ul>
      </template>

      <div class="flex py-2 px-4">
        <h2 class="font-bold">Destinasi Populer</h2>
      </div>
      <ul>
        <LocationSearchItem
          v-for="item in popularGroups"
          :title="item.title"
          :description="item.description"
          :type="item.type"
          :icon="item.icon"
          :key="`popular-${item.value.value}`"
          :keyword="keyword"
          @select="onSelect(item)"
        />
      </ul>
    </template>

    <template v-else>
      <ul>
        <LocationSearchItem
          v-for="item in renderedResult"
          :title="item.title"
          :description="item.description"
          :type="item.type"
          :icon="item.icon"
          :key="`result-${item.value.value}`"
          :keyword="keyword"
          @select="onSelect(item)"
        />
      </ul>
    </template>
  </LocationSearch>
</template>
