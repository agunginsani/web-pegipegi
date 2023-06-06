import useSSO from 'common-module/composables/use-sso';
import useSnackbar from 'common-module/composables/use-snackbar';

export default defineNuxtPlugin(async () => {
  const { custInfo, isLoggedIn, fetchProfile, errorProfile, clearLogin } =
    useSSO();

  if (isLoggedIn.value && !custInfo.value) {
    await fetchProfile();

    if (!!errorProfile.value) {
      const { sendInfo } = useSnackbar(true);
      clearLogin();
      sendInfo('Sesi Anda telah habis, silakan login kembali');
    }
  }
});
