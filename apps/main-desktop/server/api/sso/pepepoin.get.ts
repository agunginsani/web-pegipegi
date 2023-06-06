import { z } from 'zod';
import generateSsoHeaders from '~/server/utils/generate-sso-headers';

const PepepoinResponse = z.object({
  data: z.object({
    point: z.number(),
    pointIdrValue: z.number(),
  }),
});

export type PepepoinResponse = z.infer<typeof PepepoinResponse>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const phpsess = getCookie(event, 'phpsess');
  const headers = generateSsoHeaders(event);

  return $fetch('v1/users/profile/point', {
    baseURL: config.accountBaseUrl,
    headers: {
      ...headers,
      authorization: `Bearer ${phpsess}`,
    },
  })
    .then((data) => PepepoinResponse.parse(data))
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
