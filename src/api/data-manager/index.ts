import { request } from '@/utils/request';
import Api from '@/core/permission/modules/sys/data';

export function getDataList() {
  return request<API.dataListResultItem>(
    {
      url: Api.list,
      method: 'get',
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

export function deleteData(data: { dataId: number }) {
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
