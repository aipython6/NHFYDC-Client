export const Query = {
  list: '/query/index/list',
  getDataByDataid: '/query/q1/queryDataByDataid',
} as const;
export const values = Object.values(Query);

export type QueryPerms = typeof values[number];

export default Query;
