export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const phpsess = getCookie(event, 'phpsess');
  const headers = generateSsoHeaders(event);

  return $fetch('/v1/sessions/mark/active', {
    baseURL: config.accountBaseUrl,
    method: 'POST',
    headers: {
      ...headers,
      authorization: `Bearer ${phpsess}`,
    },
  }).catch((error) => {
    logger.error(error);
    throw error;
  });
});
