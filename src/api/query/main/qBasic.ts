import { request } from '@/utils/request';

// 对应于basic_sum
export function basicSum(url_: string, method_: string, data: API.queryDataParams) {
  return request(
    {
      url: url_,
      method: method_,
      data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}
