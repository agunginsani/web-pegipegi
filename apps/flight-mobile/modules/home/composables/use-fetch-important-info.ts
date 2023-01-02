import { z } from 'zod';
import useAuthStore from '~~/modules/common/composables/use-auth-store';

const Info = z.object({
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

type Info = z.infer<typeof Info>;

export default function useFetchImportantInfo() {
  const { token } = useAuthStore();
  const config = useRuntimeConfig();
  return useFetch('/v1/flight-search/v2/banners', {
    baseURL: config.public.authBaseUrl,
    headers: { authorization: `Bearer ${token}` },
    transform(data) {
      return Info.parse(data);
    },
  });
}
