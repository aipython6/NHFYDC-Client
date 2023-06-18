import type { FormSchema } from '@/components/core/schema-form/';
// import { getDeptByName } from '@/api/system/dept';
import { getTypeList } from '@/api/data/manager';

export const dataSchemas: FormSchema<API.addDataParams>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '指标名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'firstTypeId',
    component: 'Select',
    label: '所属大类',
    rules: [{ required: true, type: 'number', message: '请选择大类' }],
    componentProps: {
      // mode: 'multiple',
      request: async () => {
        const data = await getTypeList({ type: 1 });
        return data.map((n) => ({ label: n.typeName, value: n.typeId }));
      },
    },
  },
  {
    field: 'secondTypeId',
    component: 'Select',
    label: '所属小类',
    rules: [{ required: true, type: 'number', message: '请选择小类' }],
    componentProps: {
      // mode: 'multiple',
      request: async () => {
        const data = await getTypeList({ type: 2 });
        return data.map((n) => ({ label: n.typeName, value: n.typeId }));
      },
    },
  },
  {
    field: 'useDeptId',
    component: 'TreeSelect',
    label: '所属科室',
    componentProps: {
      getPopupContainer: () => document.body,
    },
    // componentProps: {
    //   request: async () => {
    //     const data = await getTypeList({ type: 2 });
    //     return data.map((n) => ({ label: n.name, value: n.id }));
    //   },
    // },
    rules: [{ required: true, type: 'number', message: '请选择科室' }],
  },
  {
    field: 'dataSource',
    component: 'Input',
    label: '数据来源',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'database',
    component: 'Input',
    label: '数据库',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'sql',
    component: 'Textarea',
    label: 'sql',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'remark',
    component: 'Textarea',
    label: '备注',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'status',
    component: 'RadioGroup',
    label: '状态',
    defaultValue: 1,
    componentProps: {
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
  },
];
