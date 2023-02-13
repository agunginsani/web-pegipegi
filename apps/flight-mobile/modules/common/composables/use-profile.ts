export default function useProfile() {
  const userId = useState(() => '');
  const userEmail = useState(() => '');
  const deviceId = useState(() => '');
  const deviceBrowser = useState(() => '');
  const deviceModel = useState(() => '');

  async function initiate() {
    const { data } = await useFetch('/api/profile');
    if (data.value === null) return;
    userId.value = data.value.userId;
    userEmail.value = data.value.userEmail;
    deviceId.value = data.value.deviceId;
    deviceBrowser.value = data.value.deviceBrowser;
    deviceModel.value = data.value.deviceModel;
  }

  return {
    userId,
    userEmail,
    deviceId,
    deviceModel,
    deviceBrowser,
    initiate,
  };
}
