import type { DialogOptions } from 'naive-ui';
import { useDialog } from 'naive-ui';
import { getDialogProps } from '../dialog/index';
import { cloneDeep } from 'lodash';
type BaseDialogOptions = DialogOptions;

export function useAppDialog() {
  const dialog = useDialog();
  return {
    info(options?: BaseDialogOptions) {
      dialog.info({
        showIcon: false,
        closable: false,
        ...cloneDeep(getDialogProps()),
        ...options,
        class: `app-dialog ${options?.class}`,
      });
    },
  };
}
