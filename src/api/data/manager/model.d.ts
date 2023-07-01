declare namespace API {
  // dataInfo
  type dataInfo = {
    id: number;
    name: string;
    firstType: string;
    firstTypeId: number;
    secondType: string;
    secondTypeId: number;
    useDeptName: string;
    useDeptId: number;
    dataSource: string;
    sql: string;
    remark: string;
    status: number;
    reqRouter: string;
    reqMethod: string;
  };

  // 数据列表项
  type dataListResultItem = {
    createAt: string;
    updatedAt: string;
    id: number;
    name: string;
    firstType: string;
    firstTypeId: number;
    secondType: string;
    secondTypeId: number;
    useDeptName: string;
    useDeptId: number;
    dataSource: string;
    sql: string;
    remark: string;
    status: number;
    reqRouter: string;
    reqMethod: string;
  };

  // 新增数据项
  type addDataParams = {
    name: string;
    firstType: string;
    firstTypeId: number;
    secondType: string;
    secondTypeId: number;
    useDeptId: number;
    useDeptName: string;
    dataSource: string;
    sql: string;
    remark: string;
    status: number;
    reqRouter: string;
    reqMethod: string;
  };

  // 更新数据项
  type updateDataParams = addDataParams & {
    id: number;
  };

  // 数据项分类
  type dataType = {
    typeId: number;
    typeName: string;
  };
  type dataTypeList = dataType[];
}
