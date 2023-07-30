import * as Sentry from '@sentry/vue';

export default defineNuxtPlugin((context) => {
  const { vueApp } = context;
  const router = useRouter();
  const {
    public: { envMode, appVersion },
  } = useRuntimeConfig();

  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      Vue: vueApp,
      dsn: 'https://41c79ae8fc994827a8ffc3ce8b2f5ff3@sentry.pegipegi.com/8',
      integrations: [
        new Sentry.BrowserTracing({
          routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        }),
        new Sentry.Replay(),
      ],
      environment: envMode,
      release: appVersion,
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 0.5,
      replaysOnErrorSampleRate: 1.0,
    });
  }
});
