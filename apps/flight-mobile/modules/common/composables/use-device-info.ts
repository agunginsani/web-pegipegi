import { v4 as generateUid } from 'uuid';

export default defineStore('device-info', () => {
  const deviceId = ref('');
  const deviceBrowser = ref('');
  const deviceModel = ref('');

  function initiateClientInfo() {
    const deviceIdCookie = useCookie<string | null>('device-id');
    if (!deviceId.value && !!deviceIdCookie.value) {
      deviceId.value = deviceIdCookie.value;
    } else if (!deviceId.value && !deviceIdCookie.value) {
      const uid = generateUid();
      deviceId.value = uid;
      deviceIdCookie.value = uid;
    }
  }

  return {
    deviceId,
    deviceModel,
    deviceBrowser,
    initiateClientInfo,
  };
});
