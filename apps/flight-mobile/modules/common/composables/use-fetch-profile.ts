import { z } from 'zod';
import useProfile from 'common-module/composables/use-profile';

const Profile = z.object({
  data: z.object({
    email: z.string().email(),
    id: z.string(),
  }),
});

type Profile = z.infer<typeof Profile>;

type ProfileParam = {
  ssoToken: string;
  deviceId: string;
  deviceModel: string;
  deviceBrowser: string;
};

export default function useFetchProfile(param: ProfileParam) {
  const config = useRuntimeConfig();
  // const { deviceId, deviceModel, deviceBrowser } = useProfile()

  return useFetch('/v1/users/profile', {
    headers: {
      authorization: `Bearer ${param.ssoToken}`,
      'App-Version': `${config.public.appVersion}-flight-mweb`,
      'Device-Origin': 'mweb',
      'Device-Id': param.deviceId,
      'Device-Model': param.deviceModel,
      Browser: param.deviceBrowser,
    },
    baseURL: config.public.accountBaseUrl,
    transform(data) {
      return Profile.parse(data);
    },
  });
}
