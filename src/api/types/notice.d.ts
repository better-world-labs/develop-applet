/*
 * @Author: Lemon
 * @Date: 2023-04-26 16:03:34
 * @Description: 通知定义
 */
declare namespace Notice {
  export interface Message {
    id: number;
    type: string;
    title: string;
    content: string;
    read: boolean;
    createdAt: string;
    nextCursor?: string;
  }
}
