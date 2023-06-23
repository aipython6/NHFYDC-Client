export const Query = {
  list: '/query/index/list',
  getDataByDataid: 'sys/data/dataInfo',
} as const;
export const values = Object.values(Query);

export type QueryPerms = typeof values[number];

export default Query;
