import { z } from 'zod';

const AuthSchema = z.object({
  data: z.string(),
});

const useStore = defineStore('auth', () => {
  const token = ref('');

  function login(payload: string) {
    token.value = payload;
  }

  return { token, login };
});

export default function useAuth() {
  const config = useRuntimeConfig();
  const { token, login } = useStore();

  onServerPrefetch(async () => {
    // Get token from Cloud Run Backend for Frontend.
    const { data: token, error } = await useFetch('/v1/token', {
      baseURL: config.public.authBaseUrl,
      params: { username: 'admin', password: 'password' },
      transform: (data) => AuthSchema.parse(data).data,
    });
    if (error.value) showError(error.value);
    // Store token in global state.
    if (token.value) login(token.value);
  });

  return { token };
}
