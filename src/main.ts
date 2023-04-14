/*
 * @Author: Sandy
 * @Date: 2023-03-22 14:01:29
 * @Description: 
 */

import { createApp } from 'vue';
import App from './App.vue';
import { AppProvider } from '@/components/app-provider';
import { useStore } from '@/store';
import { useRouter } from '@/router';
import { useDirectives } from '@/plugins';
import { useInit } from './hooks/useInit';

import '@/styles/index.scss';
import { loadIconFont } from '@/utils/iconfont';

if (process.env['VITE_ENV_MODE'] === 'development') loadIconFont();
import '@/assets/iconfonts/iconfont.css';

function createProvider() {
  const appProvider = createApp(AppProvider);
  appProvider.mount('#appProvider', true);
}

function useService() {
  // 初始化持久化数据
  useInit().init();
}
function initApp() {
  const app = createApp(App);

  createProvider();

  // 注册 store
  useStore(app);

  // 注册全局指令
  useDirectives(app);

  // 注册 router
  console.log('注册路由')
  useRouter(app);

  // 后端服务依赖初始化
  useService();

  app.mount('#app');
}

initApp();
