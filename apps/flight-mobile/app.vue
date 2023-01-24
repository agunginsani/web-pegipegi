<script lang="ts" setup>
  import { z } from 'zod';
  import useAuthStore from 'common-module/composables/use-auth-store';
  import useProfile from 'common-module/composables/use-profile';

  const AuthSchema = z.object({
    data: z.string(),
  });

  /**
   * Get token from Cloud Run Backend for Frontend.
   */
  function useServerPrefetch() {
    const config = useRuntimeConfig();
    const { login } = useAuthStore();
    onServerPrefetch(async () => {
      const { data: token, error } = await useFetch('/v1/token', {
        baseURL: config.public.authBaseUrl,
        params: { username: 'admin', password: 'password' },
        transform: (data) => AuthSchema.parse(data).data,
      });
      if (error.value) showError(error.value);
      if (token.value) login(token.value);
    });
  }

  useServerPrefetch();

  const { fetchProfile } = useProfile();
  await fetchProfile();
</script>

<template>
  <NuxtPage />
</template>
