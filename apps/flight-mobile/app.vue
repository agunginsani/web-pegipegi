<script lang="ts" setup>
  import { z } from 'zod';
  import useAuthStore from 'common-module/composables/use-auth-store';
  import Snackbar from 'common-module/components/Snackbar.vue';
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

  const { initiateProfile } = useProfile();
  await initiateProfile();
</script>

<template>
  <NuxtPage />
  <div id="portal-1" class="relative z-30" />
  <div id="portal-2" class="relative z-40" />
  <div id="portal-3" class="relative z-50" />
  <div id="portal-4" class="z-60 relative">
    <Snackbar />
  </div>
</template>
