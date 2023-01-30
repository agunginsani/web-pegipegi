type SnackbarItem = {
  id: number;
  color: 'accent' | 'warning' | 'positive' | 'negative';
  icon?: string;
  text: string;
  timer?: ReturnType<typeof setTimeout>;
  dismissible: boolean;
};

type SnackbarParam = {
  color?: SnackbarItem['color'];
  icon?: string;
  text?: string;
  timeout?: number;
  dismissible?: boolean;
};

const useAuthStore = defineStore('snackbar', () => {
  const snackbars = reactive<Array<SnackbarItem>>([]);

  function addSnackbar(payload: SnackbarParam) {
    const id = Math.random();
    const newSnackbar: SnackbarItem = {
      id,
      color: payload.color ?? 'accent',
      icon: payload.icon,
      text: payload.text ?? '',
      dismissible: !!payload.dismissible,
      timer:
        payload.timeout === 0
          ? undefined
          : setTimeout(() => {
              removeSnackbar({ id });
            }, payload.timeout ?? 3000),
    };
    snackbars.push(newSnackbar);
  }

  function removeSnackbar(payload: { id?: number; index?: number }) {
    const index = payload.id
      ? snackbars.findIndex((item) => item.id === payload.id)
      : payload.index;
    if (index === undefined) return;
    if (snackbars[index].timer) clearTimeout(snackbars[index].timer);
    snackbars.splice(index, 1);
  }

  function dismissAllSnackbar() {
    snackbars.forEach((item) => {
      if (item.timer) clearTimeout(item.timer);
    });
    snackbars.splice(0, snackbars.length);
  }

  return {
    snackbars,
    addSnackbar,
    removeSnackbar,
    dismissAllSnackbar,
  };
});

export default useAuthStore;
