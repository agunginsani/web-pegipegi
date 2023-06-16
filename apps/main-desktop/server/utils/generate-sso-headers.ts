import type { H3Event } from 'h3';
import uaParser from 'ua-parser-js';

type SSOHeaders = {
  'App-Version': string;
  'Device-Origin': string;
  'Device-Id': string;
  'Device-Model': string;
  Browser: string;
};

export default function (event: H3Event): SSOHeaders {
  const config = useRuntimeConfig();
  const ua = uaParser(getHeader(event, 'User-Agent'));
  const deviceId = getCookie(event, 'device-id') ?? '';
  const deviceBrowser = ua.browser.name ?? '';
  const deviceModel = ua.os.name ?? '';

  return {
    'App-Version': `${config.public.appVersion}-main-web`,
    Browser: deviceBrowser,
    'Device-Id': deviceId,
    'Device-Model': deviceModel,
    'Device-Origin': 'web',
  };
}
