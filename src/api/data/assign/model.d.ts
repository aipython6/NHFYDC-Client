declare namespace API {
  // sys_user_data
  type userDataItem = {
    key: number;
    title: string;
    children: [
      {
        key: number;
        title: string;
      },
    ];
  };
  type userIndexItemList = userDataItem[];

  // 分配数据项
  type assignIndexItem = {
    userId: number;
    indexs: number[];
  };
}
