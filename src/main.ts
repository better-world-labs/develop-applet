 
import { createApp } from 'vue';
import App from './App.vue';
import { AppProvider } from '@/components/app-provider';
import { useStore } from '@/store';
import { useRouter } from '@/router';
import { useDirectives } from '@/plugins'; 

import '@/styles/index.scss';
import { loadIconFont } from '@/utils/iconfont';
 
if (process.env['VITE_ENV_MODE'] === 'development') loadIconFont();
import '@/assets/iconfonts/iconfont.css';

function createProvider() {
  const appProvider = createApp(AppProvider);
  appProvider.mount('#appProvider', true);
}

function useService() { 
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
