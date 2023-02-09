export default () => {
  const keyword = ref('');
  const deboundedKeyword = refDebounced(keyword, 200);

  // TODO: cache data
  const { data, pending } = useFetch('/api/airports', {
    query: {
      search: deboundedKeyword,
    },
  });

  const airports = computed(() => {
    if (!data.value) return [];
    return data.value?.map((item) => ({
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
  });

  const popularAirports = computed(() => {
    if (!!deboundedKeyword.value || !data.value) return [];
    return data.value
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
      }));
  });

  return {
    airports: airports ?? [],
    popularAirports,
    keyword,
    deboundedKeyword,
    isLoading: pending,
  };
};
