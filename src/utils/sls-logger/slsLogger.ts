/*
 * @Author: Sandy
 * @Date: 2022-09-27 17:51:34
 * @LastEditTime: 2023-04-18 11:43:19
 * @Description: sls 日志直传 模块
 */

import SlsOpenLogger from '@aliyun-sls/web-track-browser';
// 开源观阿里云日志模块加载
const opts = {
  host: 'cn-chengdu.log.aliyuncs.com',
  project: 'build-app',
  logstore: 'build-app',
  time: 10,
  count: 10,
};
const $logger = new SlsOpenLogger(opts);

export default $logger;
