import { request } from '@/utils/request';
import Api from '@/core/permission/modules/sys/data';

export function getDataList(data: API.PageParams) {
  return request<API.dataListResultItem>(
    {
      url: Api.list,
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}

export function createData(data: API.addDataParams) {
  return request(
    {
      url: Api.add,
      method: 'post',
      data,
    },
    {
      successMsg: '创建成功',
    },
  );
}

export function updateData(data: API.updateDataParams) {
  return request(
    {
      url: Api.update,
      method: 'post',
      data,
    },
    {
      successMsg: '更新成功',
    },
  );
}

export function deleteData(data: { id: number }) {
  return request(
    {
      url: Api.delete,
      method: 'post',
      data,
    },
    {
      successMsg: '删除成功',
    },
  );
}

export function getTypeList(data: { type: number }) {
  return request(
    {
      url: Api.getType,
      method: 'get',
      data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}
