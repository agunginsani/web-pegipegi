export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { token } = useAuthStore();
  return {
    provide: {
      cloudRunFetch: $fetch.create({
        baseURL: config.public.cloudRunBaseUrl,
        headers: { authorization: `Bearer ${token}` },
      }),
    },
  };
});
