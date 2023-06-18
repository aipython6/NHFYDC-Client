import { request } from '@/utils/request';
import Api from '@/core/permission/modules/sys/data';

// 获取所有的sys_data列表，组成树形控件
export function getIndexList() {
  return request<API.userIndexItemList>(
    {
      url: Api.assignList,
      method: 'get',
    },
    {
      isGetDataDirectly: true,
    },
  );
}

// 获取某个用户所拥有的数据项，用于填充树形控件
export function getIndexByUserid(data: { id: number }) {
  return request<number[]>(
    {
      url: Api.userIndex,
      method: 'get',
      params: data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}

export function assignIndex(data: API.assignIndexItem) {
  return request({
    url: Api.assignIndex,
    method: 'post',
    data,
  });
}
