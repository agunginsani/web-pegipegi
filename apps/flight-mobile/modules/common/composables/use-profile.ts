import useFetchProfile from 'common-module/composables/use-fetch-profile';

export default defineStore('profile', () => {
  const userId = ref('');
  const userEmail = ref('');
  const deviceId = ref('');

  async function initiateProfile() {
    const phpsess = useCookie<string | null>('phpsess');

    if (!userId.value || !userEmail.value) {
      try {
        if (phpsess.value) {
          const { data } = await useFetchProfile(phpsess.value);
          if (data) {
            userId.value = data.value?.data.id || '';
            userEmail.value = data.value?.data.email || '';
          }
        }
      } catch (e) {
        /*  */
      }
    }
  }

  return {
    userId,
    userEmail,
    deviceId,
    initiateProfile,
  };
});
