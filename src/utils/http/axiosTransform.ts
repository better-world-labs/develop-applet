/**
 * 数据处理
 */
import axios, { AxiosResponse } from 'axios';
import type { RequestOptions, Result, CreateAxiosOptions, BaseAxiosRequestConfig } from './types';
import { ResultEnum } from '@/enums/httpEnum';  
import { guid, timestamp } from '@/utils/index';
import { checkStatus } from './checkStatus'; 
import { getErrorMsg } from './error';

export abstract class AxiosTransform {
  /**
   * @description: 请求之前处理配置
   * @description: Process configuration before request
   */
  beforeRequestHook?: (
    config: BaseAxiosRequestConfig,
    options: RequestOptions
  ) => BaseAxiosRequestConfig;

  /**
   * @description: 请求成功处理
   */
  transformRequestData?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  /**
   * @description: 请求失败处理
   */
  requestCatch?: (e: Error) => Promise<any>;

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: BaseAxiosRequestConfig,
    options: CreateAxiosOptions
  ) => BaseAxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void;
}

// 实例化数据处理抽象类，在axios生命周期内处理 http 请求和响应
export const transform: AxiosTransform = {
  /**
   * @description: 请求之前处理config
   */
  beforeRequestHook: (config, options) => {
    return config;
  },

  /**
   * @description: 处理请求返回的数据
   */
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { ignoreAllError, ignoreBizError, showSuccess, successMessageText, errorMessageText } =
      options || {};

    const { data } = res || {};

    if (!data) {
      throw new Error('请求出错，请稍候重试');
    }

    const $message = window['$message'];
    const { code, msg } = data;

    // 请求成功定义信息提示
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
    if (!ignoreAllError && showSuccess && hasSuccess) {
      $message.success(successMessageText || msg || '操作成功！');
    }

    // 接口请求成功，直接返回结果
    if (code === ResultEnum.SUCCESS) {
      return data;
    }

    // 请求失败自定义信息提示
    if ((!ignoreAllError || !ignoreBizError) && !hasSuccess) {
      // 接口请求错误，统一业务异常错误提示
      const errorMsg = msg;
      $message.error(getErrorMsg(code) || errorMsg || errorMessageText || '操作失败！');
      throw new Error(errorMsg);
    }
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config: BaseAxiosRequestConfig, options: CreateAxiosOptions) => {
    // const token = userStore.getToken;
    const localToken = window.localStorage.getItem('token');
    // if (localToken) RequestOptions['X-CSRF-TOKEN'] = localToken;
    if (localToken && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers['X-CSRF-TOKEN'] = localToken;
    }
    // Request-Id
    (config as Recordable).headers['X-Request-Id'] = `${guid(6)}-${guid(4, false)}-${timestamp()}`;
    
    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const requestOptions: RequestOptions = error.config?.requestOptions || {};
    const { ignoreAllError, ignoreHttpError } = requestOptions;
    if (ignoreAllError || ignoreHttpError) {
      return Promise.reject(error);
    }
    const $message = window['$message'];
    const $dialog = window['$dialog'];
    const { response, code, message } = error || {};
    const msg: string = response && response.data && response.data.msg ? response.data.msg : '';
    const err: string = error.toString();

    
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        $message.error('接口请求超时，请刷新页面重试!');
        return;
      }
      if (err && err.includes('Network Error')) {
        $dialog.info({
          title: '网络异常',
          content: '请检查您的网络连接是否正常',
          positiveText: '确定',
          //negativeText: '取消',
          closable: false,
          maskClosable: false,
          onPositiveClick: () => {},
          onNegativeClick: () => {},
        });
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as any);
    }
    // 请求是否被取消
    const isCancel = axios.isCancel(error);
    if (!isCancel) {
      checkStatus(error.response && error.response.status, msg);
    } else {
      console.warn(error, '请求被取消！');
    }
    return Promise.reject(error);
  },
};
