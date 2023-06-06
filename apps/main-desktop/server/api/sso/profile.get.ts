import { z } from 'zod';
import generateSsoHeaders from '~/server/utils/generate-sso-headers';

const OriginalProfileResponse = z.object({
  data: z.object({
    email: z.string().email(),
    id: z.string(),
  }),
});

const ProfileResponse = z.object({
  userId: z.string(),
  userEmail: z.string(),
});

export type ProfileResponse = z.infer<typeof ProfileResponse>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const phpsess = getCookie(event, 'phpsess');
  const headers = generateSsoHeaders(event);

  if (phpsess === undefined) {
    return ProfileResponse.parse({
      userId: '',
      userEmail: '',
    });
  }

  return $fetch('/v1/users/profile', {
    baseURL: config.accountBaseUrl,
    headers: {
      ...headers,
      authorization: `Bearer ${phpsess}`,
    },
  })
    .then((data) => OriginalProfileResponse.parse(data))
    .then((data) =>
      ProfileResponse.parse({
        userId: data.data.id,
        userEmail: data.data.email,
      })
    )
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
