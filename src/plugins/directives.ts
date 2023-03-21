import { App } from 'vue';
import clickOutside from '@/directives/clickOutside';
/**
 * 注册全局自定义指令
 * @param app
 */
export function useDirectives(app: App) {
  app.directive('clickOutside', clickOutside);
}
