import uaParser from 'ua-parser-js';
import { z } from 'zod';

const OriginalProfileResponse = z.object({
  data: z.object({
    email: z.string().email(),
    id: z.string(),
  }),
});

const ProfileResponse = z.object({
  userId: z.string(),
  userEmail: z.string(),
  deviceId: z.string(),
  deviceBrowser: z.string(),
  deviceModel: z.string(),
});

export type ProfileResponse = z.infer<typeof ProfileResponse>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const phpsess = getCookie(event, 'phpsess');
  const ua = uaParser(getHeader(event, 'User-Agent'));
  const deviceId = getCookie(event, 'device-id') ?? '';
  const deviceBrowser = ua.browser.name ?? '';
  const deviceModel = ua.os.name ?? '';
  if (phpsess === undefined) {
    return ProfileResponse.parse({
      userId: '',
      userEmail: '',
      deviceId,
      deviceBrowser,
      deviceModel,
    });
  }

  return $fetch('/v1/users/profile', {
    baseURL: config.accountBaseUrl,
    headers: {
      'App-Version': `${config.public.appVersion}-flight-mweb`,
      'Device-Origin': 'mweb',
      'Device-Id': deviceId,
      'Device-Model': deviceModel,
      Browser: deviceBrowser,
      authorization: `Bearer ${phpsess}`,
    },
  })
    .then((data) => OriginalProfileResponse.parse(data))
    .then((data) =>
      ProfileResponse.parse({
        userId: data.data.id,
        userEmail: data.data.email,
        deviceId,
        deviceBrowser,
        deviceModel,
      })
    )
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
