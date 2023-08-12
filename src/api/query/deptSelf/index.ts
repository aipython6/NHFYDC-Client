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

type pickDateType = {
  pickDate: Array<String>;
};

// 获取全院汇总数据
export function getAllDataSum(data: pickDateType) {
  return request(
    {
      url: Api.allDataSum,
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}
