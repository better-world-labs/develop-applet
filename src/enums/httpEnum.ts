 
/**
 * @description: 请求结果集
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 10042,
  TYPE = 'success',
}

/**
 * @description: 请求方法
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  常用的contentTyp类型
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // json
  TEXT = 'text/plain;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export enum HttpStatusEnum {
  SUCCESS = 200,
  TOKEN_ERROR = 401,
  SERVER_ERROR = 500,
  // - 4xx: 前端求情异常，前端代码可能需要调整
  // - 5xx: 后端服务器异常，后端代码有问题需要修复，前端对该情况统一处理为 “网络异常，请稍后再试”
}
