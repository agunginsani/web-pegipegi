import type { StationsResponse } from 'api/train/stations.get';
import type { LocationSearchItem } from 'search-module/types/search-types';
import popularStations from 'search-module/enums/popular-stations';

type StationsRecord = Record<
  string,
  StationsResponse[number] & { child?: Array<StationsResponse[number]> }
>;

function parseStation(item: StationsRecord[string]) {
  const child: LocationSearchItem['child'] = item.child?.map((chd) => ({
    title: `${chd.name} - ${chd.stationCode}`,
    description: chd.city.cityName,
    type: 'Stasiun',
    icon: '/icon-location-station.svg',
    value: chd.stationCode ?? `${chd.city.cityCode}ALL`,
  }));

  const isCity = item.type === 'CITY';

  return {
    title: isCity ? item.city.cityName : `${item.name} - ${item.stationCode}`,
    description: isCity
      ? `Semua Stasiun di ${item.city.cityName}`
      : item.city.cityName,
    type: isCity ? 'Kota' : 'Stasiun',
    icon: isCity ? '/icon-location-city.svg' : '/icon-location-station.svg',
    value: item.stationCode ?? `${item.city.cityCode}ALL`,
    child,
  };
}

function mapData(data: StationsResponse) {
  const isCityExists = data.some((item) => item.type === 'CITY');
  if (isCityExists) {
    const cities: StationsRecord = data.reduce((result, item) => {
      if (item.type === 'CITY') {
        const temp: StationsRecord = result;
        temp[item.id] = item;
        return temp;
      }
      return result;
    }, {});

    const result = { ...cities };

    data.forEach((item) => {
      if (item.type === 'STATION' && cities[item.city.id]) {
        const found = result[item.city.id];
        if (!found.child) found.child = [];
        found.child?.push(item);
      } else if (item.type === 'STATION') {
        result[item.id] = item;
      }
    });

    return Object.values(result).map((item) => parseStation(item));
  }
  return data.map((item) => parseStation(item));
}

export default function useTrainStations() {
  const keyword = ref('');
  const deboundedKeyword = refDebounced(keyword, 200);
  const { data: filteredStations, pending } = useLazyFetch(
    '/api/train/stations',
    {
      immediate: false,
      transform: mapData,
      query: {
        point: deboundedKeyword,
      },
    }
  );

  const history = useLocalStorage<Array<LocationSearchItem>>(
    'train-web:last-location-search',
    []
  );

  function addHistory(input: LocationSearchItem) {
    history.value = [
      input,
      ...history.value.filter((item) => item.value !== input.value),
    ].slice(0, 5);
  }

  function clearHistory() {
    history.value = [];
  }

  return {
    pending,
    keyword,
    filteredStations,
    popularStations,
    history,
    addHistory,
    clearHistory,
  };
}
