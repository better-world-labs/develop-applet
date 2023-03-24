/*
 * @Author: Lemon
 * @Date: 2023-03-21 17:42:49
 * @Description:
 */
import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

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
router.beforeEach((guard) => {});

/**
 * 路由后置守卫
 */
router.afterEach((guard) => {});

export function useRouter(app: App) {
  app.use(router);
}

export default router;
