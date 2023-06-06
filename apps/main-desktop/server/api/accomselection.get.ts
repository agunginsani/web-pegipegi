import { z } from 'zod';

const path = 'htlmantis-api/HotelMantis/api/v3/quickfilter';
const AccomSelectionItem = z.object({
  id: z.string(),
  title: z.string(),
  image: z.string(),
  'check-in': z.string(),
  night: z.number(),
  guest: z.number(),
  room: z.number(),
  type: z.string(),
  url: z.string(),
  cityName: z.string(),
  search_query: z.string().optional(), // added param
});
const AccomSelectionList = z.array(AccomSelectionItem);
const AccomSelectionResponse = z.object({ filters: AccomSelectionList });

export type AccomSelectionItem = z.infer<typeof AccomSelectionItem>;
export type AccomSelectionResponse = z.infer<typeof AccomSelectionResponse>;
export type AccomSelectionList = z.infer<typeof AccomSelectionList>;
export type ParsedQuery = {
  kenCd?: string;
  lrgCd?: string;
  smlCd?: string;
  attrCd?: string;
};

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();

  return $fetch(path, {
    baseURL: config.public.apixBaseUrl,
    params: getQuery(event),
    headers: {
      'X-Api-Key': config.accomselectionSecretKey,
    },
  })
    .then((data) => {
      return AccomSelectionResponse.parse(data).filters.map((val) => {
        const parsedQuery: ParsedQuery = Object.fromEntries(
          new URLSearchParams(val.url)
        ) as ParsedQuery;

        const searchParams = new URLSearchParams();
        searchParams.append(
          'stayDay',
          val['check-in'].split('/').reverse().join('-')
        );
        searchParams.append('quickFilter', val.id.toString());
        searchParams.append('night', val.night.toString());
        searchParams.append('room', val.room.toString());
        searchParams.append('adultNumMax', val.guest.toString());
        if (parsedQuery.lrgCd) searchParams.append('cityCd', parsedQuery.lrgCd);
        if (parsedQuery.smlCd) searchParams.append('areaCd', parsedQuery.smlCd);
        if (parsedQuery.attrCd)
          searchParams.append('attractioncd', parsedQuery.attrCd);
        if (parsedQuery.kenCd) searchParams.append('kenCd', parsedQuery.kenCd);

        return { ...val, search_query: searchParams.toString() };
      });
    })
    .catch((e) => {
      throw e;
    });
});
