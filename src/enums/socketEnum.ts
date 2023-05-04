/*
 * @Author: Lemon
 * @Date: 2023-05-04 14:16:39
 * @Description:
 */
/**
 * @description: socket emit 事件类型
 */
export enum SocketEmitEnum {}
// ENTER_ROOM = 'enter', // 进入

/**
 * @description: socket on 事件类型
 */
export enum SocketOnEnum {}
// RECEIVE_MESSAGE = 'r', // 接收消息

/**
 * @description: Trigger(触发器) type
 */
export enum SocketTriggerTypeEnum {
  SHARE_HINT_CREATE_APP = 'share-hint-create-app',
  SHARE_HINT_USE_APP = 'share-hint-use-app',
  NOTIFY_MESSAGE_CHANGE = 'notify-message-change',
  RETAIN_MESSAGE_CHANGE = 'retain-message-change',
}
