/*
 * @Author: Sandy
 * @Date: 2023-04-18 14:25:54
 * @Description: 
 */
declare namespace User {

  export interface UserInfoItf {
    id: number;
    nickname: string;
    avatar: string;
    lastLoginAt: string;
    loginAt: string;
    invitedBy: number;
    points: number;
  }

}
