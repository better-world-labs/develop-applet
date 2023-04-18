/*
 * @Author: Sandy
 * @Date: 2023-04-18 14:29:36
 * @Description: 路由前置守卫
 */

import { sendLog } from '@/utils/sls-logger/sendLog';

export default {
  logSend(guard: any) {
    // $logger.send({
    //   behavior: {
    //     action_type: 'EnterPage',
    //     fullPath: guard.fullPath,
    //     name: guard.name,
    //     title: guard.meta.title,
    //     data: guard,
    //   },
    // });
    try {
      const { href, meta, path, query, fullPath, hash } = guard;
      sendLog({
        action_type: 'Enter_Page',
        name: guard.name,
        title: guard.meta.title,
        data: { href, meta, path, query, fullPath, hash },
      });
    } catch (error) {
      console.error(error);
    }
  },
};
