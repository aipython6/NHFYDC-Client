export const Query = {
  list: '/query/list',
} as const;
export const values = Object.values(Query);

export type QueryPerms = typeof values[number];

export default Query;
