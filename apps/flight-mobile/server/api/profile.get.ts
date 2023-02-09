import { z } from 'zod';
import logger from '../utils/logger';

const ProfileResponse = z.object({
  data: z.object({
    email: z.string().email(),
    id: z.string(),
  }),
});

const ProfileQuery = z.object({
  // TODO: comfirm which one is required
  ssoToken: z.string(),
  deviceId: z.string(),
  deviceModel: z.string(),
  deviceBrowser: z.string(),
});

export type ProfileResponse = z.infer<typeof ProfileResponse>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const query = ProfileQuery.parse(getQuery(event));

  return $fetch('/v1/users/profile', {
    baseURL: config.accountBaseUrl,
    headers: {
      // TODO: get token & device id from cookie
      'App-Version': `${config.appVersion}-flight-mweb`,
      'Device-Origin': 'mweb',
      'Device-Id': String(query.deviceId),
      'Device-Model': query.deviceModel,
      Browser: query.deviceBrowser,
      authorization: `Bearer ${query.ssoToken}`,
    },
    onRequest(bla) {
      console.log(bla);
    },
  })
    .then((data) => {
      return ProfileResponse.parse(data);
    })
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
