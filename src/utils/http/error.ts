export function getErrorMsg(code: number) {
  const msgMap: Record<number, string> = {
    404001: '频道不存在',
    404002: '审批单不存在',
    404003: '通知不存在',
  };
  return msgMap[code];
}
