/**
 * 基于 n-modal 的动态业务弹窗
 */
import Dialog from './dialog.vue';
import { createApp } from 'vue';
import type { App, Ref } from 'vue';
import { useStore } from '@/store';
import type { ModalProps } from 'naive-ui';
import { cssVar, deepMerge } from '@/utils';
import { cloneDeep } from 'lodash';

type DialogName = string;

interface AppProps extends Record<string, unknown> {
  __d_dialogName: DialogName;
  __d_useShow: () => Ref<boolean>;
  dialogProps?: any;
}

const allModules: Record<string, any> = import.meta.glob('@/bizComponents/dialogs/*.vue', {
  eager: true,
});
const modules: Map<DialogName, any> = new Map();

Object.keys(allModules).forEach((path: string) => {
  const componentName = allModules[path].default.name;
  const fileName =
    componentName || path.split('/src/bizComponents/dialogs/')[1]?.match(/(.+)\.vue/)?.[1];
  const component = allModules[path][fileName] || allModules[path].default || allModules[path];
  if (!component.name) {
    component.name = fileName;
  }
  modules.set(fileName, component);
});

const dialogMap: Map<DialogName, App> = new Map();

type TitlePlacement = 'left' | 'center';
export interface BaseModalProps extends ModalProps {
  /**
   * dialogData：组件返回数据，在 dialog 子组件定义 const dialogData = ref({}) // TODU：此处需优化，暂时没有更好的办法，后续扩展
   * ref：dialog 子组件引用
   */
  openValid?: boolean; // 开启表单验证
  titlePlacement?: TitlePlacement; // dialog 标题位置
  handlePositiveClick?: (data: { data: any; ref: any }) => void;
}

// 默认的 n-model 属性
export function getDialogProps(): BaseModalProps {
  return {
    positiveButtonProps: {
      color: cssVar('--brand-cyan'),
      textColor: cssVar('--sub-blue'),
      bordered: false,
      size: 'medium',
    },
    negativeButtonProps: {
      color: cssVar('--bg-color-4'),
      textColor: cssVar('--text-title'),
      bordered: false,
      ghost: false,
      size: 'medium',
    },
  };
}

/**
 * 打开弹窗
 * @param dialogName 弹窗 name (唯一)
 * @param dialogProps 弹窗属性，基于 ModalProps 扩展
 * @returns Promise
 * @usage
 *    1. 在 src/components/dialogs 目录下定义 dialog content 组件，一般是业务组件
 *    2. 弹窗入口组件引入 const dialog = useBizDialog()
 *    3. 调用 dialog.open([dialogName], [props]).then(() => {// 表示弹窗已打开，不需要关注弹窗打开状态时 then 可省略})，props 是 n-model 组件属性
 *    4. demo
 *       ```
 *        dialog.open('AddChannel', {
 *          // 出现动画完成执行的回调
 *          onAfterEnter() {
 *             console.log('onAfterEnter')
 *           },
 *           // 确认按钮文案 不填对应的按钮不会出现
 *           positiveText: "确认",
 *           // 取消按钮文案 不填对应的按钮不会出现
 *           negativeText:"算了",
 *           // 点击确认按钮执行的回调
 *           onPositiveClick() {
 *             console.log('确认')
 *           }
 *           // 亦可扩展 ModalProps 其他属性...
 *        }).then(res => {
 *          console.log('弹窗打开')
 *        })
 *       ```
 */
export function open(dialogName: DialogName, dialogProps: BaseModalProps = {}, data?: any) {
  if (!dialogName) {
    throw new Error('dialogName is undefined!!!');
  }
  if (dialogMap.has(dialogName)) {
    throw new Error('dialog is existed!!!');
  }
  if (!modules.has(dialogName)) {
    throw new Error(`modules [${dialogName}] is undefined!!!`);
  }
  const dialogEl = document.getElementById('appDialog');
  if (!dialogEl) {
    const el = document.createElement('div');
    el.id = 'appDialog';
    document.body.appendChild(el);
  }

  const show = ref(false);
  const useShow = () => show;
  const defDialogProps = getDialogProps();
  const appProps: AppProps = {
    data,
    dialogProps: deepMerge(cloneDeep(defDialogProps), dialogProps),
    __d_dialogName: dialogName,
    __d_useShow: useShow,
  };

  const app: App = createApp(Dialog, appProps);
  app.config.globalProperties.dialogName = dialogName;
  const component = modules.get(dialogName);
  // 注册 store，因为弹窗业务逻辑会用到状态管理
  useStore(app);
  app.component(component.name, component);
  app.mount('#appDialog');
  dialogMap.set(dialogName, app);
  return new Promise((resolve) => {
    setTimeout(() => {
      useShow().value = true;
      resolve(true);
    });
  });
}

/**
 * 立即关闭弹窗，关闭动画失效
 * 需要保留动画可在dialog content组件 emit('close') 事件
 * @param dialogName 如果 dialogName 不存在，关闭所有弹窗
 * @returns
 */
function closeImmediate(dialogName?: DialogName) {
  if (dialogName) {
    dialogMap.get(dialogName)?.unmount();
    dialogMap.delete(dialogName);
  } else {
    dialogMap.forEach((app: App) => {
      app.unmount();
    });
    dialogMap.clear();
  }
}

export const close = closeImmediate;

export function useBizDialog() {
  return {
    open,
    close: closeImmediate,
  };
}
