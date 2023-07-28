import { z } from 'zod';

const path = '/quickfilter/QuickfilterAPI/v1/hotel/quickfilter/promo';
const HotelDealsDetail = z.object({
  quickFilterId: z.string(),
  quickFilterName: z.string(),
  quickFilterDescription: z.string().nullable(),
  isFlashSale: z.string(),
  endDate: z.string().optional(),
  endTime: z.number().optional(),
  order: z.number(),
  maxLabelLimit: z.number(),
  labels: z.array(
    z.object({
      labelCd: z.string(),
      labelName: z.string(),
      order: z.number().nullable(),
    })
  ),
});
const HotelDealsList = z.array(HotelDealsDetail);

const HotelDealsResponse = z.object({
  data: HotelDealsList,
});

type HotelDealsResponse = z.infer<typeof HotelDealsResponse>;
export type HotelDealsDetail = z.infer<typeof HotelDealsDetail>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();

  return $fetch(path, {
    baseURL: config.public.apixBaseUrl,
    params: getQuery(event),
    headers: {
      'X-Auth-UserId': config.accomAuthUserId,
      'X-Auth-Token': config.accomAuthToken,
    },
  })
    .then((data) => {
      const parsedRes = HotelDealsResponse.parse(data).data;
      const flashSales = parsedRes.filter((val) => Number(val.isFlashSale));
      return flashSales.length ? flashSales : parsedRes;
    })
    .catch((e) => {
      throw e;
    });
});
