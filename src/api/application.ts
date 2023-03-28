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
//  读取AI模型列表
export function getAIList() {
  return http.request({
    method: 'get',
    url: `/api/ai-models`,
  });
}
//  读取AI模型
export function getApp(id: string) {
  return http.request({
    method: 'get',
    url: `/api/apps/${id}`,
  });
}
//  保存App模型
export function putApp(id: string, data: any) {
  return http.request({
    method: 'put',
    url: `/api/apps/${id}`,
    data
  });
}
//  运行App模型
export function postApp(id: string, data: any) {
  return http.request({
    method: 'post',
    url: `/api/apps/${id}/run `,
    data
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
// 运行应用
export function runApp(uuid:string,data:{values:string[],open:boolean}) {
  return http.request({
    method: 'post',
    url: `/api/apps/${uuid}/run`,
    data,
  });
}
