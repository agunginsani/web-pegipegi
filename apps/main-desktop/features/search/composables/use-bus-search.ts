import { format, addDays, isBefore, startOfDay } from 'date-fns';
import type {
  LocationSearchItem,
  LocationSearchSelection,
} from '~/features/search/types/search-types';
import useGenericModal from 'common-module/composables/use-generic-modal';

export type BusSearchForm = {
  origin: LocationSearchSelection<BusPayload>;
  destination: LocationSearchSelection<BusPayload>;
  dateDeparture: Date;
  dateReturn: Date | undefined;
  paxNum: number;
};

export type BusLastSearchItem = {
  departDate: string;
  from: {
    id: string;
    name: string;
    city: {
      id: string;
      name: string;
    };
  };
  passengerCount: number;
  returnDate?: string;
  to: {
    id: string;
    name: string;
    city: {
      id: string;
      name: string;
    };
  };
};
type BusLastSearchStorage = Array<BusLastSearchItem>;

export type BusPayload = {
  city: {
    id: string;
    name: string;
  };
};

export default async function useBusSearch() {
  const config = useRuntimeConfig();

  //#region form data setup
  const form = useState<BusSearchForm>('search-form', () => ({
    origin: {
      value: 'TVLK_c48',
      label: 'Jakarta',
      payload: {
        city: { id: 'TVLK_c48', name: 'Jakarta' },
      },
    },
    destination: {
      value: 'TVLK_c25',
      label: 'Bandung',
      payload: {
        city: { id: 'TVLK_c25', name: 'Bandung' },
      },
    },
    dateDeparture: addDays(new Date(), 1),
    dateReturn: undefined,
    paxNum: 1,
  }));
  const isDuplicateSearch = computed<boolean>(
    () =>
      form.value.origin.payload?.city.id ===
      form.value.destination.payload?.city.id
  );
  const selectedOriginCity = computed<string>(
    () => form.value.origin.payload?.city?.id || ''
  );
  function assignForm(
    key: 'origin' | 'destination' | 'dateDeparture' | 'dateReturn' | 'paxNum',
    value: any
  ) {
    form.value[key] = value;
  }
  const isSwapped = ref<boolean>(false);
  function swapLocation() {
    isSwapped.value = !isSwapped.value;
    const temp: LocationSearchSelection<BusPayload> = form.value.origin;
    form.value.origin = form.value.destination;
    form.value.destination = temp;
  }
  //#endregion

  //#region popular routes
  const popularOrigin = useState<Array<LocationSearchItem<BusPayload>>>(
    'popular-route',
    () => []
  );
  const { data: popularRoute } = await useLazyFetch('/api/bus/get-routes', {
    key: 'popular-origin',
    params: { page: 1, search: '', fe_params_isPopular: true },
    immediate: !popularOrigin.value?.length,
    default: () => popularOrigin.value,
    transform: (data) => data.slice(0, 8),
  });
  if (popularRoute.value) {
    popularOrigin.value = popularRoute.value;
  }
  watch(popularRoute, (newVal) => {
    if (!newVal) return;
    popularOrigin.value = newVal;
  });

  const { data: popularDestination } = await useLazyFetch(
    '/api/bus/get-routes',
    {
      key: 'popular-destination',
      params: {
        page: 1,
        search: '',
        fe_params_isPopular: true,
        fe_params_origin: selectedOriginCity,
      },
      immediate: false,
      default: () => popularOrigin,
      transform: (data) => data.slice(0, 8),
    }
  );
  //#endregion

  //#region search location
  const search = ref<string>('');
  const debouncedSearch = refDebounced(search, 200);
  const isDepartureSearch = ref<boolean>(true);
  const {
    data: searchResult,
    execute: fetchDestinationSearch,
    pending: searchPending,
  } = await useLazyFetch('/api/bus/get-routes', {
    key: 'search-destination',
    params: {
      page: 1,
      search: debouncedSearch,
      fe_params_origin: computed(() =>
        isDepartureSearch.value ? undefined : selectedOriginCity.value
      ),
    },
    watch: false,
    immediate: false,
  });

  // sponge: a really stupid fix to handle yet another useFetch idiotic hijinks
  searchPending.value = false;

  watch(debouncedSearch, (newVal) => {
    if (!newVal) return;
    fetchDestinationSearch();
  });
  function onSearchLocation(searchStr: string, isDeparture: boolean) {
    isDepartureSearch.value = isDeparture;
    search.value = searchStr;
  }
  function constructSearchUrl(item: BusSearchForm) {
    const params = new URLSearchParams();
    params.append('pax', item.paxNum.toString());

    const departureDate = format(item.dateDeparture, 'dd-MM-yyyy');
    if (item.dateReturn) {
      const returnDate = format(item.dateReturn, 'dd-MM-yyyy');
      params.append('date', `${departureDate}.${returnDate}`);
    } else {
      params.append('date', departureDate);
    }

    const originCityId = item.origin.payload?.city.id;
    const destinationCityId = item.destination.payload?.city.id;

    const from =
      item.origin.value === originCityId
        ? item.origin.value
        : `${originCityId}.${item.origin.value}`;
    params.append('from', from);

    const to =
      item.destination.value === destinationCityId
        ? item.destination.value
        : `${destinationCityId}.${item.destination.value}`;
    params.append('to', to);

    return `${
      config.public.homeUrl
    }/bus-travel/search-result/departure?${params.toString()}`;
  }
  //#endregion

  //#region search by gps
  const { warn } = useGenericModal();
  const isGpsSearchLoading = ref<boolean>(false);
  const gpsLocation = useState<LocationSearchSelection<BusPayload>>(
    'gps-loc',
    () => ({
      label: '',
      value: '',
      payload: {
        city: {
          id: '',
          name: '',
        },
      },
    })
  );
  const currentLocation = computed<LocationSearchItem<BusPayload>>(() => {
    if (!gpsLocation.value.value)
      return {
        value: '',
        title: 'Lokasimu saat ini',
        payload: {
          city: {
            id: '',
            name: '',
          },
        },
      };

    return {
      value: gpsLocation.value.value,
      title: gpsLocation.value.label,
      description: 'Lokasimu saat ini',
      payload: {
        city: {
          id: gpsLocation.value.value,
          name: gpsLocation.value.label,
        },
      },
    };
  });

  async function getNearbyCity(lat: number, lng: number) {
    if (
      !navigator.geolocation ||
      !!gpsLocation.value.value ||
      isGpsSearchLoading.value
    )
      return;

    isGpsSearchLoading.value = true;
    try {
      const res = await $fetch('/api/bus/get-nearby-city', {
        params: {
          latitude: lat,
          longitude: lng,
        },
      });
      gpsLocation.value.payload = {
        city: res.payload?.city || { id: res.value, name: res.title },
      };
      gpsLocation.value.label = res.title;
      gpsLocation.value.value = res.value;
    } catch (e) {
      warn({
        title: 'Kita gak tahu kamu di mana, nih',
        figure: '/figure-confused-cat.svg',
        description:
          'Nyalakan akses lokasi di pengaturan browser-mu ya, biar bisa lebih akurat.',
        actionText: 'Oke, mengerti',
      });
      console.error(e);
    }
    isGpsSearchLoading.value = false;
  }
  //#endregion

  //#region last search
  const lastSearch = useLocalStorage<BusLastSearchStorage>(
    'bus-mweb.search-history',
    []
  );
  const parsedLastSearch = computed<Array<BusSearchForm>>(() => {
    return lastSearch.value.map((val) => ({
      origin: {
        label: val.from.name,
        value: val.from.id,
        payload: { city: val.from.city },
      },
      destination: {
        label: val.to.name,
        value: val.to.id,
        payload: { city: val.to.city },
      },
      paxNum: val.passengerCount,
      dateDeparture: new Date(val.departDate),
      dateReturn: val.returnDate ? new Date(val.returnDate) : undefined,
    }));
  });
  const lastSearchOrigin = computed<Array<LocationSearchItem<BusPayload>>>(() =>
    lastSearch.value.map((info) => ({
      value: info.from.id,
      title: info.from.name,
      payload: {
        city: info.from.city,
      },
      description:
        info.from.city.id === info.from.id
          ? `Semua titik berangkat di ${info.from.name}`
          : '',
      type: info.from.city.id === info.from.id ? 'Kota' : 'Titik jemput',
      icon:
        info.from.city.id === info.from.id
          ? '/icon-search-bus-city.svg'
          : '/icon-search-bus-terminal.svg',
      child: info.from.city.id === info.from.id ? [] : undefined,
    }))
  );
  if (parsedLastSearch.value.length) {
    const lastSearchItem = { ...parsedLastSearch.value[0] };
    if (
      isBefore(startOfDay(lastSearchItem.dateDeparture), startOfDay(new Date()))
    ) {
      lastSearchItem.dateDeparture = addDays(startOfDay(new Date()), 1);
    }

    if (
      lastSearchItem.dateReturn &&
      isBefore(
        startOfDay(lastSearchItem.dateReturn),
        startOfDay(lastSearchItem.dateDeparture)
      )
    ) {
      lastSearchItem.dateReturn = undefined;
    }

    form.value = lastSearchItem;
  }

  const lastSearchDestination = computed<Array<LocationSearchItem<BusPayload>>>(
    () =>
      lastSearch.value.map((info) => ({
        value: info.to.id,
        title: info.to.name,
        payload: {
          city: info.to.city,
        },
        description:
          info.to.city.id === info.to.id
            ? `Semua titik berangkat di ${info.to.name}`
            : '',
        type: info.to.city.id === info.to.id ? 'Kota' : 'Titik jemput',
        icon:
          info.to.city.id === info.to.id
            ? '/icon-search-bus-city.svg'
            : '/icon-search-bus-terminal.svg',
        child: info.to.city.id === info.to.id ? [] : undefined,
      }))
  );
  function clearLastSearch() {
    lastSearch.value = [];
  }
  function deleteLastSearch(index: number) {
    lastSearch.value.splice(index, 1);
  }
  //#endregion

  return {
    form,
    assignForm,
    isDuplicateSearch,
    isSwapped,
    swapLocation,
    constructSearchUrl,

    popularOrigin,
    popularDestination,

    search,
    searchResult,
    searchPending,
    onSearchLocation,

    currentLocation,
    getNearbyCity,

    parsedLastSearch,
    lastSearchOrigin,
    lastSearchDestination,
    clearLastSearch,
    deleteLastSearch,
  };
}
