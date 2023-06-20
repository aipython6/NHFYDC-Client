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
