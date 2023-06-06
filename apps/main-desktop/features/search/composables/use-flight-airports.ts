import popularAirports from 'search-module/enums/popular-airports';
import type { LocationSearchItem } from 'search-module/types/search-types';
import type { AirportsResponse } from 'api/flight/airports.get';

type AirportsRecord = Record<
  string,
  AirportsResponse[number] & { child?: Array<AirportsResponse[number]> }
>;

function parseAirport(
  item: AirportsRecord[string],
  isPopular: boolean = false
): LocationSearchItem {
  const isCity = item.type === 'KOTA';

  const child: LocationSearchItem['child'] = item.child?.map((chd) => ({
    title: `${chd.airport_name} - ${chd.airport_code}`,
    description: `${chd.area_name}, ${chd.country_name}`,
    type: `${chd.type[0].toUpperCase()}${chd.type.slice(1).toLowerCase()}`,
    icon: '/icon-location-airport.svg',
    value: chd.airport_code,
    payload: {
      cityName: chd.all_airport,
    },
  }));

  return {
    title: isPopular
      ? item.area_name
      : isCity
      ? `${item.area_name}, ${item.country_name}`
      : `${item.airport_name} - ${item.airport_code}`,
    description: isCity
      ? `Semua Bandara - ${item.airport_code}`
      : `${item.area_name}, ${item.country_name}`,
    type: `${item.type[0].toUpperCase()}${item.type.slice(1).toLowerCase()}`,
    icon: isCity ? '/icon-location-city.svg' : '/icon-location-airport.svg',
    value: item.airport_code,
    payload: {
      cityName: item.all_airport || item.airport_name,
    },
    child,
  };
}

function mapData(arr: AirportsResponse | null, isPopular: boolean = false) {
  if (arr === null) return null;

  const isCityExists = isPopular
    ? false
    : arr.some((item) => item.type === 'KOTA');

  if (isCityExists) {
    const cityMap: AirportsRecord = arr.reduce((result, item) => {
      const temp: AirportsRecord = result;

      if (item.type === 'KOTA') {
        temp[item.airport_name] = { ...item, child: [] };
      }
      return temp;
    }, {});

    const resultMap: AirportsRecord = { ...cityMap };

    arr.forEach((item) => {
      if (cityMap[item.all_airport]) {
        const found = resultMap[item.all_airport];
        if (!found.child) found.child = [];
        found.child?.push(item);
      } else if (!resultMap[item.airport_name]) {
        resultMap[item.airport_name] = item;
      }
    });

    return Object.values(resultMap).map((item) =>
      parseAirport(item, isPopular)
    );
  }

  return arr.map((item) => parseAirport(item, isPopular));
}

export default function useFlightAirports() {
  const keyword = ref('');
  const deboundedKeyword = refDebounced(keyword, 200);
  const { data: filteredAirports, pending } = useLazyFetch(
    '/api/flight/airports',
    {
      immediate: false,
      transform: mapData,
      query: {
        search: deboundedKeyword,
      },
    }
  );

  const history = useLocalStorage<Array<LocationSearchItem>>(
    'flight-web:last-location-search',
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

  // TODO: use API once implemented
  // const popularAirports = useState<Array<LocationSearchItem> | null>(
  //   () => null
  // );
  // onMounted(async () => {
  //   if (!popularAirports.value) {
  //     const { data } = await useFetch('/api/flight/airports', {
  //       transform: (arr) => mapData(arr, true),
  //     });
  //     popularAirports.value = data.value;
  //   }
  // });

  return {
    pending,
    keyword,
    filteredAirports,
    popularAirports,
    history,
    addHistory,
    clearHistory,
  };
}
