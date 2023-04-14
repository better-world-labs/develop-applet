/*
 * @Author: Lemon
 * @Date: 2022-11-16 17:08:31
 * @Description: 浏览器判断
 */
export function useBrowser() {
  const userAgent: string = navigator.userAgent;

  const isChrome = (): boolean => {
    return userAgent.indexOf('Chrome') > -1;
  };

  const isSafari = (): boolean => {
    return userAgent.indexOf('Chrome') == -1 && userAgent.indexOf('Safari') > -1;
  };

  const isFirefox = (): boolean => {
    return userAgent.indexOf('Firefox') > -1;
  };

  return {
    isChrome,
    isSafari,
    isFirefox,
  };
}
