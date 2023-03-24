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
export function getSystemConfig(key: string) {
  return http.request({
    method: 'get',
    url: `/api/system-configs?key=${key}`,
  });
}
