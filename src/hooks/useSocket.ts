/*
 * @Author: Lemon
 * @Date: 2023-05-04 14:16:11
 * @Description:
 */

//@ts-ignore
import io from 'socket.io-client';
import { delay } from '@/utils';
import { SocketEmitEnum, SocketOnEnum } from '@/enums/socketEnum';

type CB = (data?: any) => void;

interface TriggerResponse {
  type: string;
  params: any;
}

interface TriggerOnOptions {
  globalTrigger: boolean; // 是否全局单例 trigger
}

type TriggerEvent = string;
type TriggerCB = (data: any, result: any) => void;

const socket = ref<any>(null);
const triggerStore = new Map();

export function useSocket() {
  const init = () => {
    console.log('init socket.useSocket');
    if (socket.value) socket.value.open();
    else {
      socket.value = io({
        autoConnect: false,
        transports: ['websocket'],
      });
    }
  };
  const createConnect = (): Promise<boolean> => {
    return new Promise((resolve: (value: boolean) => any) => {
      console.log('open');
      if (!socket.value.connected) socket.value.open();
      // 通信建立成功
      socket.value.on('connect', function () {
        console.log('ws服务已连接');
        return resolve(true);
      });
    });
  };

  // 监听连接
  const listeningConnection = (cb: Function) => {
    // 通信建立成功
    socket.value.on('connect', function () {
      return cb();
    });
  };

  // 关闭通道
  const socketClose = (key: string | string[]): void => {
    if (typeof key == 'string') {
      socket.value.off(key);
      return;
    }
    key.forEach((i) => {
      socket.value.off(i);
    });
  };

  /**
   * 创建 ws 通信通道，客户端向服务器发送
   * @param name socket emit 事件
   * @param params 请求参数
   */
  const socketEmit = (name: SocketEmitEnum, params: any): void => {
    // 向服务器发送消息
    socket.value.emit(name, params);
  };

  /**
   * ws 监听消息返回，服务端向客户端发送
   * @param name socket on 事件
   * @param cb 回调
   */
  const socketOn = (name: SocketOnEnum, cb: CB): void => {
    // 收到后端的信息
    socket.value.on(name, function (data: string) {
      return cb(data);
    });
  };

  /**
   * ws 触发器
   * @param event 触发器 response data type
   * @param cb 执行的回调
   * @param {TriggerOnOptions} options globalTrigger/全局 trigger，store 用 trigger event 缓存
   */
  const triggerOn = (event: TriggerEvent, cb: TriggerCB, options?: TriggerOnOptions) => {
    const { globalTrigger } = options || {};
    const fn = ({ type, params, ...result }: TriggerResponse) => {
      if (type === event && typeof cb === 'function') cb(params, result);
    };
    socket.value.on('t', fn);
    triggerStore.set(globalTrigger ? event : cb, fn);

    return {
      off() {
        socket.value.off('t', fn);
      },
    };
  };

  /**
   * 清除 ws trigger 监听的回调
   * @param cb triggerOn 事件的 event 或 cb 回调
   */
  const triggerOff = (cb: TriggerCB | TriggerEvent) => {
    const targetCb = triggerStore.get(cb);
    if (targetCb) {
      socket.value.off('t', targetCb);
    }
  };

  const isConnect = (): boolean => {
    return socket.value ? true : false;
  };

  const disconnect = (): Promise<boolean> => {
    return new Promise((resolve: (value: boolean) => any) => {
      // socket.value.on('disconnect', () => {
      //   console.log('断开连接', socket.value.disconnected);
      //   socketClose(['disconnect', 'connect']);
      //   resolve(true);
      // });
      // socket.value.disconnect();
      // socket.value.connected = false;
      // socket.value.destroy();

      const handle = setInterval(function () {
        if ((socket.value.disconnected = true)) {
          console.log('断开连接', socket.value.disconnected);
          clearInterval(handle);
          resolve(true);
        }
      }, 10);
      delay(6 * 1000).then(() => {
        if (handle) {
          clearInterval(handle);
          resolve(true);
        }
      });
      socket.value.close();
    });
  };

  const connectError = (): void => {
    // 通信连接异常
    socket.value.on('connect_error', () => {
      // 处理连接异常
      console.log('ws 服务连接异常');
    });
  };

  const reconnectSuccess = (cb: CB): void => {
    // 通信连接异常
    socket.value.on('reconnect', () => {
      // 处理连接异常
      console.log('ws 重新连接成功');
      cb();
    });
  };

  return {
    socket,
    init,
    listeningConnection,
    createConnect,
    socketEmit,
    socketOn,
    socketClose,
    isConnect,
    disconnect,
    connectError,
    reconnectSuccess,
    triggerOn,
    triggerOff,
  };
}
