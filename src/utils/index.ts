/*
 * @Author: Sandy
 * @Date: 2023-03-22 14:01:29
 * @Description: 
 */

import { isObject } from './is/index';
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function guid(len = 32, firstM = true, radix = 0): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstM) {
    uuid.shift();
    return `M${uuid.join('')}`;
  }
  return uuid.join('');
}

// 获取时间戳
export function timestamp() {
  return new Date().getTime();
}
export const cssVar = (key: string, el: HTMLElement = document.documentElement) => {
  return getComputedStyle(el).getPropertyValue(key);
};

// key :参数名
export function getUrlParams(search?: string): { [idx: string]: string } {
  search = search || location.search;
  const paramsSplit = search.replace(/^[^\?]*\?/i, '').split('&');
  const params: { [idx: string]: string } = {};

  if (Array.isArray(paramsSplit)) {
    paramsSplit.forEach(function (item) {
      const itemSplit = item.split('=');
      params[itemSplit[0]] = itemSplit[1];
    });
  }
  return params;
}

export const setStorageItem = (key: string, value = '') => {
  window.localStorage.setItem(key, value);
};

export const removeStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
};

export const getStorageItem = (key: string): string => {
  return window.localStorage.getItem(key) || '';
};

export const getSessionItem = (key: string): string => {
  return window.sessionStorage.getItem(key) || '';
};

export const setSessionItem = (key: string, value = '') => {
  window.sessionStorage.setItem(key, value);
};