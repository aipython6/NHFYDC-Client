export default {
  'views/query/home': () => import('@/views/query/home/index.vue'),
  'views/query/main/deptSelf': () => import('@/views/query/main/deptSelf/index.vue'),
} as const;
