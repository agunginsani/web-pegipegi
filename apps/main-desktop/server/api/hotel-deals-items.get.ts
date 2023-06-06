import { z } from 'zod';

const path = '/HotelSearchAPI/v1/hotel/homepage/search-result';
const HotelInfo = z.object({
  id: z.string(),
  contentId: z.string(),
  name: z.string(),
  picture: z.string(),
  areaCd: z.string(),
  areaName: z.string(),
  cityCd: z.string(),
  cityName: z.string(),
  grade: z.string(),
  discountPercentageNet: z.string(),
  discountAdditionalWording: z.string(),
  crossedPriceNet: z.string(),
  discountedPriceNet: z.string(),
  order: z.number(),
});
const HotelDealsItem = z.object({
  quickFilterId: z.string(),
  labelCd: z.string(),
  labelName: z.string(),
  soldOutWording: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  order: z.number(),
  hotelCards: z.array(HotelInfo),
});
const HotelDealsItemsResponse = z.object({
  data: z.array(HotelDealsItem),
});

type HotelDealsItemsResponse = z.infer<typeof HotelDealsItemsResponse>;
export type HotelDealsItem = z.infer<typeof HotelDealsItem>;
export type HotelInfo = z.infer<typeof HotelInfo>;

export type HotelDealsItemsRequest = {
  room: number;
  night: number;
  adultNumMax: number;
  stayDay: string;
  device_origin: string;
  quickFilterIds: string;
  flashSaleFlags: string;
  labelCds: string;
  labelNames: string;
};

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();

  return $fetch(path, {
    baseURL: config.accomSearchBaseUrl,
    params: getQuery(event),
    headers: {
      'X-Auth-UserId': config.accomAuthUserId,
      'X-Auth-Token': config.accomAuthToken,
    },
  })
    .then((data) => HotelDealsItemsResponse.parse(data).data)
    .catch((e) => {
      throw e;
    });
});
