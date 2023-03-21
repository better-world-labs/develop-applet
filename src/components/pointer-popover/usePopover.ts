import { Ref } from 'vue';

export function usePopover(emits) {
  const popoverData = ref();
  const popperX = ref();
  const popperY = ref();

  const onShowMenu = (e: MouseEvent, data: any) => {
    popoverData.value = data;
    popperX.value = e.clientX;
    popperY.value = e.clientY;
  };

  const closeAll = () => {
    popoverData.value = null;
    emits('update:show', false);
  };

  return {
    popperX,
    popperY,
    popoverData,
    onShowMenu,
    closeAll,
  };
}

interface PopoverData<T, V> {
  target: T | null;
  value: V | null;
}

export function usePointerPopover<T, V>() {
  const showPopover = ref(false);
  const showPopoverData: Ref<PopoverData<T, V>> = ref({
    target: null,
    value: null,
  });
  let closeTimer: NodeJS.Timeout;
  function onShowMenu(target: T, value: V) {
    if (!showPopoverData.value.target) {
      showPopoverData.value = {
        target,
        value,
      };
      showPopover.value = true;
      return;
    }
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      showPopoverData.value = {
        target,
        value,
      };
      showPopover.value = true;
    }, 300);
  }

  return {
    showPopover,
    showPopoverData,
    onShowMenu,
  };
}
