declare namespace API {
  // 数据列表项
  type dataListResultItem = {
    createAt: string;
    updatedAt: string;
    id: number;
    name: string;
    firstType: string;
    secondType: string;
    useDeptName: number;
    database: string;
    dataSource: string;
    sql: string;
    remark: string;
  };

  // 新增数据项
  type addDataParams = {
    name: string;
    firstType: string;
    secondType: string;
    useDeptId: number;
    database: string;
    dataSource: string;
    sql: string;
    remark: string;
  };

  // 更新数据项
  type updateDataParams = addDataParams & {
    id: number;
  };
}
