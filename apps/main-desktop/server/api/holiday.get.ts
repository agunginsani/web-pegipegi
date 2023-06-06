// TODO: just use google calendar API maybe?
import { google } from 'googleapis';
import { z } from 'zod';

const HolidayResponse = z.record(
  z.string(),
  z.record(z.string(), z.record(z.string(), z.string()))
);

const config = useRuntimeConfig();

async function getToken() {
  let jwtClient = new google.auth.JWT(
    config.firebaseClientEmail,
    undefined,
    config.firebasePrivateKey,
    ['https://www.googleapis.com/auth/cloud-platform']
  );

  return new Promise((resolve, reject) =>
    jwtClient.authorize((err, tokens) => {
      if (!err && tokens?.access_token) {
        resolve(tokens.access_token);
      } else {
        reject(err);
      }
    })
  );
}

export default defineEventHandler(async () => {
  const accessToken = await getToken();
  return $fetch(`/v1/projects/${config.firebaseProjectId}/remoteConfig`, {
    baseURL: 'https://firebaseremoteconfig.googleapis.com',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((data: any) =>
      JSON.parse(
        data.parameterGroups.General.parameters.holiday_calendar.defaultValue
          .value
      )
    )
    .then((data) => HolidayResponse.parse(data))
    .catch((error) => {
      logger.error(error);
      throw error;
    });
});
