import { z } from 'zod';
import logger from '../utils/logger';

const Adhoc = z.object({
  id: z.string(),
  message: z.string(),
  type: z.union([z.literal('WARNING'), z.literal('INFO'), z.literal('DANGER')]),
  tripType: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  departureAirport: z.string(),
  arrivalAirport: z.string(),
  viewType: z.string(),
});

export default defineEventHandler(() => {
  const config = useRuntimeConfig();
  return $fetch('/flight/v1/event-message/view-type/homepage', {
    baseURL: config.public.supplyBaseUrl,
  })
    .then((data) => Adhoc.parse(data))
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
