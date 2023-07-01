import { request } from '@/utils/request';
import Api from '@/core/permission/modules/sys/data';

export function getAllDicts() {
  return request<API.options>(
    {
      url: Api.getAllDicts,
      method: 'get',
    },
    {
      isGetDataDirectly: true,
    },
  );
}

export function getDictById(data: { remarkId: number }) {
  return request<API.DictInfo>(
    {
      url: Api.getDictById,
      method: 'get',
      params: data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}

export function getDictDataById(data: { id: number }) {
  return request<API.DictInfo>(
    {
      url: Api.getDictDataById,
      method: 'get',
      params: data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}

export function createDict(data: API.addDictParams) {
  return request(
    {
      url: Api.dictAdd,
      method: 'post',
      data,
    },
    {
      successMsg: '创建成功',
    },
  );
}

export function list(data: API.PageParams) {
  return request<API.DictList>(
    {
      url: Api.dictList,
      method: 'get',
      params: data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}

export function updateDict(data: API.updateDictParams) {
  return request<API.updateDictParams>(
    {
      url: Api.dictUpdate,
      method: 'post',
      data,
    },
    {
      successMsg: '修改成功',
    },
  );
}

export function deleteDict(data: { id: number }) {
  return request(
    {
      url: Api.dictDelete,
      method: 'get',
      params: data,
    },
    {
      successMsg: '删除成功',
    },
  );
}
