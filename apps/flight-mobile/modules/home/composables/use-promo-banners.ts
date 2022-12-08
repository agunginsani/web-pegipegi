import { z } from "zod";
import crypto from "crypto";

const PromoBanners = z.object({
  datetime: z.string(),
  id: z.string(),
  data: z.array(
    z.object({
      description: z.string(),
      id: z.number(),
      image: z.string(),
      name: z.string(),
      shareable: z.boolean(),
      url: z.string(),
    })
  ),
  program: z.string(),
  version: z.string(),
});

export default function usePromoBanners() {
  const config = useRuntimeConfig();
  const { $logger } = useNuxtApp();
  return useFetch("/v1/banner-list", {
    baseURL: config.public.bannerApiBaseUrl,
    onResponseError(ctx) {
      $logger.error(ctx);
    },
    onRequest({ options }) {
      const timestamp = Date.now() / 1000;
      const hmac = crypto.createHmac("sha512", config.bannerApiKey);
      const url = "/v1/banner-list";
      const raw = `GET\nnull\n${timestamp}\n${url}`;
      let hashed = hmac.update(raw).digest("base64");
      hashed = Buffer.from(`web:${hashed}`).toString("utf8");
      hashed = Buffer.from(hashed).toString("base64");
      options.headers = {};
      options.headers["x-auth-key"] = hashed;
      options.headers["x-auth-time"] = `${timestamp}`;
    },
    transform(data) {
      return PromoBanners.parse(data);
    },
  });
}
