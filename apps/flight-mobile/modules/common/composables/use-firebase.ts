import { getAnalytics, logEvent, Analytics } from 'firebase/analytics';
import {
  getRemoteConfig,
  getValue,
  fetchAndActivate,
  RemoteConfig,
} from 'firebase/remote-config';
import useProfile from 'common-module/composables/use-profile';

type AnalyticsType =
  | 'trigger_log'
  | 'open_screen'
  | 'click_button'
  | 'openscreen_detail'
  | 'hit_api_search'
  | 'filter'
  | 'sort';

export default () => {
  const analytics = useState<Analytics | undefined>();
  const remoteConfig = useState<RemoteConfig | undefined>();
  const remoteActivated = useState<boolean>(() => false);

  async function track(type: AnalyticsType, params: object) {
    const { userId, deviceId } = useProfile();

    try {
      if (!analytics.value) {
        analytics.value = getAnalytics();
      }

      logEvent(analytics.value, type, {
        customer_id: userId,
        device_id: deviceId,
        product_name: 'Flight',
        ...params,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function getConfig(key: string) {
    if (!remoteConfig.value) {
      remoteConfig.value = getRemoteConfig();
    }

    try {
      if (!remoteActivated.value) {
        remoteActivated.value = true;
        await fetchAndActivate(remoteConfig.value);
      }

      return JSON.parse(getValue(remoteConfig.value, key).asString());
    } catch (e) {
      console.error(e);
      return {};
    }
  }

  return {
    track,
    getConfig,
  };
};
