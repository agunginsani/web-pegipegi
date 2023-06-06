import { z } from 'zod';

const path = '/mainhome/v2/informations';
const ImportantInfoList = z.array(
  z.object({
    image: z.string(),
    url: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number(),
  })
);
const ImportantInfoResponse = z.object({
  data: ImportantInfoList,
});

export type ImportantInfoResponse = z.infer<typeof ImportantInfoResponse>;
export type ImportantInfoList = z.infer<typeof ImportantInfoList>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const tokenResp = generateRawToken(
    event,
    path + getRequestURL(event).search,
    config.mainhomeSecretKey
  );

  return $fetch(path, {
    baseURL: config.mainhomeBaseUrl,
    headers: {
      'X-Auth-Token': tokenResp.token,
      'X-Auth-Time': tokenResp.timeStamp.toString(),
    },
    params: getQuery(event),
  })
    .then((data) => ImportantInfoResponse.parse(data).data)
    .catch((e) => {
      throw e;
    });
});
