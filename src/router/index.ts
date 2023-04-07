/*
 * @Author: Lemon
 * @Date: 2023-03-21 17:42:49
 * @Description:
 */
import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import { useBizDialog } from '@/plugins';
import { useApplicationStore } from '@/store/modules/application';

const dialog = useBizDialog();
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
router.beforeEach((to, from, next) => {
  if (from.name !== undefined && from.name == 'builder' && to.query.type !== 'save') {
    dialog.open(
      'regular-popup',
      {
        title: '提示信息',
        positiveText: '确认',
        negativeText: '取消',
        handlePositiveClick() {
          next();
        },
        onNegativeClick: () => {
          const applicationStore = useApplicationStore();
          applicationStore.setCurrentMenu(from.name as string);
        },
      },
      {
        content: '当前页面有内容未保存，是否确认退出？',
      }
    );
  } else {
    next(); // 继续执行路由
  }
});

/**
 * 路由后置守卫
 */
router.afterEach((to) => {
  const applicationStore = useApplicationStore();
  applicationStore.setCurrentMenu(to.name as string);
});

export function useRouter(app: App) {
  app.use(router);
}

export default router;
