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
  readMyLikeAppState,
  readMyHotAppState,
} from '@/api/application';
import $router from '@/router/index';

interface ApplicationState {
  currentMenu: string;
  tabs: Application.tabInfoItf[];
  currentTab: number | null;
  appList: Application.appInfoItf[];
  resultList: Application.appResultItf[];
  resultTotal: number;
  resultNextCursor: string;
  appInfo: Application.appDetailItf;
  mineAppList: Application.appInfoItf[];
  collectAppList: Application.appInfoItf[];
  editorText: string;
  finishCount: number;
  mineAppCurrentTab: number;
  appListLikeState: {};
  appListHotState: {};
}

export const useApplicationStore = defineStore('application', {
  state: (): ApplicationState => ({
    currentMenu: $router.currentRoute.value.name as string,
    tabs: [],
    currentTab: null,
    appList: [],
    resultList: [],
    resultTotal: 0,
    resultNextCursor: '',
    appInfo: {},
    mineAppList: [],
    collectAppList: [],
    editorText: '',
    finishCount: 0,
    resultStateList: new Map(),
    mineAppCurrentTab: 1, // 我的小程序，当前选中的tab
    appListLikeState: {},
    appListHotState: {},
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
      if (!this.currentTab) this.setCurrentTab(this.tabs[0].category);
    },
    // 请求应用列表
    async getAppList() {
      const { data } = await getAppList(this.currentTab as number);
      this.appList = data.list;
      const ids = this.appList.map((item) => item.uuid);
      readMyLikeAppState(ids).then(({ data }) => {
        this.appListLikeState = data;
      });
      readMyHotAppState(ids).then(({ data }) => {
        this.appListHotState = data;
      });
    },
    setCurrentTab(category: number) {
      this.currentTab = category;
      this.getAppList();
    },
    setMineAppCurrentTab(tab: number) {
      this.mineAppCurrentTab = tab;
    },
    // 请求应用信息
    async getApp(uuid: string) {
      const { data } = await getAppInfo(uuid as string);
      this.appInfo = data;
    },
    // 请求应用结果列表
    async getAppResult(uuid: string, onePageLoading: boolean = false) {
      const params: { cursor?: string | undefined } = {};
      if (this.resultNextCursor && !onePageLoading) {
        params.cursor = this.resultNextCursor;
      } else if (!this.resultNextCursor && !onePageLoading) {
        // 最后一页不再加载 ｜ 非首页加载
        return;
      }

      const { data } = await getAppResultList(uuid as string, params);
      if (!params.cursor) {
        this.resultList = []; // 首页加载清空数组
      }
      data.list.forEach((element: Application.appResultItf) => {
        this.resultList.push(element);
      });
      this.resultTotal = data.total;
      this.resultNextCursor = data.nextCursor;

      // 确定每条结果的状态：是否被点赞
      const ids = data.list.map((item: Application.appResultItf) => {
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
      const { data } = await getCollectApp();
      this.collectAppList = data.list;
      const ids = this.collectAppList.map((item) => item.uuid);
      readMyLikeAppState(ids).then(({ data }) => {
        this.appListLikeState = data;
      });
      readMyHotAppState(ids).then(({ data }) => {
        this.appListHotState = data;
      });
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
      this.finishCount = this.finishCount + finish;
    },
  },
});
