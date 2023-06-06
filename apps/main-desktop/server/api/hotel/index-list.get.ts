import { z } from 'zod';

const HotelIndex = z.object({
  yadNo: z.string().nullable(),
  yadNameUrl: z.string().nullable(),
  yadName: z.string().nullable(),
  lrgArea: z.string().nullable(),
  index: z.string(),
  indexUrl: z.string(),
});

const IndexList = z.object({
  traceId: z.string(),
  time: z.string(),
  data: z.array(HotelIndex),
});

export type HotelIndex = z.infer<typeof HotelIndex>;

export default defineEventHandler(() => {
  const config = useRuntimeConfig();
  return $fetch('/seo/v1/index/hotel/list', {
    baseURL: config.seoBaseUrl,
    headers: {
      'X-Auth-UserId': config.accomAuthUserId,
      'X-Auth-Token': config.accomAuthToken,
    },
  })
    .then((data) => IndexList.parse(data).data)
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
