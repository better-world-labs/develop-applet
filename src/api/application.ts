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
    data,
  });
}
//  运行App模型
export function postApp(id: string, data: any) {
  return http.request({
    method: 'post',
    url: `/api/apps/${id}/run `,
    data,
  });
}

// 读取系统设置
export function getTabs(key: string) {
  return http.request({
    method: 'get',
    url: `/api/app-tabs?key=${key}`,
  });
}
// 分类
export function getCategories() {
  return http.request({
    method: 'get',
    url: `/api/app-categories`,
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
export function getAppResultList(uuid: string, params?: { cursor: string | undefined }) {
  return http.request({
    method: 'get',
    url: `/api/apps/${uuid}/outputs`,
    params: params,
  });
}

// 读取我的小程序
export function getMineApp() {
  return http.request({
    method: 'get',
    url: `/api/apps/mine`,
  });
}

// 读取我收藏的小程序
export function getCollectApp() {
  return http.request({
    method: 'get',
    url: `/api/apps/collected`,
  });
}

// 删除小程序
export function deleteApp(uuid: string) {
  return http.request({
    method: 'delete',
    url: `/api/apps/${uuid}`,
  });
}

// 读取小程序当前是否被点赞状态
export function readStateApp(uuid: string) {
  return http.request({
    method: 'get',
    url: `/api/apps/${uuid}/like`,
  });
}
// 批量读取我对应用的点赞状态
export function readMyLikeAppState(ids: string[]) {
  return http.request({
    method: 'post',
    url: `/api/apps/is-liked`,
    data: { appIds: ids },
  });
}
// 点赞小程序
export function giveLikeApp(uuid: string, data: { like: boolean }) {
  return http.request({
    method: 'post',
    url: `/api/apps/${uuid}/like`,
    data: data,
  });
}

// 批量读取我对应用的热点状态
export function readMyHotAppState(ids: string[]) {
  return http.request({
    method: 'post',
    url: `/api/apps/is-recommended`,
    data: { appIds: ids },
  });
}

// 点赞热度/推荐 小程序
export function giveHotApp(uuid: string, state: boolean) {
  return http.request({
    method: 'post',
    url: `/api/apps/${uuid}/recommend`,
    data: { recommend: state },
  });
}

// 获取当前应用的评论列表
export function getCommentListApp(uuid: string) {
  return http.request({
    method: 'get',
    url: `/api/apps/${uuid}/comments`,
  });
}
// 当前应用添加评论
export function addCommentsApp(uuid: string, data: { content: string }) {
  return http.request({
    method: 'post',
    url: `/api/apps/${uuid}/comments`,
    data: data,
  });
}

// 事件上报
export function addEvents(data: { content: string }) {
  return http.request({
    method: 'post',
    url: `/api/events`,
    data: data,
  });
}

// 获取每个结果当前用户是否顶踩
export function getResultsIsLike(outputIds: string) {
  return http.request({
    method: 'get',
    url: `/api/outputs/likes?outputIds=${outputIds}`,
  });
}

// 踩顶，取消
export function resultLike(id: string, data: { like: number }) {
  return http.request({
    method: 'post',
    url: `/api/outputs/${id}/like`,
    data: data,
  });
}

// 获取系统配置
export function getSystemConfig(params: { key: string }): Promise<Result<AppSystem.SystemConfig>> {
  return http.request({
    method: 'get',
    url: '/api/system-configs',
    params,
  });
}
// 获取商品列表
export function getGoods(): Promise<ResultList<Application.goodsItf>> {
  return http.request({
    method: 'get',
    url: '/api/points-goods',
  });
}
//读取充值订单信息
export function getOrderStateById(orderId: string) {
  return http.request({
    method: 'get',
    url: `/api/points-orders/${orderId}/state`,
  });
}
// 积分充值下单
export function putOrder(goodsId: string) {
  return http.request({
    method: 'post',
    url: `/api/points-goods/${goodsId}/points-orders`,
  });
}
// 收藏/取消收藏
export function setCollect(uuid: string, collected: Boolean) {
  return http.request({
    method: 'post',
    url: `/api/apps/${uuid}/collect`,
    data: { collected },
  });
}
export function getCollectStatus(uuids: string[]) {
  return http.request({
    method: 'post',
    url: `/api/apps/is-collected`,
    data: { uuids: uuids },
  });
}
