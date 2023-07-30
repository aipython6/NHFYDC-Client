export const deptSelfQuery = {
  basic: '/query/deptSelf/basic',
  center: '/query/deptSelf/center',
} as const;

export const values = Object.values(deptSelfQuery);

export type QueryPerms = typeof values[number];

export default deptSelfQuery;
