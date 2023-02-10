import { z } from 'zod';
import crypto from 'crypto';

const PromosResponse = z.object({
  datetime: z.string(),
  id: z.string(),
  data: z.array(
    z.object({
      description: z.string(),
      id: z.number(),
      image: z.string(),
      name: z.string(),
      shareable: z.boolean(),
      url: z.string(),
    })
  ),
  program: z.string(),
  version: z.string(),
});

const PromosQuery = z.object({
  userId: z.string(),
  userEmail: z.string(),
  deviceId: z.string(),
  deviceBrowser: z.string(),
  deviceModel: z.string(),
});

export type PromosResponse = z.infer<typeof PromosResponse>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const query = PromosQuery.parse(getQuery(event));
  return $fetch('/v1/banner-list', {
    baseURL: config.bannerBaseUrl,
    async onRequest({ options, request }) {
      const params = new URLSearchParams();
      params.append('device_id', query.deviceId);
      params.append('device_origin', 'mweb');
      params.append('email', query.userEmail);
      params.append('member_id', query.userId);
      params.append('tag', '1');

      const timestamp = Date.now() / 1000;
      const hmac = crypto.createHmac('sha512', config.bannerKey);
      const url = `${request}?${params.toString()}`;
      const raw = `GET\nnull\n${timestamp}\n${decodeURIComponent(url)}`;
      let hashed = hmac.update(raw).digest('base64');
      hashed = Buffer.from(`web:${hashed}`).toString('utf8');
      hashed = Buffer.from(hashed).toString('base64');
      options.headers = {};
      options.headers['X-Auth-Key'] = hashed;
      options.headers['X-Auth-Time'] = `${timestamp}`;
      options.query = Object.fromEntries(params.entries());
    },
  })
    .then((data) => PromosResponse.parse(data))
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
