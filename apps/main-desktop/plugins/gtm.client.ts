import { createGtm } from '@gtm-support/vue-gtm';

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  nuxtApp.vueApp.use(
    createGtm({
      id: config.public.gtmId,
      defer: true,
      compatibility: false,
      enabled: true,
      debug: false,
      loadScript: true,
      vueRouter: useRouter(),
      trackOnNextTick: false,
    })
  );
});
