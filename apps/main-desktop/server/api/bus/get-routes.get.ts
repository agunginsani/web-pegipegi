import { z } from 'zod';
import type { LocationSearchItem } from '~/features/search/types/search-types';
import type { BusPayload } from '~/features/search/composables/use-bus-search';

const path = '/bus/search/v2/pickpoint';
const RouteInfo = z.object({
  address: z.string(),
  city: z.object({
    id: z.string(),
    name: z.string(),
  }),
  id: z.string(),
  isMapAvailable: z.boolean(),
  locationLat: z.number(),
  locationLong: z.number(),
  name: z.string(),
  popularRoute: z.boolean(),
  type: z.string(),
});
const RoutesResponse = z.object({
  data: z.array(RouteInfo),
});

type RoutesResponse = z.infer<typeof RoutesResponse>;
export type RouteInfo = z.infer<typeof RouteInfo>;

export type RoutesRequest = {
  page?: string;
  search?: string;
};

function parseItem(info: RouteInfo): LocationSearchItem<BusPayload> {
  return {
    value: info.id,
    title: info.name,
    payload: {
      city: info.city,
    },
    description:
      info.type === 'CITY'
        ? `Semua titik berangkat di ${info.name}`
        : info.address,
    type: info.type === 'CITY' ? 'Kota' : 'Titik jemput',
    icon:
      info.type === 'CITY'
        ? '/icon-search-bus-city.svg'
        : '/icon-search-bus-terminal.svg',
    child: info.type === 'CITY' ? [] : undefined,
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
    .then((data): Array<LocationSearchItem<BusPayload>> => {
      let res = RoutesResponse.parse(data).data;
      return res.map((val) => parseItem(val));
    })
    .catch((e) => {
      throw e;
    });
});
