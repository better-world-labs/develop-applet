/*
 * @Author: Lemon
 * @Date: 2023-05-04 14:16:39
 * @Description:
 */
/**
 * @description: 消息类型 type
 */
export enum SocketTriggerTypeEnum {
  SHARE_HINT_CREATE_APP = 'share-hint-create-app',
  SHARE_HINT_USE_APP = 'share-hint-use-app',
  NOTIFY_MESSAGE_CHANGED = 'notify-message-changed',
  RETAIN_MESSAGE_CHANGED = 'retain-message-changed',
  USE_POINTS_CHANGED = 'user-points-changed',
}
