import { request } from '@/utils/request';
import Api from '@/core/permission/modules/query/deptSelf/deptSelf';

export function selfDeptBasic(data: QUERY.formState) {
  return request(
    {
      url: Api.basic,
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}

export function CenterAllData(data: QUERY.centerState) {
  return request(
    {
      url: Api.center,
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}

// 获取全院汇总数据
export function getAllDataSum() {
  return request(
    {
      url: Api.allDataSum,
      method: 'post',
    },
    {
      isGetDataDirectly: true,
    },
  );
}
