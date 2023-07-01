export const sysData = {
  managerList: 'sys/data/list',
  managerAdd: 'sys/data/add',
  managerUpdate: 'sys/data/update',
  managerDelete: 'sys/data/delete',
  managerGetType: 'sys/data/getType',
  managerDataInfo: 'sys/data/dataInfo',
  // 列出所有数据项
  assignList: 'sys/data/assign/list',
  // 分配数据项
  assignIndex: 'sys/data/assign/assignIndex',
  // 获取某个用户已有的数据项
  userIndex: 'sys/data/assign/userIndex',
  // 获取所有的字典
  dictList: 'sys/data/dict/list',
  dictUpdate: 'sys/data/dict/update',
  dictAdd: 'sys/data/dict/add',
  dictDelete: 'sys/data/dict/delete',
  // 根据id获取对应的字典信息
  getDictById: 'sys/data/dict/getDictById',
  getAllDicts: 'sys/data/dict/allDicts',
} as const;

export const values = Object.values(sysData);

export type SysDataPerms = typeof values[number];

export default sysData;
