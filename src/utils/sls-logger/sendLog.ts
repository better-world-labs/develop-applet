/*
 * @Author: Sandy
 * @Date: 2022-09-28 10:15:27
 * @LastEditTime: 2023-04-18 14:33:45
 * @Description:发送日志
 */

import $logger from '@/utils/sls-logger/slsLogger';
import { useInit } from '@/hooks/useInit';
import { timestamp } from '@/utils/index';

interface BeHavior {
  action_type: string;
  path?: string;
  fullPath?: string;
  title?: string;
  data?: any;
  [idx: string]: any;
}

type Log = {
  behavior: BeHavior;
  userInfo: User.UserInfoItf;
  token: string;
  timestamp: string;
  env: string;
};

const deviceInfo = (() => {
  const { language, appName, appCodeName, appVersion, onLine, product, platform, userAgent } =
    navigator || {};
  const { height, width } = window.screen || {};
  return {
    language,
    appName,
    appCodeName,
    appVersion,
    onLine,
    product,
    platform,
    userAgent,
    height,
    width,
  };
})();

export function sendLog(behavior: BeHavior) {

  const { localToken, user, path, fullPath } = useInit();

  $logger.send({
    behavior: { ...behavior, path, fullPath },
    userInfo: user.value,
    token: localToken.value,
    timestamp: timestamp(),
    deviceInfo,
    env: process.env.VITE_ENV_MODE,
  });
}
