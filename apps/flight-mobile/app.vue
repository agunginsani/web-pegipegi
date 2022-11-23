<script lang="ts" setup>
  import z from "zod";

  const AuthSchema = z.object({
    data: z.string(),
  });

  onServerPrefetch(async () => {
    const config = useRuntimeConfig();
    const { login } = useAuthStore();
    await $fetch("/token", {
      baseURL: config.public.cloudRunBaseUrl,
      params: { username: "admin", password: "password" },
    })
      .then((data) => AuthSchema.parse(data).data)
      .then((token) => login(token))
      .catch((error) => showError(error));
  });
</script>

<template>
  <NuxtPage />
</template>
