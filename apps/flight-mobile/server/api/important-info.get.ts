import { z } from 'zod';

const ImportantInfo = z.object({
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

type ImportantInfo = z.infer<typeof ImportantInfo>;

export default defineEventHandler(() => {
  const config = useRuntimeConfig();
  return $fetch('/flight/v2/banners', {
    baseURL: config.public.apixSearchBaseUrl,
  })
    .then((data) => ImportantInfo.parse(data))
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
