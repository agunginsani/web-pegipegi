import { z } from 'zod';

const SeatClass = z.object({
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

export type SeatClass = z.infer<typeof SeatClass>;

export default defineEventHandler(() => {
  const config = useRuntimeConfig();
  return $fetch('/flight/v2/seat-class', {
    baseURL: `${config.flightBaseUrl}${config.flightPath}`,
  })
    .then((data) => SeatClass.parse(data).data)
    .then((data) =>
      data.map((item) => ({
        value: item.code,
        label: item.displayName,
        description: item.description,
      }))
    )
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
