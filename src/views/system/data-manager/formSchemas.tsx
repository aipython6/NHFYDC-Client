import type { FormSchema } from '@/components/core/schema-form/';
import { getDeptByName } from '@/api/system/dept';
import { getTypeList } from '@/api/data-manager';

export const dataSchemas: FormSchema<API.addDataParams>[] = [
  {
    field: 'name',
    component: 'Input',
    label: '节点名称',
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'firstType',
    component: 'Select',
    label: '所属大类',
    rules: [{ required: true, type: 'string', message: '请选择大类' }],
  },
  {
    field: 'secondType',
    component: 'Select',
    label: '所属小类',
    rules: [{ required: true, type: 'string', message: '请选择小类' }],
    componentProps: {
      mode: 'multiple',
      request: async () => {
        const data = await getTypeList({ type: 2 });
        return data.map((n) => ({ label: n.name, value: n.id }));
      },
    },
  },
  {
    field: 'useDeptId',
    component: 'Select',
    label: '所属科室',
    rules: [{ required: true, type: 'string', message: '请选择科室' }],
    componentProps: {
      mode: 'multiple',
      onSearch: async (dept: string) => {
        const data = await getDeptByName({ deptName: dept });
        if (data.length > 0) {
          const temp = data.map((n) => ({ label: n.name, value: n.id }));
          console.log(temp);
          return data.map((n) => ({ label: n.name, value: n.id }));
        } else {
          return [];
        }
      },
    },
  },
  {
    field: 'dataSource',
    component: 'Input',
    label: '数据来源',
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
];
