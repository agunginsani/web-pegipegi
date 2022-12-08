const useAuthStore = defineStore("auth", () => {
  const token = ref("");

  function login(payload: string) {
    token.value = payload;
  }

  return { token, login };
});

export default useAuthStore;
