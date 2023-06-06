import useFlightSearchForm from './use-flight-search-form';

export default function useFlightBestPrice(isReturn: Ref<boolean>) {
  const { form } = useFlightSearchForm();

  const query = computed(() => {
    const result: any = {
      from: form.value.origin.value,
      to: form.value.destination.value,
      // TODO: use seat class from filter
      flightClass: 'ECONOMY',
      isReturn: isReturn.value ? '1' : '0',
    };

    return result;
  });

  const { data, pending } = useLazyFetch('/api/flight/best-price', {
    query,
  });

  const bestPrice = computed(() =>
    data.value?.reduce((acc, item) => ({ ...acc, ...item }), {})
  );

  return {
    pending,
    bestPrice,
  };
}
