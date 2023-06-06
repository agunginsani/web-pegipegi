import { z } from 'zod';

const path = '/v1/slider';
const BannerList = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    description: z.string(),
    url: z.string(),
    shareable: z.boolean(),
  })
);
const BannerListResponse = z.object({
  data: BannerList,
});

type BannerListResponse = z.infer<typeof BannerListResponse>;
export type BannerList = z.infer<typeof BannerList>;

export type BannerRequestParams = {
  device_id?: string;
  member_id?: string;
  email?: string;
  tag?: string;
  device_origin?: string;
};

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const tokenResp = generateRawToken(
    event,
    path + getRequestURL(event).search,
    config.bannerKey,
    true
  );

  return $fetch(path, {
    baseURL: config.bannerBaseUrl,
    headers: {
      'X-Auth-Key': tokenResp.token,
      'X-Auth-Time': tokenResp.timeStamp.toString(),
    },
    params: getQuery(event),
  })
    .then((data) => BannerListResponse.parse(data).data)
    .catch((e) => {
      throw e;
    });
});
