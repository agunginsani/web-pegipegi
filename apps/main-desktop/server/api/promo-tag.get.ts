import { z } from 'zod';

const path = '/v1/tag';
const TagList = z.array(
  z.object({
    id: z.number().optional(),
    name: z.string(),
  })
);
const BannerTagResponse = z.object({
  data: TagList,
});

type BannerTagResponse = z.infer<typeof BannerTagResponse>;
export type TagList = z.infer<typeof TagList>;

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
    .then((data) => BannerTagResponse.parse(data).data)
    .catch((e) => {
      throw e;
    });
});
