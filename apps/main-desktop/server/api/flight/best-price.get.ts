import { z } from 'zod';
import { startOfMonth, format, add } from 'date-fns';

const BestPriceResponse = z.object({
  data: z.array(
    z.object({
      cheapest: z.boolean(),
      date: z.string(),
      dateObj: z.object({
        day: z.string(),
        month: z.string(),
        year: z.string(),
      }),
      fare: z.number().nullable(),
      shortFare: z.number().nullable(),
    })
  ),
});

const BestPriceQuery = z.object({
  from: z.string(),
  to: z.string(),
  isReturn: z.string().optional(),
  flightClass: z.string(),
});

export type BestPrice = Record<
  string,
  Record<
    string,
    {
      cheapest: boolean;
      fare: number;
      shortFare: number;
    }
  >
>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const query = BestPriceQuery.parse(getQuery(event));

  let pointer = startOfMonth(new Date());
  const queries = Array.from({ length: 13 }, () => {
    const result = {
      from: query.isReturn === '1' ? query.to : query.from,
      to: query.isReturn === '1' ? query.from : query.to,
      month: format(pointer, 'MM'),
      year: format(pointer, 'yyyy'),
      flightClass: query.flightClass,
    };
    pointer = add(pointer, { months: 1 });
    return result;
  });

  return Promise.all(
    queries.map((query, index) => {
      return $fetch('/flight/v2/best-price', {
        query,
        baseURL: `${config.flightBaseUrl}${config.flightPath}`,
      })
        .then((data) => BestPriceResponse.parse(data).data)
        .then((data) => {
          const result: BestPrice = {};
          const key = format(
            add(startOfMonth(new Date()), { months: index }),
            'M-yyyy'
          );
          data.forEach((item) => {
            if (!result[key]) result[key] = {};
            if (!!item.shortFare && !!item.fare) {
              result[key][Number(item.dateObj.day)] = {
                shortFare:
                  item.shortFare > 9999
                    ? Math.floor(item.shortFare / 1000)
                    : item.shortFare,
                fare: item.fare,
                cheapest: item.cheapest,
              };
            }
          });
          return result;
        })
        .catch((error) => {
          logger.error(error);
          throw error;
        });
    })
  );
});
