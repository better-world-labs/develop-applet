import { Axios } from './axios';
import { transform } from './axiosTransform';
import { ContentTypeEnum } from '@/enums/httpEnum';
import { deepMerge } from '@/utils';
import { CreateAxiosOptions } from './types';

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new Axios(
    deepMerge(
      {
        // http 超时时间
        timeout: 15 * 1000,
        // 接口前缀
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 忽略重复请求
          ignoreCancelToken: true,
          // 忽略全部异常提示
          ignoreAllError: false,
          // 忽略 http 异常提示
          ignoreHttpError: false,
          // 忽略业务 code 异常提示
          ignoreBizError: false,
          // 显示请求成功提示
          showSuccess: false,
          // 请求成功提示内容
          successMessageText: null,
          // 请求失败提示内容
          errorMessageText: null,
          // 是否携带token
          withToken: true,
        },
        // 跨域参数
        withCredentials: false,
      },
      opt || {}
    )
  );
}

export const http = createAxios();
