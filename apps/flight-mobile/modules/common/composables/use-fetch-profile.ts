import { z } from 'zod';

const Profile = z.object({
  data: z.object({
    email: z.string().email(),
    id: z.string(),
  }),
});

type Profile = z.infer<typeof Profile>;

export default function useFetchProfile(ssoToken: string) {
  const config = useRuntimeConfig();

  return useFetch('/v1/users/profile', {
    headers: {
      authorization: `Bearer ${ssoToken}`,
      // TODO: fill device related params
      'Device-Id': 'dummy-devide-id',
      'Device-Origin': 'mweb',
      'App-Version': `1.9.2-flight-mweb`,
      'Device-Model': 'Android',
      Browser: 'Chrome',
    },
    baseURL: config.public.accountBaseUrl,
    transform(data) {
      return Profile.parse(data);
    },
  });
}
