import { datadogRum } from '@datadog/browser-rum';

export default defineNuxtPlugin(() => {
  const {
    public: { appVersion, envMode },
  } = useRuntimeConfig();

  datadogRum.init({
    applicationId: 'ff87abb7-5c64-4101-b54e-b4b86d7998fc',
    clientToken: 'pub69fb294088bbdb56d048cfce2be2d55b',
    site: 'ap1.datadoghq.com',
    service: 'web-flight-mobile',
    env: envMode,
    version: appVersion,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
  });

  datadogRum.startSessionReplayRecording();
});
