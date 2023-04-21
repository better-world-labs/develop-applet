/*
 * @Author: Lemon
 * @Date: 2023-04-17 10:17:29
 * @Description: 静态资源 
 */

interface StaticVar {
  [idx: string]: string;
}

// 静态资源配置管理
export const oss = 'https://moyu-chat.oss-cn-hangzhou.aliyuncs.com/develop-applet/images/';

const staticConfig: StaticVar = {
  // 首页引导
  homeVideo1: `${oss}home-bootstrap-video-01.mov`,
  homeVideo2: `${oss}home-bootstrap-video-02.mov`,
  homeVideo3: `${oss}home-bootstrap-video-03.mov`,
  //编辑页面引导
  editVideo1: `${oss}edit-bootstrap-video-01.mov`, 
};
export default {
  ...staticConfig,
};
