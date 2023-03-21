/**
 * 业务上定义的全局类型
 */
import {
  Result as ResultType,
  ResultList as ResultListType,
  Page as PageType,
} from '@/utils/http/types';
export {};
declare global {
  declare type Result<T = any> = ResultType<T>;
  declare type Page = PageType;
  declare type ResultList<T = any> = ResultListType<T>;
}
