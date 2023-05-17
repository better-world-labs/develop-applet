/*
 * @Author: Lemon
 * @Date: 2023-03-21 17:42:49
 * @Description:
 */
import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import beforeEach from './beforeEach';
import afterEach from './afterEach';
import { useApplicationStore } from '@/store/modules/application';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '小程序广场',
        },
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: 'view-template-details',
        name: 'view-template-details',
        meta: {
          title: '模版详情',
        },
        component: () => import('@/views/home/view-template-details.vue'),
      },
      {
        path: 'builder',
        name: 'builder',
        meta: {
          title: '构建应用',
        },
        component: () => import('@/views/builder/index.vue'),
      },
      {
        path: 'small-program',
        name: 'small-program',
        meta: {
          title: '我的小程序',
        },
        component: () => import('@/views/small-program/index.vue'),
      },
      {
        path: 'my-integral',
        name: 'my-integral',
        meta: {
          title: '我的积分',
        },
        component: () => import('@/views/my-integral/index.vue'),
      },
      {
        path: 'introduction',
        name: 'introduction',
        meta: {
          title: '个人主页',
        },
        component: () => import('@/views/introduction/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * 路由前置守卫
 */
router.beforeEach((to, from, next) => {
  if (to.name == from.name) {
    router.go(-1);
    return;
  }
  if (from.name !== undefined && from.name == 'builder' && to.query.type !== 'save') {
    $dialog.info({
      class: 'prompt-dialog',
      showIcon: false,
      title: '提示信息',
      content: '当前页面有内容未保存，是否确认退出？',
      positiveText: '确认',
      negativeText: '取消',
      onPositiveClick() {
        beforeEach.logSend(to, router);
        next();
      },
      onNegativeClick: () => {
        const applicationStore = useApplicationStore();
        applicationStore.setCurrentMenu(from.name as string);
      },
    });
  } else {
    beforeEach.logSend(to, router);
    next(); // 继续执行路由
  }
});

/**
 * 路由后置守卫
 */
router.afterEach((to) => {
  const applicationStore = useApplicationStore();
  applicationStore.setCurrentMenu(to.name as string);
  afterEach.logSend(to);
});

export function useRouter(app: App) {
  app.use(router);
}

export default router;
