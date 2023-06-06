export type SnackbarInfo = {
  text: string;
  isShown: boolean;
  timeout?: NodeJS.Timeout;
  isServerPending?: boolean;
};

export default function useSnackbar(isServerPending?: boolean) {
  const snackbar = useState<SnackbarInfo>('snackbar', () => ({
    text: '',
    isShown: false,
  }));

  function sendInfo(str: string) {
    snackbar.value.isShown = true;
    snackbar.value.text = str;
    snackbar.value.isServerPending = isServerPending;

    if (!isServerPending) {
      snackbar.value.timeout = setTimeout(() => {
        snackbar.value.isShown = false;
      }, 3000);
    }
  }

  function dismiss() {
    snackbar.value.isShown = false;
    if (snackbar.value.timeout) {
      clearTimeout(snackbar.value.timeout);
    }
  }

  return {
    snackbar,
    sendInfo,
    dismiss,
  };
}
