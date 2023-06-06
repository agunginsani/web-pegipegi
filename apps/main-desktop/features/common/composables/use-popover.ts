type UsePopoverParams = {
  onClose?: () => void;
  onOpen?: () => void;
  direction?: 'up' | 'down';
};

export default function usePopover(params?: UsePopoverParams) {
  const triggerRef = ref(null);
  const targetRef = ref(null);
  const active = ref(false);
  const { bottom, top, left, right } = useElementBounding(triggerRef);

  function toggle() {
    active.value = !active.value;
  }

  function hide() {
    if (active.value) {
      active.value = false;
      if (params?.onClose) params.onClose();
    }
  }

  function show() {
    if (!active.value) {
      if (params?.onOpen) params.onOpen();
      active.value = true;
    }
  }

  onClickOutside(
    targetRef,
    () => {
      hide();
    },
    { ignore: [triggerRef] }
  );

  return {
    triggerRef,
    targetRef,
    top: params?.direction === 'up' ? top : bottom,
    left,
    right,
    active,
    toggle,
    hide,
    show,
  };
}
