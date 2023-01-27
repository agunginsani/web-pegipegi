<script lang="ts" setup>
  import { z } from 'zod';
  import useAuthStore from 'common-module/composables/use-auth-store';
  import Snackbar from 'common-module/components/Snackbar.vue';
  import useProfile from 'common-module/composables/use-profile';
  import useSnackbar from 'common-module/composables/use-snackbar';

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

  const online = useOnline();
  const { addSnackbar } = useSnackbar();
  watch(
    () => online.value,
    (value) => {
      if (!value) {
        addSnackbar({
          color: 'negative',
          text: 'Hmm.. Yakin internetmu masih nyambung?',
          timeout: 0,
        });
      }
    }
  );
</script>

<template>
  <NuxtLoadingIndicator color="#fe5000" />
  <NuxtPage />
  <Snackbar />
  <div id="modals" class="relative z-50" />
</template>
