import type { AirportsResponse } from 'api/airports.get';

function mapData(arr: AirportsResponse | null) {
  if (arr === null) return null;
  return arr.map((item) => ({
    title: `${item.area_name}, ${item.country_name}`,
    description: `${item.airport_code} - ${item.airport_name}`,
    type: `${item.type[0].toUpperCase()}${item.type.slice(1).toLowerCase()}`,
    icon:
      item.type === 'KOTA'
        ? '/icon-location-city.svg'
        : '/icon-location-airport.svg',
    value: {
      label: `${item.area_name} (${item.airport_code})`,
      value: item.airport_code,
    },
  }));
}

export default async function useAirports() {
  const keyword = ref('');
  const deboundedKeyword = refDebounced(keyword, 200);

  const { data: filteredAirports, pending } = useLazyFetch('/api/airports', {
    immediate: false,
    transform: mapData,
    query: {
      search: deboundedKeyword,
    },
  });

  const key = 'popular-airports-response';
  const { data: cached } = useNuxtData<AirportsResponse>(key);
  const { data: popularAirports } = await useFetch('/api/airports', {
    key,
    lazy: !!cached.value,
    transform: mapData,
    default: () => mapData(cached.value),
  });

  return {
    filteredAirports,
    popularAirports,
    keyword,
    deboundedKeyword,
    isSearching: pending,
  };
}
