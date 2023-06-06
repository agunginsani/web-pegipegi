import { v4 as uuidV4 } from 'uuid';
import type { PepepoinResponse } from 'api/sso/pepepoin.get';
import type { ProfileResponse } from 'api/sso/profile.get';

type CachedCustomerInfo = {
  name: string;
  firstName: string;
  displayPicture: string;
  customerId: string;
};

export default function useSSO() {
  //#region cache setup
  const deviceId = useCookie<string>('device-id', {
    domain: '.pegipegi.com',
    expires: new Date('2037-12-31'),
  });
  if (!deviceId.value) deviceId.value = uuidV4();
  //#endregion

  //#region cache query
  const token = useCookie<string>('phpsess', {
    domain: '.pegipegi.com',
  });
  const name = useCookie<string>('sso', {
    domain: '.pegipegi.com',
  });
  const displayPicture = useCookie<string>('sso.displayPicture', {
    domain: '.pegipegi.com',
  });
  const customerId = useCookie<string>('sso.customerId', {
    domain: '.pegipegi.com',
  });
  function clearLogin() {
    token.value = '';
    name.value = '';
    displayPicture.value = '';
    customerId.value = '';
  }
  const cachedCustInfo = computed<CachedCustomerInfo | undefined>(() => {
    if (!token.value) return undefined;
    const fullName = name.value.replace(/\++/g, ' ');
    return {
      name: fullName,
      firstName: fullName.split(' ')[0],
      displayPicture: displayPicture.value,
      customerId: customerId.value,
    };
  });
  const isLoggedIn = computed(() => !!token.value);
  //#endregion

  //#region data fetch
  const custInfo = useState<ProfileResponse>();
  const { execute: fetchProfile, error: errorProfile } = useFetch(
    '/api/sso/profile',
    {
      immediate: false,
      onResponse({ response }) {
        custInfo.value = response._data;
      },
    }
  );

  const isSessionMarked = useState<boolean>(() => false);
  if (token.value && !isSessionMarked.value) {
    useLazyFetch('/api/sso/mark-session', {
      method: 'POST',
      server: false,
      onResponse() {
        isSessionMarked.value = true;
      },
    });
  }

  const userPepepoin = useState<PepepoinResponse>();
  if (!userPepepoin.value && token.value) {
    const { data: pepepoinData } = useLazyFetch('/api/sso/pepepoin', {
      server: false,
    });
    if (pepepoinData.value) userPepepoin.value = pepepoinData.value;
  }
  //#endregion

  return {
    clearLogin,
    errorProfile,
    fetchProfile,
    cachedCustInfo,
    custInfo,
    deviceId,
    token,
    isLoggedIn,
    userPepepoin,
  };
}
