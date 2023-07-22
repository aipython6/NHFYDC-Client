export const deptSelfQuery = {
  basic: '/query/deptSelf/basic',
} as const;

export const values = Object.values(deptSelfQuery);

export type QueryPerms = typeof values[number];

export default deptSelfQuery;
