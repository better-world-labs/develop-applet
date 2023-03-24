/*
 * @Author: Lemon
 * @Date: 2023-03-24 14:50:24
 * @Description:
 */
import { defineStore } from 'pinia';
import { getSystemConfig, getAppList } from '@/api/application';

interface ApplicationState {
  tabs: Application.tabInfoItf[];
  currentTab: number | null;
  appList: Application.appInfoItf[];
}

export const useApplicationStore = defineStore('application', {
  state: (): ApplicationState => ({
    tabs: [],
    currentTab: 1,
    appList: [],
  }),
  getters: {},
  actions: {
    // 请求分类
    async getTabs() {
      const { data } = await getSystemConfig('MINI_APP_HOME_TABS');
      this.tabs = data.value.tabs;
      this.setCurrentTab(this.tabs[0].category);
    },
    // 请求应用列表
    async getAppList() {
      const { data } = await getAppList(this.currentTab as number);
      this.appList = data.list;
    },
    setCurrentTab(category: number) {
      this.currentTab = category;
      this.getAppList();
    },
  },
});
