import { z } from "zod";

const SeatClasses = z.object({
  message: z.string(),
  status: z.number(),
  title: z.string(),
  data: z.array(
    z.object({
      code: z.string(),
      displayName: z.string(),
      description: z.string(),
    })
  ),
});

type SeatClasses = z.infer<typeof SeatClasses>;

export default function useSeatClasses() {
  const config = useRuntimeConfig();
  return useFetch("/flight-search/flight/v2/seat-class", {
    baseURL: config.public.apixBaseUrl,
    transform(data) {
      return SeatClasses.parse(data).data;
    },
  });
}
