import useProfile from 'common-module/composables/use-profile';

export default defineNuxtPlugin(async () => {
  const { initiateProfile } = useProfile();
  await initiateProfile();
});
