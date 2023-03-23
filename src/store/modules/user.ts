/*
 * @Author: Sandy
 * @Date: 2023-03-22 17:10:55
 * @Description: 
 */
import { defineStore } from 'pinia';
import { getUserInfo, } from '@/api/user';

const defaultUser = {
  id: 0,
  avatar: '',
  nickname: '',
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    info: defaultUser,
    //avatar: "xxx"  id: 2  nickname: "xx"
    // 成员分享链接
    inviteUrl: '' as string,
  }),
  getters: {
    userId(): number {
      return this.info.id;
    },
    getNickname(): string {
      return this.info.nickname;
    },
  },
  actions: {
    setInviteUrl(url: string) {
      this.inviteUrl = url;
    },
    async getInfo() {
      const res = await getUserInfo();
      this.info = res.data || {
        id: 0,
        avatar: '',
        nickname: '',
      };
    },
    setToken(token: string) {
      this.token = token;
    },
    setUser(user: User.UserInfoItf = defaultUser) {
      this.info = user;
    },
  },
});
