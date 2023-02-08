import { z } from 'zod';

const BestPrice = z.object({
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
  year: z.string(),
  month: z.string(),
  flightClass: z.string(),
});

export type BestPrice = z.infer<typeof BestPrice>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const query = BestPriceQuery.parse(getQuery(event));
  return $fetch('/flight/v2/best-price', {
    query,
    baseURL: config.public.apixSearchBaseUrl,
  })
    .then((data) => BestPrice.parse(data).data)
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
