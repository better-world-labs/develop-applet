/*
 * @Author: Sandy
 * @Date: 2023-03-22 16:59:21
 * @Description: 
 */

import { useUserStore } from '@/store/modules/user';
import { getUserInfo } from '@/api/user';
import $router from '@/router/index';
import { getUrlParams } from "@/utils/index"
import { sendLog } from '@/utils/sls-logger/sendLog';
import {
  setStorageItem,
  getSessionItem,
  getStorageItem,
  removeStorageItem,
  setSessionItem,
} from '@/utils';

const localToken = ref<string>('');
const user = ref<User.UserInfoItf | undefined>(undefined);

export function useInit() {
  const userStore = useUserStore();
  localToken.value = getStorageItem('token');
  // const localUser = getStorageItem('user');
  // user.value = localUser && JSON.parse(localUser);

  const monitorApp = (): void => {
    sendLog({
      action_type: 'Enter_APP',
    });
    window.onerror = function (message, source, line, column, error) {
      // message： 错误信息
      // source：发生错误的资源
      // line：发生错误的行号
      // column：发生错误的列数
      // error：Error错误对象
      console.error('window.onerror----', message, source, line, column, error);
      sendLog({
        action_type: 'Monitor_Error',
        data: { message, source, line, column, error },
      });
    };

    window.addEventListener('unhandledrejection', function (event) {
      console.error('window.unhandledrejection----', event);
      sendLog({
        action_type: 'Monitor_Error',
        data: {
          ...event,
          type: 'unhandledrejection',
        },
      });
    });
  };

  const { pathname: path, href: fullPath } = window.location;

  // 统一的设置/修改用户信息, 缓存
  const setUserInfo = (data: User.UserInfoItf) => {
    user.value = data;
    userStore.setUser(data);
    setStorageItem('user', JSON.stringify(data));
  };

  // 更新用户信息
  const getUserData = async () => {
    const res = await getUserInfo();
    if (!res.data) return;
    setUserInfo(res.data);
  };

  // 初始化, (刷新|初次进入)
  const init = (flag = true) => {
    monitorApp()
    if (user.value) userStore.setUser(user.value);

    if (localToken.value) {
      userStore.setToken(localToken.value);
      flag && getUserData();
    } else if (path === '/view-template-details') {
      goAuth()
    } else if (path !== '/home') {
      $router.replace({ name: 'home' });
    }

    // 处理Auth认证平台问题
    const urlParams = getUrlParams();
    const code = urlParams['code'] && decodeURIComponent(urlParams['code']);

    if (code) {
      login({ csrfToken: code })
    }
  };


  const goAuth = () => {
    console.log('进入去登录, goAuth');
    const redirectUrls = [
      'https://moyu.chat/entry',
      'https://moyu.dev.openviewtech.com/entry',
      'https://moyu.test.openviewtech.com/entry',
    ];
    let toPath = redirectUrls[0];
    // 环境判断
    (process.env.NODE_ENV === 'development' || location.host.startsWith('ai.moyu.dev.openviewtech.com')) && (toPath = redirectUrls[1]);
    location.host.startsWith('ai.moyu.test.openviewtech.com') && (toPath = redirectUrls[2]);
    location.replace(toPath + '?redirect_uri=' + encodeURIComponent(location.href.toString()))
  }

  //退出 擦除和路由更新逻辑
  const logout = async () => {
    userStore.setToken('');
    userStore.setUser();
    removeStorageItem('token');
    removeStorageItem('user');
    localToken.value = '';
    user.value = undefined;
    await $router.replace({ name: 'home' });
  };

  // 登录 设置数据缓存 和 路由更新
  const login = async (data: any) => {
    localToken.value = data.csrfToken;
    setStorageItem('token', data.csrfToken);
    userStore.setToken(data.csrfToken);
    getUserData()
  };

  return {
    localToken,
    user,
    path,
    fullPath,
    init,
    goAuth,
    logout,
    login,
    setUserInfo,
  };
}
