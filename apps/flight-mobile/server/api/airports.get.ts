import { z } from 'zod';

const AirportsResponse = z.array(
  z.object({
    airport_code: z.string(),
    airport_name: z.string(),
    all_airport: z.string(),
    area_name: z.string(),
    country_name: z.string(),
    group: z.string(),
    international: z.boolean(),
    timezone: z.string(),
    type: z.string(),
  })
);

export type AirportsResponse = z.infer<typeof AirportsResponse>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const search = z.string().optional().parse(query.search);
  return $fetch('/airport/v1/list', {
    baseURL: config.public.apixBaseUrl,
  })
    .then((data) => AirportsResponse.parse(data))
    .then((airports) => {
      if (!search) {
        return airports.filter(
          (airport) => airport.group.toLowerCase() === 'populer'
        );
      }

      return airports.filter((airport) => {
        const string =
          airport.airport_name.toLowerCase() +
          '|' +
          airport.airport_code.toLowerCase() +
          '|' +
          airport.country_name.toLowerCase() +
          '|' +
          airport.area_name.toLowerCase();

        return string.includes(search.toLowerCase());
      });
    })
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
