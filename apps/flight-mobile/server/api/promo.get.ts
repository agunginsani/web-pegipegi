import { z } from 'zod';
import crypto from 'crypto';

const Promo = z.object({
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

type Promo = z.infer<typeof Promo>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  // Is `Promo` generic needed on `$fetch`?
  // If `Promo` generic is removed, running `nuxi typecheck` will
  // fail because it interprets this return value as `any`. 🤷
  return $fetch<Promo>('/v1/banner-list', {
    baseURL: config.public.bannerApiBaseUrl,
    async onRequest({ options, request }) {
      const token = getCookie(event, 'phpsess');
      const deviceId = getCookie(event, 'device-id');
      const params = new URLSearchParams();
      if (deviceId) params.append('device_id', deviceId);
      params.append('device_origin', 'mweb');
      params.append('tag', '1');
      if (token) {
        const Profile = z.object({
          data: z.object({
            email: z.string().email(),
            id: z.string(),
          }),
        });
        const response = await $fetch('/v1/users/profile', {
          headers: { authorization: `Bearer ${token}` },
          baseURL: config.public.accountBaseUrl,
        });
        const { id, email } = Profile.parse(response).data;
        params.append('email', email);
        params.append('member_id', id);
      }

      const timestamp = Date.now() / 1000;
      const hmac = crypto.createHmac('sha512', config.bannerApiKey);
      const url = `${request}?${params.toString()}`;
      const raw = `GET\nnull\n${timestamp}\n${url}`;
      let hashed = hmac.update(raw).digest('base64');
      hashed = Buffer.from(`web:${hashed}`).toString('utf8');
      hashed = Buffer.from(hashed).toString('base64');
      options.headers = {};
      options.headers['x-auth-key'] = hashed;
      options.headers['x-auth-time'] = `${timestamp}`;
      options.query = Object.fromEntries(params.entries());
    },
  })
    .then((data) => Promo.parse(data))
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
