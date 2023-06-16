import { datadogRum } from '@datadog/browser-rum';

export default defineNuxtPlugin(() => {
  const {
    public: { appVersion, envMode },
  } = useRuntimeConfig();

  datadogRum.init({
    applicationId: 'ae60728d-465a-47da-94eb-6127be526e7d',
    clientToken: 'pub744fea693a6f5ad3031f29f16d5b6fc7',
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
