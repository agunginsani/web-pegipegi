import { z } from 'zod';
import { mapData } from 'search-module/composables/use-hotel-search-form';
import type { LocationSearchItem } from 'search-module/types/search-types';

const AutocompleteItem = z.object({
  area: z.string(),
  attraction: z.string(),
  city: z.string(),
  count: z.string(),
  hotel_id: z.string(),
  hotel_name: z.string(),
  image: z.string(),
  matchingScore: z.string(),
  objectType: z.string(),
  objectTypeDescription: z.string(),
  subtitle: z.string(),
  title: z.string(),
  url: z.string(),
});

const AutocompleteResult = z.object({
  autocomplete: z.array(AutocompleteItem),
  traceId: z.string(),
});

const AutocompleteData = z.object({
  kind: z.string(),
  currentItemCount: z.string(),
  itemsPerPage: z.string(),
  totalPages: z.string(),
  items: AutocompleteResult,
});

const AutocompleteResponse = z.object({
  data: AutocompleteData,
  datetime: z.string(),
  id: z.string(),
  program: z.string(),
  timestamp: z.string(),
  version: z.string(),
});

export type AutocompleteResult = z.infer<typeof AutocompleteResult>;
export type AutocompleteItem = z.infer<typeof AutocompleteItem>;

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  return $fetch('/HotelSearchAPI/v6/autocomplete', {
    params: getQuery(event),
    baseURL: config.accomSearchApixWeb,
    headers: {
      'X-Auth-UserId': config.accomAuthUserId,
      'X-Auth-Token': config.accomAuthToken,
    },
  })
    .then((data) => {
      const { autocomplete, traceId } =
        AutocompleteResponse.parse(data).data.items;

      const dataList: Array<LocationSearchItem> = mapData(autocomplete);
      return { dataList, traceId };
    })
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
