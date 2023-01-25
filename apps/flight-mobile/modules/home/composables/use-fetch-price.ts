import useAuthStore from 'common-module/composables/use-auth-store';
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

export type BestPrice = z.infer<typeof BestPrice>;

type BestPriceQuery = {
  from: string;
  to: string;
  year: string;
  month: string;
  flightClass: string;
};

export default async function useFetchPrice(query: BestPriceQuery) {
  const { token } = useAuthStore();
  const { $logger } = useNuxtApp();
  const config = useRuntimeConfig();
  return useFetch('/v1/flight-search/v2/best-price', {
    query,
    baseURL: config.public.authBaseUrl,
    headers: { authorization: `Bearer ${token}` },
    onResponseError(ctx) {
      $logger.error(ctx);
    },
    transform(data) {
      return BestPrice.parse(data).data;
    },
  });
}
