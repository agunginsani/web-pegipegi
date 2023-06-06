const path = '/v1/public/newsletter/subscribe';
export type BannerRequestBody = {
  email: string;
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  return $fetch(path, {
    baseURL: config.newsletterBaseUrl,
    body,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res)
    .catch((e) => {
      throw e;
    });
});
