import { z } from 'zod';
import useAuthStore from '~~/modules/common/composables/use-auth-store';

const Infos = z.object({
  message: z.string(),
  status: z.number(),
  title: z.string(),
  data: z.array(
    z.object({
      description: z.string(),
      imageUrl: z.string(),
      imageUrlIcon: z.string(),
      imageUrlSquare: z.string(),
      landingPageUrl: z.string(),
      typeImage: z.string(),
    })
  ),
});

type Infos = z.infer<typeof Infos>;

export default function useFetchInfos() {
  const { token } = useAuthStore();
  const config = useRuntimeConfig();
  return useFetch('/v1/flight-search/v2/banners', {
    baseURL: config.public.authBaseUrl,
    headers: { authorization: `Bearer ${token}` },
    transform(data) {
      return Infos.parse(data);
    },
  });
}
