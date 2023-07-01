import type { FormSchema } from '@/components/core/schema-form/';
export const dictSchemas: FormSchema<API.addDictParams>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '指标名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'type',
    component: 'Input',
    label: '所属类别',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'remark',
    component: 'Input',
    label: '类别名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'remarkId',
    component: 'Input',
    label: '类别ID',
    rules: [{ required: true, type: 'string' }],
  },
];
