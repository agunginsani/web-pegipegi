import parseUserAgent from 'ua-parser-js';
import { v4 as generateUid } from 'uuid';

export default function useProfile() {
  const userId = useState(() => '');
  const userEmail = useState(() => '');
  const deviceId = useState(() => '');
  const deviceBrowser = useState(() => '');
  const deviceModel = useState(() => '');

  async function initiateProfile() {
    // set user agent
    const { userAgent } = useDevice();
    const parsedUserAgent = parseUserAgent(userAgent);
    deviceModel.value = String(parsedUserAgent.os.name);
    deviceBrowser.value = String(parsedUserAgent.browser.name);

    // set device id
    const deviceIdCookie = useCookie<string | null>('device-id');
    if (!deviceId.value && !!deviceIdCookie.value) {
      deviceId.value = deviceIdCookie.value;
    } else if (!deviceId.value && !deviceIdCookie.value) {
      const uid = generateUid();
      deviceId.value = uid;
      deviceIdCookie.value = uid;
    }

    // fetch and set user info
    const phpsessCookie = useCookie<string | null>('phpsess');
    if (!userId.value || !userEmail.value) {
      try {
        if (phpsessCookie.value) {
          const { data } = await useFetch('/api/profile', {
            query: {
              ssoToken: phpsessCookie.value,
              deviceId: deviceId.value,
              deviceModel: deviceModel.value,
              deviceBrowser: deviceBrowser.value,
            },
          });
          if (data) {
            userId.value = data.value?.data.id || '';
            userEmail.value = data.value?.data.email || '';
          }
        }
      } catch (e) {
        /*  */
      }
    }
  }

  initiateProfile();

  return {
    userId,
    userEmail,
    deviceId,
    deviceModel,
    deviceBrowser,
  };
}
