export const useAuthStore = defineStore("auth", () => {
  const token = ref("");

  function login(newToken: string) {
    token.value = newToken;
  }

  return { token, login };
});

export function useAuthFetch() {
  const config = useRuntimeConfig();
  const { token } = useAuthStore();
  return $fetch.create({
    baseURL: config.public.cloudRunBaseUrl,
    headers: { authorization: `Bearer ${token}` },
  });
}
