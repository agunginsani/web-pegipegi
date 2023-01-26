import { z } from 'zod';

const SeatClasses = z.object({
  message: z.string(),
  status: z.number(),
  title: z.string(),
  data: z.array(
    z.object({
      code: z.string(),
      displayName: z.string(),
      description: z.string(),
    })
  ),
});

type SeatClasses = z.infer<typeof SeatClasses>;

export default function useSeatClasses() {
  const config = useRuntimeConfig();
  const { $logger } = useNuxtApp();
  return useFetch('/flight/v2/seat-class', {
    baseURL: config.public.apixSearchUrl,
    onResponseError(ctx) {
      $logger.error(ctx);
    },
    transform(data) {
      return SeatClasses.parse(data).data;
    },
  });
}
