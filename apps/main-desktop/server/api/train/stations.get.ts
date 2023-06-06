import { z } from 'zod';

const StationsResponse = z.array(
  z.object({
    city: z.object({
      cityCode: z.string(),
      cityName: z.string(),
      id: z.string(),
      new: z.boolean(),
      popular: z.boolean(),
      priority: z.number().nullable(),
      province: z.string(),
    }),
    id: z.string(),
    name: z.string(),
    priority: z.number().nullable(),
    stationCode: z.string().nullable(),
    type: z.union([z.literal('CITY'), z.literal('STATION')]),
  })
);

export type StationsResponse = z.infer<typeof StationsResponse>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  return $fetch('/train/v1/search/stations', {
    baseURL: config.trainBaseUrl,
    query,
  })
    .then((data) => StationsResponse.parse(data))
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
