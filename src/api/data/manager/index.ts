import { request } from '@/utils/request';
import Api from '@/core/permission/modules/sys/data';

export function getDataInfo(data: { dataId: number }) {
  return request<API.dataInfo>(
    {
      url: Api.managerDataInfo,
      method: 'get',
      params: data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}

export function getDataList(data: API.PageParams) {
  return request<API.dataListResultItem>(
    {
      url: Api.managerList,
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
      url: Api.managerAdd,
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
      url: Api.managerUpdate,
      method: 'post',
      data,
    },
    {
      successMsg: '更新成功',
    },
  );
}

export function deleteDatas(data: { ids: number[] }) {
  return request(
    {
      url: Api.managerDelete,
      method: 'post',
      data,
    },
    {
      successMsg: '删除成功',
    },
  );
}

export function getTypeList(data: { type: number; remark_id: number }) {
  return request<API.dataTypeList>(
    {
      url: Api.managerGetType,
      method: 'get',
      params: data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}
