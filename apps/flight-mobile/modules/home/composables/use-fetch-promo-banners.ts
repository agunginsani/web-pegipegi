import { z } from 'zod';
import crypto from 'crypto';
import cookie from 'cookie';

const PromoBanners = z.object({
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

type PromoBanners = z.infer<typeof PromoBanners>;

const usePromoBanners = defineStore('promo-banners', () => {
  const config = useRuntimeConfig();
  const { $logger } = useNuxtApp();
  const banners = ref<PromoBanners['data'] | null>(null);

  async function fetch(): Promise<void> {
    if (banners.value !== null) return;

    const { data } = await useFetch('/v1/banner-list', {
      baseURL: config.public.bannerApiBaseUrl,
      onResponseError(ctx) {
        $logger.error(ctx);
      },
      async onRequest({ options, request }) {
        const headers = useRequestHeaders(['cookie']);
        const cookies = cookie.parse(headers.cookie ?? '');
        const token = cookies['phpsess'] as string | undefined;

        const params = new URLSearchParams();
        params.append('device_id', cookies['device-id']);
        params.append('device_origin', 'mweb');
        params.append('tag', '1');
        if (token) {
          const Profile = z.object({
            data: z.object({ email: z.string().email(), id: z.string() }),
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
      transform(data) {
        return PromoBanners.parse(data);
      },
    });

    banners.value = data.value?.data ?? null;
  }

  return { banners, fetch };
});

export default usePromoBanners;
