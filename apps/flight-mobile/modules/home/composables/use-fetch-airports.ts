import { z } from 'zod';
import useAuth from 'common-module/composables/use-auth';

const Airports = z.array(
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

export type Airports = z.infer<typeof Airports>;

export default function useAirports() {
  const { token } = useAuth();
  const config = useRuntimeConfig();
  return useFetch('/v1/airport/v1/list', {
    baseURL: config.public.authBaseUrl,
    headers: { authorization: `Bearer ${token}` },
    transform(data) {
      return Airports.parse(data);
    },
  });
}
