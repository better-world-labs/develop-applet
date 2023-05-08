/*
 * @Author: Lemon
 * @Date: 2023-03-24 14:50:24
 * @Description:
 */
import { defineStore } from 'pinia';
import {
  getTabs,
  getAppList,
  getAppResultList,
  getAppInfo,
  getMineApp,
  getCollectApp,
  getResultsIsLike,
} from '@/api/application';
import $router from '@/router/index';

interface ApplicationState {
  currentMenu: string;
  tabs: Application.tabInfoItf[];
  currentTab: number | null;
  appList: Application.appInfoItf[];
  resultList: Application.appResultItf[];
  appInfo: Application.appDetailItf;
  mineAppList: Application.appInfoItf[];
  collectAppList: Application.appInfoItf[];
  editorText: string;
  finishCount: number,
  mineAppCurrentTab: number,
}

export const useApplicationStore = defineStore('application', {
  state: (): ApplicationState => ({
    currentMenu: $router.currentRoute.value.name as string,
    tabs: [],
    currentTab: 0,
    appList: [],
    resultList: [],
    appInfo: {},
    mineAppList: [],
    collectAppList: [],
    editorText: '',
    finishCount: 0,
    resultStateList: new Map(),
    mineAppCurrentTab: 1, // 我的小程序，当前选中的tab
  }),
  getters: {},
  actions: {
    setCurrentMenu(menu: string) {
      this.currentMenu = menu;
    },
    // 请求分类
    async getTabs() {
      const { data } = await getTabs('MINI_APP_HOME_TABS');
      this.tabs = data.tabs;
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
    setMineAppCurrentTab(tab: number) {
      this.mineAppCurrentTab = tab
    },
    // 请求应用信息
    async getApp(uuid: string) {
      const { data } = await getAppInfo(uuid as string);
      this.appInfo = data;
    },
    // 请求应用结果列表
    async getAppResult(uuid: string) {
      const { data } = await getAppResultList(uuid as string);
      this.resultList = data.list;
      const ids = this.resultList.map((item: Application.appResultItf) => {
        return item.id;
      });

      const resultList = await getResultsIsLike(ids.join(','));
      resultList.data.list.forEach((element: Application.appResultStateItf) => {
        this.resultStateList.set(element.outputId, element.like);
      });
    },
    // 请求应用结果列表
    async getMineAppList() {
      const { data } = await getMineApp();
      this.mineAppList = data.list;
    },
    async getCollectAppList() {
      const {data} = await getCollectApp()
      this.collectAppList = data.list
    },
    // 更新输入框内容
    updateEditorText(info: string) {
      this.editorText = info;
    },
    // 追加内容
    addEditorText(info: string) {
      this.editorText += info;
    },
    changeGuideState(finish: number) {
      this.finishCount = this.finishCount + finish
    }
  },
});
