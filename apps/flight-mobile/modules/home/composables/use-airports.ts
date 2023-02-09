export default () => {
  const keyword = ref('');
  // TODO: add debounce
  // TODO: add caching
  const { data, pending } = useFetch('/api/airports', {
    query: {
      search: keyword,
    },
  });

  const airports = computed(
    () =>
      data.value?.map((item) => ({
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
      })) ?? []
  );

  const popular = computed(
    () =>
      data.value
        ?.filter((item) => item.group.toLowerCase() === 'populer')
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
        })) ?? []
  );

  return {
    airports: airports ?? [],
    keyword,
    popular,
    isLoading: pending,
  };
};
