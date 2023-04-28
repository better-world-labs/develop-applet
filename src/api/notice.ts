/*
 * @Author: Lemon
 * @Date: 2023-04-26 14:48:46
 * @Description: 通知
 */
import { http } from '@/utils/http';
import { ResultList } from '@/utils/http/types';
import { RequestOptions } from '@/utils/http/types';

export function getNoticeList(
  data: { isRead?: boolean | undefined; cursor?: string | undefined },
  requestOptions?: RequestOptions
): Promise<ResultList<Notice.Message>> {
  return http.request(
    {
      method: 'get',
      url: `/api/notify-messages`,
      params: data,
    },
    requestOptions
  );
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
