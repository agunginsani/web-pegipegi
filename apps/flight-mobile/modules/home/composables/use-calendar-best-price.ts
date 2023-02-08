import { add, format, differenceInMonths, startOfMonth } from 'date-fns';
import useSearchForm from './use-search-form';

type BestPrice = {
  [key: string]: {
    [key: string]: {
      cheapest: boolean;
      fare: number;
      shortFare: number;
    };
  };
};

export default async (startDate: Date, endDate: Date) => {
  const route = useRoute();
  const { searchForm } = useSearchForm();

  const bestPriceArray = ref<
    Array<{
      // TODO: add type
      response: any;
      key: string;
    }>
  >([]);

  const bestPrice = computed<BestPrice>(() => {
    const result: BestPrice = {};
    bestPriceArray.value.forEach((month) => {
      month.response.data?.forEach((item) => {
        if (!result[month.key]) result[month.key] = {};
        if (!!item.shortFare && !!item.fare) {
          result[month.key][Number(item.dateObj.day)] = {
            shortFare: item.shortFare,
            fare: item.fare,
            cheapest: item.cheapest,
          };
        }
      });
    });

    return result;
  });

  async function fetchBestPrice() {
    const monthDifference = Number(differenceInMonths(endDate, startDate));
    let pointer = startOfMonth(new Date(startDate));

    const queries = Array.from({ length: monthDifference + 1 }, () => {
      const result = {
        from:
          route.query.type === 'departure'
            ? searchForm.origin.value
            : searchForm.destination.value,
        to:
          route.query.type === 'departure'
            ? searchForm.destination.value
            : searchForm.origin.value,
        month: format(pointer, 'MM'),
        year: format(pointer, 'yyyy'),
        flightClass: searchForm.class.value,
      };
      pointer = add(pointer, { months: 1 });
      return result;
    });
    bestPriceArray.value = await Promise.all(
      queries.map(async (query) => ({
        key: `${Number(query.month)}-${query.year}`,
        response: await useLazyFetch('/api/best-price', { query }),
      }))
    );
  }

  await fetchBestPrice();

  return {
    bestPrice,
  };
};
