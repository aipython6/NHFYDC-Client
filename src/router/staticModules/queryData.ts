import type { RouteRecordRaw } from 'vue-router';
// import RouterView from '@/layout/routerView/index.vue';

const moduleName = 'queryData';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'query/home/dataId=:dataId(\\d+)',
    name: `${moduleName}_index1`,
    meta: {
      title: '数据项统计',
      hideInMenu: true,
      hideInTabs: true,
      // keepAlive: true,
    },
    component: () => import('@/views/query/main/index1/index1.vue'),
  },
];
export default routes;
