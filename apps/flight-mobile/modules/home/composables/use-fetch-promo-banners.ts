import { z } from 'zod';

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

export default async function usePromoBanners() {
  const { $logger } = useNuxtApp();
  return useFetch('/api/promo', {
    onResponseError(ctx) {
      $logger.error(ctx);
    },
    transform(data) {
      return PromoBanners.parse(data);
    },
  });
}
