/*
 * @Author: Lemon
 * @Date: 2023-04-26 14:48:46
 * @Description: 通知
 */
import { http } from '@/utils/http';

export function getNoticeList(data: { isRead?: boolean | undefined; cursor?: string | undefined }) {
  return http.request({
    method: 'get',
    url: `/api/notify-messages`,
    params: data,
  });
}
// 读取未读消息数量
export function getUnreadCount() {
  return http.request({
    method: 'get',
    url: `/api/notify-messages/unread-count`,
  });
}
// 设置消息已读
export function setMessageRead(id: number) {
  return http.request({
    method: 'put',
    url: `/api/notify-messages/${id}/read`,
  });
}
// 标记所有消息已读
export function setAllMessageRead() {
  return http.request({
    method: 'put',
    url: `/api/notify-messages/read-all`,
  });
}
// 读取保留消息，不在通知列表中展示
export function getAllRetainMessage() {
  return http.request({
    method: 'get',
    url: `/api/retain-messages`,
  });
}
