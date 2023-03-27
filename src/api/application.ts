/*
 * @Author: Lemon
 * @Date: 2023-03-24 14:38:28
 * @Description: 主页应用相关的接口
 */
import { http } from '@/utils/http';
import { Result, ResultList } from '@/utils/http/types';
import { RequestOptions } from '@/utils/http/types';

// 读取应用列表
export function getAppList(categoryId: number) {
  return http.request({
    method: 'get',
    url: `/api/apps?category=${categoryId}`,
  });
}

// 读取系统设置
export function getTabs(key: string) {
  return http.request({
    method: 'get',
    url: `/api/app-tabs?key=${key}`,
  });
}

// 读取某个应用
export function getAppInfo(uuid: string) {
  return http.request({
    method: 'get',
    url: `/api/apps/${uuid}`,
  });
}

// 读取应用的结果列表
export function getAppResultList(uuid: string) {
  return http.request({
    method: 'get',
    url: `/api/apps/${uuid}/outputs`,
  });
}

// 读取我的小程序
export function getMineApp() {
  return http.request({
    method: 'get',
    url: `/api/apps/mine`,
  });
}
