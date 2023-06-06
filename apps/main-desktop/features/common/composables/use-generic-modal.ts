export type Warning = {
  title: string;
  figure: string;
  description: string;
  actionText: string;
  callback?: Function;
};

export default function useGenericModal() {
  const warnInfo = useState<Warning>('warning-modal', () => ({
    title: '',
    figure: '',
    description: '',
    actionText: '',
  }));
  const isShown = useState<boolean>('warning-shown', () => false);

  function warn(params: Warning) {
    isShown.value = true;
    warnInfo.value = params;
  }

  function dismiss() {
    isShown.value = false;
  }

  function accepted() {
    if (warnInfo.value.callback) {
      warnInfo.value.callback();
    } else dismiss();
  }

  return {
    warn,
    warnInfo,
    dismiss,
    accepted,
    isShown,
  };
}
