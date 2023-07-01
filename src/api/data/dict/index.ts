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

export function addDict(data: API.addDictParams) {
  return request(
    {
      url: Api.dictAdd,
      method: 'get',
      data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}

export function list(data: API.PageParams) {
  return request<API.DictList>(
    {
      url: Api.dictList,
      method: 'get',
      data,
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
      method: 'get',
      data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}

export function deleteDict(data: { id: number }) {
  return request(
    {
      url: Api.dictDelete,
      method: 'get',
      data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}
