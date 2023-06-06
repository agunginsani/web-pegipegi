import { z } from 'zod';

const path = '/get-content-home';
const TravelBlogList = z.array(
  z.object({
    url_detail: z.string(),
    image: z.string(),
    title: z.string(),
    categoryName: z.string(),
    category: z.number(),
  })
);
const TravelBlogResponse = z.object({
  data: TravelBlogList,
});

export type TravelBlogResponse = z.infer<typeof TravelBlogResponse>;
export type TravelBlogList = z.infer<typeof TravelBlogList>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();

  return $fetch(path, {
    baseURL: config.travelblogBaseUrl,
    params: getQuery(event),
  })
    .then((data) => TravelBlogResponse.parse(data).data)
    .catch((e) => {
      throw e;
    });
});
