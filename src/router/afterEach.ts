/*
 * @Author: Sandy
 * @Date: 2023-04-18 14:10:11
 * @Description: 路由后置守卫
 */

import { sendLog } from '@/utils/sls-logger/sendLog';

export default {
  logSend(guard: any) {
    try {
      const { href, meta, path, query, fullPath, hash } = guard;
      sendLog({
        action_type: 'Hide_Page',
        name: guard.name,
        title: guard.meta.title,
        data: { href, meta, path, query, fullPath, hash },
      });
    } catch (error) {
      console.error(error);
    }
  },
};
