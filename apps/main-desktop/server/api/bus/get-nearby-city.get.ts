import { z } from 'zod';
import type { LocationSearchItem } from '~/features/search/types/search-types';
import type { BusPayload } from '~/features/search/composables/use-bus-search';

const path = '/bus/search/v2/pickpoint/nearby';
const NearbyCityInfo = z.object({
  cityId: z.string(),
  cityName: z.string(),
  type: z.string(),
});
const NearbyCityResponse = z.object({
  data: NearbyCityInfo,
});
type NearbyCityResponse = z.infer<typeof NearbyCityResponse>;
export type NearbyCityInfo = z.infer<typeof NearbyCityInfo>;
export type RoutesRequest = {
  longitude: number;
  latitude: number;
};

function parseItem(info: NearbyCityInfo): LocationSearchItem<BusPayload> {
  return {
    value: info.cityId,
    title: info.cityName,
    payload: {
      city: {
        id: info.cityId,
        name: info.cityName,
      },
    },
    description: 'Lokasi kamu saat ini',
    type: 'Kota',
    icon: '/icon-search-bus-city.svg',
    child: undefined,
  };
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const origin = query?.fe_params_origin ? `/${query?.fe_params_origin}` : '';
  return $fetch(path + origin, {
    baseURL: config.busBaseUrl,
    params: query,
  })
    .then((data): LocationSearchItem<BusPayload> => {
      let res = NearbyCityResponse.parse(data).data;
      return parseItem(res);
    })
    .catch((e) => {
      throw e;
    });
});
