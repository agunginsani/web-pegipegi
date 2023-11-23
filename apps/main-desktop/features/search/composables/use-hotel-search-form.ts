import { differenceInDays, addDays, format } from 'date-fns';
import type { AutocompleteItem } from 'api/hotel/autocomplete.get';
import type { CalendarModelValue } from 'search-module/components/Calendar.vue';

type Query = {
  stayDay: string;
  night: number;
  room: number;
  adultNumMax: number;
  traceId: string;
  cityCd?: string;
  areaCd?: string;
  groupId?: string;
  attractionCd?: string;
  activeSort?: number;
  quickFilter?: number;
  grade?: string;
  maxPrice?: number;
  minPrice?: number;
  latitude?: number;
  longitude?: number;
};

export type HotelLocation = AutocompleteItem & {
  areaCd: string;
  cityCd: string;
  attractionCd: string;
  groupId: string;
  groupName: string;
  latitude: number;
  longitude: number;
  titleInHistory: string;
};

export type HotelForm = {
  traceId: string;
  location: HotelLocation;
  checkInDate: Date;
  checkOutDate: Date | undefined;
  guest: number;
  room: number;
  grade: Array<number>;
  price: Array<number>;
};

function mapLocation(item: AutocompleteItem) {
  const area: any = {};
  const { url, ...newItem } = item;
  url.split('&').forEach((now) => {
    const splitValue = now.split('=');
    [, area[splitValue[0]]] = splitValue;
  });
  const location: HotelLocation = {
    ...newItem,
    url,
    areaCd: area.smlCd || '',
    cityCd: area.lrgCd || '',
    attractionCd: area.attrCd || '',
    groupId: '',
    groupName: '',
    latitude: 0,
    longitude: 0,
    titleInHistory: '',
  };
  return location;
}

export function mapData(rawData: Array<AutocompleteItem | HotelLocation>) {
  return rawData.map((el) => ({
    title: el.title,
    url: el.url,
    description: el.subtitle,
    icon: el.image,
    type: el.objectTypeDescription,
    value: el.title,
    payload: mapLocation(el),
  }));
}

export default async function useHotelSearchForm() {
  const maxPrice = 999999999;
  const today = new Date();
  const form = useState<HotelForm>(() => ({
    traceId: '',
    location: {
      area: '',
      attraction: '',
      city: '',
      count: '',
      hotel_id: '',
      hotel_name: '',
      image: '',
      matchingScore: '',
      objectType: '',
      objectTypeDescription: '',
      subtitle: '',
      title: '',
      url: '',
      areaCd: '',
      cityCd: '',
      attractionCd: '',
      groupId: '',
      groupName: '',
      latitude: 0,
      longitude: 0,
      titleInHistory: '',
    },
    checkInDate: today,
    checkOutDate: addDays(today, 1),
    room: 1,
    guest: 2,
    grade: [],
    price: [0, maxPrice],
  }));

  const dateModel = computed<CalendarModelValue>({
    get() {
      return [form.value.checkInDate, form.value.checkOutDate];
    },
    set(newValue) {
      if (newValue[0]) {
        setForm({
          checkInDate: newValue[0],
        });
      }

      if (newValue[1]) {
        setForm({
          checkOutDate: newValue[1],
        });
      } else {
        setForm({
          checkOutDate: undefined,
        });
      }
    },
  });

  const night = computed(
    () =>
      differenceInDays(form.value.checkOutDate!, form.value.checkInDate!) || 1
  );

  const search = ref<string>('');
  const debouncedSearch = refDebounced(search, 400);

  watch(debouncedSearch, (newVal) => {
    if (!newVal) return;
    fetchLocation();
  });

  const {
    data: response,
    execute: fetchLocation,
    pending: searchPending,
  } = await useLazyFetch('/api/hotel/autocomplete', {
    params: {
      keyword: debouncedSearch,
      traceId: form.value.traceId,
    },
    watch: false,
    immediate: false,
  });

  const searchResult = computed(() =>
    !!search.value && response.value?.dataList ? response.value.dataList : []
  );

  function setForm(param: Partial<HotelForm>) {
    form.value = { ...form.value, ...param };
  }

  const splitRouteName = (
    name: string,
    separator = '_',
    isReplacementMerged = false
  ) =>
    isReplacementMerged
      ? name.toLowerCase().replace(/[^A-Za-z0-9]+/g, separator)
      : name.toLowerCase().replace(/[^A-Za-z0-9]/g, separator);

  function getQueryParam() {
    const { location, price, grade, checkInDate, room, guest, traceId } =
      form.value;

    const query: Query = {
      stayDay: format(checkInDate!, 'yyyy-MM-dd'),
      night: night.value,
      room,
      adultNumMax: guest,
      traceId: traceId || '',
    };

    if (location?.longitude && location?.latitude) {
      query.latitude = location.latitude;
      query.longitude = location.longitude;
      query.activeSort = 2;
      query.quickFilter = 1;
    } else if (location?.attractionCd) {
      query.attractionCd = location.attractionCd;
      query.activeSort = 2;
    } else if (location?.groupId) {
      query.groupId = location.groupId;
      query.activeSort = 0;
    } else {
      query.cityCd = location?.cityCd || '';
      if (location?.areaCd) query.areaCd = location.areaCd;
      query.activeSort = 0;
    }

    if (grade.length > 0) {
      query.grade = grade.join(',');
    }

    if (price[0] !== 0 || price[1] !== 999999999) {
      query.minPrice = price[0];
      query.maxPrice = price[1];
    }

    return query;
  }

  function getRoute() {
    const query = getQueryParam();
    const { homeUrl } = useRuntimeConfig().public;
    const route: any = { query, path: '' };
    const { location } = form.value;
    let largeArea, groupName, id;

    if (location?.objectTypeDescription === 'Area') {
      largeArea = splitRouteName(location?.city);
      id = splitRouteName(location?.title);
    } else if (location?.objectTypeDescription === 'Attraction') {
      largeArea = location?.attraction
        .split(',')
        .reverse()[0]
        .trim()
        .toLowerCase();
      id = `dekat-${splitRouteName(location?.title, '-', true)}-${
        query.attractionCd
      }`;
    } else if (location?.objectTypeDescription === 'City') {
      largeArea = splitRouteName(location?.title);
    } else if (location?.objectTypeDescription === 'Group') {
      groupName = location?.groupName;
    } else if (location?.longitude && location?.latitude) {
      largeArea = 'search';
    } else {
      const subtitleArr = location?.subtitle.split(', ') || [];
      const cityName = splitRouteName(subtitleArr[subtitleArr.length - 1]);
      const hotelName = splitRouteName(location?.title || '');
      const hotelId = location?.hotel_id;
      largeArea = cityName;
      id = `${hotelName}_${hotelId}`;
    }
    if (largeArea) {
      if (id) {
        route.path = `/hotel/${largeArea}/${id}`;
      } else route.path = `/hotel/${largeArea}`;
    } else if (groupName) {
      route.path = `/hotel/group/${groupName}`;
    }

    const params = new URLSearchParams();
    Object.keys(query).forEach((el) => {
      params.append(el, route.query[el].toString());
    });

    return `${homeUrl}${route.path}?${params}`;
  }

  return {
    night,
    maxPrice,
    form,
    search,
    searchResult,
    searchPending,
    dateModel,
    setForm,
    mapData,
    getRoute,
  };
}
