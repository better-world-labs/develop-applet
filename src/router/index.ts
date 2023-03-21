import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue'; 
 
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '首页',
        }, 
        component: () => import('@/views/index.vue'),
      }
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
router.beforeEach((guard) => { 
});

/**
 * 路由后置守卫
 */
router.afterEach((guard) => { 

});

export function useRouter(app: App) {
  app.use(router);
}

export default router;
