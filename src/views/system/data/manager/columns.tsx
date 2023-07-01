import { Tag } from 'ant-design-vue';
import type { TableColumn } from '@/components/core/dynamic-table';
export type TableListItem = API.dataListResultItem;
export type TableColumnItem = TableColumn<TableListItem>;

export const baseColumns: TableColumnItem[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 200,
    fixed: 'left',
  },
  {
    title: '所属大类',
    width: 90,
    dataIndex: 'firstType',
    align: 'center',
  },
  {
    title: '所属小类',
    width: 90,
    align: 'center',
    dataIndex: 'secondType',
  },
  {
    title: '使用部门',
    dataIndex: 'useDeptName',
    align: 'center',
    width: 110,
    ellipsis: true,
  },
  {
    title: '数据来源',
    dataIndex: 'dataSource',
    align: 'center',
    width: 140,
    ellipsis: true,
    hideInSearch: true,
  },
  // {
  //   title: 'sql',
  //   width: 200,
  //   align: 'center',
  //   dataIndex: 'sql',
  //   ellipsis: true,
  //   hideInSearch: true,
  // },
  {
    title: '备注',
    width: 100,
    align: 'center',
    dataIndex: 'remark',
    ellipsis: true,
    hideInSearch: true,
  },
  // {
  //   title: '请求路由',
  //   width: 100,
  //   align: 'center',
  //   dataIndex: 'reqRouter',
  //   ellipsis: true,
  // },
  // {
  //   title: '请求方法',
  //   width: 100,
  //   align: 'center',
  //   dataIndex: 'reqMethod',
  //   ellipsis: true,
  // },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    hideInSearch: true,
    formItemProps: {
      component: 'Select',
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
    customRender: ({ record }) => {
      const isEnable = record.status === 1;
      return <Tag color={isEnable ? 'success' : 'red'}>{isEnable ? '启用' : '禁用'}</Tag>;
    },
  },
];
