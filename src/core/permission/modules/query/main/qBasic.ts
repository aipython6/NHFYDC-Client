export const qBasicQuery = {
  basic_sum: '/query/qBasic/basic_sum',
} as const;

export const values = Object.values(qBasicQuery);

export type QueryPerms = typeof values[number];

export default qBasicQuery;
