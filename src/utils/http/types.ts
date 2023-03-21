import { AxiosRequestConfig } from 'axios';
import { AxiosTransform } from './axiosTransform';

// 创建 axios 实例初始化参数
export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

// 请求消息提示
export interface HttpMessageTips {
  showSuccess?: boolean;
  successMessageText?: string;
  errorMessageText?: string;
}

// http 异常捕获
export interface HttpException {
  ignoreAllError?: boolean;
  ignoreHttpError?: boolean; // 忽略 http 异常
  ignoreBizError?: boolean; // 忽略业务 code 异常
}

// 请求参数（基于 axios 参数）
export type BaseAxiosRequestConfig = AxiosRequestConfig;

// 请求配置参数（基于业务）
export type RequestOptions = HttpMessageTips &
  HttpException & {
    ignoreCancelToken?: boolean;
  };

// http 响应数据类型
export interface Result<T = any> {
  code: number;
  type?: 'success' | 'error' | 'warning';
  msg?: string;
  data: T;
}

// http 响应 list 数据类型
export interface ResultList<T = any> extends Result {
  data: T[] & {
    total?: number;
    list: T[];
  };
}

// 分页参数
export interface Page {
  page: number;
  size: number;
}
