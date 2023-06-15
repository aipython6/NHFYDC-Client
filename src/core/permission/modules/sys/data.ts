export const sysData = {
  list: 'sys/data/list',
  add: 'sys/data/add',
  update: 'sys/data/update',
  delete: 'sys/data/delete',
  getType: 'sys/data/getType',
} as const;

export const values = Object.values(sysData);

export type SysDataPerms = typeof values[number];

export default sysData;
