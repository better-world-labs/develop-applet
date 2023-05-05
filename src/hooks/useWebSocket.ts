/*
 * @Author: Lemon
 * @Date: 2023-05-04 15:56:03
 * @Description:
 */
import { LightWebsocketClientImpl } from 'light-websocket-client-ts';
const socket = ref<any>(null);
import { useSocket } from '@/store/modules/webSocket';

export function useWebSocket() {
  // 连接
  const connect = (csrf: string) => {
    socket.value = new LightWebsocketClientImpl(
      `ws://local.moyu.dev.openviewtech.com:5173/push/endpoint?csrf=${csrf}`
    );

    socket.value.onDisconnect(onDisconnect);
    socket.value.onConnect(onConnect);
    socket.value.onMessage(onMessage);
    //   连接
    socket.value.connect();
  };
  // 断开
  const disconnect = () => {
    socket.value.disconnect();
  };

  function onConnect() {
    console.log('连接成功！');
  }

  function onDisconnect() {
    console.log('断开连接！');
    //每次连接丢失都会回调
  }

  function onMessage(message: string) {
    const data: { type: string; payload: AppSystem.TriggerResponse } = JSON.parse(message);
    const { $emit } = useSocket();
    $emit(data.type, data.payload);
    // console.log('接收消息', data.type, data.payload);
  }

  return {
    socket,
    connect,
    disconnect,
  };
}
