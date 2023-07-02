import { request } from '@/utils/request';
import Api from '@/core/permission/modules/query/home';

// 获取某个userid的所有指标项
export function userIndexList(data: { userCode: string; limit?: number; page?: number }) {
  return request<API.indexListItem>(
    {
      url: Api.list,
      method: 'get',
      params: data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}
// 根据dataid获取对应的信息
export function getDatabyDataid(data: { dataId: number }) {
  return request(
    {
      url: Api.getDataByDataid,
      method: 'get',
      params: data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}
