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
 