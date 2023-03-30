/*
 * @Author: Sandy
 * @Date: 2023-03-22 14:01:29
 * @Description:
 */
import { http } from '@/utils/http';
import { Result, ResultList } from '@/utils/http/types';
import { RequestOptions } from '@/utils/http/types';

export function getUsersList(
  data: { ids: number[] },
  requestOptions?: RequestOptions
): Promise<ResultList<User.UserInfoItf>> {
  return http.request(
    {
      method: 'POST',
      url: `/api/users/list`,
      data,
    },
    requestOptions
  );
}

export function getUserInfo() {
  return http.request({
    method: 'get',
    url: '/api/users/me/info',
  });
}
// 请求积分
export function getIntegral() {
  return http.request({
    method: 'get',
    url: '/api/points/total',
  });
}
