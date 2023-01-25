import { getAnalytics, logEvent } from 'firebase/analytics';
import { useFirebaseApp } from 'vuefire';
import useProfile from 'common-module/composables/use-profile';

type AnalyticsType =
  | 'trigger_log'
  | 'open_screen'
  | 'click_button'
  | 'openscreen_detail'
  | 'hit_api_search'
  | 'filter'
  | 'sort';

export default function () {
  const firebase = useFirebaseApp();

  async function track(type: AnalyticsType, params: object) {
    const { userId, deviceId } = useProfile();

    const analytics = getAnalytics(firebase);
    logEvent(analytics, type, {
      customer_id: userId,
      device_id: deviceId,
      product_name: 'Flight',
      ...params,
    });
  }

  return {
    firebase,
    track,
  };
}
