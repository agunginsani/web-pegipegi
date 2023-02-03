<script lang="ts" setup>
  import Snackbar from 'common-module/components/Snackbar.vue';
  import useProfile from 'common-module/composables/use-profile';
  import useAuth from 'common-module/composables/use-auth';

  useAuth();

  const { initiateProfile } = useProfile();
  await initiateProfile();
</script>

<template>
  <NuxtLoadingIndicator color="#fe5000" />
  <NuxtPage />
  <div id="portal-1" class="relative z-30" />
  <div id="portal-2" class="relative z-40" />
  <div id="portal-3" class="relative z-50" />
  <div id="portal-4" class="z-60 relative">
    <Snackbar />
  </div>
</template>
