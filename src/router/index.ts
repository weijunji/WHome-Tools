import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'bitView',
    component: () => import("@/components/BitView.vue"),
    alias: '/bitview',
    meta: {
      title: 'Bit View'
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;
