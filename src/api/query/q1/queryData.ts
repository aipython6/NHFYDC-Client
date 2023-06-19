import { request } from '@/utils/request';
import Api from '@/core/permission/modules/query/home';

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
