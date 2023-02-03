import { z } from 'zod';
import logger from '../utils/logger';

const MaintenanceStatus = z.object({
  name: z.string(),
  fields: z.object({
    status: z.object({
      integerValue: z.string(),
    }),
    message: z.object({
      stringValue: z.string(),
    }),
    id: z.object({
      integerValue: z.string(),
    }),
    name: z.object({
      stringValue: z.string(),
    }),
  }),
});

export default eventHandler(() => {
  const config = useRuntimeConfig();
  return $fetch(
    `/v1/projects/${config.fireProjectId}/databases/(default)/documents/status/mweb/products/flight`,
    {
      baseURL: 'https://firestore.googleapis.com/',
    }
  )
    .then(
      (data) => MaintenanceStatus.parse(data).fields.status.integerValue === '0'
    )
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
